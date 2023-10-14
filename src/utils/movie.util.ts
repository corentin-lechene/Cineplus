import {Movie} from "@/models";
import dayjs from "dayjs";


export class MovieUtil {
    static sortByReleaseDate(a: Movie, b: Movie) {
        return dayjs(b.releasedAt).diff(dayjs(a.releasedAt));
    }
}