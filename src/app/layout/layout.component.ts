import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { Observable, Subscription, of } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  theme: string = 'light';
  isLoader: Observable<boolean> = of(false);

  private themeSubscription: Subscription;
  constructor(
    private themeService: ThemeService,
    private store: Store<{ loader: boolean }>
  ) {
    this.themeSubscription = this.themeService.themeChanged$.subscribe(
      (newTheme) => {
        this.theme = newTheme;
      }
    );

   this.isLoader = this.store.select((state) => state.loader);

  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
