import setupEventListeners from './setUpEventListeners'
import initializeMap from './initializeMap'

// Global variables
let map;
let vehicleMarkers = new Map();
let lastPositions = {};
let vehicleDistances = {};
let speedLimitDict = {};
let offPlates = new Set();
let bearing = 0;
let userInteracted = false;
let firstLoad = true;
let maxLatitude = -Infinity;
let minLongitude = Infinity;
let markers = L.layerGroup();
let violations = [];
let vehiclePlates = [];
let data = null;
let drawnItems = new L.FeatureGroup();
let refreshInterval;
let totalVehicles = 0;
let activeVehicles = 0;
let violationsCount = 0;


console.log('hello world from map')


// add Event Listeners that take the message from PostMessage in RN
// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  initializeMap();
  setupEventListeners();
});


function sendReady() {
  const msg = JSON.stringify({ type: 'READY' });
  if (window.ReactNativeWebView?.postMessage) {
    window.ReactNativeWebView.postMessage(msg);
  }
}
setTimeout(sendReady, 300);
















// async function simulateDataFetch() {
//   // This is where you would make your actual API call
//   // Example: const response = await fetch('https://your-api.com/tracking-data');
//   // data = await response.json();

//   // For demo, create mock data
//   data = generateMockData();

//   // Calculate bounds for auto-zoom
//   maxLatitude = -Infinity;
//   minLongitude = Infinity;

//   data.forEach(item => {
//     if (item.trackingData) {
//       if (item.trackingData.latitude > maxLatitude) {
//         maxLatitude = item.trackingData.latitude;
//       }
//       if (item.trackingData.longitude < minLongitude) {
//         minLongitude = item.trackingData.longitude;
//       }
//     }
//   });
// }

// function generateMockData() {
//   // Generate realistic mock data for demonstration
//   const plates = ['34ABC123', '34DEF456', '34GHI789', '34JKL012', '34MNO345'];
//   const mockData = [];

//   const baseLat = 41.0082;
//   const baseLon = 28.9784;

//   plates.forEach((plate, index) => {
//     const lat = baseLat + (Math.random() - 0.5) * 0.1;
//     const lon = baseLon + (Math.random() - 0.5) * 0.1;
//     const speed = Math.floor(Math.random() * 120);
//     const workingStatus = Math.random() > 0.3;

//     mockData.push({
//       vehicles: {
//         vehicleId: `vehicle_${index}`,
//         plate: plate
//       },
//       trackingData: {
//         serialNumber: `SN${1000 + index}`,
//         latitude: lat,
//         longitude: lon,
//         speed: speed,
//         workingstatus: workingStatus
//       }
//     });

//     // Set speed limits for demo
//     speedLimitDict[`vehicle_${index}`] = 80;
//   });

//   return mockData;
// }

