export interface TrackingRequest {
  id: string;
  email: string;
  redirectUrl: string;
  askGeolocation: boolean;
  askVideo: boolean;
  askAudio: boolean;
  userData?: UserData;
}

export interface UserData {
  ipAddress?: string;
  innerHeight: number;
  innerWidth: number;
  orientation: string;
  language: string;
  userAgent: string;
  coords?: Object;
  image?: Blob;
  audio?: Blob;
}

export interface SliderImage {
  src: string;
  alt: string;
}
