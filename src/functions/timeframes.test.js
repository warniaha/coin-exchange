import { hoursAsMilliseconds, minutesAsMilliseconds, secondsAsMilliseconds, minutesAsSeconds } from './timeframes';

const minutesInHour = 60;
const secondsInMinute = 60;
const millisecondsInSecond = 1000;

it('should match expected millisecond values for hoursAsMilliseconds', () => {
    const threeHours = hoursAsMilliseconds(3);
    expect(threeHours).toEqual(3*minutesInHour*secondsInMinute*millisecondsInSecond);
});

it('should match expected millisecond values for minutesAsMilliseconds', () => {
    const nineteenMinutes = minutesAsMilliseconds(19);
    expect(nineteenMinutes).toEqual(19*secondsInMinute*millisecondsInSecond);
});

it('should match expected millisecond values for secondsAsMilliseconds', () => {
    const thirtynineSeconds = secondsAsMilliseconds(39);
    expect(thirtynineSeconds).toEqual(39*millisecondsInSecond);
});

it('should match expected millisecond values for secondsAsMilliseconds', () => {
    const fourMinutes = minutesAsSeconds(4);
    expect(fourMinutes).toEqual(minutesAsMilliseconds(4)/millisecondsInSecond);
});
