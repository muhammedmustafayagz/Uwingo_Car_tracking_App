import { fetchFinalMapData } from "../api/fetchPipeLine";
import type { FinalMapDTO } from "../types/forMap";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

// Make sure this path is correct relative to this file!
// If MapView is in src/components, and HTML is in src/assets:
const mapHtmlFile = require("../../assets/mapView.html");

type OutVehicle = {
  id: string;
  lat: number;
  lng: number;
  label?: string;
  speed?: number;
  color?: string;
};

export default function MapView() {
  const webviewRef = useRef<WebView | null>(null);
  const timerRef = useRef<number | null>(null); // Fixed type for timer
  const [isMapReady, setIsMapReady] = useState(false); // Track if map is loaded

  // Store latest vehicles here so we can send them as soon as map is ready
  const latestVehiclesRef = useRef<OutVehicle[]>([]);

  function transform(dto: FinalMapDTO[]): OutVehicle[] {
    return dto
      .map((x) => {
        // ... your existing logic ...
        const id = String(
          x.trackingData?.SerialNumber ??
          x.vehicles?.VehicleId ??
          Math.random()
        );

        const lat = Number(x.trackingData?.Latitude ?? 0);
        const lng = Number(x.trackingData?.Longitude ?? 0);

        return {
          id,
          lat,
          lng,
          label: String(x.vehicles?.Plate ?? x.vehicles?.VIN ?? ""),
          speed: Number(x.trackingData?.speed ?? 0),
          color: x.trackingData?.WorkingStatus ? "#2b8cff" : "#d9534f",
        };
      })
      .filter((v) => isFinite(v.lat) && isFinite(v.lng));
  }

  function postFullUpdateToWebView(vehicles: OutVehicle[]) {
    // Save latest data
    latestVehiclesRef.current = vehicles;

    // Only send if the WebView has told us it's ready
    if (isMapReady && webviewRef.current) {
      const payload = JSON.stringify({ type: "FULL_UPDATE", vehicles });
      webviewRef.current.postMessage(payload);
    }
  }

  useEffect(() => {
    let mounted = true;

    async function fetchAndSend() {
      try {
        const dto = await fetchFinalMapData();
        if (!mounted) return;

        const vehicles = transform(dto);
        postFullUpdateToWebView(vehicles);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    }

    // Initial fetch
    fetchAndSend();

    // Interval
    timerRef.current = setInterval(fetchAndSend, 60000);

    return () => {
      mounted = false;
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isMapReady]); // Add isMapReady dependency so it retries sending if map becomes ready during a fetch

  function onMessage(e: any) {
    try {
      const msg = JSON.parse(e.nativeEvent.data);

      if (msg.type === "READY") {
        console.log("WebView map ready");
        setIsMapReady(true);

        // If we already have data waiting, send it now!
        if (latestVehiclesRef.current.length > 0) {
          const payload = JSON.stringify({
            type: "FULL_UPDATE",
            vehicles: latestVehiclesRef.current
          });
          webviewRef.current?.postMessage(payload);
        }
      }
    } catch (_) { }
  }

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        // KEY FIX: Use source={require(...)} or source={{ html: ... }}
        source={mapHtmlFile}
        onMessage={onMessage}
        onError={(e) => console.log("WebView error:", e.nativeEvent)}
        // originWhitelist is crucial for local HTML loading
        originWhitelist={["*"]}
        javaScriptEnabled
        domStorageEnabled
        allowFileAccess
        mixedContentMode="always"
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1, // Optional: helpful for debugging boundaries
    borderColor: "black"
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent' // Sometimes helps with rendering glitches
  },
});