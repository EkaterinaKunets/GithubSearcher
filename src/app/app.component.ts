import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface GhRepo {
  name: string
  stargazers_count: number
  link: string
  items: Array<any>
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  ghRepos: GhRepo[] = []

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get<GhRepo[]>('https://api.github.com/search/repositories?q=test&sort=stars')
      .subscribe(ghRepos => {
        this.ghRepos = ghRepos.items.slice(0, 10);
        console.log(ghRepos.items)
      })
  }
}

