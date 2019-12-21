import { Component } from '@angular/core';
import { FilterReposService} from './filterRepos.service';
import { Observable} from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  loading = false
  filteredRepos: Observable<any>

  constructor(private filterReposService: FilterReposService) {}

  findRepo(inputValue: string) {
    if (inputValue.length < 3) {
      console.log('im alive')
      return null
    }
    this.loading = true
    this.filteredRepos = this.filterReposService.findRepo(inputValue)
      .pipe(
        map(ob => ob.items.slice(0, 10)),
        tap(() => this.loading = false)
      )
  }
}

// export class AppComponent {
//   loading = false
//   filteredRepos: Observable<GhRepo>
//
//   constructor(private filterReposService: FilterReposService) {}
//
//   findRepo(inputValue: string) {
//     if (inputValue.length < 3) {
//       console.log('im alive')
//       return null
//     }
//     this.loading = true
//     this.filteredRepos = this.filterReposService.findRepo(inputValue)
//       .pipe(
//         map(ob => ob.items.slice(0, 10)),
//         tap(() => this.loading = false)
//       )
//   }
// }

