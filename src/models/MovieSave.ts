export default class MovieSave {
    id: number;
    title: string;
    url: string;
    backdropUrl: string;
    description: string;
    vote_average: string;
    release_date: string;
    viewedAt: string;
    extra?: number;

    constructor(id: number, title: string, url: string, backdropUrl: string, description: string, vote_average: string, release_date: string, viewedAt: string, extra: number) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.backdropUrl = backdropUrl;
        this.description = description;
        this.vote_average = vote_average;
        this.release_date = release_date;
        this.viewedAt = viewedAt;
        this.extra = extra;
    }
}