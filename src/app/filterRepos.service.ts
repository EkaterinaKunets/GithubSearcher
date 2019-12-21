import { Injectable } from '@angular/core';
import { GhRepo } from './interfaces/gh-repo.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilterReposService {
  constructor(private http: HttpClient) {}
  findRepo(inputValue: string): Observable<GhRepo> {
    return this.http.get<GhRepo>(`https://api.github.com/search/repositories?q=${inputValue}&sort=stars`)
  }
}
