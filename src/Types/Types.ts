export interface TrackingRequest {
  email: string;
  redirectUrl: string;
  askGeolocation: boolean;
  askVideo: boolean;
  askAudio: boolean;
  audioDuration?: number;
  hideUrl?: boolean;
  userData?: UserData;
}

export interface UserData {
  innerHeight: number;
  innerWidth: number;
  orientation: string;
  language: string;
  userAgent: string;
  location?: string;
  image?: Blob;
  audio?: Blob;
}

export interface Story {
  id: number;
  backgroundSrc: string;
  text: string;
}

export interface SelectValue {
  id: number;
  value: string | number;
  displayValue: string;
}

export interface FormField {
  id: number;
  type: 1 | 2 | 3;
  name: string;
  label: string;
  defaultValue: any;
  selectValues?: SelectValue[];
  placeholder?: string;
  htmlType?: string;
  required: boolean;
  regexp?: RegExp;
  showIfValue?: FormField[];
}
