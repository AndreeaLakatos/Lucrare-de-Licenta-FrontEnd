import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import {
  fromEvent,
  map,
  merge,
  Observable,
  of,
  Subject,
  Subscription,
} from 'rxjs';
import { AddAdoptionRequestModel } from 'src/app/components/adoption-announces-list/add-adoption-request/models/add-adoption-request.model';
import { AdoptionAnnouncementListModel } from 'src/app/components/adoption-announces-list/models/adoption-announcement-list.model';
import { AdoptionAnnouncementsParams } from 'src/app/components/adoption-announces-list/models/adoption-announcement-params.model';
import { AdoptionAnnouncementModel } from 'src/app/components/adoption-announces-list/models/adoption-announcement.model';
import { Image } from 'src/app/components/adoption-announces-list/models/image';
import { AdoptionRequestListModel as AdoptionRequestListModel } from 'src/app/components/adoption-requests-list/models/adoption-request-list-model.model';
import { UserAdoptionRequest } from 'src/app/components/adoption-user-request/models/user-adoption-request.model';
import { AddFosteringRequestModel } from 'src/app/components/fostering-announcements-list/add-fostering-request/models/add-fostering-request.model';
import { FosteringAnnouncementListModel } from 'src/app/components/fostering-announcements-list/models/fostering-announcement-list.model';
import { FosteringAnnouncementModel } from 'src/app/components/fostering-announcements-list/models/fostering-announcement.model';
import { FosteringAnnouncementsParams } from 'src/app/components/fostering-announcements-list/models/fostering-announcements-params.model';
import { FosteringRequestListModel } from 'src/app/components/fostering-requests-list/models/fostering-request-list-model.model';
import { UserFosteringRequest } from 'src/app/components/fostering-user-request/models/user-fostering-request.model';
import { Statistics } from 'src/app/components/ngo-statistics/models/statistics.model';
import { getPaginatedResult } from 'src/app/models/utils/helpers/pagination-helper';
import { PaginatedResult } from 'src/app/models/utils/models/pagination.model';
import { environment } from 'src/environments/environment';
import { AccountService } from '../account/account.service';
import { OfflineService } from '../offline/offline.service';

@Injectable({
  providedIn: 'root',
})
export class NgoService {
  private apiUrl = `${environment.apiUrl}ngo/`;
  public fosteringAnnouncementsParams: FosteringAnnouncementsParams =
    new FosteringAnnouncementsParams();
  public adoptionAnnouncementsParams: AdoptionAnnouncementsParams =
    new AdoptionAnnouncementsParams();
  constructor(
    public accountService: AccountService,
    private httpClient: HttpClient,
    private offlineService: OfflineService
  ) {}

  public networkStatus: boolean = false;
  networkStatus$: Subscription = Subscription.EMPTY;

  ngOnInit(): void {
    this.checkNetworkStatus();
  }

  ngOnDestroy(): void {
    this.networkStatus$.unsubscribe();
  }

  private checkNetworkStatus() {
    this.networkStatus = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe((status) => {
        this.networkStatus = status;
      });
  }

  public addAdoptionAnnouncement(
    adoptionAnnouncement: AdoptionAnnouncementModel
  ): Observable<AdoptionAnnouncementModel> {
    adoptionAnnouncement.username = this.accountService.getUserUsername();
    return this.httpClient.post<AdoptionAnnouncementModel>(
      `${this.apiUrl}adoption-announcement`,
      adoptionAnnouncement
    );
  }

  public addFosteringAnnouncement(
    fosteringAnnouncement: FosteringAnnouncementModel
  ): Observable<FosteringAnnouncementModel> {
    fosteringAnnouncement.username = this.accountService.getUserUsername();
    return this.httpClient.post<FosteringAnnouncementModel>(
      `${this.apiUrl}fostering-announcement`,
      fosteringAnnouncement
    );
  }

  public uploadAdoptionImage(id: number, file: File): Observable<Image> {
    const formData: FormData = new FormData();
    const url = `${this.apiUrl}adoption-announcement/${id}`;
    formData.append('file', file, file.name);
    return this.httpClient.post<Image>(url, formData);
  }

  public uploadFosteringImage(id: number, file: File): Observable<Image> {
    const formData: FormData = new FormData();
    const url = `${this.apiUrl}fostering-announcement/${id}`;
    formData.append('file', file, file.name);
    return this.httpClient.post<Image>(url, formData);
  }

  public getAdoptionAnnouncements(): Observable<
    PaginatedResult<AdoptionAnnouncementListModel[]>
  > {
    const baseUrl = `${
      this.apiUrl
    }adoption-announcements/${this.accountService.getUserUsername()}`;
    return getPaginatedResult<AdoptionAnnouncementListModel[]>(
      baseUrl,
      this.getAdoptionAnnouncementsParams,
      this.httpClient
    );
  }

  private get getAdoptionAnnouncementsParams(): HttpParams {
    let params = new HttpParams();
    params = params.append(
      'PageNumber',
      this.adoptionAnnouncementsParams.pageNumber
    );
    params = params.append(
      'PageSize',
      this.adoptionAnnouncementsParams.pageSize
    );
    params = params.append(
      'Sizes',
      this.adoptionAnnouncementsParams.sizes.join(',')
    );
    params = params.append(
      'Types',
      this.adoptionAnnouncementsParams.types.join(',')
    );
    params = params.append(
      'Others',
      this.adoptionAnnouncementsParams.others.join(',')
    );
    params = params.append(
      'Status',
      this.adoptionAnnouncementsParams.status.join(',')
    );

    return params;
  }

