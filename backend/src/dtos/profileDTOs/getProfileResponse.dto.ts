export interface GetProfileResponseDTO {
  userId:string;
  fullname:string;
  userName:string;
  bio:string;
  profilePic?:string;

  followersCount:number;
  followingCount:number;

  isPremium:boolean;
}

export interface GetProfileByIdRequestDTO {
   userId: string;
}