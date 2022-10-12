import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromUser from './user-reducer';
import * as fromPost from './post-reducer';

export interface RootReducerState {
  users: fromUser.UserReducerState;
  post: fromPost.PostReducerState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  users: fromUser.UserReducer,
  post: fromPost.PostReducer,
};

//User reducer
export const getUserState = (state: RootReducerState) => state.users;
export const getUserLoading = createSelector(getUserState, fromUser.getLoading);
export const getUserLoaded = createSelector(getUserState, fromUser.getLoaded);
export const getUsers = createSelector(getUserState, fromUser.getUsers);
export const getUserError = createSelector(getUserState, fromUser.getError);
export const getUserEntities = createSelector(
  getUserState,
  fromUser.getEntities
);
export const getUserById = (state: RootReducerState, id: number) => {
  const entities = getUserEntities(state);
  return entities[id];
};

//Post reducer
export const getPostState = (state: RootReducerState) => state.post;

export const getPostLoaded = createSelector(getPostState, fromPost.getLoaded);
export const getPostLoading = createSelector(getPostState, fromPost.getLoading);
export const getPostEntities = createSelector(getPostState, fromPost.getEntities);
export const getPosts = createSelector(getPostState, fromPost.getPosts);
export const getPostError = createSelector(getPostState, fromPost.getError);

export const getPostById = (state: RootReducerState, id: number) => {
  const entities = getUserEntities(state);
  return entities[id];
};
