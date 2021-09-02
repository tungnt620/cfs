import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: any;
};

/** A connection to a list of `Category` values. */
export type CategoriesConnection = {
  __typename?: 'CategoriesConnection';
  /** A list of edges which contains the `Category` and cursor to aid in pagination. */
  edges: Array<CategoriesEdge>;
  /** A list of `Category` objects. */
  nodes: Array<Category>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Category` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Category` edge in the connection. */
export type CategoriesEdge = {
  __typename?: 'CategoriesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Category` at the end of the edge. */
  node: Category;
};

/** Methods to use when ordering `Category`. */
export enum CategoriesOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC'
}

export type Category = {
  __typename?: 'Category';
  /** Reads and enables pagination through a set of `ConfessionCategory`. */
  confessionCategories: ConfessionCategoriesConnection;
  createdAt: Scalars['Datetime'];
  id: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  slug: Scalars['String'];
  updatedAt: Scalars['Datetime'];
};


export type CategoryConfessionCategoriesArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<ConfessionCategoryCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ConfessionCategoriesOrderBy>>;
};

/**
 * A condition to be used against `Category` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type CategoryCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `slug` field. */
  slug?: Maybe<Scalars['String']>;
};

/** An input for mutations affecting `Category` */
export type CategoryInput = {
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  slug: Scalars['String'];
};

/** Represents an update to a `Category`. Fields that are set will be updated. */
export type CategoryPatch = {
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

/** All input for the `changePassword` mutation. */
export type ChangePasswordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

/** The output of our `changePassword` mutation. */
export type ChangePasswordPayload = {
  __typename?: 'ChangePasswordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Comment = {
  __typename?: 'Comment';
  authorName?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `Comment`. */
  childComments: CommentsConnection;
  /** Reads a single `Confession` that is related to this `Comment`. */
  confession?: Maybe<Confession>;
  confessionId: Scalars['Int'];
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['Datetime'];
  id: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  /** Reads a single `Comment` that is related to this `Comment`. */
  parent?: Maybe<Comment>;
  parentId?: Maybe<Scalars['Int']>;
  totalReaction: Scalars['Int'];
  updatedAt: Scalars['Datetime'];
  /** Reads a single `User` that is related to this `Comment`. */
  user?: Maybe<User>;
  /** Reads and enables pagination through a set of `UserCommentReaction`. */
  userCommentReactions: UserCommentReactionsConnection;
  userId?: Maybe<Scalars['UUID']>;
};


export type CommentChildCommentsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<CommentCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CommentsOrderBy>>;
};


export type CommentUserCommentReactionsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<UserCommentReactionCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<UserCommentReactionsOrderBy>>;
};

/** A condition to be used against `Comment` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type CommentCondition = {
  /** Checks for equality with the object’s `confessionId` field. */
  confessionId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `parentId` field. */
  parentId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['UUID']>;
};

/** An input for mutations affecting `Comment` */
export type CommentInput = {
  authorName?: Maybe<Scalars['String']>;
  confessionId: Scalars['Int'];
  content?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['UUID']>;
};

/** Represents an update to a `Comment`. Fields that are set will be updated. */
export type CommentPatch = {
  authorName?: Maybe<Scalars['String']>;
  confessionId?: Maybe<Scalars['Int']>;
  content?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['UUID']>;
};

/** A connection to a list of `Comment` values. */
export type CommentsConnection = {
  __typename?: 'CommentsConnection';
  /** A list of edges which contains the `Comment` and cursor to aid in pagination. */
  edges: Array<CommentsEdge>;
  /** A list of `Comment` objects. */
  nodes: Array<Comment>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Comment` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Comment` edge in the connection. */
export type CommentsEdge = {
  __typename?: 'CommentsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Comment` at the end of the edge. */
  node: Comment;
};

/** Methods to use when ordering `Comment`. */
export enum CommentsOrderBy {
  ConfessionIdAsc = 'CONFESSION_ID_ASC',
  ConfessionIdDesc = 'CONFESSION_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  ParentIdAsc = 'PARENT_ID_ASC',
  ParentIdDesc = 'PARENT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

export type Confession = {
  __typename?: 'Confession';
  /** Reads and enables pagination through a set of `Comment`. */
  comments: CommentsConnection;
  /** Reads and enables pagination through a set of `ConfessionCategory`. */
  confessionCategories: ConfessionCategoriesConnection;
  content: Scalars['String'];
  createdAt: Scalars['Datetime'];
  id: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  title: Scalars['String'];
  totalReaction: Scalars['Int'];
  updatedAt: Scalars['Datetime'];
  /** Reads a single `User` that is related to this `Confession`. */
  user?: Maybe<User>;
  /** Reads and enables pagination through a set of `UserConfessionReaction`. */
  userConfessionReactions: UserConfessionReactionsConnection;
  userId: Scalars['UUID'];
};


export type ConfessionCommentsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<CommentCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CommentsOrderBy>>;
};


export type ConfessionConfessionCategoriesArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<ConfessionCategoryCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ConfessionCategoriesOrderBy>>;
};


export type ConfessionUserConfessionReactionsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<UserConfessionReactionCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<UserConfessionReactionsOrderBy>>;
};

/** A connection to a list of `ConfessionCategory` values. */
export type ConfessionCategoriesConnection = {
  __typename?: 'ConfessionCategoriesConnection';
  /** A list of edges which contains the `ConfessionCategory` and cursor to aid in pagination. */
  edges: Array<ConfessionCategoriesEdge>;
  /** A list of `ConfessionCategory` objects. */
  nodes: Array<ConfessionCategory>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ConfessionCategory` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ConfessionCategory` edge in the connection. */
export type ConfessionCategoriesEdge = {
  __typename?: 'ConfessionCategoriesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ConfessionCategory` at the end of the edge. */
  node: ConfessionCategory;
};

/** Methods to use when ordering `ConfessionCategory`. */
export enum ConfessionCategoriesOrderBy {
  CategoryIdAsc = 'CATEGORY_ID_ASC',
  CategoryIdDesc = 'CATEGORY_ID_DESC',
  ConfessionIdAsc = 'CONFESSION_ID_ASC',
  ConfessionIdDesc = 'CONFESSION_ID_DESC',
  Natural = 'NATURAL'
}

export type ConfessionCategory = {
  __typename?: 'ConfessionCategory';
  /** Reads a single `Category` that is related to this `ConfessionCategory`. */
  category?: Maybe<Category>;
  categoryId: Scalars['Int'];
  /** Reads a single `Confession` that is related to this `ConfessionCategory`. */
  confession?: Maybe<Confession>;
  confessionId: Scalars['Int'];
};

/**
 * A condition to be used against `ConfessionCategory` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ConfessionCategoryCondition = {
  /** Checks for equality with the object’s `categoryId` field. */
  categoryId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `confessionId` field. */
  confessionId?: Maybe<Scalars['Int']>;
};

/**
 * A condition to be used against `Confession` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ConfessionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `slug` field. */
  slug?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['UUID']>;
};

/** An input for mutations affecting `Confession` */
export type ConfessionInput = {
  content: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  title: Scalars['String'];
};

/** Represents an update to a `Confession`. Fields that are set will be updated. */
export type ConfessionPatch = {
  content?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Confession` values. */
export type ConfessionsConnection = {
  __typename?: 'ConfessionsConnection';
  /** A list of edges which contains the `Confession` and cursor to aid in pagination. */
  edges: Array<ConfessionsEdge>;
  /** A list of `Confession` objects. */
  nodes: Array<Confession>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Confession` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Confession` edge in the connection. */
export type ConfessionsEdge = {
  __typename?: 'ConfessionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Confession` at the end of the edge. */
  node: Confession;
};

/** Methods to use when ordering `Confession`. */
export enum ConfessionsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** All input for the `confirmAccountDeletion` mutation. */
export type ConfirmAccountDeletionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  token: Scalars['String'];
};

/** The output of our `confirmAccountDeletion` mutation. */
export type ConfirmAccountDeletionPayload = {
  __typename?: 'ConfirmAccountDeletionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  success?: Maybe<Scalars['Boolean']>;
};

/** All input for the create `Category` mutation. */
export type CreateCategoryInput = {
  /** The `Category` to be created by this mutation. */
  category: CategoryInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** The output of our create `Category` mutation. */
export type CreateCategoryPayload = {
  __typename?: 'CreateCategoryPayload';
  /** The `Category` that was created by this mutation. */
  category?: Maybe<Category>;
  /** An edge for our `Category`. May be used by Relay 1. */
  categoryEdge?: Maybe<CategoriesEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Category` mutation. */
export type CreateCategoryPayloadCategoryEdgeArgs = {
  orderBy?: Maybe<Array<CategoriesOrderBy>>;
};

/** All input for the `createCfs` mutation. */
export type CreateCfsInput = {
  catId: Scalars['Int'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  image: Scalars['String'];
  slug: Scalars['String'];
  title: Scalars['String'];
};

/** The output of our `createCfs` mutation. */
export type CreateCfsPayload = {
  __typename?: 'CreateCfsPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  confession?: Maybe<Confession>;
  /** An edge for our `Confession`. May be used by Relay 1. */
  confessionEdge?: Maybe<ConfessionsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Confession`. */
  user?: Maybe<User>;
};


/** The output of our `createCfs` mutation. */
export type CreateCfsPayloadConfessionEdgeArgs = {
  orderBy?: Maybe<Array<ConfessionsOrderBy>>;
};

/** All input for the create `Comment` mutation. */
export type CreateCommentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Comment` to be created by this mutation. */
  comment: CommentInput;
};

/** The output of our create `Comment` mutation. */
export type CreateCommentPayload = {
  __typename?: 'CreateCommentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Comment` that was created by this mutation. */
  comment?: Maybe<Comment>;
  /** An edge for our `Comment`. May be used by Relay 1. */
  commentEdge?: Maybe<CommentsEdge>;
  /** Reads a single `Confession` that is related to this `Comment`. */
  confession?: Maybe<Confession>;
  /** Reads a single `Comment` that is related to this `Comment`. */
  parent?: Maybe<Comment>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Comment`. */
  user?: Maybe<User>;
};


/** The output of our create `Comment` mutation. */
export type CreateCommentPayloadCommentEdgeArgs = {
  orderBy?: Maybe<Array<CommentsOrderBy>>;
};

/** All input for the create `Confession` mutation. */
export type CreateConfessionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Confession` to be created by this mutation. */
  confession: ConfessionInput;
};

