export class Notification {
    constructor(id: number, text: string, date: string, hour: string){
        this.id = id;
        this.text = text;
        this.date = date;
        this.hour = hour;
    }
    id: number;
    text: string;
    date: string;
    hour: string;
}