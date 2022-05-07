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
    this.fosteringAnnouncementId = adoptionAnnouncementId;
    this.reason = reason;
    this.availableDate = date;
    this.somethingElse = somethingElse;
    this.username = username;
  }
  id: number;
  fosteringAnnouncementId: number;
  reason: string;
  availableDate: Date;
  somethingElse: string;
  username: string;
}