/** The output of our create `Confession` mutation. */
export type CreateConfessionPayload = {
  __typename?: 'CreateConfessionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Confession` that was created by this mutation. */
  confession?: Maybe<Confession>;
  /** An edge for our `Confession`. May be used by Relay 1. */
  confessionEdge?: Maybe<ConfessionsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Confession`. */
  user?: Maybe<User>;
};


/** The output of our create `Confession` mutation. */
export type CreateConfessionPayloadConfessionEdgeArgs = {
  orderBy?: Maybe<Array<ConfessionsOrderBy>>;
};

/** All input for the `createOrUpdateCommentReaction` mutation. */
export type CreateOrUpdateCommentReactionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  commentId: Scalars['Int'];
  reactType: ReactionType;
};

/** The output of our `createOrUpdateCommentReaction` mutation. */
export type CreateOrUpdateCommentReactionPayload = {
  __typename?: 'CreateOrUpdateCommentReactionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  comment?: Maybe<Comment>;
  /** An edge for our `Comment`. May be used by Relay 1. */
  commentEdge?: Maybe<CommentsEdge>;
  /** Reads a single `Confession` that is related to this `Comment`. */
  confession?: Maybe<Confession>;
  /** Reads a single `Comment` that is related to this `Comment`. */
  parent?: Maybe<Comment>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Comment`. */
  user?: Maybe<User>;
};


/** The output of our `createOrUpdateCommentReaction` mutation. */
export type CreateOrUpdateCommentReactionPayloadCommentEdgeArgs = {
  orderBy?: Maybe<Array<CommentsOrderBy>>;
};

/** All input for the `createOrUpdateConfessionReaction` mutation. */
export type CreateOrUpdateConfessionReactionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  confessionId: Scalars['Int'];
  reactType: ReactionType;
};

/** The output of our `createOrUpdateConfessionReaction` mutation. */
export type CreateOrUpdateConfessionReactionPayload = {
  __typename?: 'CreateOrUpdateConfessionReactionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  confession?: Maybe<Confession>;
  /** An edge for our `Confession`. May be used by Relay 1. */
  confessionEdge?: Maybe<ConfessionsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Confession`. */
  user?: Maybe<User>;
};


/** The output of our `createOrUpdateConfessionReaction` mutation. */
export type CreateOrUpdateConfessionReactionPayloadConfessionEdgeArgs = {
  orderBy?: Maybe<Array<ConfessionsOrderBy>>;
};

/** All input for the create `UserEmail` mutation. */
export type CreateUserEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserEmail` to be created by this mutation. */
  userEmail: UserEmailInput;
};

/** The output of our create `UserEmail` mutation. */
export type CreateUserEmailPayload = {
  __typename?: 'CreateUserEmailPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserEmail`. */
  user?: Maybe<User>;
  /** The `UserEmail` that was created by this mutation. */
  userEmail?: Maybe<UserEmail>;
  /** An edge for our `UserEmail`. May be used by Relay 1. */
  userEmailEdge?: Maybe<UserEmailsEdge>;
};


/** The output of our create `UserEmail` mutation. */
export type CreateUserEmailPayloadUserEmailEdgeArgs = {
  orderBy?: Maybe<Array<UserEmailsOrderBy>>;
};



/** All input for the `deleteComment` mutation. */
export type DeleteCommentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Comment` mutation. */
export type DeleteCommentPayload = {
  __typename?: 'DeleteCommentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Comment` that was deleted by this mutation. */
  comment?: Maybe<Comment>;
  /** An edge for our `Comment`. May be used by Relay 1. */
  commentEdge?: Maybe<CommentsEdge>;
  /** Reads a single `Confession` that is related to this `Comment`. */
  confession?: Maybe<Confession>;
  deletedCommentNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `Comment` that is related to this `Comment`. */
  parent?: Maybe<Comment>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Comment`. */
  user?: Maybe<User>;
};


/** The output of our delete `Comment` mutation. */
export type DeleteCommentPayloadCommentEdgeArgs = {
  orderBy?: Maybe<Array<CommentsOrderBy>>;
};

/** All input for the `deleteConfession` mutation. */
export type DeleteConfessionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Confession` mutation. */
export type DeleteConfessionPayload = {
  __typename?: 'DeleteConfessionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Confession` that was deleted by this mutation. */
  confession?: Maybe<Confession>;
  /** An edge for our `Confession`. May be used by Relay 1. */
  confessionEdge?: Maybe<ConfessionsEdge>;
  deletedConfessionNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Confession`. */
  user?: Maybe<User>;
};


/** The output of our delete `Confession` mutation. */
export type DeleteConfessionPayloadConfessionEdgeArgs = {
  orderBy?: Maybe<Array<ConfessionsOrderBy>>;
};

/** All input for the `deleteUserAuthentication` mutation. */
export type DeleteUserAuthenticationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `UserAuthentication` mutation. */
export type DeleteUserAuthenticationPayload = {
  __typename?: 'DeleteUserAuthenticationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedUserAuthenticationNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserAuthentication`. */
  user?: Maybe<User>;
  /** The `UserAuthentication` that was deleted by this mutation. */
  userAuthentication?: Maybe<UserAuthentication>;
};

/** All input for the `deleteUserEmail` mutation. */
export type DeleteUserEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `UserEmail` mutation. */
export type DeleteUserEmailPayload = {
  __typename?: 'DeleteUserEmailPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedUserEmailNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserEmail`. */
  user?: Maybe<User>;
  /** The `UserEmail` that was deleted by this mutation. */
  userEmail?: Maybe<UserEmail>;
  /** An edge for our `UserEmail`. May be used by Relay 1. */
  userEmailEdge?: Maybe<UserEmailsEdge>;
};


/** The output of our delete `UserEmail` mutation. */
export type DeleteUserEmailPayloadUserEmailEdgeArgs = {
  orderBy?: Maybe<Array<UserEmailsOrderBy>>;
};

/** All input for the `forgotPassword` mutation. */
export type ForgotPasswordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
};

/** The output of our `forgotPassword` mutation. */
export type ForgotPasswordPayload = {
  __typename?: 'ForgotPasswordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  user: User;
};

export type LogoutPayload = {
  __typename?: 'LogoutPayload';
  success?: Maybe<Scalars['Boolean']>;
};

/** All input for the `makeEmailPrimary` mutation. */
export type MakeEmailPrimaryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  emailId: Scalars['UUID'];
};

/** The output of our `makeEmailPrimary` mutation. */
export type MakeEmailPrimaryPayload = {
  __typename?: 'MakeEmailPrimaryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserEmail`. */
  user?: Maybe<User>;
  userEmail?: Maybe<UserEmail>;
  /** An edge for our `UserEmail`. May be used by Relay 1. */
  userEmailEdge?: Maybe<UserEmailsEdge>;
};


