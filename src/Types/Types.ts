export interface TrackingRequest {
  email: string;
  redirectUrl: string;
  askGeolocation: boolean;
  askVideo: boolean;
  askAudio: boolean;
  hideUrl?: boolean;
  userData?: UserData;
}

export interface UserData {
  ipAddress: string;
  innerHeight: number;
  innerWidth: number;
  orientation: string;
  language: string;
  userAgent: string;
  coords?: object;
  image?: Blob;
  audio?: Blob;
}

export interface Story {
  id: number;
  backgroundSrc: string;
  text: string;
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
