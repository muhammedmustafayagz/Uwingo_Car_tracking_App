import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import WebView from 'react-native-webview';
import { COLORS } from '@/constants';
import { ReshapedData } from '@/components/Map/MapView';
import { VehicleDetails } from '@/types/ui';
import { Minus, Plus } from 'lucide-react-native';

// Assuming VehicleDetails has at least lat and lng


interface MapControlsProps {
  webViewRef: React.RefObject<WebView | null>;
  circles: boolean,
  item?: { lat: number | undefined, lng: number | undefined }
  // Added these to handle the disabled states of your buttons
  zoomInfo?: {
    current: number;
    min: number;
    max: number;
  };
}

const { height } = Dimensions.get('window');

export default function MapControls({
  webViewRef,
  circles = false,
  item,
  zoomInfo = { current: 15, min: 2, max: 20 }
}: MapControlsProps) {

  const handleZoom = (type: 'in' | 'out') => {
    if (!webViewRef.current) return;

    const jsCode = `
      (function() {
        try {
          if (window.map) {
            if ("${type}" === "in") {
              window.map.zoomIn();
            } else {
              window.map.zoomOut();
            }
          }
        } catch (e) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: "console",
            data: "Zoom Error: " + e.message
          }));
        }
      })();
      true;
    `;

    webViewRef.current.injectJavaScript(jsCode);
  };

  const handleCenterMap = () => {
    const lat = item?.lat;
    const lng = item?.lng;

    if (lat && lng && webViewRef.current) {
      const jsCode = `
        (function() {
          try {
            if (window.updateLocation) {
              window.updateLocation(${lat}, ${lng});
            } else {
              console.warn("updateLocation not found on window");
            }
          } catch (e) {
            console.error("Injection failed: " + e.message);
          }
        })();
        true;
      `;
      webViewRef.current.injectJavaScript(jsCode);
    }
  };

  return (
    <View style={[styles.mapControls, circles && { backgroundColor: 'transparent', shadowColor: 'transparent', padding: 0 }]}>
      {
        item && item.lat && item.lng &&
        <TouchableOpacity
          style={styles.mapControlButton}
          onPress={handleCenterMap}
        >
          <Text style={styles.mapControlText}>📍</Text>
        </TouchableOpacity>
      }


      <TouchableOpacity
        onPress={() => handleZoom('in')}
        disabled={zoomInfo.current >= zoomInfo.max}
        style={[
          styles.mapControlButton,
          circles && { borderRadius: 25, width: 50, height: 50, elevation: 4, shadowOpacity: 0.2, shadowRadius: 4, },
          zoomInfo.current >= zoomInfo.max && { opacity: 0.1 }
        ]}
      >
        <Plus color={COLORS.primary} size={24} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleZoom('out')}
        disabled={zoomInfo.current <= zoomInfo.min}
        style={[
          styles.mapControlButton,
          circles && { borderRadius: 25, width: 50, height: 50, elevation: 4, shadowOpacity: 0.2, shadowRadius: 4, },
          zoomInfo.current <= zoomInfo.min && { opacity: 0.1 }
        ]}
      >
        <Minus color={COLORS.primary} size={24} />

      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  mapControls: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,

    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapControlButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  mapControlText: {
    fontSize: 20,
    color: COLORS.primary,
  },


});