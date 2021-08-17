export interface TrackingRequest {
  id: string;
  email: string;
  redirectUrl: string;
  hideUrl: boolean;
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
  coords?: object;
  image?: Blob;
  audio?: Blob;
}

export interface SliderImage {
  id: number;
  src: string;
  alt: string;
}

export interface FormField {
  id: number;
  type: number;
  name: string;
  label: string;
  defaultValue: any;
  placeholder?: string;
  htmlType?: string;
  required: boolean;
  regexp?: RegExp;
}
