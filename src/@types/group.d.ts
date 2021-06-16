type TListType = "hot" | "fresh" | "board";

interface IGroupFeatureTag {
  key: string;
  url: string;
}

interface IGroup {
  id: string;
  url: string;
  name: string;
  description: string;
  isSensitive: NumberBoolean;
  userUploadEnabled: NumberBoolean;
  listTypes: TListType[];
  ogImageUrl: string;
  featuredTags: IGroupFeatureTag[];
  location: string;
  coverImageUrl: string;
  backgroundColor: string;
  listType: TListType;
  listType2: TListType;
  posts: IPost[];
}
