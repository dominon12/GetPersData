import { UserData } from "../Types/Types";

const checkMediaDevicesAvailable = () =>
  navigator.mediaDevices && navigator.mediaDevices.getUserMedia;

const checkGeolocationAvailable = () =>
  navigator.geolocation && navigator.geolocation.getCurrentPosition;

const getGeolocation = (userData: UserData) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      userData.coords = position.coords;
    },
    (positionError) => {
      console.error({ positionError });
    }
  );
};

const takePhoto = async (userData: UserData) => {
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "user" },
  });
  const track = mediaStream.getVideoTracks()[0];
  const imageCapture = new ImageCapture(track);
  const imageBlob = await imageCapture.takePhoto();
  userData.image = imageBlob;
};

const recordAudio = async (userData: UserData) => {
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });
  const mediaRecorder = new MediaRecorder(mediaStream);

  mediaRecorder.start();
  setTimeout(() => mediaRecorder.stop(), 5000);

  let chunks: Blob[] = [];
  mediaRecorder.ondataavailable = (e) => {
    chunks.push(e.data);
  };
  mediaRecorder.onstop = (e) => {
    const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
    userData.audio = blob;
  };
};

const getIpAddress = async () => {
  const getIpAddressAPI = "https://api.ipify.org?format=json";
  const res = await fetch(getIpAddressAPI);
  const { ip } = await res.json();
  return ip ?? "Couldn't get IP Address";
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
    orientation: window.screen.orientation.type,
    language: navigator.language,
    userAgent: navigator.userAgent,
    ipAddress: await getIpAddress(),
  };
  // get geolocation
  if (options.askGeolocation && checkGeolocationAvailable())
    getGeolocation(userData);
  // take photo
  if (options.askVideo && checkMediaDevicesAvailable())
    await takePhoto(userData);
  // record audio
  if (options.askAudio && checkMediaDevicesAvailable())
    await recordAudio(userData);
  return userData;
};
