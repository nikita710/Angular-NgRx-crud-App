import { createSelector } from '@ngrx/store';
import { Action } from '../actions';
import {
  USER_LIST_ADD,
  USER_LIST_DELETE,
  USER_LIST_ERROR,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_UPDATE,
} from '../actions/user-action';
import { User } from '../models/user';
import { StoreUtility } from '../utils/store.utility';

export interface UserReducerState {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  entities: { [id: number]: User };
  ids: number[];
}

const initialState: UserReducerState = {
  loaded: false,
  loading: false,
  error: false,
  entities: {},
  ids: [],
};

export function UserReducer(
  state = initialState,
  action: Action
): UserReducerState {
  switch (action.type) {
    case USER_LIST_REQUEST: {
      return { ...state, loading: true };
    }

    case USER_LIST_SUCCESS: {
      const users = action.payload.data;
      const entity = StoreUtility.normalize(users);
      const newEntities = { ...state.entities, ...entity };
      const ids = users.map((user: { id: any }) => user.id);
      const newIds = StoreUtility.filterDuplicateIds([...state.ids, ...ids]);
      return {
        ...state,
        ...{
          loaded: true,
          loading: false,
          error: false,
          entities: newEntities,
          ids: newIds,
        },
      };
    }
    case USER_LIST_ADD: {
      const user = action.payload.data;
      const entity = { [user.id]: user };
      const newEntity = { ...state.entities, ...entity };
      const newIds = StoreUtility.filterDuplicateIds([...state.ids, user.id]);
      return { ...state, ...{ entities: newEntity, ids: newIds } };
    }
    case USER_LIST_UPDATE: {
      const user = action.payload.data;
      const entity = { [user.id]: user };
      const updatedEntity = { ...state.entities, ...entity };
      return { ...state, ...{ entities: updatedEntity } };
    }
    case USER_LIST_DELETE: {
      const id = action.payload.id;
      const newIds = state.ids.filter((elem) => elem !== id);
      const newEntities = StoreUtility.removeKey(state.entities, id);

      return { ...state, ...{ entities: newEntities, ids: newIds } };
    }

    case USER_LIST_ERROR: {
      return { ...state, error: true, loading: false };
    }

    default: {
      return initialState;
    }
  }
}

// Selectors
export const getLoading = (state: UserReducerState) => state.loading;
export const getLoaded = (state: UserReducerState) => state.loaded;
export const getEntities = (state: UserReducerState) => state.entities;
export const getIds = (state: UserReducerState) => state.ids;
export const getUsers = createSelector(getEntities, (entities) =>
  StoreUtility.unNormalized(entities)
);
export const getError = (state: UserReducerState) => state.error;
