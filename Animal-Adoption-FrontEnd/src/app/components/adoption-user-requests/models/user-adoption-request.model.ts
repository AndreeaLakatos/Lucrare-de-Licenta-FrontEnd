import { AddAdoptionRequestModel } from '../../adoption-announces-list/add-adoption-request/models/add-adoption-request.model';
import { AdoptionAnnouncementListModel } from '../../adoption-announces-list/models/adoption-announcement-list.model';

export class UserAdoptionModel {
  constructor(
    adoptionAnnouncement: AdoptionAnnouncementListModel,
    adoptionRequest: AddAdoptionRequestModel
  ) {
    this.adoptionAnnouncement = adoptionAnnouncement;
    this.adoptionRequest = adoptionRequest;
  }
  adoptionAnnouncement: AdoptionAnnouncementListModel;
  adoptionRequest: AddAdoptionRequestModel;
}