/** The output of our `makeEmailPrimary` mutation. */
export type MakeEmailPrimaryPayloadUserEmailEdgeArgs = {
  orderBy?: Maybe<Array<UserEmailsOrderBy>>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Enter your old password and a new password to change your password. */
  changePassword?: Maybe<ChangePasswordPayload>;
  /** If you're certain you want to delete your account, use `requestAccountDeletion` to request an account deletion token, and then supply the token through this mutation to complete account deletion. */
  confirmAccountDeletion?: Maybe<ConfirmAccountDeletionPayload>;
  /** Creates a single `Category`. */
  createCategory?: Maybe<CreateCategoryPayload>;
  createCfs?: Maybe<CreateCfsPayload>;
  /** Creates a single `Comment`. */
  createComment?: Maybe<CreateCommentPayload>;
  /** Creates a single `Confession`. */
  createConfession?: Maybe<CreateConfessionPayload>;
  createOrUpdateCommentReaction?: Maybe<CreateOrUpdateCommentReactionPayload>;
  createOrUpdateConfessionReaction?: Maybe<CreateOrUpdateConfessionReactionPayload>;
  /** Creates a single `UserEmail`. */
  createUserEmail?: Maybe<CreateUserEmailPayload>;
  /** Deletes a single `Comment` using a unique key. */
  deleteComment?: Maybe<DeleteCommentPayload>;
  /** Deletes a single `Confession` using a unique key. */
  deleteConfession?: Maybe<DeleteConfessionPayload>;
  /** Deletes a single `UserAuthentication` using a unique key. */
  deleteUserAuthentication?: Maybe<DeleteUserAuthenticationPayload>;
  /** Deletes a single `UserEmail` using a unique key. */
  deleteUserEmail?: Maybe<DeleteUserEmailPayload>;
  /** If you've forgotten your password, give us one of your email addresses and we'll send you a reset token. Note this only works if you have added an email address! */
  forgotPassword?: Maybe<ForgotPasswordPayload>;
  /** Use this mutation to log in to your account; this login uses sessions so you do not need to take further action. */
  login?: Maybe<LoginPayload>;
  /** Use this mutation to logout from your account. Don't forget to clear the client state! */
  logout?: Maybe<LogoutPayload>;
  /** Your primary email is where we'll notify of account events; other emails may be used for discovery or login. Use this when you're changing your email address. */
  makeEmailPrimary?: Maybe<MakeEmailPrimaryPayload>;
  /** Use this mutation to create an account on our system. This may only be used if you are logged out. */
  register?: Maybe<RegisterPayload>;
  /** Begin the account deletion flow by requesting the confirmation email */
  requestAccountDeletion?: Maybe<RequestAccountDeletionPayload>;
  /** If you didn't receive the verification code for this email, we can resend it. We silently cap the rate of resends on the backend, so calls to this function may not result in another email being sent if it has been called recently. */
  resendEmailVerificationCode?: Maybe<ResendEmailVerificationCodePayload>;
  /** After triggering forgotPassword, you'll be sent a reset token. Combine this with your user ID and a new password to reset your password. */
  resetPassword?: Maybe<ResetPasswordPayload>;
  /** Updates a single `Category` using a unique key and a patch. */
  updateCategory?: Maybe<UpdateCategoryPayload>;
  /** Updates a single `Comment` using a unique key and a patch. */
  updateComment?: Maybe<UpdateCommentPayload>;
  /** Updates a single `Confession` using a unique key and a patch. */
  updateConfession?: Maybe<UpdateConfessionPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Once you have received a verification token for your email, you may call this mutation with that token to make your email verified. */
  verifyEmail?: Maybe<VerifyEmailPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationConfirmAccountDeletionArgs = {
  input: ConfirmAccountDeletionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCfsArgs = {
  input: CreateCfsInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateConfessionArgs = {
  input: CreateConfessionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateOrUpdateCommentReactionArgs = {
  input: CreateOrUpdateCommentReactionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateOrUpdateConfessionReactionArgs = {
  input: CreateOrUpdateConfessionReactionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserEmailArgs = {
  input: CreateUserEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCommentArgs = {
  input: DeleteCommentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteConfessionArgs = {
  input: DeleteConfessionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserAuthenticationArgs = {
  input: DeleteUserAuthenticationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserEmailArgs = {
  input: DeleteUserEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationLoginArgs = {
  input: LoginInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationMakeEmailPrimaryArgs = {
  input: MakeEmailPrimaryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterArgs = {
  input: RegisterInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRequestAccountDeletionArgs = {
  input: RequestAccountDeletionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationResendEmailVerificationCodeArgs = {
  input: ResendEmailVerificationCodeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateConfessionArgs = {
  input: UpdateConfessionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = {
  __typename?: 'Query';
  /** Reads and enables pagination through a set of `Category`. */
  categories?: Maybe<CategoriesConnection>;
  category?: Maybe<Category>;
  categoryBySlug?: Maybe<Category>;
  comment?: Maybe<Comment>;
  /** Reads and enables pagination through a set of `Comment`. */
  comments?: Maybe<CommentsConnection>;
  confession?: Maybe<Confession>;
  confessionBySlug?: Maybe<Confession>;
  /** Reads and enables pagination through a set of `ConfessionCategory`. */
  confessionCategories?: Maybe<ConfessionCategoriesConnection>;
  confessionCategoryByConfessionIdAndCategoryId?: Maybe<ConfessionCategory>;
  /** Reads and enables pagination through a set of `Confession`. */
  confessions?: Maybe<ConfessionsConnection>;
  /** The currently logged in user (or null if not logged in). */
  currentUser?: Maybe<User>;
  /** Reads and enables pagination through a set of `Confession`. */
  getCfsByCat?: Maybe<ConfessionsConnection>;
  /** Reads and enables pagination through a set of `Confession`. */
  getCfsByCatSlug?: Maybe<ConfessionsConnection>;
  user?: Maybe<User>;
  userAuthentication?: Maybe<UserAuthentication>;
  userByUsername?: Maybe<User>;
  userCommentReaction?: Maybe<UserCommentReaction>;
  userCommentReactionByUserIdAndCommentId?: Maybe<UserCommentReaction>;
  /** Reads and enables pagination through a set of `UserCommentReaction`. */
  userCommentReactions?: Maybe<UserCommentReactionsConnection>;
  userConfessionReaction?: Maybe<UserConfessionReaction>;
  userConfessionReactionByUserIdAndConfessionId?: Maybe<UserConfessionReaction>;
  /** Reads and enables pagination through a set of `UserConfessionReaction`. */
  userConfessionReactions?: Maybe<UserConfessionReactionsConnection>;
  userEmail?: Maybe<UserEmail>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCategoriesArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<CategoryCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CategoriesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCategoryArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCategoryBySlugArgs = {
  slug: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCommentArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCommentsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<CommentCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CommentsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryConfessionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryConfessionBySlugArgs = {
  slug: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryConfessionCategoriesArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<ConfessionCategoryCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ConfessionCategoriesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryConfessionCategoryByConfessionIdAndCategoryIdArgs = {
  categoryId: Scalars['Int'];
  confessionId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryConfessionsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<ConfessionCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ConfessionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetCfsByCatArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  catId: Scalars['Int'];
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetCfsByCatSlugArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  catSlug: Scalars['String'];
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserAuthenticationArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByUsernameArgs = {
  username: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserCommentReactionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserCommentReactionByUserIdAndCommentIdArgs = {
  commentId: Scalars['Int'];
  userId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserCommentReactionsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<UserCommentReactionCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<UserCommentReactionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserConfessionReactionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserConfessionReactionByUserIdAndConfessionIdArgs = {
  confessionId: Scalars['Int'];
  userId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserConfessionReactionsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<UserConfessionReactionCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<UserConfessionReactionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserEmailArgs = {
  id: Scalars['UUID'];
};

export enum ReactionType {
  Down = 'DOWN',
  None = 'NONE',
  Up = 'UP'
}

export type RegisterInput = {
  avatarUrl?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterPayload = {
  __typename?: 'RegisterPayload';
  user: User;
};

/** All input for the `requestAccountDeletion` mutation. */
export type RequestAccountDeletionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** The output of our `requestAccountDeletion` mutation. */
export type RequestAccountDeletionPayload = {
  __typename?: 'RequestAccountDeletionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  success?: Maybe<Scalars['Boolean']>;
};

/** All input for the `resendEmailVerificationCode` mutation. */
export type ResendEmailVerificationCodeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  emailId: Scalars['UUID'];
};

/** The output of our `resendEmailVerificationCode` mutation. */
export type ResendEmailVerificationCodePayload = {
  __typename?: 'ResendEmailVerificationCodePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  success?: Maybe<Scalars['Boolean']>;
};

/** All input for the `resetPassword` mutation. */
export type ResetPasswordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  newPassword: Scalars['String'];
  resetToken: Scalars['String'];
  userId: Scalars['UUID'];
};

/** The output of our `resetPassword` mutation. */
export type ResetPasswordPayload = {
  __typename?: 'ResetPasswordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  success?: Maybe<Scalars['Boolean']>;
};

/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type Subscription = {
  __typename?: 'Subscription';
  /** Triggered when the logged in user's record is updated in some way. */
  currentUserUpdated?: Maybe<UserSubscriptionPayload>;
};


/** All input for the `updateCategory` mutation. */
export type UpdateCategoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An object where the defined keys will be set on the `Category` being updated. */
  patch: CategoryPatch;
};

/** The output of our update `Category` mutation. */
export type UpdateCategoryPayload = {
  __typename?: 'UpdateCategoryPayload';
  /** The `Category` that was updated by this mutation. */
  category?: Maybe<Category>;
  /** An edge for our `Category`. May be used by Relay 1. */
  categoryEdge?: Maybe<CategoriesEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Category` mutation. */
export type UpdateCategoryPayloadCategoryEdgeArgs = {
  orderBy?: Maybe<Array<CategoriesOrderBy>>;
};

/** All input for the `updateComment` mutation. */
export type UpdateCommentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An object where the defined keys will be set on the `Comment` being updated. */
  patch: CommentPatch;
};

/** The output of our update `Comment` mutation. */
export type UpdateCommentPayload = {
  __typename?: 'UpdateCommentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Comment` that was updated by this mutation. */
  comment?: Maybe<Comment>;
  /** An edge for our `Comment`. May be used by Relay 1. */
  commentEdge?: Maybe<CommentsEdge>;
  /** Reads a single `Confession` that is related to this `Comment`. */
  confession?: Maybe<Confession>;
  /** Reads a single `Comment` that is related to this `Comment`. */
  parent?: Maybe<Comment>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Comment`. */
  user?: Maybe<User>;
};


/** The output of our update `Comment` mutation. */
export type UpdateCommentPayloadCommentEdgeArgs = {
  orderBy?: Maybe<Array<CommentsOrderBy>>;
};

/** All input for the `updateConfession` mutation. */
export type UpdateConfessionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An object where the defined keys will be set on the `Confession` being updated. */
  patch: ConfessionPatch;
};

/** The output of our update `Confession` mutation. */
export type UpdateConfessionPayload = {
  __typename?: 'UpdateConfessionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Confession` that was updated by this mutation. */
  confession?: Maybe<Confession>;
  /** An edge for our `Confession`. May be used by Relay 1. */
  confessionEdge?: Maybe<ConfessionsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Confession`. */
  user?: Maybe<User>;
};


/** The output of our update `Confession` mutation. */
export type UpdateConfessionPayloadConfessionEdgeArgs = {
  orderBy?: Maybe<Array<ConfessionsOrderBy>>;
};

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Unique identifier for the user. */
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** The output of our update `User` mutation. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was updated by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** A user who can log in to the application. */
export type User = {
  __typename?: 'User';
  /** Optional avatar URL. */
  avatarUrl?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `Comment`. */
  comments: CommentsConnection;
  /** Reads and enables pagination through a set of `Confession`. */
  confessions: ConfessionsConnection;
  createdAt: Scalars['Datetime'];
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Unique identifier for the user. */
  id: Scalars['UUID'];
  /** If true, the user has elevated privileges. */
  isAdmin: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  /** Public-facing name (or pseudonym) of the user. */
  name?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Datetime'];
  /** Reads and enables pagination through a set of `UserAuthentication`. */
  userAuthenticationsList: Array<UserAuthentication>;
  /** Reads and enables pagination through a set of `UserCommentReaction`. */
  userCommentReactions: UserCommentReactionsConnection;
  /** Reads and enables pagination through a set of `UserConfessionReaction`. */
  userConfessionReactions: UserConfessionReactionsConnection;
  /** Reads and enables pagination through a set of `UserEmail`. */
  userEmails: UserEmailsConnection;
  /** Public-facing username (or 'handle') of the user. */
  username: Scalars['String'];
};


/** A user who can log in to the application. */
export type UserCommentsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<CommentCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CommentsOrderBy>>;
};


/** A user who can log in to the application. */
export type UserConfessionsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<ConfessionCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ConfessionsOrderBy>>;
};


/** A user who can log in to the application. */
export type UserUserAuthenticationsListArgs = {
  condition?: Maybe<UserAuthenticationCondition>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<UserAuthenticationsOrderBy>>;
};


/** A user who can log in to the application. */
export type UserUserCommentReactionsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<UserCommentReactionCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<UserCommentReactionsOrderBy>>;
};


/** A user who can log in to the application. */
export type UserUserConfessionReactionsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<UserConfessionReactionCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<UserConfessionReactionsOrderBy>>;
};


/** A user who can log in to the application. */
export type UserUserEmailsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<UserEmailCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<UserEmailsOrderBy>>;
};

/** Contains information about the login providers this user has used, so that they may disconnect them should they wish. */
export type UserAuthentication = {
  __typename?: 'UserAuthentication';
  createdAt: Scalars['Datetime'];
  id: Scalars['UUID'];
  /** A unique identifier for the user within the login service. */
  identifier: Scalars['String'];
  /** The login service used, e.g. `twitter` or `github`. */
  service: Scalars['String'];
  updatedAt: Scalars['Datetime'];
  /** Reads a single `User` that is related to this `UserAuthentication`. */
  user?: Maybe<User>;
  userId: Scalars['UUID'];
};

/**
 * A condition to be used against `UserAuthentication` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type UserAuthenticationCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `service` field. */
  service?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['UUID']>;
};

/** Methods to use when ordering `UserAuthentication`. */
export enum UserAuthenticationsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ServiceAsc = 'SERVICE_ASC',
  ServiceDesc = 'SERVICE_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

export type UserCommentReaction = {
  __typename?: 'UserCommentReaction';
  /** Reads a single `Comment` that is related to this `UserCommentReaction`. */
  comment?: Maybe<Comment>;
  commentId: Scalars['Int'];
  createdAt: Scalars['Datetime'];
  id: Scalars['Int'];
  reactType: ReactionType;
  updatedAt: Scalars['Datetime'];
  /** Reads a single `User` that is related to this `UserCommentReaction`. */
  user?: Maybe<User>;
  userId?: Maybe<Scalars['UUID']>;
};

/**
 * A condition to be used against `UserCommentReaction` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type UserCommentReactionCondition = {
  /** Checks for equality with the object’s `commentId` field. */
  commentId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['UUID']>;
};

/** A connection to a list of `UserCommentReaction` values. */
export type UserCommentReactionsConnection = {
  __typename?: 'UserCommentReactionsConnection';
  /** A list of edges which contains the `UserCommentReaction` and cursor to aid in pagination. */
  edges: Array<UserCommentReactionsEdge>;
  /** A list of `UserCommentReaction` objects. */
  nodes: Array<UserCommentReaction>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserCommentReaction` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `UserCommentReaction` edge in the connection. */
export type UserCommentReactionsEdge = {
  __typename?: 'UserCommentReactionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserCommentReaction` at the end of the edge. */
  node: UserCommentReaction;
};

/** Methods to use when ordering `UserCommentReaction`. */
export enum UserCommentReactionsOrderBy {
  CommentIdAsc = 'COMMENT_ID_ASC',
  CommentIdDesc = 'COMMENT_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

export type UserConfessionReaction = {
  __typename?: 'UserConfessionReaction';
  /** Reads a single `Confession` that is related to this `UserConfessionReaction`. */
  confession?: Maybe<Confession>;
  confessionId: Scalars['Int'];
  createdAt: Scalars['Datetime'];
  id: Scalars['Int'];
  reactType: ReactionType;
  updatedAt: Scalars['Datetime'];
  /** Reads a single `User` that is related to this `UserConfessionReaction`. */
  user?: Maybe<User>;
  userId: Scalars['UUID'];
};

/**
 * A condition to be used against `UserConfessionReaction` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type UserConfessionReactionCondition = {
  /** Checks for equality with the object’s `confessionId` field. */
  confessionId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['UUID']>;
};

/** A connection to a list of `UserConfessionReaction` values. */
export type UserConfessionReactionsConnection = {
  __typename?: 'UserConfessionReactionsConnection';
  /** A list of edges which contains the `UserConfessionReaction` and cursor to aid in pagination. */
  edges: Array<UserConfessionReactionsEdge>;
  /** A list of `UserConfessionReaction` objects. */
  nodes: Array<UserConfessionReaction>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserConfessionReaction` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `UserConfessionReaction` edge in the connection. */
export type UserConfessionReactionsEdge = {
  __typename?: 'UserConfessionReactionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserConfessionReaction` at the end of the edge. */
  node: UserConfessionReaction;
};

/** Methods to use when ordering `UserConfessionReaction`. */
export enum UserConfessionReactionsOrderBy {
  ConfessionIdAsc = 'CONFESSION_ID_ASC',
  ConfessionIdDesc = 'CONFESSION_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Information about a user's email address. */
export type UserEmail = {
  __typename?: 'UserEmail';
  createdAt: Scalars['Datetime'];
  /** The users email address, in `a@b.c` format. */
  email: Scalars['String'];
  id: Scalars['UUID'];
  isPrimary: Scalars['Boolean'];
  /** True if the user has is_verified their email address (by clicking the link in the email we sent them, or logging in with a social login provider), false otherwise. */
  isVerified: Scalars['Boolean'];
  updatedAt: Scalars['Datetime'];
  /** Reads a single `User` that is related to this `UserEmail`. */
  user?: Maybe<User>;
  userId: Scalars['UUID'];
};

/**
 * A condition to be used against `UserEmail` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type UserEmailCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `isPrimary` field. */
  isPrimary?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['UUID']>;
};

/** An input for mutations affecting `UserEmail` */
export type UserEmailInput = {
  /** The users email address, in `a@b.c` format. */
  email: Scalars['String'];
};

/** A connection to a list of `UserEmail` values. */
export type UserEmailsConnection = {
  __typename?: 'UserEmailsConnection';
  /** A list of edges which contains the `UserEmail` and cursor to aid in pagination. */
  edges: Array<UserEmailsEdge>;
  /** A list of `UserEmail` objects. */
  nodes: Array<UserEmail>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserEmail` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `UserEmail` edge in the connection. */
export type UserEmailsEdge = {
  __typename?: 'UserEmailsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserEmail` at the end of the edge. */
  node: UserEmail;
};

/** Methods to use when ordering `UserEmail`. */
export enum UserEmailsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsPrimaryAsc = 'IS_PRIMARY_ASC',
  IsPrimaryDesc = 'IS_PRIMARY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  /** Optional avatar URL. */
  avatarUrl?: Maybe<Scalars['String']>;
  /** Public-facing name (or pseudonym) of the user. */
  name?: Maybe<Scalars['String']>;
  /** Public-facing username (or 'handle') of the user. */
  username?: Maybe<Scalars['String']>;
};

export type UserSubscriptionPayload = {
  __typename?: 'UserSubscriptionPayload';
  event?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

/** A `User` edge in the connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node: User;
};

/** Methods to use when ordering `User`. */
export enum UsersOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC'
}

/** All input for the `verifyEmail` mutation. */
export type VerifyEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  token: Scalars['String'];
  userEmailId: Scalars['UUID'];
};

/** The output of our `verifyEmail` mutation. */
export type VerifyEmailPayload = {
  __typename?: 'VerifyEmailPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  success?: Maybe<Scalars['Boolean']>;
};

export type AddEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type AddEmailMutation = (
  { __typename?: 'Mutation' }
  & { createUserEmail?: Maybe<(
    { __typename?: 'CreateUserEmailPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
      & { userEmails: (
        { __typename?: 'UserEmailsConnection' }
        & { nodes: Array<(
          { __typename?: 'UserEmail' }
          & Pick<UserEmail, 'id'>
          & EmailsForm_UserEmailFragment
        )> }
      ) }
    )> }
  )> }
);

export type AllCategoriesPageQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCategoriesPageQuery = (
  { __typename?: 'Query' }
  & { categories?: Maybe<(
    { __typename?: 'CategoriesConnection' }
    & { nodes: Array<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'image' | 'name' | 'slug'>
      & { confessionCategories: (
        { __typename?: 'ConfessionCategoriesConnection' }
        & Pick<ConfessionCategoriesConnection, 'totalCount'>
      ) }
    )> }
  )> }
);

export type CatDetailPageQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type CatDetailPageQuery = (
  { __typename?: 'Query' }
  & { categoryBySlug?: Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, 'image' | 'slug'>
  )> }
);

export type CfsDetailPageQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type CfsDetailPageQuery = (
  { __typename?: 'Query' }
  & { confessionBySlug?: Maybe<(
    { __typename?: 'Confession' }
    & Pick<Confession, 'id' | 'image' | 'slug' | 'title' | 'createdAt' | 'content' | 'totalReaction'>
    & { userConfessionReactions: (
      { __typename?: 'UserConfessionReactionsConnection' }
      & { nodes: Array<(
        { __typename?: 'UserConfessionReaction' }
        & Pick<UserConfessionReaction, 'reactType'>
      )> }
    ), user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )>, comments: (
      { __typename?: 'CommentsConnection' }
      & Pick<CommentsConnection, 'totalCount'>
      & { nodes: Array<(
        { __typename?: 'Comment' }
        & Pick<Comment, 'id' | 'authorName' | 'content' | 'image' | 'parentId' | 'createdAt'>
        & { user?: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'username'>
        )> }
      )> }
    ), confessionCategories: (
      { __typename?: 'ConfessionCategoriesConnection' }
      & { nodes: Array<(
        { __typename?: 'ConfessionCategory' }
        & { category?: Maybe<(
          { __typename?: 'Category' }
          & Pick<Category, 'image' | 'slug'>
        )> }
      )> }
    ) }
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword?: Maybe<(
    { __typename?: 'ChangePasswordPayload' }
    & Pick<ChangePasswordPayload, 'success'>
  )> }
);

export type ConfirmAccountDeletionMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmAccountDeletionMutation = (
  { __typename?: 'Mutation' }
  & { confirmAccountDeletion?: Maybe<(
    { __typename?: 'ConfirmAccountDeletionPayload' }
    & Pick<ConfirmAccountDeletionPayload, 'success'>
  )> }
);

export type CreateCfsMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
  slug: Scalars['String'];
  catId: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
}>;


export type CreateCfsMutation = (
  { __typename?: 'Mutation' }
  & { createCfs?: Maybe<(
    { __typename?: 'CreateCfsPayload' }
    & { confession?: Maybe<(
      { __typename?: 'Confession' }
      & Pick<Confession, 'content' | 'id' | 'createdAt' | 'image' | 'slug' | 'title'>
    )> }
  )> }
);

export type CreateCommentMutationVariables = Exact<{
  confessionId: Scalars['Int'];
  content: Scalars['String'];
  parentId?: Maybe<Scalars['Int']>;
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment?: Maybe<(
    { __typename?: 'CreateCommentPayload' }
    & { comment?: Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'authorName' | 'content' | 'image' | 'parentId' | 'createdAt'>
      & { user?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'username'>
      )> }
    )> }
  )> }
);

export type CreateOrUpdateConfessionReactionMutationVariables = Exact<{
  confessionId: Scalars['Int'];
  reactType: ReactionType;
}>;


export type CreateOrUpdateConfessionReactionMutation = (
  { __typename?: 'Mutation' }
  & { createOrUpdateConfessionReaction?: Maybe<(
    { __typename?: 'CreateOrUpdateConfessionReactionPayload' }
    & { confession?: Maybe<(
      { __typename?: 'Confession' }
      & Pick<Confession, 'id' | 'totalReaction'>
    )> }
  )> }
);

export type CurrentUserAuthenticationsQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserAuthenticationsQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { authentications: Array<(
      { __typename?: 'UserAuthentication' }
      & Pick<UserAuthentication, 'id' | 'service' | 'identifier' | 'createdAt'>
    )> }
  )> }
);

export type CurrentUserUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserUpdatedSubscription = (
  { __typename?: 'Subscription' }
  & { currentUserUpdated?: Maybe<(
    { __typename?: 'UserSubscriptionPayload' }
    & Pick<UserSubscriptionPayload, 'event'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'name' | 'avatarUrl' | 'isAdmin' | 'isVerified'>
    )> }
  )> }
);

export type DeleteEmailMutationVariables = Exact<{
  emailId: Scalars['UUID'];
}>;


export type DeleteEmailMutation = (
  { __typename?: 'Mutation' }
  & { deleteUserEmail?: Maybe<(
    { __typename?: 'DeleteUserEmailPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
      & { userEmails: (
        { __typename?: 'UserEmailsConnection' }
        & { nodes: Array<(
          { __typename?: 'UserEmail' }
          & Pick<UserEmail, 'id'>
          & EmailsForm_UserEmailFragment
        )> }
      ) }
    )> }
  )> }
);

export type EmailsForm_UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id'>
  & { userEmails: (
    { __typename?: 'UserEmailsConnection' }
    & { nodes: Array<(
      { __typename?: 'UserEmail' }
      & Pick<UserEmail, 'id' | 'email' | 'isVerified'>
      & EmailsForm_UserEmailFragment
    )> }
  ) }
);

export type EmailsForm_UserEmailFragment = (
  { __typename?: 'UserEmail' }
  & Pick<UserEmail, 'id' | 'email' | 'isVerified' | 'isPrimary' | 'createdAt'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPassword?: Maybe<(
    { __typename?: 'ForgotPasswordPayload' }
    & Pick<ForgotPasswordPayload, 'clientMutationId'>
  )> }
);

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = (
  { __typename?: 'Query' }
  & { categories?: Maybe<(
    { __typename?: 'CategoriesConnection' }
    & { nodes: Array<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name'>
    )> }
  )> }
);

export type GetCfsByCatSlugQueryVariables = Exact<{
  catSlug: Scalars['String'];
  offset: Scalars['Int'];
}>;


export type GetCfsByCatSlugQuery = (
  { __typename?: 'Query' }
  & { getCfsByCatSlug?: Maybe<(
    { __typename?: 'ConfessionsConnection' }
    & { nodes: Array<(
      { __typename?: 'Confession' }
      & HomePage_ConfessionFragment
    )> }
  )> }
);

export type HomePageQueryVariables = Exact<{
  offset?: Maybe<Scalars['Int']>;
  catId?: Maybe<Scalars['Int']>;
}>;


export type HomePageQuery = (
  { __typename?: 'Query' }
  & { getCfsByCat?: Maybe<(
    { __typename?: 'ConfessionsConnection' }
    & { nodes: Array<(
      { __typename?: 'Confession' }
      & HomePage_ConfessionFragment
    )> }
  )> }
);

export type HomePageAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type HomePageAllCategoriesQuery = (
  { __typename?: 'Query' }
  & { categories?: Maybe<(
    { __typename?: 'CategoriesConnection' }
    & { nodes: Array<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name'>
    )> }
  )> }
);

export type HomePage_ConfessionFragment = (
  { __typename?: 'Confession' }
  & Pick<Confession, 'id' | 'slug' | 'title' | 'image' | 'createdAt' | 'totalReaction'>
  & { comments: (
    { __typename?: 'CommentsConnection' }
    & Pick<CommentsConnection, 'totalCount'>
  ), userConfessionReactions: (
    { __typename?: 'UserConfessionReactionsConnection' }
    & { nodes: Array<(
      { __typename?: 'UserConfessionReaction' }
      & Pick<UserConfessionReaction, 'reactType'>
    )> }
  ), confessionCategories: (
    { __typename?: 'ConfessionCategoriesConnection' }
    & { nodes: Array<(
      { __typename?: 'ConfessionCategory' }
      & { category?: Maybe<(
        { __typename?: 'Category' }
        & Pick<Category, 'slug' | 'image'>
      )> }
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'LoginPayload' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'name'>
    ) }
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout?: Maybe<(
    { __typename?: 'LogoutPayload' }
    & Pick<LogoutPayload, 'success'>
  )> }
);

export type MakeEmailPrimaryMutationVariables = Exact<{
  emailId: Scalars['UUID'];
}>;


export type MakeEmailPrimaryMutation = (
  { __typename?: 'Mutation' }
  & { makeEmailPrimary?: Maybe<(
    { __typename?: 'MakeEmailPrimaryPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
      & { userEmails: (
        { __typename?: 'UserEmailsConnection' }
        & { nodes: Array<(
          { __typename?: 'UserEmail' }
          & Pick<UserEmail, 'id' | 'isPrimary'>
        )> }
      ) }
    )> }
  )> }
);

export type ProfileSettingsForm_UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'username' | 'avatarUrl'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register?: Maybe<(
    { __typename?: 'RegisterPayload' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'name'>
    ) }
  )> }
);

