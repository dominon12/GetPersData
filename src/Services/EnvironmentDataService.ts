import { UserData } from "../Types/Types";

const checkMediaDevicesAvailable = () =>
  navigator.mediaDevices && navigator.mediaDevices.getUserMedia;

const checkGeolocationAvailable = () =>
  navigator.geolocation && navigator.geolocation.getCurrentPosition;

const getGeolocation = (userData: UserData): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        userData.location = `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;
        resolve(true);
      },
      (positionError) => {
        reject({ getGeolocation: positionError.toString() });
      }
    );
  });
};

const takePhoto = (userData: UserData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      const track = mediaStream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(track);
      const imageBlob = await imageCapture.takePhoto();
      userData.image = imageBlob;
      resolve(true);
    } catch (err) {
      reject({ takePhoto: err.toString() });
    }
  });
};

const recordAudio = (userData: UserData, audioDuration: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(mediaStream);

      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), audioDuration);

      let chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      mediaRecorder.onstop = (e) => {
        const blob = new Blob(chunks, { type: "audio/wav; codecs=opus" });
        userData.audio = blob;
        resolve(true);
      };
    } catch (err) {
      reject({ recordAudio: err.toString() });
    }
  });
};

export const getUserData = async (options: {
  askGeolocation: boolean;
  askVideo: boolean;
  askAudio: boolean;
  audioDuration?: number;
}): Promise<{ userData: UserData; errors: any }> => {
  // default data
  let userData: UserData = {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    orientation: window?.screen?.orientation?.type,
    language: navigator.language,
    userAgent: navigator.userAgent,
  };
  let errors = {};

  // get geolocation
  if (options.askGeolocation && checkGeolocationAvailable())
    try {
      await getGeolocation(userData);
    } catch (err) {
      errors = Object.assign(errors, err);
    }
  // take photo
  if (options.askVideo && checkMediaDevicesAvailable())
    try {
      await takePhoto(userData);
    } catch (err) {
      errors = Object.assign(errors, err);
    }
  // record audio
  if (options.askAudio && options.audioDuration && checkMediaDevicesAvailable())
    try {
      await recordAudio(userData, options.audioDuration);
    } catch (err) {
      errors = Object.assign(errors, err);
    }

  return { userData, errors };
};
