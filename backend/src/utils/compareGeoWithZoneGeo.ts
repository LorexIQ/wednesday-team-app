export default function(c1: string, c2: string, radius: number): [boolean, number] {
    const [lat1, lon1] = c1.split('|').map((el: string) => parseFloat(el));
    const [lat2, lon2] = c2.split('|').map((el: string) => parseFloat(el));
    const R = 6371; // радиус Земли в км
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return [distance <= radius, distance];
}

function degToRad(deg: number): number {
    return deg * (Math.PI / 180);
}
