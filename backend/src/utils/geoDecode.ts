import fetch from "node-fetch";

export default async function(lat: number, lng: number) {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1&accept-language=ru`);
    const data = await response.json();
    return data.address;
}