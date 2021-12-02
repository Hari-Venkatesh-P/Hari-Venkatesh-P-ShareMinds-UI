export interface TweetData {
  created_at:                    string;
  id:                            number;
  id_str:                        string;
  full_text:                     string;
  truncated:                     boolean;
  display_text_range:            number[];
  entities:                      Entities;
  extended_entities:             ExtendedEntities;
  source:                        string;
  in_reply_to_status_id:         null;
  in_reply_to_status_id_str:     null;
  in_reply_to_user_id:           null;
  in_reply_to_user_id_str:       null;
  in_reply_to_screen_name:       null;
  user:                          User;
  geo:                           null;
  coordinates:                   null;
  place:                         null;
  contributors:                  null;
  is_quote_status:               boolean;
  retweet_count:                 number;
  favorite_count:                number;
  favorited:                     boolean;
  retweeted:                     boolean;
  possibly_sensitive:            boolean;
  possibly_sensitive_appealable: boolean;
  lang:                          string;
}

export interface Entities {
  hashtags:      Hashtag[];
  symbols:       any[];
  user_mentions: UserMention[];
  urls:          any[];
  media:         Media[];
}

export interface Hashtag {
  text:    string;
  indices: number[];
}

export interface Media {
  id:              number;
  id_str:          string;
  indices:         number[];
  media_url:       string;
  media_url_https: string;
  url:             string;
  display_url:     string;
  expanded_url:    string;
  type:            string;
  sizes:           Sizes;
}

export interface Sizes {
  thumb:  Large;
  medium: Large;
  small:  Large;
  large:  Large;
}

export interface Large {
  w:      number;
  h:      number;
  resize: string;
}

export interface UserMention {
  screen_name: string;
  name:        string;
  id:          number;
  id_str:      string;
  indices:     number[];
}

export interface ExtendedEntities {
  media: Media[];
}

export interface User {
  id:                                 number;
  id_str:                             string;
  name:                               string;
  screen_name:                        string;
  location:                           string;
  description:                        string;
  url:                                string;
  entities:                           UserEntities;
  protected:                          boolean;
  followers_count:                    number;
  friends_count:                      number;
  listed_count:                       number;
  created_at:                         string;
  favourites_count:                   number;
  utc_offset:                         null;
  time_zone:                          null;
  geo_enabled:                        boolean;
  verified:                           boolean;
  statuses_count:                     number;
  lang:                               null;
  contributors_enabled:               boolean;
  is_translator:                      boolean;
  is_translation_enabled:             boolean;
  profile_background_color:           string;
  profile_background_image_url:       string;
  profile_background_image_url_https: string;
  profile_background_tile:            boolean;
  profile_image_url:                  string;
  profile_image_url_https:            string;
  profile_banner_url:                 string;
  profile_link_color:                 string;
  profile_sidebar_border_color:       string;
  profile_sidebar_fill_color:         string;
  profile_text_color:                 string;
  profile_use_background_image:       boolean;
  has_extended_profile:               boolean;
  default_profile:                    boolean;
  default_profile_image:              boolean;
  following:                          boolean;
  follow_request_sent:                boolean;
  notifications:                      boolean;
  translator_type:                    string;
  withheld_in_countries:              any[];
}

export interface UserEntities {
  url:         Description;
  description: Description;
}

export interface Description {
  urls: URL[];
}

export interface URL {
  url:          string;
  expanded_url: string;
  display_url:  string;
  indices:      number[];
}
