import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  type = Subject;

  init: number;
  valuesFromSubscription: number[] = [];
  style = 'none';

  $subject = new this.type<number>();
  // $subject = new this.type<number>(0); for BehaviorSubject case

  public subscribe() {
    this.$subject.subscribe((value: number) => {
      this.valuesFromSubscription.push(value);
    });
  }

  public start() {
    this.init = 0;
    this.style = 'show';
    this.iterate();
    const interval = setInterval(() => {
      this.iterate();
      if (this.init >= 4) {
        setTimeout(() => {
          clearInterval(interval);
          this.$subject.complete();
          this.style = 'none';
        }, 1900);
      }
    }, 2000);
  }

  private iterate() {
    this.init++;
    this.$subject.next(this.init);
  }
}
