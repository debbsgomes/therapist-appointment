import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MockDataService implements InMemoryDbService {
  constructor(private http: HttpClient) {}

  createDb(): Observable<any> {
    return this.http.get('/db.json');
  }
}
