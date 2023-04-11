export default function(d1: Date, d2: Date, hours: number) {
    const twoHoursInMilliseconds = hours * 60 * 60 * 1000;
    return Math.abs(d1.getTime() - d2.getTime()) <= twoHoursInMilliseconds;
}