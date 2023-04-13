import fetch from "node-fetch";

export default async function(coord): Promise<string> {
    const [lat, lng] = coord.split('|').map(el => parseFloat(el));
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1&accept-language=ru`);
    const data = await response.json();
    const address = data.address;
    return `${address.city ?? address.state ?? 'Неизвестно'}, ${address.road ?? address.municipality ?? 'Неизвестно'}`;
}