interface ICommentText {
  commentId: string;
  parent: string;
  text: string;
  timestamp: number;
  mentionMapping: {
    dummy: string;
  };
  type: "text";
  threadId: string;
  permalink: string;
  level: number;
  isVoteMasked: NumberBoolean;
  mediaText: string;
  user: {
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
  };
  likeCount: number;
  dislikeCount: number;
  isPinned: NumberBoolean;
  childrenTotal: number;
  childrenUrl: string;
  isCollapsed: NumberBoolean;
  isDeleted: NumberBoolean;
  isSensitive: NumberBoolean;
}

interface ICommentUserMedia {
  type: "userMedia";
}

type TComment = ICommentText;

type TCommentType = TComment["type"];
