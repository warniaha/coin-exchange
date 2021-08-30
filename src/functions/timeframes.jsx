export function secondsAsMilliseconds(sec) {
    return sec * 1000;
}

export function minutesAsMilliseconds(min) {
    return min * secondsAsMilliseconds(60);
}

export function hoursAsMilliseconds(hours) {
    return hours * minutesAsMilliseconds(60);
}

export function minutesAsSeconds(num) {
    return num * 60;
}
