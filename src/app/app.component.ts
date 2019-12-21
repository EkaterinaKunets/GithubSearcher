import { Component } from '@angular/core';
// import { GhRepo } from './interfaces/gh-repo.interface';
import { FilterReposService} from './filterRepos.service';
// import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  loading = false

  constructor(private filterReposService: FilterReposService) {}

  findRepo(inputValue: string) {
    if (inputValue.length < 3) {
      return null
    }
    this.loading = true
    console.log(this.findRepo.toString())
    this.filterReposService.findRepo(inputValue)
      .pipe(map(ob => ob.items.slice(0, 10)))
    this.loading = false
  }
}

