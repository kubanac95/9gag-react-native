interface IPostImages {
  image700: {
    width: number;
    height: number;
    url: string;
  };
  image460: {
    width: number;
    height: number;
    url: string;
    webpUrl: string;
  };
  imageFbThumbnail: {
    width: number;
    height: number;
    url: string;
  };
  image460sv: {
    av1Url: string;
    duration: number;
    h265Url: string;
    hasAudio: 0 | 1;
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

type TPostType = "Animated" | "Photo";

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

interface IPost {
  id: string;
  url: string;
  title: string;
  description: string;
  upVoteCount: number;
  downVoteCount: number;
  commentsCount: number;
  postSection: IPostSection;
  images: IPostImages;
  creationTs: number;
  type: TPostType;
  hasLongPostCover: 0 | 1;
  isVoteMasked: 0 | 1;
  nsfw: 0 | 1;
}
