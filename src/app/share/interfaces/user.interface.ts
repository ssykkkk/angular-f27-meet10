export interface IUser{
  username: string;
  email: string;
  id: number;
  bio: string;
  image: string;
  token: string;
}


export interface IFullUser{
  user: IUser;
}
