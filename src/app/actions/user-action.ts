import { User } from '../models/user';

export const USER_LIST_REQUEST = 'user list request';
export const USER_LIST_SUCCESS = 'user list success';
export const USER_LIST_ERROR = 'user list error';
export const USER_LIST_DELETE = 'user list delete';
export const USER_LIST_UPDATE = 'user list update';
export const USER_LIST_ADD = 'user list add';

export class UserListRequestAction {
  readonly type = USER_LIST_REQUEST;
}
export class UserListSuccessAction {
  readonly type = USER_LIST_SUCCESS;
  constructor(public payload?: { data: User[] }) {}
}
export class UserListAddAction {
  readonly type = USER_LIST_ADD;
  constructor(public payload?: { data: User }) {}
}
export class UserListUpdateAction {
  readonly type = USER_LIST_UPDATE;
  constructor(public payload?: { data: User }) {}
}
export class UserListDeleteAction {
  readonly type = USER_LIST_DELETE;
  constructor(public payload?: { id: number }) {}
}
export class UserListErrorAction {
  readonly type = USER_LIST_ERROR;
}
