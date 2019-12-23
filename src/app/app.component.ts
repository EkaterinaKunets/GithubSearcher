import { Component } from '@angular/core';
import { FilterReposService } from './service/filterRepos.service';
import { Observable, throwError, from } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  loading = false;
  filteredRepos$: Observable<any>;
  error = '';

  constructor(private filterReposService: FilterReposService) {}

  getEvent(value) {
    this.loading = true;
    this.filteredRepos$ = from(this.filterReposService.findRepo(value)).pipe(
      tap(() => this.loading = false),
      catchError(error => {
        this.loading = false;
        this.error = error.message;
        return throwError(error);
      })
    );
  }
}

