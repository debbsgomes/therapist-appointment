import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private apiUrl = '/db.json';

  constructor(private http: HttpClient) {}

  getDbData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
