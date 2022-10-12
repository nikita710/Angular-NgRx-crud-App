import { Post } from '../models/post';
import { Comment } from '../models/post';

export const POST_LIST_REQUEST = 'post list request';
export const POST_LIST_SUCCESS = 'post list success';
export const POST_LIST_ERROR = 'post list error';
export const POST_LIST_ADD = 'post list add';
export const POST_LIST_UPDATE = 'post list update';
export const POST_LIST_DELETE = 'post list delete';

export const COMMENT_LIST_ADD = 'comment list add';
export const COMMENT_LIST_UPDATE = 'comment list update';
export const COMMENT_LIST_DELETE = 'comment list delete';

export class PostListRequestAction {
  readonly type = POST_LIST_REQUEST;
}
export class PostListSuccessAction {
  readonly type = POST_LIST_SUCCESS;
  constructor(public payload?: { data: Post[] }) {}
}
export class PostListErrorAction {
  readonly type = POST_LIST_ERROR;
}
export class PostListAddAction {
  readonly type = POST_LIST_ADD;
  constructor(public payload?: { data: Post }) {}
}
export class PostListUpdateAction {
  readonly type = POST_LIST_UPDATE;
  constructor(public payload?: { data: Post }) {}
}
export class PostListDeleteAction {
  readonly type = POST_LIST_DELETE;
  constructor(public payload?: { id: number }) {}
}

export class CommentListAddAction {
  readonly type = COMMENT_LIST_ADD;
  constructor(public payload?: { data: Comment; postId: number }) {}
}
export class CommentListUpdateAction {
  readonly type = COMMENT_LIST_UPDATE;
  constructor(public payload?: { data: Comment; postId: number }) {}
}
export class CommentListDeleteAction {
  readonly type = COMMENT_LIST_DELETE;
  constructor(public payload?: { id: number; postId: number }) {}
}
