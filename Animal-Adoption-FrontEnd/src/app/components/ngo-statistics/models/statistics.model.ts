export class Statistics {
  constructor(
    adoptionAnnouncementsCount: number,
    activeAdoptionAnnouncements: number,
    closedAdoptionAnnouncements: number,
    adoptionRequestsNumber: number,
    adoptionAverage: number,
    fosteringAnnouncementsCount: number,
    activeFosteringAnnouncements: number,
    closedFosteringAnnouncements: number,
    fosteringRequestsNumber: number,
    fosteringAverage: number,
    adoptionUsersNo: number,
    acceptedAdoptionRequests: number,
    rejectedAdoptionRequests: number,
    fosteringUsersNo: number,
    acceptedFosteringRequests: number,
    rejectedFosteringRequests: number
  ) {
    this.adoptionAnnouncementsCount = adoptionAnnouncementsCount;
    this.activeAdoptionAnnouncements = activeAdoptionAnnouncements;
    this.closedAdoptionAnnouncements = closedAdoptionAnnouncements;
    this.adoptionRequestsNumber = adoptionRequestsNumber;
    this.adoptionAverage = adoptionAverage;
    this.fosteringAnnouncementsCount = fosteringAnnouncementsCount;
    this.activeFosteringAnnouncements = activeFosteringAnnouncements;
    this.closedFosteringAnnouncements = closedFosteringAnnouncements;
    this.fosteringRequestsNumber = fosteringRequestsNumber;
    this.fosteringAverage = fosteringAverage;
    this.adoptionUsersNo = adoptionUsersNo;
    this.acceptedAdoptionRequests = acceptedAdoptionRequests;
    this.rejectedAdoptionRequests = rejectedAdoptionRequests;
    this.fosteringUsersNo = fosteringUsersNo;
    this.acceptedFosteringRequests = acceptedFosteringRequests;
    this.rejectedFosteringRequests = rejectedFosteringRequests;
  }

  adoptionAnnouncementsCount: number;
  activeAdoptionAnnouncements: number;
  closedAdoptionAnnouncements: number;
  adoptionRequestsNumber: number;
  adoptionAverage: number;
  fosteringAnnouncementsCount: number;
  activeFosteringAnnouncements: number;
  closedFosteringAnnouncements: number;
  fosteringRequestsNumber: number;
  fosteringAverage: number;
  adoptionUsersNo: number;
  acceptedAdoptionRequests: number;
  rejectedAdoptionRequests: number;
  fosteringUsersNo: number;
  acceptedFosteringRequests: number;
  rejectedFosteringRequests: number;
}
