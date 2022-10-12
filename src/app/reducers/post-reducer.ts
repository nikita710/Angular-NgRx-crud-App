import { createSelector } from '@ngrx/store';
import { Action } from '../actions';
import {
  COMMENT_LIST_ADD,
  COMMENT_LIST_DELETE,
  COMMENT_LIST_UPDATE,
  POST_LIST_ADD,
  POST_LIST_DELETE,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_UPDATE,
} from '../actions/post-action';
import { Comment, Post } from '../models/post';
import { StoreUtility } from '../utils/store.utility';

export interface PostReducerState {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  entities: { [id: number]: Post };
  ids: number[];
}

const initialState: PostReducerState = {
  loading: false,
  loaded: false,
  error: false,
  entities: {},
  ids: [],
};

//Post-Comment-reducer method
export function PostReducer(
  state = initialState,
  action: Action
): PostReducerState {
  switch (action.type) {
    //Post Reducer
    case POST_LIST_REQUEST: {
      return { ...state, loading: true };
    }
    case POST_LIST_SUCCESS: {
      const posts = action.payload.data;
      const entity = StoreUtility.normalize(posts);
      const newEntities = { ...state.entities, ...entity };
      const ids = posts.map((post: { id: any }) => post.id);
      const newIds = StoreUtility.filterDuplicateIds([...state.ids, ...ids]);
      return {
        ...state,
        ...{
          loading: false,
          loaded: true,
          error: false,
          entities: newEntities,
          ids: newIds,
        },
      };
    }
    case POST_LIST_ADD: {
      const post = action.payload.data;
      const entity = { [post.id]: post };
      const newEntities = { ...state.entities, ...entity };
      const newIds = StoreUtility.filterDuplicateIds([...state.ids, post.id]);
      return { ...state, ...{ entities: newEntities, ids: newIds } };
    }
    case POST_LIST_UPDATE: {
      const post = action.payload.data;
      const entity = { [post.id]: post };
      const updatedEntities = { ...state.entities, ...entity };
      return { ...state, ...{ entities: updatedEntities } };
    }
    case POST_LIST_DELETE: {
      const id = action.payload.id;
      const newIds = state.ids.filter((elem) => elem !== id);
      const newEntities = StoreUtility.removeKey(state.entities, id);
      return { ...state, ...{ entities: newEntities, ids: newIds } };
    }

    //Comment Reducer
    case COMMENT_LIST_ADD: {
      const postId = action.payload.postId;
      const comment = action.payload.data;
      const oldPost: Post = JSON.parse(JSON.stringify(state.entities[postId]));
      oldPost.comments.push(comment);
      const obj = { [postId]: oldPost };
      const entities = { ...state.entities, ...obj };
      return { ...state, ...{ entities } };
    }
    case COMMENT_LIST_UPDATE: {
      const postId = action.payload.postId;
      const comment = action.payload.data;
      const oldPost: Post = JSON.parse(JSON.stringify(state.entities[postId]));
      const oldPostWithoutComment = oldPost.comments.filter(
        (data) => data.id !== comment.id
      );
      oldPostWithoutComment.push(comment);
      oldPost.comments = oldPostWithoutComment;
      const obj = { [postId]: oldPost };
      const entities = { ...state.entities, ...obj };
      return { ...state, ...{ entities } };
    }
    case COMMENT_LIST_DELETE: {
      const postId = action.payload.postId;
      const commentId = action.payload.id;
      const oldPost: Post = JSON.parse(JSON.stringify(state.entities[postId]));
      const oldPostWithoutComment = oldPost.comments.filter(
        (data) => data.id !== commentId
      );
      oldPost.comments = oldPostWithoutComment;
      const obj = { [postId]: oldPost };
      const entities = { ...state.entities, ...obj };
      return { ...state, ...{ entities } };
    }

    //default
    default: {
      return initialState;
    }
  }
}

//Selectors
export const getLoading = (state: PostReducerState) => state.loading;
export const getLoaded = (state: PostReducerState) => state.loaded;
export const getError = (state: PostReducerState) => state.error;
export const getEntities = (state: PostReducerState) => state.entities;
export const getIds = (state: PostReducerState) => state.ids;
export const getPosts = createSelector(getEntities, (entities) =>
  StoreUtility.unNormalized(entities)
);
