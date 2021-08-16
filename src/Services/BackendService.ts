import URLS from "./Urls";
import { TrackingRequest } from "../Types/Types";

export const getTrackingRequest = async (
  trackingRequestId: string,
  language: string
): Promise<{
  trackingRequest: TrackingRequest;
  status: number;
}> => {
  const res = await fetch(URLS.trackingRequest + trackingRequestId, {
    method: "GET",
    headers: { "Accept-language": language },
  });
  const trackingRequest = await res.json();
  return { trackingRequest, status: res.status };
};

export const updateTrackingRequestWithUserData = async (
  trackingRequestId: string,
  newTrackingRequest: FormData
): Promise<void> => {
  await fetch(URLS.trackingRequest + trackingRequestId, {
    method: "PUT",
    body: newTrackingRequest,
  });
};
