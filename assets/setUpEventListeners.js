// ON Message will take the event and parse it and return the payload in order to update the map 
function onMessageLoadInitialData(event) {
  console.log('hello from onMessage')
  const payload = parseMessageData(event);
  if (!payload) return;

  if (payload.type === 'FULL_UPDATE') {
    applyFullUpdate(payload.vehicles || []);
  }
}


// Parse json turn into object 
function parseMessageData(event) {
  try {
    const raw = event.data || event;
    if (typeof raw === 'string') return JSON.parse(raw);
    return raw;
  } catch {
    return null;
  }
}

function applyFullUpdate(list) {
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
}

// async function refreshData() {
//   try {
//     await fetchDataFromRN();
//     await drawTodaysRoute();
//     updateStats();
//   } catch (error) {
//     console.error('Error refreshing data:', error);
//   }
// }

export default function setupEventListeners() {

  window.addEventListener('message', onMessageLoadInitialData);
  document.addEventListener('message', onMessageLoadInitialData);
  window.onmessage = onMessageLoadInitialData;



  // Zoom level change
  document.getElementById('zoomLevel').addEventListener('change', function () {
    const zoomLevel = parseInt(this.value);
    if (!isNaN(zoomLevel)) {
      map.setZoom(zoomLevel);
    }
  });

  // Refresh rate change
  document.getElementById('refreshRate').addEventListener('change', function () {
    const interval = parseInt(this.value);
    if (!isNaN(interval)) {
      clearInterval(refreshInterval);
      refreshInterval = setInterval(refreshData, interval);
      showNotification(`Refresh rate set to ${interval / 1000} seconds`);
    }
  });

  // Refresh button
  // document.getElementById('refreshBtn').addEventListener('click', refreshData);

  // Legend toggle
  document.getElementById('legendButton').addEventListener('click', function () {
    const legend = document.getElementById('legendDropdown');
    legend.style.display = legend.style.display === 'block' ? 'none' : 'block';
  });

  // Close legend
  document.getElementById('closeLegend').addEventListener('click', function () {
    document.getElementById('legendDropdown').style.display = 'none';
  });

  // Map interaction tracking
  map.on('zoomstart', () => userInteracted = true);
  map.on('dragstart', () => userInteracted = true);
}