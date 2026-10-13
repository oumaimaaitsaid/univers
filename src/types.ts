export type Language = 'fr' | 'ar';

export interface ActivityItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  features: string[];
}

export interface CulturalEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'music' | 'theater' | 'workshop' | 'festival';
  description: string;
  status: 'upcoming' | 'soldout' | 'free';
  badge: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption: string;
  date: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  caption: string;
  isReel?: boolean;
}
