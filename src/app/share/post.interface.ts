export interface IAuthor{
  id: number;
  email: string;
  username: string;
}

export interface IPostData {
  title: string;
  body: string;
  description: string;
  tagList: string[];
}
interface IArticle {
    slug: string;
    title: string;
    body: string;
    description: string;
    tagList: string[];
    author: IAuthor & {bio: string, image: SVGStringList }

}
export interface IPost extends IPostData {
  id: number;
  slug: string;
  author: IAuthor;
}

export interface IPostResponse{
  article: IArticle;
  id: number;
  createdAt: string;
  updatedAt: string;
  favoritesCount: number;
}

export interface IPosts {
  articles: IPost[];
  articlesCount: number;
}


export interface IDeletePostResponse {
  raw: string[];
  affected: number;
}
