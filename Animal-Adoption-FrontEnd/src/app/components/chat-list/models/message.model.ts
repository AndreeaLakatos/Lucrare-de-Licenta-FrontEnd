export class Message {
  constructor(from: string, to: string, message: string) {
    this.from = from;
    this.to = to;
    this.message = message;
  }
  from: string;
  to: string;
  message: string;
}
