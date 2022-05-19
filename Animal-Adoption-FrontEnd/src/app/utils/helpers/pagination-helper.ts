import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs";
import { PaginatedResult } from "../models/pagination.model";

export function getPaginatedResult<T>(url: string, params: HttpParams, httpClient: HttpClient){
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
  
    return httpClient.get<T>(url, {observe:'response', params}).pipe(
      map(response => {
        paginatedResult.result = response.body ?? undefined;
        if (response.headers.get("X-Pagination") !== null) {
          paginatedResult.paginationMetaData = JSON.parse(response.headers.get("X-Pagination") as string);
        }
        return paginatedResult;
      })
    );
  }