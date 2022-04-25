import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class NgoService {

  private apiUrl = `${environment.apiUrl}ngo/`;
  constructor(public accountService: AccountService, private httpClient: HttpClient) { }
}
