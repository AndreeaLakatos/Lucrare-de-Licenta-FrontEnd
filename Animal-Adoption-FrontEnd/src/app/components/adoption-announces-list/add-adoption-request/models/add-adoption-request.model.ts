export class AddAdoptionRequestModel {
  constructor(
    id: number,
    adoptionAnnouncementId: number,
    reason: string,
    availableDate: Date,
    somethingElse: string,
    username: string
  ) {
    this.id = id;
    this.adoptionAnnouncementId = adoptionAnnouncementId;
    this.reason = reason;
    this.availableDate = availableDate;
    this.somethingElse = somethingElse;
    this.username = username;
  }
  id: number;
  adoptionAnnouncementId: number;
  reason: string;
  availableDate: Date;
  somethingElse: string;
  username: string;
}
