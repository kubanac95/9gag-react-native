interface IPostImage {
  url: string;
  width: number;
  height: number;
  webpUrl?: string;
}
interface IPostImages {
  image700?: IPostImage;
  image460?: IPostImage;
  imageFbThumbnail?: {
    width: number;
    height: number;
    url: string;
  };
  image460sv?: {
    av1Url: string;
    duration: number;
    h265Url: string;
    hasAudio: NumberBoolean;
    height: number;
    url: string;
    vp8Url: string;
    width: number;
  };
}

interface IPostTag {
  key: string;
  url: string;
}

type TPostType = "hot" | "trending" | "top" | "fresh";

interface IPostSection {
  name: string;
  url: string;
  imageUrl: string;
  webpUrl: string;
}

interface IArticleBlock {
  type: "RichText";
  content: string;
}

interface IArticle {
  blocks: IArticleBlock[];
  medias: unknown[];
}

interface IBoard {
  followed: boolean;
  location: string;
  memberCount: number;
}

interface IPostQueryParams {
  group: string;
  type: TPostType;
  itemCount?: number;
  olderThan?: string[];
  entryTypes?: TPostEntityType[];
}

interface IPostTag {
  key: string;
  url: string;
}

interface IPostBase {
  id: string;
  url: string;
  status: NumberBoolean;
  title: string;
  description: string;
  version: number;
  nsfw: NumberBoolean;
  upVoteCount: number;
  downVoteCount: number;
  totalVoteCount: number;
  viewsCount: number;
  score: number;
  reportedStatus: NumberBoolean;
  creationTs: number;
  albumWebUrl: string;
  hasImageTile: NumberBoolean;
  postTile: {
    h800: {
      width: number;
      height: number;
      images: IPostImage[];
    };
  };
  promoted: NumberBoolean;
  isVoteMasked: NumberBoolean;
  sortTs: number;
  orderId: number;
  hasLongPostCover: NumberBoolean;
  images: {};
  colors: { placeholder: string };
  sourceDomain: string;
  sourceUrl: string;
  externalUrl: string;
  channel: string;
  isVoted: NumberBoolean;
  userScore: number;
  creator: {
    userId: string;
    userName: string;
    profileUrl: string;
    avatarUrlSmall: string;
  };
  commentsCount: number;
  fbShares: number;
  tweetCount: number;
  created: string;
  comment: {
    listType: "comment";
    updateTs: number;
    latestCommentText: string;
  };
  commentOpClientId: string;
  commentOpSignature: string;
  commentSystem: string;
  topComments: { comments: unknown[] };
  targetedAdTags: {};
  postSection: IPostSection;
  tags: IPostTag[];
}

type IPostVideoSource = "YouTube";

interface IPostVideo extends IPostBase {
  type: "Video";
  videoId: string;
  video: {
    id: string;
    source: IPostVideoSource;
    duration: number;
    startTs: number;
  };
  images: {
    image700: Required<IPostImage>;
    image460: Required<IPostImage>;
    imageFbThumbnail?: {
      width: number;
      height: number;
      url: string;
    };
  };
  imageUrlVideoPreview: string;
  videoSource: IPostVideoSource;
}

interface IPostPhoto extends IPostBase {
  type: "Photo";
  images: {
    image700: IPostImage;
    image460: Required<IPostImage>;
    imageFbThumbnail?: {
      width: number;
      height: number;
      url: string;
    };
  };
}

interface IPostAnimated extends IPostBase {
  type: "Animated";
  images: {
    image700: IPostImage;
    image460: Required<IPostImage>;
    imageFbThumbnail?: {
      width: number;
      height: number;
      url: string;
    };
    image700ba: Omit<IPostImage, "webpUrl">;
    image460sa: Omit<IPostImage, "webpUrl">;
    image460sv: Omit<IPostImage, "webpUrl"> & {
      hasAudio: NumberBoolean;
      duration: number;
      vp8Url: string;
      h265Url: string;
      vp9Url: string;
    };
  };
}

type IPostArticleBlockType = "RichText";

interface IPostArticleBlock {
  type: IPostArticleBlockType;
  content: string;
}

interface IPostArticle extends IPostBase {
  type: "Article";
  images: {
    image700: IPostImage;
    image460: Required<IPostImage>;
    imageFbThumbnail?: {
      width: number;
      height: number;
      url: string;
    };
  };
  article: {
    blocks: IPostArticleBlock[];
    medias: unknown[];
  };
  board: {
    followed: NumberBoolean;
    muted: NumberBoolean;
    notification: {
      topic: string;
      shouldSubscribe: NumberBoolean;
    };
    data: {
      topic: string;
      commentId: string;
    };
    pinned: {
      message: string;
      updateTs: number;
    };
    message: {
      placeholder: string;
      cooldown: number;
      minLength: number;
      media: string;
      gender: string;
      updateTs: number;
      formats: [];
    };
    reply: { gender: string; suggestions: [] };
    location: string;
  };
}

type IPost = IPostArticle | IPostAnimated | IPostVideo | IPostPhoto;

type TPostEntityType = IPost["type"];