async function updateVehicleMarkers() {
  if (!data || data.length === 0) return;

  const latlngs = [];

  data.forEach(item => {
    if (item.trackingData) {
      const serialNumber = item.trackingData.serialNumber;
      const lat = item.trackingData.latitude;
      const lon = item.trackingData.longitude;
      const speed = item.trackingData.speed;
      const workingStatus = item.trackingData.workingstatus;
      const plate = item.vehicles.plate;

      latlngs.push([lat, lon]);

      // Calculate bearing if we have previous position
      if (lastPositions[serialNumber]) {
        const prev = lastPositions[serialNumber];
        bearing = calculateBearing(prev.lat, prev.lon, lat, lon);
      }

      // Determine violation status
      const speedLimit = speedLimitDict[item.vehicles.vehicleId] || 80;
      const hasRouteViolation = offPlates.has(plate);
      const speedExceeded = speed > speedLimit;

      // Determine classes
      const speedClass = speedExceeded ? 'speed-exceeded' : 'speed-ok';
      const routeClass = hasRouteViolation ? 'violations-exceeded' : '';
      const combinedClass = speedExceeded && hasRouteViolation ? 'violations-speed-exceeded' : '';

      // Determine icon class
      let iconClass = speedClass;
      if (combinedClass) iconClass = combinedClass;
      else if (routeClass) iconClass = routeClass;

      // Create popup content
      const popupContent = createPopupContent(item, speed, speedLimit, workingStatus, speedExceeded, hasRouteViolation);

      // Create or update marker
      if (vehicleMarkers.has(serialNumber)) {
        const marker = vehicleMarkers.get(serialNumber);
        marker.setLatLng([lat, lon]);
        marker.setIcon(createVehicleIcon(iconClass));
        marker.setPopupContent(popupContent);
      } else {
        const marker = L.marker([lat, lon], {
          icon: createVehicleIcon(iconClass)
        }).addTo(markers);

        marker.bindPopup(popupContent);
        vehicleMarkers.set(serialNumber, marker);
      }

      lastPositions[serialNumber] = { lat, lon };
    }
  });

  // Auto-zoom if user hasn't interacted
  if ((firstLoad || !userInteracted) && latlngs.length > 0) {
    const bounds = L.latLngBounds(latlngs);
    map.fitBounds(bounds, { padding: [50, 50] });
    firstLoad = false;
  }
}

