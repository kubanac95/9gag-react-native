interface IPostImage {
  width: number;
  height: number;
  url: string;
  webpUrl: string;
}

interface IPostImages {
  image700: IPostImage;
  image460: IPostImage;
  imageFbThumbnail: IPostImage;
  image460sv: IPostImage;
}

interface IPostTag {
  key: string;
  url: string;
}

interface IPostSection {
  name: string;
  url: string;
  imageUrl: string;
  webpUrl: string;
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
}
