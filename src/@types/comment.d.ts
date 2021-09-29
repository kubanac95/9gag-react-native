interface ICommentUser {
  userId: string;
  avatarUrl: string;
  displayName: string;
  emojiStatus: string;
  country: string;
  profileUrl: string;
  profileUrls: {
    [key: string]: string;
  };
  timestamp: string;
  permissions: {};
  isActivePro: boolean;
  isActiveProPlus: boolean;
  isVerifiedAccount: boolean;
  accountId: string;
  activeTs: number;
  preferences: {
    hideProBadge: NumberBoolean;
    hideActiveTs: NumberBoolean;
    accentColor: string;
    backgroundColor: string;
  };
}

interface ICommentBase {
  commentId: string;
  parent: string;
  text: string;
  timestamp: number;
  mentionMapping: {
    dummy: string;
  };
  threadId: string;
  permalink: string;
  level: number;
  isVoteMasked: NumberBoolean;
  mediaText: string;
  user: ICommentUser;
  likeCount: number;
  dislikeCount: number;
  isPinned: NumberBoolean;
  childrenTotal: number;
  childrenUrl: string;
  isCollapsed: NumberBoolean;
  isDeleted: NumberBoolean;
  isSensitive: NumberBoolean;
}

interface ICommentText extends ICommentBase {
  type: "text";
}

interface ICommentUserMediaDataAnimated {
  type: "ANIMATED";
  video: {
    url: string;
    height: number;
    width: number;
  };
  animated: {
    url: string;
    height: number;
    width: number;
  };
  image: {
    url: string;
    height: number;
    width: number;
    webpUrl: string;
  };
}

interface ICommentUserMediaDataStatic {
  type: "STATIC";
  image: {
    url: string;
    height: number;
    width: number;
    webpUrl: string;
  };
  imageXLarge: {
    url: string;
    height: number;
    width: number;
  };
}

interface ICommentUserMedia extends ICommentBase {
  type: "userMedia";
  attachments: {
    type: "userMedia";
    data: ICommentUserMediaDataAnimated | ICommentUserMediaDataStatic;
  }[];
}

type TComment = ICommentText | ICommentUserMedia;

type TCommentType = TComment["type"];

interface ICommentParams {
  url: string;
  level: 1 | 2;
  count?: number;
  type?: "hot" | "new";
  commentId?: string;
}

interface ICommentsResponse {
  status: string;
  error: string;
  payload: {
    url: string;
    status: string;
    lock: boolean;
    total: number;
    opUserId: string;
    comments: TComment[];
    prev: string | null;
    next: string | null;
  };
}
