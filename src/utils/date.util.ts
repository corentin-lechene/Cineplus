import dayjs from "@/configs/dayjs.config";

export class DateUtil {
    static getDiff(firstDate: Date | string, lastDate: Date | string | null = new Date(), unit: dayjs.UnitType = 'month'): number {
        const first = dayjs(firstDate);
        const last = dayjs(lastDate);
        const diff = Math.ceil(last.diff(first, unit, true));
        return diff === 0 ? 1 : diff;
    }

    static toString(date: Date | string): string {
        return dayjs(date).format('YYYY-MM-DD');
    }
}