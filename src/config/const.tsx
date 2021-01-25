export const PostGroups = [
  "default",
  "funny",
  "nsfw",
  "girl",
  "wtf",
  "cyberpunk2077",
  "anime-manga",
  "random",
  "animals",
  "animewaifu",
  "awesome",
  "car",
  "comic-webtoon",
  "cosplay",
  "gaming",
  "gif",
  "girlcelebrity",
  "leagueoflegends",
  "meme",
  "politics",
  "relationship",
  "savage",
  "video",
] as const;

export const PostTypes = ["hot", "trending", "top", "fresh"] as const;

export type TPostGroup = typeof PostGroups[number];

export type TPostType = typeof PostTypes[number];
