import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // theme: string = 'light';
  private themeSubject$ = new BehaviorSubject<string>(this.getTheme());
  themeChanged$: Observable<string> = this.themeSubject$.asObservable();

  // constructor() {
  //   this.theme = this.getTheme();
  // }

  getTheme(): string {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }

    return 'light';
  }

  setTheme(newTheme: string): void {
    if (typeof window !== 'undefined') {
      // this.theme = newTheme;
      localStorage.setItem('theme', newTheme);
      this.themeSubject$.next(newTheme);
    }
  }
}
