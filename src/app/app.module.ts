import { Component, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { ErrorPageComponent } from './404/404.component';
import { AuthComponent } from './auth/auth.component';
import { ErrorComponent } from './error/error.component';
import { CreatePostComponent } from './create-post/create-post.component';

import { ThemeService } from './services/theme.service';
import { LangService } from './services/lang.service';
import { PostService } from './services/post.service';
import { AuthService } from './services/auth.service';

import { authReduser } from './share/store/reducers/auth.reducer';
import { errorReducer } from './share/store/reducers/error.reducer';

import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AuthEffects } from './share/store/effects/auth.effects';
import { loaderReduser } from './share/store/reducers/loader.reducer';
import { TagsComponent } from './tags/tags.component';
import { tagReduser } from './share/store/reducers/tag.reducer';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PostsComponent,
    PostComponent,
    ErrorPageComponent,
    AuthComponent,
    ErrorComponent,
    CreatePostComponent,
    TagsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      auth: authReduser,
      error: errorReducer,
      loader: loaderReduser,
      tag: tagReduser
    }),
    StoreDevtoolsModule.instrument(),
    BrowserAnimationsModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [
    provideClientHydration(),
    ThemeService,
    LangService,
    PostService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