export type RequestAccountDeletionMutationVariables = Exact<{ [key: string]: never; }>;


export type RequestAccountDeletionMutation = (
  { __typename?: 'Mutation' }
  & { requestAccountDeletion?: Maybe<(
    { __typename?: 'RequestAccountDeletionPayload' }
    & Pick<RequestAccountDeletionPayload, 'success'>
  )> }
);

export type ResendEmailVerificationMutationVariables = Exact<{
  emailId: Scalars['UUID'];
}>;


export type ResendEmailVerificationMutation = (
  { __typename?: 'Mutation' }
  & { resendEmailVerificationCode?: Maybe<(
    { __typename?: 'ResendEmailVerificationCodePayload' }
    & Pick<ResendEmailVerificationCodePayload, 'success'>
  )> }
);

export type ResetPasswordMutationVariables = Exact<{
  userId: Scalars['UUID'];
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword?: Maybe<(
    { __typename?: 'ResetPasswordPayload' }
    & Pick<ResetPasswordPayload, 'success'>
  )> }
);

export type SettingsEmailsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsEmailsQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'isVerified'>
    & EmailsForm_UserFragment
  )> }
  & SharedLayout_QueryFragment
);

export type SettingsPasswordQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsPasswordQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'hasPassword'>
    & { userEmails: (
      { __typename?: 'UserEmailsConnection' }
      & { nodes: Array<(
        { __typename?: 'UserEmail' }
        & Pick<UserEmail, 'id' | 'email'>
      )> }
    ) }
  )> }
);

