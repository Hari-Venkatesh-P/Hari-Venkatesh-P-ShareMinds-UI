export interface ProfileDetails {
  protected: boolean;
  profile_image_url: string;
  description: string;
  public_metrics: PublicMetrics;
  name: string;
  username: string;
  created_at: string;
  verified: boolean;
  location: string;
  id: string;
  url: string;
}

export interface PublicMetrics {
  followers_count: number;
  following_count: number;
  tweet_count: number;
  listed_count: number;
}