  public setAdoptionAnnouncementsParams(
    pageNumber: number,
    pageSize: number
  ): void {
    this.adoptionAnnouncementsParams.pageNumber = pageNumber;
    this.adoptionAnnouncementsParams.pageSize = pageSize;
  }

  public getFosteringAnnouncements(): Observable<
    PaginatedResult<FosteringAnnouncementListModel[]>
  > {
    const baseUrl = `${
      this.apiUrl
    }fostering-announcements/${this.accountService.getUserUsername()}`;
    return getPaginatedResult<FosteringAnnouncementListModel[]>(
      baseUrl,
      this.getFosteringAnnouncementsParams,
      this.httpClient
    );
  }

  private get getFosteringAnnouncementsParams(): HttpParams {
    let params = new HttpParams();
    params = params.append(
      'PageNumber',
      this.fosteringAnnouncementsParams.pageNumber
    );
    params = params.append(
      'PageSize',
      this.fosteringAnnouncementsParams.pageSize
    );
    params = params.append(
      'Sizes',
      this.fosteringAnnouncementsParams.sizes.join(',')
    );
    params = params.append(
      'Types',
      this.fosteringAnnouncementsParams.types.join(',')
    );
    params = params.append(
      'Others',
      this.fosteringAnnouncementsParams.others.join(',')
    );
    params = params.append(
      'Status',
      this.fosteringAnnouncementsParams.status.join(',')
    );

    return params;
  }

  public setFosteringAnnouncementsParams(
    pageNumber: number,
    pageSize: number
  ): void {
    this.fosteringAnnouncementsParams.pageNumber = pageNumber;
    this.fosteringAnnouncementsParams.pageSize = pageSize;
  }

  public addAdoptionRequest(
    addAdoptionRequest: AddAdoptionRequestModel
  ): Observable<AddAdoptionRequestModel> {
    addAdoptionRequest.username = this.accountService.getUserUsername();
    return this.httpClient.post<AddAdoptionRequestModel>(
      `${this.apiUrl}adoption-request`,
      addAdoptionRequest
    );
  }

  public addFosteringRequest(
    addFosteringRequest: AddFosteringRequestModel
  ): Observable<AddFosteringRequestModel> {
    addFosteringRequest.username = this.accountService.getUserUsername();
    return this.httpClient.post<AddFosteringRequestModel>(
      `${this.apiUrl}fostering-request`,
      addFosteringRequest
    );
  }

  public deleteAdoptionAnnouncement(adoptionAnnouncementId: number) {
    return this.httpClient.delete(
      `${
        this.apiUrl
      }adoption-announcement/${adoptionAnnouncementId}/${this.accountService.getUserUsername()}`
    );
  }

  public deleteFosteringAnnouncement(fosteringAnnouncementId: number) {
    return this.httpClient.delete(
      `${
        this.apiUrl
      }fostering-announcement/${fosteringAnnouncementId}/${this.accountService.getUserUsername()}`
    );
  }

  public getAdoptionAnnouncementRequests(
    adoptionAnnouncementId: number
  ): Observable<AdoptionRequestListModel[]> {
    if (window.navigator.onLine)
      return this.httpClient.get<AdoptionRequestListModel[]>(
        `${this.apiUrl}adoption-requests/${adoptionAnnouncementId}`
      );
    return this.offlineService.getAdoptionRequestsAnnouncementsOffline(
      adoptionAnnouncementId
    );
  }

  public getFosteringAnnouncementRequests(
    fosteringAnnouncementId: number
  ): Observable<FosteringRequestListModel[]> {
    if (window.navigator.onLine)
      return this.httpClient.get<FosteringRequestListModel[]>(
        `${this.apiUrl}fostering-requests/${fosteringAnnouncementId}`
      );
    return this.offlineService.getFosteringRequestsAnnouncementsOffline(
      fosteringAnnouncementId
    );
  }

  public updateAdoptionRequest(
    adoptionRequestListModel: AdoptionRequestListModel
  ) {
    return this.httpClient.post(
      `${this.apiUrl}adoption-requests`,
      adoptionRequestListModel
    );
  }

  public updateFosteringRequest(
    fosteringRequestListModel: FosteringRequestListModel
  ) {
    return this.httpClient.post(
      `${this.apiUrl}fostering-requests`,
      fosteringRequestListModel
    );
  }

  public getUserAdoptionRequest(
    announcementId: number
  ): Observable<UserAdoptionRequest> {
    return this.httpClient.get<UserAdoptionRequest>(
      `${this.apiUrl}user-adoption-request/${this.accountService.getUserUsername()}/${announcementId}`
    );
  }

  public getUserFosteringRequest(
    announcementId: number
  ): Observable<UserFosteringRequest> {
    return this.httpClient.get<UserFosteringRequest>(
      `${this.apiUrl}user-fostering-request/${this.accountService.getUserUsername()}/${announcementId}`
    );
  }

  public getStatistics(): Observable<Statistics> {
    var username = this.accountService.getUserUsername();
    return this.httpClient.get<Statistics>(
      `${this.apiUrl}statistics/${username}`
    );
  }
}