function createVehicleIcon(iconClass) {
  return L.divIcon({
    html: `
                    <div style="position: relative; width: 40px; height: 40px;">
                        <div class="${iconClass}" style="width: 100%; height: 100%; border-radius: 50%; 
                              background: ${iconClass.includes('speed-exceeded') ? 'rgba(255, 59, 48, 0.2)' :
        iconClass.includes('violations') ? 'rgba(175, 82, 222, 0.2)' :
          'rgba(52, 199, 89, 0.2)'}; 
                              display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-car" style="color: ${iconClass.includes('speed-exceeded') ? '#FF3B30' :
        iconClass.includes('violations') ? '#AF52DE' :
          '#34C759'}; 
                                  font-size: 20px; transform: rotate(${bearing}deg);"></i>
                        </div>
                    </div>
                `,
    className: 'vehicle-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
}

function createPopupContent(item, speed, speedLimit, workingStatus, speedExceeded, hasRouteViolation) {
  const violations = [];
  if (speedExceeded) violations.push('Speed violation');
  if (hasRouteViolation) violations.push('Route violation');

  const violationText = violations.join(' • ');

  return `
                <div style="padding: 10px; min-width: 200px;">
                    <div style="font-size: 16px; font-weight: bold; color: #007AFF; margin-bottom: 8px;">
                        ${item.vehicles.plate}
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px;">
                        <div><strong>Speed:</strong></div>
                        <div style="color: ${speedExceeded ? '#FF3B30' : '#34C759'}; font-weight: ${speedExceeded ? 'bold' : 'normal'}">
                            ${speed} km/h
                        </div>
                        
                        <div><strong>Limit:</strong></div>
                        <div>${speedLimit} km/h</div>
                        
                        <div><strong>Status:</strong></div>
                        <div style="color: ${workingStatus ? '#34C759' : '#FF3B30'};">
                            ${workingStatus ? 'ON' : 'OFF'}
                        </div>
                        
                        ${violationText ? `
                            <div><strong>Violations:</strong></div>
                            <div style="color: #FF3B30; font-weight: bold;">
                                ${violationText}
                            </div>
                        ` : ''}
                    </div>
                    <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
                        Last updated: ${new Date().toLocaleTimeString()}
                    </div>
                </div>
            `;
}

// async function logPlates() {
//   // This would fetch route analysis from your server
//   // For demo, we'll simulate it
//   await simulateRouteAnalysis();
// }

// async function simulateRouteAnalysis() {
//   // Simulate route analysis data
//   vehiclePlates = data.map(item => ({
//     vehicleId: item.vehicles.vehicleId,
//     plate: item.vehicles.plate
//   }));

//   // For demo, randomly mark some plates as off-route
//   data.forEach(item => {
//     if (Math.random() > 0.7) {
//       offPlates.add(item.vehicles.plate);
//     }
//   });
// }

// async function drawTodaysRoute() {
//   // This would draw today's routes for vehicles
//   // For demo, we'll create some random routes
//   drawnItems.clearLayers();

//   data.forEach((item, index) => {
//     const lat = item.trackingData.latitude;
//     const lon = item.trackingData.longitude;

//     // Create a small circle around the vehicle position
//     const circle = L.circle([lat, lon], {
//       radius: 50,
//       color: offPlates.has(item.vehicles.plate) ? '#AF52DE' : '#34C759',
//       fillColor: offPlates.has(item.vehicles.plate) ? '#AF52DE' : '#34C759',
//       fillOpacity: 0.1,
//       weight: 2
//     });

//     drawnItems.addLayer(circle);
//   });
// }

// function updateStats() {
//   totalVehicles = data ? data.length : 0;
//   activeVehicles = data ? data.filter(item => item.trackingData.workingstatus).length : 0;
//   violationsCount = offPlates.size;

//   document.getElementById('totalVehicles').textContent = totalVehicles;
//   document.getElementById('activeVehicles').textContent = activeVehicles;
//   document.getElementById('violationsCount').textContent = violationsCount;
// }

// function calculateBearing(lat1, lon1, lat2, lon2) {
//   const toRad = angle => angle * Math.PI / 180;
//   const toDeg = angle => angle * 180 / Math.PI;

//   const dLon = toRad(lon2 - lon1);
//   const y = Math.sin(dLon) * Math.cos(toRad(lat2));
//   const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
//     Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon);
//   const bearing = Math.atan2(y, x);
//   return (toDeg(bearing) + 360) % 360;
// }

// function showNotification(message, type = 'success') {
//   // Create notification element
//   const notification = document.createElement('div');
//   notification.style.cssText = `
//                 position: fixed;
//                 top: 20px;
//                 left: 50%;
//                 transform: translateX(-50%);
//                 background: ${type === 'error' ? '#FF3B30' : '#34C759'};
//                 color: white;
//                 padding: 12px 24px;
//                 border-radius: 10px;
//                 box-shadow: 0 4px 15px rgba(0,0,0,0.2);
//                 z-index: 10000;
//                 font-weight: 500;
//                 animation: slideIn 0.3s ease-out;
//             `;

//   // Add keyframes for animation
//   const style = document.createElement('style');
//   style.textContent = `
//                 @keyframes slideIn {
//                     from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
//                     to { transform: translateX(-50%) translateY(0); opacity: 1; }
//                 }
//             `;
//   document.head.appendChild(style);

//   notification.textContent = message;
//   document.body.appendChild(notification);

//   // Remove after 3 seconds
//   setTimeout(() => {
//     notification.style.animation = 'slideOut 0.3s ease-out';
//     setTimeout(() => {
//       document.body.removeChild(notification);
//       document.head.removeChild(style);
//     }, 300);
//   }, 3000);
// }

// Handle messages from React Native WebView
// window.addEventListener('message', function (event) {
//   try {
//     const message = JSON.parse(event.data);
//     handleRNMessage(message);
//   } catch (error) {
//     console.error('Error parsing message from RN:', error);
//   }
// });

// function handleRNMessage(message) {
//   switch (message.type) {
//     case 'refresh':
//       refreshData();
//       break;
//     case 'setZoom':
//       const zoom = parseInt(message.value);
//       if (!isNaN(zoom)) {
//         map.setZoom(zoom);
//       }
//       break;
//     case 'showVehicle':
//       // Focus on specific vehicle
//       const vehicleId = message.vehicleId;
//       // Implementation depends on your data structure
//       break;
//   }
// }

// Send message to React Native
function sendToReactNative(data) {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  }
}
