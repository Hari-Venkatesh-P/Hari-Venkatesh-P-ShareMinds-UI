export interface TrendingData {
  closestTrendingData: TrendingDatum[];
  worldTrendingData: TrendingDatum[];
}

export interface TrendingDatum {
  trends: Trend[];
}

export interface Trend {
  name: string;
  url: string;
  promoted_content: null;
  query: string;
  tweet_volume: number | null;
}
