import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/layout/dashboard.component';
import { HeaderComponent } from './components/layout/header.component';
import { LayoutComponent } from './components/layout/youtube-layout.component';
import { PostComponent } from './containers/post.component';
import { UsersComponent } from './containers/user.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ApiService } from './services/api.service';
import { HttpService } from './services/http.service';
import { YoutubeRepository } from './services/youtube-repository';
import { HttpClientModule } from '@angular/common/http';
import { UserCardComponent } from './components/user-card.component';
import { UserListComponent } from './components/user-list.component';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './reducers';
import { ErrorComponent } from './components/error.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { UpdateUserComponent } from './components/update-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewUserComponent } from './containers/view-user.component';
import { PostCardComponent } from './components/post-card.component';
import { PostListComponent } from './components/post-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    HeaderComponent,
    UsersComponent,
    PostComponent,
    UserCardComponent,
    UserListComponent,
    ErrorComponent,
    UpdateUserComponent,
    ViewUserComponent,
    PostCardComponent,
    PostListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [ApiService, HttpService, YoutubeRepository],
  bootstrap: [AppComponent],
})
export class AppModule {}
