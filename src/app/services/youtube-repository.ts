import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  UserListAddAction,
  UserListDeleteAction,
  UserListErrorAction,
  UserListRequestAction,
  UserListSuccessAction,
  UserListUpdateAction,
} from '../actions/user-action';
import {
  getPostError,
  getPostLoaded,
  getPostLoading,
  getPosts,
  getUserById,
  getUserError,
  getUserLoaded,
  getUserLoading,
  getUsers,
  RootReducerState,
} from '../reducers';
import { combineLatest, Observable, take } from 'rxjs';
import { ApiService } from './api.service';
import { User } from '../models/user';
import { Post } from '../models/post';
import { Comment } from '../models/post';
import {
  CommentListAddAction,
  CommentListDeleteAction,
  CommentListUpdateAction,
  PostListErrorAction,
  PostListRequestAction,
  PostListSuccessAction,
} from '../actions/post-action';

@Injectable()
export class YoutubeRepository {
  constructor(
    private store: Store<RootReducerState>,
    private apiService: ApiService
  ) {}

  getUserList(
    force = false
  ): [Observable<boolean>, Observable<User[]>, Observable<boolean>] {
    const loading$ = this.store.select(getUserLoading);
    const loaded$ = this.store.select(getUserLoaded);
    const getUserData$ = this.store.select(getUsers);
    const getError$ = this.store.select(getUserError);

    combineLatest([loaded$, loading$])
      .pipe(take(1))
      .subscribe((data) => {
        if ((!data[0] && !data[1]) || force) {
          this.store.dispatch(new UserListRequestAction());
          this.apiService.getAllUser().subscribe(
            (data) => {
              //this.users = data;
              console.log(data);
              this.store.dispatch(new UserListSuccessAction({ data }));
            },
            (error) => {
              this.store.dispatch(new UserListErrorAction());
            }
          );
        }
      });
    return [loading$, getUserData$, getError$];
  }

  deleteUser(id: number) {
    this.store.dispatch(new UserListDeleteAction({ id }));
  }

  updateUser(data: User) {
    this.store.dispatch(new UserListUpdateAction({ data }));
  }

  addUser(data: User) {
    this.store.dispatch(new UserListAddAction({ data }));
  }

  getUserById(id: number, force = false) {
    // get user from reducer if exist otherwise from api
    const user$ = this.store.select((state) => getUserById(state, id));
    user$.pipe(take(1)).subscribe((res) => {
      if (force || !res) {
        return this.apiService.getUser(id).subscribe((data) => {
          this.store.dispatch(new UserListAddAction({ data }));
        });
      }
      return res;
    });
    return user$;
  }

  getAllPost(
    force = false
  ): [Observable<boolean>, Observable<Post[]>, Observable<boolean>] {
    const post$ = this.store.select(getPosts);
    const loaded$ = this.store.select(getPostLoading);
    const loading$ = this.store.select(getPostLoaded);
    const getError$ = this.store.select(getPostError);
    combineLatest([loaded$, loading$])
      .pipe(take(1))
      .subscribe((data) => {
        if ((!data[0] && !data[1]) || force) {
          this.store.dispatch(new PostListRequestAction());
          this.apiService.getAllPost().subscribe(
            (res) => {
              this.store.dispatch(new PostListSuccessAction({ data: res }));
            },
            (error) => {
              this.store.dispatch(new PostListErrorAction());
            }
          );
        }
      });
    return [loading$, post$, getError$];
  }

  addComment(comment: Comment, postId: number) {
    this.store.dispatch(new CommentListAddAction({ data: comment, postId }));
  }
  updateComment(comment: Comment, postId: number) {
    this.store.dispatch(new CommentListUpdateAction({ data: comment, postId }));
  }
  deleteComment(commentId: any, postId: number) {
    this.store.dispatch(new CommentListDeleteAction({ id: commentId, postId }));
  }
}
