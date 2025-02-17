import { Photo } from "./Photo";

export class Album {
    public userId: number;
    public id: number;
    public title: string;
    public firstPhoto: Photo;

    constructor(userId: number, id: number, title: string, firstPhoto: Photo) {
        this.userId = userId;
        this.id = id;
        this.title = title;
        this.firstPhoto = firstPhoto;
    }

}