export type SettingsProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsProfileQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & ProfileSettingsForm_UserFragment
  )> }
  & SharedLayout_QueryFragment
);

export type SharedQueryVariables = Exact<{ [key: string]: never; }>;


export type SharedQuery = (
  { __typename?: 'Query' }
  & SharedLayout_QueryFragment
);

export type SharedLayout_QueryFragment = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & SharedLayout_UserFragment
  )> }
);

export type SharedLayout_UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'username' | 'avatarUrl' | 'isAdmin' | 'isVerified'>
);

export type UnlinkUserAuthenticationMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type UnlinkUserAuthenticationMutation = (
  { __typename?: 'Mutation' }
  & { deleteUserAuthentication?: Maybe<(
    { __typename?: 'DeleteUserAuthenticationPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
      & { userAuthenticationsList: Array<(
        { __typename?: 'UserAuthentication' }
        & Pick<UserAuthentication, 'id' | 'identifier' | 'service' | 'createdAt'>
      )> }
    )> }
  )> }
);

export type UpdateCommentMutationVariables = Exact<{
  id: Scalars['Int'];
  content: Scalars['String'];
  image?: Maybe<Scalars['String']>;
}>;


export type UpdateCommentMutation = (
  { __typename?: 'Mutation' }
  & { updateComment?: Maybe<(
    { __typename?: 'UpdateCommentPayload' }
    & { comment?: Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'authorName' | 'content' | 'image' | 'parentId' | 'createdAt'>
      & { user?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'username'>
      )> }
    )> }
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['UUID'];
  patch: UserPatch;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename?: 'UpdateUserPayload' }
    & Pick<UpdateUserPayload, 'clientMutationId'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'username'>
    )> }
  )> }
);

export type VerifyEmailMutationVariables = Exact<{
  id: Scalars['UUID'];
  token: Scalars['String'];
}>;


export type VerifyEmailMutation = (
  { __typename?: 'Mutation' }
  & { verifyEmail?: Maybe<(
    { __typename?: 'VerifyEmailPayload' }
    & Pick<VerifyEmailPayload, 'success'>
    & { query?: Maybe<(
      { __typename?: 'Query' }
      & { currentUser?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'isVerified'>
      )> }
    )> }
  )> }
);

