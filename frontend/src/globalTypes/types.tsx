export type UserProfile = {
    id: number;
    about: string;
    avatar: string;
    banner: string;
    location:string;
    birthdate: string;
  }
  
export type User = {
    id: number;
    username: string;
    display_name: string;
    email: string;
    wins: number;
    loses: number;
    points: number;
    verified: boolean;
    profile: UserProfile;
    isforeign: boolean;
    friendStatus: string;
}



export enum Game {
  CURSED = "CURSED",
  GOLDRUSH = "GOLD_RUSH",
  VANISH = "VANISH",
  REGULAR = "REGULAR"

}

export enum CardType {
  RECENT_MATCHES = "recent_matches",
  MATCH_HISTORY = "match_history" 
}


export type player = {
  name: string;
  score: number;
  avatar: string;
}
// export default User