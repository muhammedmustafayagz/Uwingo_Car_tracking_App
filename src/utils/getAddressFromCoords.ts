export const getAddressFromCoords = async (lat: any, lon: any) => {
  try {
    // Nominatim requires a User-Agent header to identify your app
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
      {
        headers: {
          'User-Agent': 'YourAppName/1.0',
        },
      }
    );

    const data = await response.json();
    console.log('get Address from cords')
    console.log(data)

    if (data && data.display_name) {
      return `${data.address.road},${data.address.suburb}, ${data.address.town}/${data.address.province}  ${data.address.country}`; // Full formatted address
    } else {
      return "Address not found";
    }
  } catch (error) {
    console.error("Geocoding Error: ", error);
    return "Error fetching address";
  }
};
