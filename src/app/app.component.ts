import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GhRepo } from './interfaces/gh-repo.interface'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  ghRepos: Observable<any>
  filteredRepos: Observable<any>
  loading = false

  constructor(private http: HttpClient) {
    this.filteredRepos = this.ghRepos = this.http.get<any>(`https://api.github.com/search/repositories?q=test&sort=stars`)
      .pipe(map(ob => ob.items.slice(0, 10)))
  }

  findRepo(inputValue: string) {
    if (inputValue.length < 3) {
      return null
    }
    this.loading = true
    // this.filteredRepos = this.http.get<GhRepo[]>(`https://api.github.com/search/repositories?q=${inputValue}&sort=stars`)
    //   .subscribe(ghRepos => {
    //     this.ghRepos = ghRepos.items.slice(0, 10);
    //     this.loading = false
    //   })
  }
}

