import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FilterReposService } from './filterRepos.service';
import { Observable, fromEvent, throwError } from 'rxjs';
import { tap, debounceTime, switchMap, distinctUntilChanged, catchError, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  loading = false
  filteredRepos: Observable<any>
  error = ''
  @ViewChild('searchInput', {static: true}) private input: ElementRef;

  constructor(private filterReposService: FilterReposService) { }
  
  ngOnInit() {
    this.filteredRepos = fromEvent(this.input.nativeElement, 'keyup').pipe(
      // filter(value => value.lenght >= 3),
      tap(() => this.loading = false),
      debounceTime(500),
      distinctUntilChanged(), 
      switchMap((event: any) => this.filterReposService.findRepo(event.target.value)),
      tap(() => this.loading = true),
      catchError(error => {
        this.error = error.message
        return throwError(error)
      })
    )
  }
}

