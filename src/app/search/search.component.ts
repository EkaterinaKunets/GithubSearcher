import { Component, ElementRef, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, OnDestroy {
  @Output() searchInput: EventEmitter<string> = new EventEmitter<string>();
  form: FormGroup;
  sub = new Subscription();
  @ViewChild('searchInput', {static: true}) private input: ElementRef;

  ngOnInit() {
    this.form = new FormGroup({
      search: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
    });

    this.sub.add(fromEvent(this.input.nativeElement, 'keyup').pipe(
      debounceTime(300),
      filter((event: any) => event.target.value.length > 2),
      distinctUntilChanged(),
      tap((event) => this.searchInput.emit(event.target.value)),
    ).subscribe());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
