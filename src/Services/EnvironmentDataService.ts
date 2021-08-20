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
        resolve(false);
      }
    );
  });
};

const takePhoto = async (userData: UserData) => {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
    });
    const track = mediaStream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(track);
    const imageBlob = await imageCapture.takePhoto();
    userData.image = imageBlob;
  } catch (err) {
    return;
  }
};

const recordAudio = (userData: UserData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(mediaStream);

      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 3000);

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
      resolve(false);
    }
  });
};

export const getUserData = async (options: {
  askGeolocation: boolean;
  askVideo: boolean;
  askAudio: boolean;
}): Promise<UserData> => {
  // default data
  let userData: UserData = {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    orientation: window?.screen?.orientation?.type,
    language: navigator.language,
    userAgent: navigator.userAgent,
  };
  // get geolocation
  if (options.askGeolocation && checkGeolocationAvailable())
    await getGeolocation(userData);
  // take photo
  if (options.askVideo && checkMediaDevicesAvailable())
    await takePhoto(userData);
  // record audio
  if (options.askAudio && checkMediaDevicesAvailable())
    await recordAudio(userData);
  return userData;
};
