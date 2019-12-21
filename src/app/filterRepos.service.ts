import { Injectable } from '@angular/core';
import { GhRepo } from './interfaces/gh-repo.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FilterReposService {
  constructor(private http: HttpClient) {}
  findRepo(inputValue: string): Observable<GhRepo> {
    return this.http.get<any>(`https://api.github.com/search/repositories?q=${inputValue}&sort=stars`).pipe(
      map(ob => ob.items.slice(0, 10)),
    )
  }
}