export const EmailsForm_UserEmailFragmentDoc = gql`
    fragment EmailsForm_UserEmail on UserEmail {
  id
  email
  isVerified
  isPrimary
  createdAt
}
    `;
export const EmailsForm_UserFragmentDoc = gql`
    fragment EmailsForm_User on User {
  id
  userEmails(first: 50) {
    nodes {
      ...EmailsForm_UserEmail
      id
      email
      isVerified
    }
  }
}
    ${EmailsForm_UserEmailFragmentDoc}`;
export const HomePage_ConfessionFragmentDoc = gql`
    fragment HomePage_Confession on Confession {
  id
  slug
  title
  image
  createdAt
  totalReaction
  comments {
    totalCount
  }
  userConfessionReactions {
    nodes {
      reactType
    }
  }
  confessionCategories {
    nodes {
      category {
        slug
        image
      }
    }
  }
}
    `;
export const ProfileSettingsForm_UserFragmentDoc = gql`
    fragment ProfileSettingsForm_User on User {
  id
  name
  username
  avatarUrl
}
    `;
export const SharedLayout_UserFragmentDoc = gql`
    fragment SharedLayout_User on User {
  id
  name
  username
  avatarUrl
  isAdmin
  isVerified
}
    `;
export const SharedLayout_QueryFragmentDoc = gql`
    fragment SharedLayout_Query on Query {
  currentUser {
    id
    ...SharedLayout_User
  }
}
    ${SharedLayout_UserFragmentDoc}`;
export const AddEmailDocument = gql`
    mutation AddEmail($email: String!) {
  createUserEmail(input: {userEmail: {email: $email}}) {
    user {
      id
      userEmails(first: 50) {
        nodes {
          id
          ...EmailsForm_UserEmail
        }
      }
    }
  }
}
    ${EmailsForm_UserEmailFragmentDoc}`;
export type AddEmailMutationFn = Apollo.MutationFunction<AddEmailMutation, AddEmailMutationVariables>;

/**
 * __useAddEmailMutation__
 *
 * To run a mutation, you first call `useAddEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEmailMutation, { data, loading, error }] = useAddEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAddEmailMutation(baseOptions?: Apollo.MutationHookOptions<AddEmailMutation, AddEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddEmailMutation, AddEmailMutationVariables>(AddEmailDocument, options);
      }
export type AddEmailMutationHookResult = ReturnType<typeof useAddEmailMutation>;
export type AddEmailMutationResult = Apollo.MutationResult<AddEmailMutation>;
export type AddEmailMutationOptions = Apollo.BaseMutationOptions<AddEmailMutation, AddEmailMutationVariables>;
export const AllCategoriesPageDocument = gql`
    query AllCategoriesPage {
  categories(first: 500) {
    nodes {
      id
      image
      name
      slug
      confessionCategories {
        totalCount
      }
    }
  }
}
    `;

/**
 * __useAllCategoriesPageQuery__
 *
 * To run a query within a React component, call `useAllCategoriesPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCategoriesPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCategoriesPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllCategoriesPageQuery(baseOptions?: Apollo.QueryHookOptions<AllCategoriesPageQuery, AllCategoriesPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllCategoriesPageQuery, AllCategoriesPageQueryVariables>(AllCategoriesPageDocument, options);
      }
export function useAllCategoriesPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCategoriesPageQuery, AllCategoriesPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllCategoriesPageQuery, AllCategoriesPageQueryVariables>(AllCategoriesPageDocument, options);
        }
export type AllCategoriesPageQueryHookResult = ReturnType<typeof useAllCategoriesPageQuery>;
export type AllCategoriesPageLazyQueryHookResult = ReturnType<typeof useAllCategoriesPageLazyQuery>;
export type AllCategoriesPageQueryResult = Apollo.QueryResult<AllCategoriesPageQuery, AllCategoriesPageQueryVariables>;
export const CatDetailPageDocument = gql`
    query CatDetailPage($slug: String!) {
  categoryBySlug(slug: $slug) {
    image
    slug
  }
}
    `;

/**
 * __useCatDetailPageQuery__
 *
 * To run a query within a React component, call `useCatDetailPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCatDetailPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCatDetailPageQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useCatDetailPageQuery(baseOptions: Apollo.QueryHookOptions<CatDetailPageQuery, CatDetailPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CatDetailPageQuery, CatDetailPageQueryVariables>(CatDetailPageDocument, options);
      }
export function useCatDetailPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CatDetailPageQuery, CatDetailPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CatDetailPageQuery, CatDetailPageQueryVariables>(CatDetailPageDocument, options);
        }
export type CatDetailPageQueryHookResult = ReturnType<typeof useCatDetailPageQuery>;
export type CatDetailPageLazyQueryHookResult = ReturnType<typeof useCatDetailPageLazyQuery>;
export type CatDetailPageQueryResult = Apollo.QueryResult<CatDetailPageQuery, CatDetailPageQueryVariables>;
export const CfsDetailPageDocument = gql`
    query CfsDetailPage($slug: String!) {
  confessionBySlug(slug: $slug) {
    id
    image
    slug
    title
    createdAt
    content
    totalReaction
    userConfessionReactions {
      nodes {
        reactType
      }
    }
    user {
      username
    }
    comments(first: 500, orderBy: ID_DESC) {
      nodes {
        id
        authorName
        content
        image
        parentId
        createdAt
        user {
          username
        }
      }
      totalCount
    }
    confessionCategories(first: 1) {
      nodes {
        category {
          image
          slug
        }
      }
    }
  }
}
    `;

/**
 * __useCfsDetailPageQuery__
 *
 * To run a query within a React component, call `useCfsDetailPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCfsDetailPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCfsDetailPageQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useCfsDetailPageQuery(baseOptions: Apollo.QueryHookOptions<CfsDetailPageQuery, CfsDetailPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CfsDetailPageQuery, CfsDetailPageQueryVariables>(CfsDetailPageDocument, options);
      }
export function useCfsDetailPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CfsDetailPageQuery, CfsDetailPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CfsDetailPageQuery, CfsDetailPageQueryVariables>(CfsDetailPageDocument, options);
        }
export type CfsDetailPageQueryHookResult = ReturnType<typeof useCfsDetailPageQuery>;
export type CfsDetailPageLazyQueryHookResult = ReturnType<typeof useCfsDetailPageLazyQuery>;
export type CfsDetailPageQueryResult = Apollo.QueryResult<CfsDetailPageQuery, CfsDetailPageQueryVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
  changePassword(input: {oldPassword: $oldPassword, newPassword: $newPassword}) {
    success
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      oldPassword: // value for 'oldPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ConfirmAccountDeletionDocument = gql`
    mutation ConfirmAccountDeletion($token: String!) {
  confirmAccountDeletion(input: {token: $token}) {
    success
  }
}
    `;
export type ConfirmAccountDeletionMutationFn = Apollo.MutationFunction<ConfirmAccountDeletionMutation, ConfirmAccountDeletionMutationVariables>;

/**
 * __useConfirmAccountDeletionMutation__
 *
 * To run a mutation, you first call `useConfirmAccountDeletionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmAccountDeletionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmAccountDeletionMutation, { data, loading, error }] = useConfirmAccountDeletionMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmAccountDeletionMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmAccountDeletionMutation, ConfirmAccountDeletionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmAccountDeletionMutation, ConfirmAccountDeletionMutationVariables>(ConfirmAccountDeletionDocument, options);
      }
export type ConfirmAccountDeletionMutationHookResult = ReturnType<typeof useConfirmAccountDeletionMutation>;
export type ConfirmAccountDeletionMutationResult = Apollo.MutationResult<ConfirmAccountDeletionMutation>;
export type ConfirmAccountDeletionMutationOptions = Apollo.BaseMutationOptions<ConfirmAccountDeletionMutation, ConfirmAccountDeletionMutationVariables>;
export const CreateCfsDocument = gql`
    mutation CreateCfs($title: String!, $content: String!, $slug: String!, $catId: Int!, $image: String = "") {
  createCfs(
    input: {title: $title, content: $content, slug: $slug, catId: $catId, image: $image}
  ) {
    confession {
      content
      id
      createdAt
      image
      slug
      title
    }
  }
}
    `;
export type CreateCfsMutationFn = Apollo.MutationFunction<CreateCfsMutation, CreateCfsMutationVariables>;

/**
 * __useCreateCfsMutation__
 *
 * To run a mutation, you first call `useCreateCfsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCfsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCfsMutation, { data, loading, error }] = useCreateCfsMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      slug: // value for 'slug'
 *      catId: // value for 'catId'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreateCfsMutation(baseOptions?: Apollo.MutationHookOptions<CreateCfsMutation, CreateCfsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCfsMutation, CreateCfsMutationVariables>(CreateCfsDocument, options);
      }
export type CreateCfsMutationHookResult = ReturnType<typeof useCreateCfsMutation>;
export type CreateCfsMutationResult = Apollo.MutationResult<CreateCfsMutation>;
export type CreateCfsMutationOptions = Apollo.BaseMutationOptions<CreateCfsMutation, CreateCfsMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($confessionId: Int!, $content: String!, $parentId: Int) {
  createComment(
    input: {comment: {confessionId: $confessionId, content: $content, parentId: $parentId}}
  ) {
    comment {
      id
      authorName
      content
      image
      parentId
      createdAt
      user {
        username
      }
    }
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      confessionId: // value for 'confessionId'
 *      content: // value for 'content'
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateOrUpdateConfessionReactionDocument = gql`
    mutation CreateOrUpdateConfessionReaction($confessionId: Int!, $reactType: ReactionType!) {
  createOrUpdateConfessionReaction(
    input: {confessionId: $confessionId, reactType: $reactType}
  ) {
    confession {
      id
      totalReaction
    }
  }
}
    `;
export type CreateOrUpdateConfessionReactionMutationFn = Apollo.MutationFunction<CreateOrUpdateConfessionReactionMutation, CreateOrUpdateConfessionReactionMutationVariables>;

/**
 * __useCreateOrUpdateConfessionReactionMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateConfessionReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateConfessionReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateConfessionReactionMutation, { data, loading, error }] = useCreateOrUpdateConfessionReactionMutation({
 *   variables: {
 *      confessionId: // value for 'confessionId'
 *      reactType: // value for 'reactType'
 *   },
 * });
 */
export function useCreateOrUpdateConfessionReactionMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateConfessionReactionMutation, CreateOrUpdateConfessionReactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrUpdateConfessionReactionMutation, CreateOrUpdateConfessionReactionMutationVariables>(CreateOrUpdateConfessionReactionDocument, options);
      }
export type CreateOrUpdateConfessionReactionMutationHookResult = ReturnType<typeof useCreateOrUpdateConfessionReactionMutation>;
export type CreateOrUpdateConfessionReactionMutationResult = Apollo.MutationResult<CreateOrUpdateConfessionReactionMutation>;
export type CreateOrUpdateConfessionReactionMutationOptions = Apollo.BaseMutationOptions<CreateOrUpdateConfessionReactionMutation, CreateOrUpdateConfessionReactionMutationVariables>;
export const CurrentUserAuthenticationsDocument = gql`
    query CurrentUserAuthentications {
  currentUser {
    id
    authentications: userAuthenticationsList(first: 50) {
      id
      service
      identifier
      createdAt
    }
  }
}
    `;

/**
 * __useCurrentUserAuthenticationsQuery__
 *
 * To run a query within a React component, call `useCurrentUserAuthenticationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserAuthenticationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserAuthenticationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserAuthenticationsQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserAuthenticationsQuery, CurrentUserAuthenticationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserAuthenticationsQuery, CurrentUserAuthenticationsQueryVariables>(CurrentUserAuthenticationsDocument, options);
      }
export function useCurrentUserAuthenticationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserAuthenticationsQuery, CurrentUserAuthenticationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserAuthenticationsQuery, CurrentUserAuthenticationsQueryVariables>(CurrentUserAuthenticationsDocument, options);
        }
export type CurrentUserAuthenticationsQueryHookResult = ReturnType<typeof useCurrentUserAuthenticationsQuery>;
export type CurrentUserAuthenticationsLazyQueryHookResult = ReturnType<typeof useCurrentUserAuthenticationsLazyQuery>;
export type CurrentUserAuthenticationsQueryResult = Apollo.QueryResult<CurrentUserAuthenticationsQuery, CurrentUserAuthenticationsQueryVariables>;
export const CurrentUserUpdatedDocument = gql`
    subscription CurrentUserUpdated {
  currentUserUpdated {
    event
    user {
      id
      username
      name
      avatarUrl
      isAdmin
      isVerified
    }
  }
}
    `;

/**
 * __useCurrentUserUpdatedSubscription__
 *
 * To run a query within a React component, call `useCurrentUserUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserUpdatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<CurrentUserUpdatedSubscription, CurrentUserUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CurrentUserUpdatedSubscription, CurrentUserUpdatedSubscriptionVariables>(CurrentUserUpdatedDocument, options);
      }
export type CurrentUserUpdatedSubscriptionHookResult = ReturnType<typeof useCurrentUserUpdatedSubscription>;
export type CurrentUserUpdatedSubscriptionResult = Apollo.SubscriptionResult<CurrentUserUpdatedSubscription>;
export const DeleteEmailDocument = gql`
    mutation DeleteEmail($emailId: UUID!) {
  deleteUserEmail(input: {id: $emailId}) {
    user {
      id
      userEmails(first: 50) {
        nodes {
          id
          ...EmailsForm_UserEmail
        }
      }
    }
  }
}
    ${EmailsForm_UserEmailFragmentDoc}`;
export type DeleteEmailMutationFn = Apollo.MutationFunction<DeleteEmailMutation, DeleteEmailMutationVariables>;

/**
 * __useDeleteEmailMutation__
 *
 * To run a mutation, you first call `useDeleteEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEmailMutation, { data, loading, error }] = useDeleteEmailMutation({
 *   variables: {
 *      emailId: // value for 'emailId'
 *   },
 * });
 */
export function useDeleteEmailMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEmailMutation, DeleteEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEmailMutation, DeleteEmailMutationVariables>(DeleteEmailDocument, options);
      }
