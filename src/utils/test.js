< !doctype html >
  <html>

    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>Vehicle Map</title>

      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

      <style>
        html,
        body,
        #map {
          height: 100%;
        margin: 0;
        padding: 0;
    }

        .marker-label {
          font - size: 10px;
        pointer-events: none;
        white-space: nowrap;
    }
      </style>
    </head>

    <body>
      <div id="map"></div>

      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

      <script>
        const map = L.map('map', {
          preferCanvas: true,
        center: [39.925533, 32.866287],
        zoom: 6,
        minZoom: 2,
    });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

        const markersMap = new Map();
        const layerGroup = L.layerGroup().addTo(map);

        {/* function parseMessageData(event) {
      try {
        const raw = event.data || event;
        if (typeof raw === 'string') return JSON.parse(raw);
        return raw;
      } catch {
        return null;
      }
    } */}

        {/* function applyFullUpdate(list) {
      if (!Array.isArray(list)) return;

      const incomingIds = new Set();

      for (let v of list) {
        const id = String(v.id ?? v.VehicleId ?? v.SerialNumber ?? v.serialNumber);
        const lat = Number(v.lat ?? v.Latitude ?? v.trackingData?.Latitude);
        const lng = Number(v.lng ?? v.Longitude ?? v.trackingData?.Longitude);

        if (!isFinite(lat) || !isFinite(lng)) continue;

        incomingIds.add(id);

        const existing = markersMap.get(id);
        if (existing) {
          existing.marker.setLatLng([lat, lng]);

          if (v.label) {
            if (!existing.labelEl) {
              const div = L.divIcon({ className: 'marker-label', html: v.label });
              existing.labelEl = L.marker([lat, lng], { icon: div, interactive: false });
              layerGroup.addLayer(existing.labelEl);
            } else {
              existing.labelEl.setLatLng([lat, lng]);
              if (existing.labelEl._icon) {
                existing.labelEl._icon.innerHTML = v.label;
              }
            }
          }

        } else {
          const marker = L.circleMarker([lat, lng], {
            radius: 4,
            weight: 0,
            fillOpacity: 0.9,
            fillColor: v.color || '#2b8cff'
          });

          marker.addTo(layerGroup);
          markersMap.set(id, { marker, raw: v });
        }
      }

      for (let [id, obj] of markersMap.entries()) {
        if (!incomingIds.has(id)) {
          layerGroup.removeLayer(obj.marker);
          if (obj.labelEl) layerGroup.removeLayer(obj.labelEl);
          markersMap.delete(id);
        }
      }

      // 👇 AUTO-ZOOM BASED ON VEHICLE AREA
      const bounds = layerGroup.getBounds();
      if (bounds && bounds.isValid()) {
        map.fitBounds(bounds, {
          maxZoom: 15,
          padding: [30, 30]
        });
      }
    } */}

        function onMessage(event) {
      const payload = parseMessageData(event);
        if (!payload) return;

        if (payload.type === 'FULL_UPDATE') {
          applyFullUpdate(payload.vehicles || []);
      }
    }

        window.addEventListener('message', onMessage);
        document.addEventListener('message', onMessage);
        window.onmessage = onMessage;

        function sendReady() {
      const msg = JSON.stringify({type: 'READY' });
        if (window.ReactNativeWebView?.postMessage) {
          window.ReactNativeWebView.postMessage(msg);
      }
    }
        setTimeout(sendReady, 300);
      </script>
    </body>

  </html>
