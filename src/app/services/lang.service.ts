import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  private langSubject$ = new BehaviorSubject<string>(this.getLang());
  langChanged$: Observable<string> = this.langSubject$.asObservable();

  getLang(): string {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lang') || 'uk';
    }
    return 'uk';
  }

  setLang(newLang: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', newLang);
      this.langSubject$.next(newLang);
    }
  }
}
