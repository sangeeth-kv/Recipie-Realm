export interface IRecipe {
  _id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  isSaved: boolean;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}