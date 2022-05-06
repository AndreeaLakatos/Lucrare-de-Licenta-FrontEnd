export class AddFosteringRequestModel {
  constructor(
    id: number,
    adoptionAnnouncementId: number,
    reason: string,
    date: Date,
    somethingElse: string,
    username: string
  ) {
    this.id = id;
    this.adoptionAnnouncementId = adoptionAnnouncementId;
    this.reason = reason;
    this.date = date;
    this.somethingElse = somethingElse;
    this.username = username;
  }
  id: number;
  adoptionAnnouncementId: number;
  reason: string;
  date: Date;
  somethingElse: string;
  username: string;
}
