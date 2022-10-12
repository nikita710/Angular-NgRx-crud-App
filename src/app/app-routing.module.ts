import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/layout/dashboard.component';
import { PostComponent } from './containers/post.component';
import { UsersComponent } from './containers/user.component';
import { ViewUserComponent } from './containers/view-user.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: UsersComponent },
      { path: 'post', component: PostComponent },
      { path: 'users/:id', component: ViewUserComponent },      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
