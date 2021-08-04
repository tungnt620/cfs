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

/** All input for the `acceptInvitationToOrganization` mutation. */
export type AcceptInvitationToOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  invitationId: Scalars['UUID'];
};

/** The output of our `acceptInvitationToOrganization` mutation. */
export type AcceptInvitationToOrganizationPayload = {
  __typename?: 'AcceptInvitationToOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
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

/** All input for the `createOrganization` mutation. */
export type CreateOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  slug: Scalars['String'];
};

/** The output of our `createOrganization` mutation. */
export type CreateOrganizationPayload = {
  __typename?: 'CreateOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `createOrganization` mutation. */
export type CreateOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: Maybe<Array<OrganizationsOrderBy>>;
};

/** All input for the create `Post` mutation. */
export type CreatePostInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Post` to be created by this mutation. */
  post: PostInput;
};

/** The output of our create `Post` mutation. */
export type CreatePostPayload = {
  __typename?: 'CreatePostPayload';
  /** Reads a single `User` that is related to this `Post`. */
  author?: Maybe<User>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Post` that was created by this mutation. */
  post?: Maybe<Post>;
  /** An edge for our `Post`. May be used by Relay 1. */
  postEdge?: Maybe<PostsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Post` mutation. */
export type CreatePostPayloadPostEdgeArgs = {
  orderBy?: Maybe<Array<PostsOrderBy>>;
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



/** All input for the `deleteOrganization` mutation. */
export type DeleteOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  organizationId: Scalars['UUID'];
};

/** The output of our `deleteOrganization` mutation. */
export type DeleteOrganizationPayload = {
  __typename?: 'DeleteOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `deletePost` mutation. */
export type DeletePostInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The primary key for the `Post`. */
  id: Scalars['Int'];
};

/** The output of our delete `Post` mutation. */
export type DeletePostPayload = {
  __typename?: 'DeletePostPayload';
  /** Reads a single `User` that is related to this `Post`. */
  author?: Maybe<User>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedPostNodeId?: Maybe<Scalars['ID']>;
  /** The `Post` that was deleted by this mutation. */
  post?: Maybe<Post>;
  /** An edge for our `Post`. May be used by Relay 1. */
  postEdge?: Maybe<PostsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Post` mutation. */
export type DeletePostPayloadPostEdgeArgs = {
  orderBy?: Maybe<Array<PostsOrderBy>>;
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

/** All input for the `inviteToOrganization` mutation. */
export type InviteToOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  organizationId: Scalars['UUID'];
  username?: Maybe<Scalars['String']>;
};

