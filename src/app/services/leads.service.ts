import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Lead } from '../interfaces/lead.interface';

type LeadsResponse = Lead[] | { leads?: Lead[]; data?: Lead[] };

@Injectable({
  providedIn: 'root'
})
export class LeadsService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getLeads(): Observable<Lead[]> {
    return this.http.get<LeadsResponse>(`${this.apiUrl}/leads`).pipe(
      map((response) => {
        if (Array.isArray(response)) {
          return response;
        }

        return response.leads ?? response.data ?? [];
      })
    );
  }

  updateLeadStatus(id: string, status: string): Observable<Lead> {
    return this.http.put<Lead>(`${this.apiUrl}/leads/${id}/status`, { status });
  }
}
