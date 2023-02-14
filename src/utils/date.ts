import dayjs from 'dayjs'


export function validateTime(time: string) {

    return dayjs(formatDateHour(time)).isValid();

}

function formatDateHour(time: string) {
    const date = dayjs().format('YYYY-MM-DD');          // 2023-02-14
    const dateTimeFormat = new Date(`${date} ${time}`); // 2023-02-14 10:28

    return dayjs(dateTimeFormat);
}


export function compareEndTimeIsAfter(startTime: string, endTime: string) {

    return formatDateHour(endTime).isAfter(formatDateHour(startTime));

}