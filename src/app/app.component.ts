import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FilterReposService} from './filterRepos.service';
import { Observable, fromEvent} from 'rxjs';
import { map, tap, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  loading = false
  filteredRepos: Observable<any>
  @ViewChild('searchInput', {static: true}) private input: ElementRef;

  constructor(private filterReposService: FilterReposService) { }
  
  ngOnInit() {
    this.filteredRepos = fromEvent(this.input.nativeElement, 'keyup').pipe(
      debounceTime(500),
      distinctUntilChanged(), 
      switchMap((event: any) => this.filterReposService.findRepo(event.target.value)),
      tap(() => this.loading = true),
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

