export class UserFosteringRequest {
    constructor(
        announcementId: number,
        reason: string,
        fromDate: string,
        availableDate: string,
        somethingElse: string,
        reviewed: boolean,
        status: boolean
      ) {
        this.announcementId = announcementId;
        this.reason = reason;
        this.fromDate = fromDate;
        this.availableDate = availableDate;
        this.somethingElse = somethingElse;
        this.reviewed = reviewed;
        this.status = status;
      }
      announcementId: number;
      reason: string;
      fromDate: string;
      availableDate: string;
      somethingElse: string;
      reviewed: boolean;
      status: boolean;
}