/** The output of our `inviteToOrganization` mutation. */
export type InviteToOrganizationPayload = {
  __typename?: 'InviteToOrganizationPayload';
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
  /** If someone invited you by your email address then you must include the code that was emailed to you, otherwise you may accept the invitation directly using the UUID. If successful, you will be a member of the organization. */
  acceptInvitationToOrganization?: Maybe<AcceptInvitationToOrganizationPayload>;
  /** Enter your old password and a new password to change your password. */
  changePassword?: Maybe<ChangePasswordPayload>;
  /** If you're certain you want to delete your account, use `requestAccountDeletion` to request an account deletion token, and then supply the token through this mutation to complete account deletion. */
  confirmAccountDeletion?: Maybe<ConfirmAccountDeletionPayload>;
  /** An `Organization` is a great way of sharing access to resources between multiple users without compromising security. When you create an organization you will have the 'owner' and 'billing contact' roles. You may invite other users and redistribute these roles. */
  createOrganization?: Maybe<CreateOrganizationPayload>;
  /** Creates a single `Post`. */
  createPost?: Maybe<CreatePostPayload>;
  /** Creates a single `UserEmail`. */
  createUserEmail?: Maybe<CreateUserEmailPayload>;
  /** Only the 'owner' may delete an organization. This operation cannot be undone, so be sure that it is what you intend. */
  deleteOrganization?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `Post` using a unique key. */
  deletePost?: Maybe<DeletePostPayload>;
  /** Deletes a single `UserAuthentication` using a unique key. */
  deleteUserAuthentication?: Maybe<DeleteUserAuthenticationPayload>;
  /** Deletes a single `UserEmail` using a unique key. */
  deleteUserEmail?: Maybe<DeleteUserEmailPayload>;
  /** If you've forgotten your password, give us one of your email addresses and we'll send you a reset token. Note this only works if you have added an email address! */
  forgotPassword?: Maybe<ForgotPasswordPayload>;
  /** You may invite a user to your organization either by their username (only for verified users) or by their email. If you opt to invite by email then an email will be sent to this person containing a code that they need to accept the invitation. If the person doesn't already have an account they will be instructed to create one; their account need not have the email address that you invited listed as the secret code is confirmation enough. */
  inviteToOrganization?: Maybe<InviteToOrganizationPayload>;
  /** Use this mutation to log in to your account; this login uses sessions so you do not need to take further action. */
  login?: Maybe<LoginPayload>;
  /** Use this mutation to logout from your account. Don't forget to clear the client state! */
  logout?: Maybe<LogoutPayload>;
  /** Your primary email is where we'll notify of account events; other emails may be used for discovery or login. Use this when you're changing your email address. */
  makeEmailPrimary?: Maybe<MakeEmailPrimaryPayload>;
  /** Use this mutation to create an account on our system. This may only be used if you are logged out. */
  register?: Maybe<RegisterPayload>;
  /** The owner of an `Organization` may remove an `OrganizationMember` with this mutation. */
  removeFromOrganization?: Maybe<RemoveFromOrganizationPayload>;
  /** Begin the account deletion flow by requesting the confirmation email */
  requestAccountDeletion?: Maybe<RequestAccountDeletionPayload>;
  /** If you didn't receive the verification code for this email, we can resend it. We silently cap the rate of resends on the backend, so calls to this function may not result in another email being sent if it has been called recently. */
  resendEmailVerificationCode?: Maybe<ResendEmailVerificationCodePayload>;
  /** After triggering forgotPassword, you'll be sent a reset token. Combine this with your user ID and a new password to reset your password. */
  resetPassword?: Maybe<ResetPasswordPayload>;
  /** The owner of an `Organization` may use this mutation to make any organization member the billing contact. */
  transferOrganizationBillingContact?: Maybe<TransferOrganizationBillingContactPayload>;
  /** The owner of an `Organization` may use this mutation to transfer ownership to a different organization member. Take care, if you assign ownership to someone who cannot or will not access their account then you may need to contact support to have ownership reassigned. */
  transferOrganizationOwnership?: Maybe<TransferOrganizationOwnershipPayload>;
  /** Updates a single `Organization` using a unique key and a patch. */
  updateOrganization?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `Post` using a unique key and a patch. */
  updatePost?: Maybe<UpdatePostPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Once you have received a verification token for your email, you may call this mutation with that token to make your email verified. */
  verifyEmail?: Maybe<VerifyEmailPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAcceptInvitationToOrganizationArgs = {
  input: AcceptInvitationToOrganizationInput;
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
export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserEmailArgs = {
  input: CreateUserEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationArgs = {
  input: DeleteOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePostArgs = {
  input: DeletePostInput;
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
export type MutationInviteToOrganizationArgs = {
  input: InviteToOrganizationInput;
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
export type MutationRemoveFromOrganizationArgs = {
  input: RemoveFromOrganizationInput;
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
export type MutationTransferOrganizationBillingContactArgs = {
  input: TransferOrganizationBillingContactInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationTransferOrganizationOwnershipArgs = {
  input: TransferOrganizationOwnershipInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationArgs = {
  input: UpdateOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export type Organization = {
  __typename?: 'Organization';
  createdAt: Scalars['Datetime'];
  currentUserIsBillingContact?: Maybe<Scalars['Boolean']>;
  currentUserIsOwner?: Maybe<Scalars['Boolean']>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  /** Reads and enables pagination through a set of `OrganizationMembership`. */
  organizationMemberships: OrganizationMembershipsConnection;
  slug: Scalars['String'];
};


export type OrganizationOrganizationMembershipsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<OrganizationMembershipCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrganizationMembershipsOrderBy>>;
};

/**
 * A condition to be used against `Organization` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type OrganizationCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `slug` field. */
  slug?: Maybe<Scalars['String']>;
};

export type OrganizationMembership = {
  __typename?: 'OrganizationMembership';
  createdAt: Scalars['Datetime'];
  id: Scalars['UUID'];
  isBillingContact: Scalars['Boolean'];
  isOwner: Scalars['Boolean'];
  /** Reads a single `Organization` that is related to this `OrganizationMembership`. */
  organization?: Maybe<Organization>;
  organizationId: Scalars['UUID'];
  /** Reads a single `User` that is related to this `OrganizationMembership`. */
  user?: Maybe<User>;
  userId: Scalars['UUID'];
};

/**
 * A condition to be used against `OrganizationMembership` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type OrganizationMembershipCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['UUID']>;
};

/** A connection to a list of `OrganizationMembership` values. */
export type OrganizationMembershipsConnection = {
  __typename?: 'OrganizationMembershipsConnection';
  /** A list of edges which contains the `OrganizationMembership` and cursor to aid in pagination. */
  edges: Array<OrganizationMembershipsEdge>;
  /** A list of `OrganizationMembership` objects. */
  nodes: Array<OrganizationMembership>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `OrganizationMembership` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `OrganizationMembership` edge in the connection. */
export type OrganizationMembershipsEdge = {
  __typename?: 'OrganizationMembershipsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `OrganizationMembership` at the end of the edge. */
  node: OrganizationMembership;
};

/** Methods to use when ordering `OrganizationMembership`. */
export enum OrganizationMembershipsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  MemberNameAsc = 'MEMBER_NAME_ASC',
  MemberNameDesc = 'MEMBER_NAME_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Represents an update to a `Organization`. Fields that are set will be updated. */
export type OrganizationPatch = {
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Organization` values. */
export type OrganizationsConnection = {
  __typename?: 'OrganizationsConnection';
  /** A list of edges which contains the `Organization` and cursor to aid in pagination. */
  edges: Array<OrganizationsEdge>;
  /** A list of `Organization` objects. */
  nodes: Array<Organization>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Organization` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Organization` edge in the connection. */
export type OrganizationsEdge = {
  __typename?: 'OrganizationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Organization` at the end of the edge. */
  node: Organization;
};

/** Methods to use when ordering `Organization`. */
export enum OrganizationsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC'
}

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

/** A forum post written by a `User`. */
export type Post = {
  __typename?: 'Post';
  /** Reads a single `User` that is related to this `Post`. */
  author?: Maybe<User>;
  /** The id of the author `User`. */
  authorId?: Maybe<Scalars['UUID']>;
  /** The main body text of our `Post`. */
  body?: Maybe<Scalars['String']>;
  /** The time this `Post` was created. */
  createdAt: Scalars['Datetime'];
  /** The title written by the `User`. */
  headline: Scalars['String'];
  /** The primary key for the `Post`. */
  id: Scalars['Int'];
  /** The `Topic` this has been posted in. */
  topic: Scalars['String'];
  /** The time this `Post` was last modified (or created). */
  updatedAt: Scalars['Datetime'];
  /** Reads and enables pagination through a set of `UserFeedPost`. */
  userFeedPosts: UserFeedPostsConnection;
};


/** A forum post written by a `User`. */
export type PostUserFeedPostsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<UserFeedPostCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<UserFeedPostsOrderBy>>;
};

/** A condition to be used against `Post` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PostCondition = {
  /** Checks for equality with the object’s `authorId` field. */
  authorId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `topic` field. */
  topic?: Maybe<Scalars['String']>;
};

/** An input for mutations affecting `Post` */
export type PostInput = {
  /** The main body text of our `Post`. */
  body?: Maybe<Scalars['String']>;
  /** The title written by the `User`. */
  headline: Scalars['String'];
  /** The `Topic` this has been posted in. */
  topic: Scalars['String'];
};

/** Represents an update to a `Post`. Fields that are set will be updated. */
export type PostPatch = {
  /** The main body text of our `Post`. */
  body?: Maybe<Scalars['String']>;
  /** The title written by the `User`. */
  headline?: Maybe<Scalars['String']>;
  /** The `Topic` this has been posted in. */
  topic?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Post` values. */
export type PostsConnection = {
  __typename?: 'PostsConnection';
  /** A list of edges which contains the `Post` and cursor to aid in pagination. */
  edges: Array<PostsEdge>;
  /** A list of `Post` objects. */
  nodes: Array<Post>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Post` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Post` edge in the connection. */
export type PostsEdge = {
  __typename?: 'PostsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Post` at the end of the edge. */
  node: Post;
};

/** Methods to use when ordering `Post`. */
export enum PostsOrderBy {
  AuthorIdAsc = 'AUTHOR_ID_ASC',
  AuthorIdDesc = 'AUTHOR_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TopicAsc = 'TOPIC_ASC',
  TopicDesc = 'TOPIC_DESC'
}

/** The root query type which gives access points into the data universe. */
export type Query = {
  __typename?: 'Query';
  /** The currently logged in user (or null if not logged in). */
  currentUser?: Maybe<User>;
  organization?: Maybe<Organization>;
  organizationBySlug?: Maybe<Organization>;
  /** Given an invitation UUID (and, if required, the code that was emailed to you), retrieves the `Organization` that you were invited to. */
  organizationForInvitation?: Maybe<Organization>;
  organizationMembership?: Maybe<OrganizationMembership>;
  /** Reads and enables pagination through a set of `Organization`. */
  organizations?: Maybe<OrganizationsConnection>;
  post?: Maybe<Post>;
  /** Reads and enables pagination through a set of `Post`. */
  posts?: Maybe<PostsConnection>;
  user?: Maybe<User>;
  userAuthentication?: Maybe<UserAuthentication>;
  userByUsername?: Maybe<User>;
  userEmail?: Maybe<UserEmail>;
  userFeedPost?: Maybe<UserFeedPost>;
  /** Reads and enables pagination through a set of `UserFeedPost`. */
  userFeedPosts?: Maybe<UserFeedPostsConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationBySlugArgs = {
  slug: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationForInvitationArgs = {
  code?: Maybe<Scalars['String']>;
  invitationId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationMembershipArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<OrganizationCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrganizationsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPostArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPostsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<PostCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
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
export type QueryUserEmailArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserFeedPostArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserFeedPostsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<UserFeedPostCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<UserFeedPostsOrderBy>>;
};

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

/** All input for the `removeFromOrganization` mutation. */
export type RemoveFromOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  organizationId: Scalars['UUID'];
  userId: Scalars['UUID'];
};

/** The output of our `removeFromOrganization` mutation. */
export type RemoveFromOrganizationPayload = {
  __typename?: 'RemoveFromOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
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

/** All input for the `transferOrganizationBillingContact` mutation. */
export type TransferOrganizationBillingContactInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  organizationId: Scalars['UUID'];
  userId: Scalars['UUID'];
};

/** The output of our `transferOrganizationBillingContact` mutation. */
export type TransferOrganizationBillingContactPayload = {
  __typename?: 'TransferOrganizationBillingContactPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `transferOrganizationBillingContact` mutation. */
export type TransferOrganizationBillingContactPayloadOrganizationEdgeArgs = {
  orderBy?: Maybe<Array<OrganizationsOrderBy>>;
};

/** All input for the `transferOrganizationOwnership` mutation. */
export type TransferOrganizationOwnershipInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  organizationId: Scalars['UUID'];
  userId: Scalars['UUID'];
};

/** The output of our `transferOrganizationOwnership` mutation. */
export type TransferOrganizationOwnershipPayload = {
  __typename?: 'TransferOrganizationOwnershipPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `transferOrganizationOwnership` mutation. */
export type TransferOrganizationOwnershipPayloadOrganizationEdgeArgs = {
  orderBy?: Maybe<Array<OrganizationsOrderBy>>;
};


/** All input for the `updateOrganization` mutation. */
export type UpdateOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Organization` being updated. */
  patch: OrganizationPatch;
};

/** The output of our update `Organization` mutation. */
export type UpdateOrganizationPayload = {
  __typename?: 'UpdateOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Organization` that was updated by this mutation. */
  organization?: Maybe<Organization>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Organization` mutation. */
export type UpdateOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: Maybe<Array<OrganizationsOrderBy>>;
};

/** All input for the `updatePost` mutation. */
export type UpdatePostInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The primary key for the `Post`. */
  id: Scalars['Int'];
  /** An object where the defined keys will be set on the `Post` being updated. */
  patch: PostPatch;
};

/** The output of our update `Post` mutation. */
export type UpdatePostPayload = {
  __typename?: 'UpdatePostPayload';
  /** Reads a single `User` that is related to this `Post`. */
  author?: Maybe<User>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Post` that was updated by this mutation. */
  post?: Maybe<Post>;
  /** An edge for our `Post`. May be used by Relay 1. */
  postEdge?: Maybe<PostsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Post` mutation. */
export type UpdatePostPayloadPostEdgeArgs = {
  orderBy?: Maybe<Array<PostsOrderBy>>;
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
  /** Reads and enables pagination through a set of `Post`. */
  authoredPosts: PostsConnection;
  /** Optional avatar URL. */
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['Datetime'];
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Unique identifier for the user. */
  id: Scalars['UUID'];
  /** If true, the user has elevated privileges. */
  isAdmin: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  /** Public-facing name (or pseudonym) of the user. */
  name?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `OrganizationMembership`. */
  organizationMemberships: OrganizationMembershipsConnection;
  updatedAt: Scalars['Datetime'];
  /** Reads and enables pagination through a set of `UserAuthentication`. */
  userAuthenticationsList: Array<UserAuthentication>;
  /** Reads and enables pagination through a set of `UserEmail`. */
  userEmails: UserEmailsConnection;
  /** Reads and enables pagination through a set of `UserFeedPost`. */
  userFeedPosts: UserFeedPostsConnection;
  /** Public-facing username (or 'handle') of the user. */
  username: Scalars['String'];
};


/** A user who can log in to the application. */
export type UserAuthoredPostsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<PostCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
};


/** A user who can log in to the application. */
export type UserOrganizationMembershipsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<OrganizationMembershipCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrganizationMembershipsOrderBy>>;
};


/** A user who can log in to the application. */
export type UserUserAuthenticationsListArgs = {
  condition?: Maybe<UserAuthenticationCondition>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<UserAuthenticationsOrderBy>>;
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


/** A user who can log in to the application. */
export type UserUserFeedPostsArgs = {
  after?: Maybe<Scalars['Cursor']>;
  before?: Maybe<Scalars['Cursor']>;
  condition?: Maybe<UserFeedPostCondition>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<UserFeedPostsOrderBy>>;
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

/** A feed of `Post`s relevant to a particular `User`. */
export type UserFeedPost = {
  __typename?: 'UserFeedPost';
  /** The time this feed item was added. */
  createdAt: Scalars['Datetime'];
  /** An identifier for this entry in the feed. */
  id: Scalars['Int'];
  /** Reads a single `Post` that is related to this `UserFeedPost`. */
  post?: Maybe<Post>;
  postId: Scalars['Int'];
  /** Reads a single `User` that is related to this `UserFeedPost`. */
  user?: Maybe<User>;
  userId: Scalars['UUID'];
};

/**
 * A condition to be used against `UserFeedPost` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type UserFeedPostCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `postId` field. */
  postId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['UUID']>;
};

/** A connection to a list of `UserFeedPost` values. */
export type UserFeedPostsConnection = {
  __typename?: 'UserFeedPostsConnection';
  /** A list of edges which contains the `UserFeedPost` and cursor to aid in pagination. */
  edges: Array<UserFeedPostsEdge>;
  /** A list of `UserFeedPost` objects. */
  nodes: Array<UserFeedPost>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserFeedPost` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `UserFeedPost` edge in the connection. */
export type UserFeedPostsEdge = {
  __typename?: 'UserFeedPostsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserFeedPost` at the end of the edge. */
  node: UserFeedPost;
};

/** Methods to use when ordering `UserFeedPost`. */
export enum UserFeedPostsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PostIdAsc = 'POST_ID_ASC',
  PostIdDesc = 'POST_ID_DESC',
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

export type AcceptOrganizationInviteMutationVariables = Exact<{
  id: Scalars['UUID'];
  code?: Maybe<Scalars['String']>;
}>;


export type AcceptOrganizationInviteMutation = (
  { __typename?: 'Mutation' }
  & { acceptInvitationToOrganization?: Maybe<(
    { __typename?: 'AcceptInvitationToOrganizationPayload' }
    & Pick<AcceptInvitationToOrganizationPayload, 'clientMutationId'>
  )> }
);

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

export type CreatedOrganizationFragment = (
  { __typename?: 'Organization' }
  & Pick<Organization, 'id' | 'name' | 'slug'>
);

export type CreateOrganizationMutationVariables = Exact<{
  name: Scalars['String'];
  slug: Scalars['String'];
}>;


export type CreateOrganizationMutation = (
  { __typename?: 'Mutation' }
  & { createOrganization?: Maybe<(
    { __typename?: 'CreateOrganizationPayload' }
    & { organization?: Maybe<(
      { __typename?: 'Organization' }
      & Pick<Organization, 'id'>
      & CreatedOrganizationFragment
    )>, query?: Maybe<(
      { __typename?: 'Query' }
      & { organizationBySlug?: Maybe<(
        { __typename?: 'Organization' }
        & Pick<Organization, 'id'>
        & CreatedOrganizationFragment
      )> }
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

export type DeleteOrganizationMutationVariables = Exact<{
  organizationId: Scalars['UUID'];
}>;


export type DeleteOrganizationMutation = (
  { __typename?: 'Mutation' }
  & { deleteOrganization?: Maybe<(
    { __typename?: 'DeleteOrganizationPayload' }
    & Pick<DeleteOrganizationPayload, 'clientMutationId'>
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

export type InvitationDetailQueryVariables = Exact<{
  id: Scalars['UUID'];
  code?: Maybe<Scalars['String']>;
}>;


export type InvitationDetailQuery = (
  { __typename?: 'Query' }
  & { organizationForInvitation?: Maybe<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'id' | 'name' | 'slug'>
  )> }
  & SharedLayout_QueryFragment
);

export type InviteToOrganizationMutationVariables = Exact<{
  organizationId: Scalars['UUID'];
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
}>;


export type InviteToOrganizationMutation = (
  { __typename?: 'Mutation' }
  & { inviteToOrganization?: Maybe<(
    { __typename?: 'InviteToOrganizationPayload' }
    & Pick<InviteToOrganizationPayload, 'clientMutationId'>
  )> }
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

export type OrganizationBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type OrganizationBySlugQuery = (
  { __typename?: 'Query' }
  & { organizationBySlug?: Maybe<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'id' | 'name' | 'slug'>
  )> }
);

export type OrganizationMembers_MembershipFragment = (
  { __typename?: 'OrganizationMembership' }
  & Pick<OrganizationMembership, 'id' | 'createdAt' | 'isOwner' | 'isBillingContact'>
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'name'>
  )> }
);

export type OrganizationMembers_OrganizationFragment = (
  { __typename?: 'Organization' }
  & Pick<Organization, 'id' | 'name' | 'slug'>
  & { organizationMemberships: (
    { __typename?: 'OrganizationMembershipsConnection' }
    & Pick<OrganizationMembershipsConnection, 'totalCount'>
    & { nodes: Array<(
      { __typename?: 'OrganizationMembership' }
      & Pick<OrganizationMembership, 'id'>
      & OrganizationMembers_MembershipFragment
    )> }
  ) }
  & OrganizationPage_OrganizationFragment
);

export type OrganizationMembersQueryVariables = Exact<{
  slug: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
}>;


export type OrganizationMembersQuery = (
  { __typename?: 'Query' }
  & { organizationBySlug?: Maybe<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'id'>
    & OrganizationMembers_OrganizationFragment
  )> }
  & OrganizationPage_QueryFragment
);

export type OrganizationPageQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type OrganizationPageQuery = (
  { __typename?: 'Query' }
  & OrganizationPage_QueryFragment
);

export type OrganizationPage_OrganizationFragment = (
  { __typename?: 'Organization' }
  & Pick<Organization, 'id' | 'name' | 'slug' | 'currentUserIsOwner' | 'currentUserIsBillingContact'>
);

export type OrganizationPage_QueryFragment = (
  { __typename?: 'Query' }
  & { organizationBySlug?: Maybe<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'id'>
    & OrganizationPage_OrganizationFragment
  )> }
  & SharedLayout_QueryFragment
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

export type RemoveFromOrganizationMutationVariables = Exact<{
  organizationId: Scalars['UUID'];
  userId: Scalars['UUID'];
}>;


export type RemoveFromOrganizationMutation = (
  { __typename?: 'Mutation' }
  & { removeFromOrganization?: Maybe<(
    { __typename?: 'RemoveFromOrganizationPayload' }
    & Pick<RemoveFromOrganizationPayload, 'clientMutationId'>
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
  & { organizationMemberships: (
    { __typename?: 'OrganizationMembershipsConnection' }
    & { nodes: Array<(
      { __typename?: 'OrganizationMembership' }
      & Pick<OrganizationMembership, 'id' | 'isOwner' | 'isBillingContact'>
      & { organization?: Maybe<(
        { __typename?: 'Organization' }
        & Pick<Organization, 'id' | 'name' | 'slug'>
      )> }
    )> }
  ) }
);

export type TransferOrganizationBillingContactMutationVariables = Exact<{
  organizationId: Scalars['UUID'];
  userId: Scalars['UUID'];
}>;


export type TransferOrganizationBillingContactMutation = (
  { __typename?: 'Mutation' }
  & { transferOrganizationBillingContact?: Maybe<(
    { __typename?: 'TransferOrganizationBillingContactPayload' }
    & { organization?: Maybe<(
      { __typename?: 'Organization' }
      & Pick<Organization, 'id' | 'currentUserIsBillingContact'>
    )> }
  )> }
);

export type TransferOrganizationOwnershipMutationVariables = Exact<{
  organizationId: Scalars['UUID'];
  userId: Scalars['UUID'];
}>;


export type TransferOrganizationOwnershipMutation = (
  { __typename?: 'Mutation' }
  & { transferOrganizationOwnership?: Maybe<(
    { __typename?: 'TransferOrganizationOwnershipPayload' }
    & { organization?: Maybe<(
      { __typename?: 'Organization' }
      & Pick<Organization, 'id' | 'currentUserIsOwner'>
    )> }
  )> }
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

export type UpdateOrganizationMutationVariables = Exact<{
  input: UpdateOrganizationInput;
}>;


export type UpdateOrganizationMutation = (
  { __typename?: 'Mutation' }
  & { updateOrganization?: Maybe<(
    { __typename?: 'UpdateOrganizationPayload' }
    & { organization?: Maybe<(
      { __typename?: 'Organization' }
      & Pick<Organization, 'id' | 'slug' | 'name'>
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

export const CreatedOrganizationFragmentDoc = gql`
    fragment CreatedOrganization on Organization {
  id
  name
  slug
}
    `;
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
export const OrganizationPage_OrganizationFragmentDoc = gql`
    fragment OrganizationPage_Organization on Organization {
  id
  name
  slug
  currentUserIsOwner
  currentUserIsBillingContact
}
    `;
export const OrganizationMembers_MembershipFragmentDoc = gql`
    fragment OrganizationMembers_Membership on OrganizationMembership {
  id
  createdAt
  isOwner
  isBillingContact
  user {
    id
    username
    name
  }
}
    `;
export const OrganizationMembers_OrganizationFragmentDoc = gql`
    fragment OrganizationMembers_Organization on Organization {
  id
  ...OrganizationPage_Organization
  name
  slug
  organizationMemberships(first: 10, offset: $offset, orderBy: [MEMBER_NAME_ASC]) {
    nodes {
      id
      ...OrganizationMembers_Membership
    }
    totalCount
  }
}
    ${OrganizationPage_OrganizationFragmentDoc}
${OrganizationMembers_MembershipFragmentDoc}`;
export const SharedLayout_UserFragmentDoc = gql`
    fragment SharedLayout_User on User {
  id
  name
  username
  avatarUrl
  isAdmin
  isVerified
  organizationMemberships(first: 20) {
    nodes {
      id
      isOwner
      isBillingContact
      organization {
        id
        name
        slug
      }
    }
  }
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
export const OrganizationPage_QueryFragmentDoc = gql`
    fragment OrganizationPage_Query on Query {
  ...SharedLayout_Query
  organizationBySlug(slug: $slug) {
    id
    ...OrganizationPage_Organization
  }
}
    ${SharedLayout_QueryFragmentDoc}
${OrganizationPage_OrganizationFragmentDoc}`;
export const ProfileSettingsForm_UserFragmentDoc = gql`
    fragment ProfileSettingsForm_User on User {
  id
  name
  username
  avatarUrl
}
    `;
export const AcceptOrganizationInviteDocument = gql`
    mutation AcceptOrganizationInvite($id: UUID!, $code: String) {
  acceptInvitationToOrganization(input: {invitationId: $id, code: $code}) {
    clientMutationId
  }
}
    `;
export type AcceptOrganizationInviteMutationFn = Apollo.MutationFunction<AcceptOrganizationInviteMutation, AcceptOrganizationInviteMutationVariables>;

/**
 * __useAcceptOrganizationInviteMutation__
 *
 * To run a mutation, you first call `useAcceptOrganizationInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptOrganizationInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptOrganizationInviteMutation, { data, loading, error }] = useAcceptOrganizationInviteMutation({
 *   variables: {
 *      id: // value for 'id'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useAcceptOrganizationInviteMutation(baseOptions?: Apollo.MutationHookOptions<AcceptOrganizationInviteMutation, AcceptOrganizationInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptOrganizationInviteMutation, AcceptOrganizationInviteMutationVariables>(AcceptOrganizationInviteDocument, options);
      }
export type AcceptOrganizationInviteMutationHookResult = ReturnType<typeof useAcceptOrganizationInviteMutation>;
export type AcceptOrganizationInviteMutationResult = Apollo.MutationResult<AcceptOrganizationInviteMutation>;
export type AcceptOrganizationInviteMutationOptions = Apollo.BaseMutationOptions<AcceptOrganizationInviteMutation, AcceptOrganizationInviteMutationVariables>;
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
export const CreateOrganizationDocument = gql`
    mutation CreateOrganization($name: String!, $slug: String!) {
  createOrganization(input: {name: $name, slug: $slug}) {
    organization {
      id
      ...CreatedOrganization
    }
    query {
      organizationBySlug(slug: $slug) {
        id
        ...CreatedOrganization
      }
    }
  }
}
    ${CreatedOrganizationFragmentDoc}`;
export type CreateOrganizationMutationFn = Apollo.MutationFunction<CreateOrganizationMutation, CreateOrganizationMutationVariables>;

/**
 * __useCreateOrganizationMutation__
 *
 * To run a mutation, you first call `useCreateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrganizationMutation, { data, loading, error }] = useCreateOrganizationMutation({
 *   variables: {
 *      name: // value for 'name'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useCreateOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrganizationMutation, CreateOrganizationMutationVariables>(CreateOrganizationDocument, options);
      }
export type CreateOrganizationMutationHookResult = ReturnType<typeof useCreateOrganizationMutation>;
export type CreateOrganizationMutationResult = Apollo.MutationResult<CreateOrganizationMutation>;
export type CreateOrganizationMutationOptions = Apollo.BaseMutationOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
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
export const DeleteOrganizationDocument = gql`
    mutation DeleteOrganization($organizationId: UUID!) {
  deleteOrganization(input: {organizationId: $organizationId}) {
    clientMutationId
  }
}
    `;
export type DeleteOrganizationMutationFn = Apollo.MutationFunction<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>;

/**
 * __useDeleteOrganizationMutation__
 *
 * To run a mutation, you first call `useDeleteOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrganizationMutation, { data, loading, error }] = useDeleteOrganizationMutation({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useDeleteOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>(DeleteOrganizationDocument, options);
      }
export type DeleteOrganizationMutationHookResult = ReturnType<typeof useDeleteOrganizationMutation>;
export type DeleteOrganizationMutationResult = Apollo.MutationResult<DeleteOrganizationMutation>;
export type DeleteOrganizationMutationOptions = Apollo.BaseMutationOptions<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>;
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
export const InvitationDetailDocument = gql`
    query InvitationDetail($id: UUID!, $code: String) {
  ...SharedLayout_Query
  organizationForInvitation(invitationId: $id, code: $code) {
    id
    name
    slug
  }
}
    ${SharedLayout_QueryFragmentDoc}`;

/**
 * __useInvitationDetailQuery__
 *
 * To run a query within a React component, call `useInvitationDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvitationDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvitationDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useInvitationDetailQuery(baseOptions: Apollo.QueryHookOptions<InvitationDetailQuery, InvitationDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvitationDetailQuery, InvitationDetailQueryVariables>(InvitationDetailDocument, options);
      }
export function useInvitationDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvitationDetailQuery, InvitationDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvitationDetailQuery, InvitationDetailQueryVariables>(InvitationDetailDocument, options);
        }
export type InvitationDetailQueryHookResult = ReturnType<typeof useInvitationDetailQuery>;
export type InvitationDetailLazyQueryHookResult = ReturnType<typeof useInvitationDetailLazyQuery>;
export type InvitationDetailQueryResult = Apollo.QueryResult<InvitationDetailQuery, InvitationDetailQueryVariables>;
export const InviteToOrganizationDocument = gql`
    mutation InviteToOrganization($organizationId: UUID!, $email: String, $username: String) {
  inviteToOrganization(
    input: {organizationId: $organizationId, email: $email, username: $username}
  ) {
    clientMutationId
  }
}
    `;
export type InviteToOrganizationMutationFn = Apollo.MutationFunction<InviteToOrganizationMutation, InviteToOrganizationMutationVariables>;

/**
 * __useInviteToOrganizationMutation__
 *
 * To run a mutation, you first call `useInviteToOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteToOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteToOrganizationMutation, { data, loading, error }] = useInviteToOrganizationMutation({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *      email: // value for 'email'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useInviteToOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<InviteToOrganizationMutation, InviteToOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteToOrganizationMutation, InviteToOrganizationMutationVariables>(InviteToOrganizationDocument, options);
      }
export type InviteToOrganizationMutationHookResult = ReturnType<typeof useInviteToOrganizationMutation>;
export type InviteToOrganizationMutationResult = Apollo.MutationResult<InviteToOrganizationMutation>;
export type InviteToOrganizationMutationOptions = Apollo.BaseMutationOptions<InviteToOrganizationMutation, InviteToOrganizationMutationVariables>;
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
export const OrganizationBySlugDocument = gql`
    query OrganizationBySlug($slug: String!) {
  organizationBySlug(slug: $slug) {
    id
    name
    slug
  }
}
    `;

/**
 * __useOrganizationBySlugQuery__
 *
 * To run a query within a React component, call `useOrganizationBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useOrganizationBySlugQuery(baseOptions: Apollo.QueryHookOptions<OrganizationBySlugQuery, OrganizationBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganizationBySlugQuery, OrganizationBySlugQueryVariables>(OrganizationBySlugDocument, options);
      }
export function useOrganizationBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizationBySlugQuery, OrganizationBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganizationBySlugQuery, OrganizationBySlugQueryVariables>(OrganizationBySlugDocument, options);
        }
export type OrganizationBySlugQueryHookResult = ReturnType<typeof useOrganizationBySlugQuery>;
export type OrganizationBySlugLazyQueryHookResult = ReturnType<typeof useOrganizationBySlugLazyQuery>;
export type OrganizationBySlugQueryResult = Apollo.QueryResult<OrganizationBySlugQuery, OrganizationBySlugQueryVariables>;
export const OrganizationMembersDocument = gql`
    query OrganizationMembers($slug: String!, $offset: Int = 0) {
  ...OrganizationPage_Query
  organizationBySlug(slug: $slug) {
    id
    ...OrganizationMembers_Organization
  }
}
    ${OrganizationPage_QueryFragmentDoc}
${OrganizationMembers_OrganizationFragmentDoc}`;

/**
 * __useOrganizationMembersQuery__
 *
 * To run a query within a React component, call `useOrganizationMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationMembersQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useOrganizationMembersQuery(baseOptions: Apollo.QueryHookOptions<OrganizationMembersQuery, OrganizationMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganizationMembersQuery, OrganizationMembersQueryVariables>(OrganizationMembersDocument, options);
      }
export function useOrganizationMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizationMembersQuery, OrganizationMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganizationMembersQuery, OrganizationMembersQueryVariables>(OrganizationMembersDocument, options);
        }
export type OrganizationMembersQueryHookResult = ReturnType<typeof useOrganizationMembersQuery>;
export type OrganizationMembersLazyQueryHookResult = ReturnType<typeof useOrganizationMembersLazyQuery>;
export type OrganizationMembersQueryResult = Apollo.QueryResult<OrganizationMembersQuery, OrganizationMembersQueryVariables>;
export const OrganizationPageDocument = gql`
    query OrganizationPage($slug: String!) {
  ...OrganizationPage_Query
}
    ${OrganizationPage_QueryFragmentDoc}`;

/**
 * __useOrganizationPageQuery__
 *
 * To run a query within a React component, call `useOrganizationPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationPageQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useOrganizationPageQuery(baseOptions: Apollo.QueryHookOptions<OrganizationPageQuery, OrganizationPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganizationPageQuery, OrganizationPageQueryVariables>(OrganizationPageDocument, options);
      }
export function useOrganizationPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizationPageQuery, OrganizationPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganizationPageQuery, OrganizationPageQueryVariables>(OrganizationPageDocument, options);
        }
export type OrganizationPageQueryHookResult = ReturnType<typeof useOrganizationPageQuery>;
export type OrganizationPageLazyQueryHookResult = ReturnType<typeof useOrganizationPageLazyQuery>;
export type OrganizationPageQueryResult = Apollo.QueryResult<OrganizationPageQuery, OrganizationPageQueryVariables>;
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
export const RemoveFromOrganizationDocument = gql`
    mutation RemoveFromOrganization($organizationId: UUID!, $userId: UUID!) {
  removeFromOrganization(
    input: {organizationId: $organizationId, userId: $userId}
  ) {
    clientMutationId
  }
}
    `;
export type RemoveFromOrganizationMutationFn = Apollo.MutationFunction<RemoveFromOrganizationMutation, RemoveFromOrganizationMutationVariables>;

/**
 * __useRemoveFromOrganizationMutation__
 *
 * To run a mutation, you first call `useRemoveFromOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromOrganizationMutation, { data, loading, error }] = useRemoveFromOrganizationMutation({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveFromOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFromOrganizationMutation, RemoveFromOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFromOrganizationMutation, RemoveFromOrganizationMutationVariables>(RemoveFromOrganizationDocument, options);
      }
export type RemoveFromOrganizationMutationHookResult = ReturnType<typeof useRemoveFromOrganizationMutation>;
export type RemoveFromOrganizationMutationResult = Apollo.MutationResult<RemoveFromOrganizationMutation>;
export type RemoveFromOrganizationMutationOptions = Apollo.BaseMutationOptions<RemoveFromOrganizationMutation, RemoveFromOrganizationMutationVariables>;
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
export const TransferOrganizationBillingContactDocument = gql`
    mutation TransferOrganizationBillingContact($organizationId: UUID!, $userId: UUID!) {
  transferOrganizationBillingContact(
    input: {organizationId: $organizationId, userId: $userId}
  ) {
    organization {
      id
      currentUserIsBillingContact
    }
  }
}
    `;
export type TransferOrganizationBillingContactMutationFn = Apollo.MutationFunction<TransferOrganizationBillingContactMutation, TransferOrganizationBillingContactMutationVariables>;

/**
 * __useTransferOrganizationBillingContactMutation__
 *
 * To run a mutation, you first call `useTransferOrganizationBillingContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransferOrganizationBillingContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transferOrganizationBillingContactMutation, { data, loading, error }] = useTransferOrganizationBillingContactMutation({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useTransferOrganizationBillingContactMutation(baseOptions?: Apollo.MutationHookOptions<TransferOrganizationBillingContactMutation, TransferOrganizationBillingContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TransferOrganizationBillingContactMutation, TransferOrganizationBillingContactMutationVariables>(TransferOrganizationBillingContactDocument, options);
      }
export type TransferOrganizationBillingContactMutationHookResult = ReturnType<typeof useTransferOrganizationBillingContactMutation>;
export type TransferOrganizationBillingContactMutationResult = Apollo.MutationResult<TransferOrganizationBillingContactMutation>;
export type TransferOrganizationBillingContactMutationOptions = Apollo.BaseMutationOptions<TransferOrganizationBillingContactMutation, TransferOrganizationBillingContactMutationVariables>;
export const TransferOrganizationOwnershipDocument = gql`
    mutation TransferOrganizationOwnership($organizationId: UUID!, $userId: UUID!) {
  transferOrganizationOwnership(
    input: {organizationId: $organizationId, userId: $userId}
  ) {
    organization {
      id
      currentUserIsOwner
    }
  }
}
    `;
export type TransferOrganizationOwnershipMutationFn = Apollo.MutationFunction<TransferOrganizationOwnershipMutation, TransferOrganizationOwnershipMutationVariables>;

/**
 * __useTransferOrganizationOwnershipMutation__
 *
 * To run a mutation, you first call `useTransferOrganizationOwnershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransferOrganizationOwnershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transferOrganizationOwnershipMutation, { data, loading, error }] = useTransferOrganizationOwnershipMutation({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useTransferOrganizationOwnershipMutation(baseOptions?: Apollo.MutationHookOptions<TransferOrganizationOwnershipMutation, TransferOrganizationOwnershipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TransferOrganizationOwnershipMutation, TransferOrganizationOwnershipMutationVariables>(TransferOrganizationOwnershipDocument, options);
      }
export type TransferOrganizationOwnershipMutationHookResult = ReturnType<typeof useTransferOrganizationOwnershipMutation>;
export type TransferOrganizationOwnershipMutationResult = Apollo.MutationResult<TransferOrganizationOwnershipMutation>;
export type TransferOrganizationOwnershipMutationOptions = Apollo.BaseMutationOptions<TransferOrganizationOwnershipMutation, TransferOrganizationOwnershipMutationVariables>;
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
export const UpdateOrganizationDocument = gql`
    mutation UpdateOrganization($input: UpdateOrganizationInput!) {
  updateOrganization(input: $input) {
    organization {
      id
      slug
      name
    }
  }
}
    `;
export type UpdateOrganizationMutationFn = Apollo.MutationFunction<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;

/**
 * __useUpdateOrganizationMutation__
 *
 * To run a mutation, you first call `useUpdateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrganizationMutation, { data, loading, error }] = useUpdateOrganizationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>(UpdateOrganizationDocument, options);
      }
export type UpdateOrganizationMutationHookResult = ReturnType<typeof useUpdateOrganizationMutation>;
export type UpdateOrganizationMutationResult = Apollo.MutationResult<UpdateOrganizationMutation>;
export type UpdateOrganizationMutationOptions = Apollo.BaseMutationOptions<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;
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