export type DeleteEmailMutationHookResult = ReturnType<typeof useDeleteEmailMutation>;
export type DeleteEmailMutationResult = Apollo.MutationResult<DeleteEmailMutation>;
export type DeleteEmailMutationOptions = Apollo.BaseMutationOptions<DeleteEmailMutation, DeleteEmailMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(input: {email: $email}) {
    clientMutationId
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  categories {
    nodes {
      id
      name
    }
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCfsByCatSlugDocument = gql`
    query GetCfsByCatSlug($catSlug: String!, $offset: Int!) {
  getCfsByCatSlug(catSlug: $catSlug, offset: $offset, first: 10) {
    nodes {
      ...HomePage_Confession
    }
  }
}
    ${HomePage_ConfessionFragmentDoc}`;

/**
 * __useGetCfsByCatSlugQuery__
 *
 * To run a query within a React component, call `useGetCfsByCatSlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCfsByCatSlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCfsByCatSlugQuery({
 *   variables: {
 *      catSlug: // value for 'catSlug'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetCfsByCatSlugQuery(baseOptions: Apollo.QueryHookOptions<GetCfsByCatSlugQuery, GetCfsByCatSlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCfsByCatSlugQuery, GetCfsByCatSlugQueryVariables>(GetCfsByCatSlugDocument, options);
      }
export function useGetCfsByCatSlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCfsByCatSlugQuery, GetCfsByCatSlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCfsByCatSlugQuery, GetCfsByCatSlugQueryVariables>(GetCfsByCatSlugDocument, options);
        }
export type GetCfsByCatSlugQueryHookResult = ReturnType<typeof useGetCfsByCatSlugQuery>;
export type GetCfsByCatSlugLazyQueryHookResult = ReturnType<typeof useGetCfsByCatSlugLazyQuery>;
export type GetCfsByCatSlugQueryResult = Apollo.QueryResult<GetCfsByCatSlugQuery, GetCfsByCatSlugQueryVariables>;
export const HomePageDocument = gql`
    query HomePage($offset: Int = 0, $catId: Int = 0) {
  getCfsByCat(catId: $catId, offset: $offset, first: 10) {
    nodes {
      ...HomePage_Confession
    }
  }
}
    ${HomePage_ConfessionFragmentDoc}`;

/**
 * __useHomePageQuery__
 *
 * To run a query within a React component, call `useHomePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomePageQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      catId: // value for 'catId'
 *   },
 * });
 */
export function useHomePageQuery(baseOptions?: Apollo.QueryHookOptions<HomePageQuery, HomePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomePageQuery, HomePageQueryVariables>(HomePageDocument, options);
      }
export function useHomePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomePageQuery, HomePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomePageQuery, HomePageQueryVariables>(HomePageDocument, options);
        }
export type HomePageQueryHookResult = ReturnType<typeof useHomePageQuery>;
export type HomePageLazyQueryHookResult = ReturnType<typeof useHomePageLazyQuery>;
export type HomePageQueryResult = Apollo.QueryResult<HomePageQuery, HomePageQueryVariables>;
export const HomePageAllCategoriesDocument = gql`
    query HomePageAllCategories {
  categories {
    nodes {
      id
      name
    }
  }
}
    `;

/**
 * __useHomePageAllCategoriesQuery__
 *
 * To run a query within a React component, call `useHomePageAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomePageAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomePageAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomePageAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<HomePageAllCategoriesQuery, HomePageAllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomePageAllCategoriesQuery, HomePageAllCategoriesQueryVariables>(HomePageAllCategoriesDocument, options);
      }
export function useHomePageAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomePageAllCategoriesQuery, HomePageAllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomePageAllCategoriesQuery, HomePageAllCategoriesQueryVariables>(HomePageAllCategoriesDocument, options);
        }
export type HomePageAllCategoriesQueryHookResult = ReturnType<typeof useHomePageAllCategoriesQuery>;
export type HomePageAllCategoriesLazyQueryHookResult = ReturnType<typeof useHomePageAllCategoriesLazyQuery>;
export type HomePageAllCategoriesQueryResult = Apollo.QueryResult<HomePageAllCategoriesQuery, HomePageAllCategoriesQueryVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(input: {username: $username, password: $password}) {
    user {
      id
      username
      name
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    success
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MakeEmailPrimaryDocument = gql`
    mutation MakeEmailPrimary($emailId: UUID!) {
  makeEmailPrimary(input: {emailId: $emailId}) {
    user {
      id
      userEmails(first: 50) {
        nodes {
          id
          isPrimary
        }
      }
    }
  }
}
    `;
export type MakeEmailPrimaryMutationFn = Apollo.MutationFunction<MakeEmailPrimaryMutation, MakeEmailPrimaryMutationVariables>;

/**
 * __useMakeEmailPrimaryMutation__
 *
 * To run a mutation, you first call `useMakeEmailPrimaryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeEmailPrimaryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeEmailPrimaryMutation, { data, loading, error }] = useMakeEmailPrimaryMutation({
 *   variables: {
 *      emailId: // value for 'emailId'
 *   },
 * });
 */
export function useMakeEmailPrimaryMutation(baseOptions?: Apollo.MutationHookOptions<MakeEmailPrimaryMutation, MakeEmailPrimaryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeEmailPrimaryMutation, MakeEmailPrimaryMutationVariables>(MakeEmailPrimaryDocument, options);
      }
export type MakeEmailPrimaryMutationHookResult = ReturnType<typeof useMakeEmailPrimaryMutation>;
export type MakeEmailPrimaryMutationResult = Apollo.MutationResult<MakeEmailPrimaryMutation>;
export type MakeEmailPrimaryMutationOptions = Apollo.BaseMutationOptions<MakeEmailPrimaryMutation, MakeEmailPrimaryMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $email: String!, $name: String) {
  register(
    input: {username: $username, password: $password, email: $email, name: $name}
  ) {
    user {
      id
      username
      name
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RequestAccountDeletionDocument = gql`
    mutation RequestAccountDeletion {
  requestAccountDeletion(input: {}) {
    success
  }
}
    `;
export type RequestAccountDeletionMutationFn = Apollo.MutationFunction<RequestAccountDeletionMutation, RequestAccountDeletionMutationVariables>;

/**
 * __useRequestAccountDeletionMutation__
 *
 * To run a mutation, you first call `useRequestAccountDeletionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestAccountDeletionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestAccountDeletionMutation, { data, loading, error }] = useRequestAccountDeletionMutation({
 *   variables: {
 *   },
 * });
 */
export function useRequestAccountDeletionMutation(baseOptions?: Apollo.MutationHookOptions<RequestAccountDeletionMutation, RequestAccountDeletionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestAccountDeletionMutation, RequestAccountDeletionMutationVariables>(RequestAccountDeletionDocument, options);
      }
export type RequestAccountDeletionMutationHookResult = ReturnType<typeof useRequestAccountDeletionMutation>;
export type RequestAccountDeletionMutationResult = Apollo.MutationResult<RequestAccountDeletionMutation>;
export type RequestAccountDeletionMutationOptions = Apollo.BaseMutationOptions<RequestAccountDeletionMutation, RequestAccountDeletionMutationVariables>;
export const ResendEmailVerificationDocument = gql`
    mutation ResendEmailVerification($emailId: UUID!) {
  resendEmailVerificationCode(input: {emailId: $emailId}) {
    success
  }
}
    `;
export type ResendEmailVerificationMutationFn = Apollo.MutationFunction<ResendEmailVerificationMutation, ResendEmailVerificationMutationVariables>;

/**
 * __useResendEmailVerificationMutation__
 *
 * To run a mutation, you first call `useResendEmailVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendEmailVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendEmailVerificationMutation, { data, loading, error }] = useResendEmailVerificationMutation({
 *   variables: {
 *      emailId: // value for 'emailId'
 *   },
 * });
 */
export function useResendEmailVerificationMutation(baseOptions?: Apollo.MutationHookOptions<ResendEmailVerificationMutation, ResendEmailVerificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendEmailVerificationMutation, ResendEmailVerificationMutationVariables>(ResendEmailVerificationDocument, options);
      }
export type ResendEmailVerificationMutationHookResult = ReturnType<typeof useResendEmailVerificationMutation>;
export type ResendEmailVerificationMutationResult = Apollo.MutationResult<ResendEmailVerificationMutation>;
export type ResendEmailVerificationMutationOptions = Apollo.BaseMutationOptions<ResendEmailVerificationMutation, ResendEmailVerificationMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($userId: UUID!, $token: String!, $password: String!) {
  resetPassword(
    input: {userId: $userId, resetToken: $token, newPassword: $password}
  ) {
    success
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      token: // value for 'token'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SettingsEmailsDocument = gql`
    query SettingsEmails {
  ...SharedLayout_Query
  currentUser {
    id
    isVerified
    ...EmailsForm_User
  }
}
    ${SharedLayout_QueryFragmentDoc}
${EmailsForm_UserFragmentDoc}`;

/**
 * __useSettingsEmailsQuery__
 *
 * To run a query within a React component, call `useSettingsEmailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingsEmailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingsEmailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSettingsEmailsQuery(baseOptions?: Apollo.QueryHookOptions<SettingsEmailsQuery, SettingsEmailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SettingsEmailsQuery, SettingsEmailsQueryVariables>(SettingsEmailsDocument, options);
      }
export function useSettingsEmailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingsEmailsQuery, SettingsEmailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SettingsEmailsQuery, SettingsEmailsQueryVariables>(SettingsEmailsDocument, options);
        }
export type SettingsEmailsQueryHookResult = ReturnType<typeof useSettingsEmailsQuery>;
export type SettingsEmailsLazyQueryHookResult = ReturnType<typeof useSettingsEmailsLazyQuery>;
export type SettingsEmailsQueryResult = Apollo.QueryResult<SettingsEmailsQuery, SettingsEmailsQueryVariables>;
export const SettingsPasswordDocument = gql`
    query SettingsPassword {
  currentUser {
    id
    hasPassword
    userEmails(first: 1, condition: {isPrimary: true}) {
      nodes {
        id
        email
      }
    }
  }
}
    `;

/**
 * __useSettingsPasswordQuery__
 *
 * To run a query within a React component, call `useSettingsPasswordQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingsPasswordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingsPasswordQuery({
 *   variables: {
 *   },
 * });
 */
export function useSettingsPasswordQuery(baseOptions?: Apollo.QueryHookOptions<SettingsPasswordQuery, SettingsPasswordQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SettingsPasswordQuery, SettingsPasswordQueryVariables>(SettingsPasswordDocument, options);
      }
export function useSettingsPasswordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingsPasswordQuery, SettingsPasswordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SettingsPasswordQuery, SettingsPasswordQueryVariables>(SettingsPasswordDocument, options);
        }
export type SettingsPasswordQueryHookResult = ReturnType<typeof useSettingsPasswordQuery>;
export type SettingsPasswordLazyQueryHookResult = ReturnType<typeof useSettingsPasswordLazyQuery>;
export type SettingsPasswordQueryResult = Apollo.QueryResult<SettingsPasswordQuery, SettingsPasswordQueryVariables>;
export const SettingsProfileDocument = gql`
    query SettingsProfile {
  ...SharedLayout_Query
  currentUser {
    id
    ...ProfileSettingsForm_User
  }
}
    ${SharedLayout_QueryFragmentDoc}
${ProfileSettingsForm_UserFragmentDoc}`;

/**
 * __useSettingsProfileQuery__
 *
 * To run a query within a React component, call `useSettingsProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingsProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingsProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useSettingsProfileQuery(baseOptions?: Apollo.QueryHookOptions<SettingsProfileQuery, SettingsProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SettingsProfileQuery, SettingsProfileQueryVariables>(SettingsProfileDocument, options);
      }
export function useSettingsProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingsProfileQuery, SettingsProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SettingsProfileQuery, SettingsProfileQueryVariables>(SettingsProfileDocument, options);
        }
export type SettingsProfileQueryHookResult = ReturnType<typeof useSettingsProfileQuery>;
export type SettingsProfileLazyQueryHookResult = ReturnType<typeof useSettingsProfileLazyQuery>;
export type SettingsProfileQueryResult = Apollo.QueryResult<SettingsProfileQuery, SettingsProfileQueryVariables>;
export const SharedDocument = gql`
    query Shared {
  ...SharedLayout_Query
}
    ${SharedLayout_QueryFragmentDoc}`;

/**
 * __useSharedQuery__
 *
 * To run a query within a React component, call `useSharedQuery` and pass it any options that fit your needs.
 * When your component renders, `useSharedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSharedQuery({
 *   variables: {
 *   },
 * });
 */
export function useSharedQuery(baseOptions?: Apollo.QueryHookOptions<SharedQuery, SharedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SharedQuery, SharedQueryVariables>(SharedDocument, options);
      }
export function useSharedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SharedQuery, SharedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SharedQuery, SharedQueryVariables>(SharedDocument, options);
        }
export type SharedQueryHookResult = ReturnType<typeof useSharedQuery>;
export type SharedLazyQueryHookResult = ReturnType<typeof useSharedLazyQuery>;
export type SharedQueryResult = Apollo.QueryResult<SharedQuery, SharedQueryVariables>;
export const UnlinkUserAuthenticationDocument = gql`
    mutation UnlinkUserAuthentication($id: UUID!) {
  deleteUserAuthentication(input: {id: $id}) {
    user {
      id
      userAuthenticationsList(first: 50) {
        id
        identifier
        service
        createdAt
      }
    }
  }
}
    `;
export type UnlinkUserAuthenticationMutationFn = Apollo.MutationFunction<UnlinkUserAuthenticationMutation, UnlinkUserAuthenticationMutationVariables>;

/**
 * __useUnlinkUserAuthenticationMutation__
 *
 * To run a mutation, you first call `useUnlinkUserAuthenticationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlinkUserAuthenticationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlinkUserAuthenticationMutation, { data, loading, error }] = useUnlinkUserAuthenticationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnlinkUserAuthenticationMutation(baseOptions?: Apollo.MutationHookOptions<UnlinkUserAuthenticationMutation, UnlinkUserAuthenticationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnlinkUserAuthenticationMutation, UnlinkUserAuthenticationMutationVariables>(UnlinkUserAuthenticationDocument, options);
      }
export type UnlinkUserAuthenticationMutationHookResult = ReturnType<typeof useUnlinkUserAuthenticationMutation>;
export type UnlinkUserAuthenticationMutationResult = Apollo.MutationResult<UnlinkUserAuthenticationMutation>;
export type UnlinkUserAuthenticationMutationOptions = Apollo.BaseMutationOptions<UnlinkUserAuthenticationMutation, UnlinkUserAuthenticationMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation UpdateComment($id: Int!, $content: String!, $image: String) {
  updateComment(input: {patch: {content: $content, image: $image}, id: $id}) {
    comment {
      id
      authorName
      content
      image
      parentId
      createdAt
      user {
        username
      }
    }
  }
}
    `;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      content: // value for 'content'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, options);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: UUID!, $patch: UserPatch!) {
  updateUser(input: {id: $id, patch: $patch}) {
    clientMutationId
    user {
      id
      name
      username
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      patch: // value for 'patch'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const VerifyEmailDocument = gql`
    mutation VerifyEmail($id: UUID!, $token: String!) {
  verifyEmail(input: {userEmailId: $id, token: $token}) {
    success
    query {
      currentUser {
        id
        isVerified
      }
    }
  }
}
    `;
export type VerifyEmailMutationFn = Apollo.MutationFunction<VerifyEmailMutation, VerifyEmailMutationVariables>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      id: // value for 'id'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyEmailMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEmailMutation, VerifyEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument, options);
      }
export type VerifyEmailMutationHookResult = ReturnType<typeof useVerifyEmailMutation>;
export type VerifyEmailMutationResult = Apollo.MutationResult<VerifyEmailMutation>;
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<VerifyEmailMutation, VerifyEmailMutationVariables>;