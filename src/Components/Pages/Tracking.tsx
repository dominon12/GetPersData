import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";

import {
  getTrackingRequest,
  updateTrackingRequestWithUserData,
} from "../../Services/BackendService";
import { getUserData } from "../../Services/EnvironmentDataService";

const ObjectToFormData = (obj: any): FormData => {
  let formData = new FormData();
  for (let key in obj) {
    formData.append(key, obj[key]);
  }
  return formData;
};

const Tracking: React.FC = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const history = useHistory();
  const { code: trackingRequestId } = useParams<{ code: string }>();

  const handlePageFlow = async () => {
    const { trackingRequest, status } = await getTrackingRequest(
      trackingRequestId,
      language
    );
    if (status !== 200) history.push("/404");
    // get data about user
    const userData = await getUserData({
      askGeolocation: trackingRequest.askGeolocation,
      askAudio: trackingRequest.askAudio,
      askVideo: trackingRequest.askVideo,
    });
    // convert userData object to FormData
    const formUserData = ObjectToFormData(userData);
    // send received data to backend
    await updateTrackingRequestWithUserData(trackingRequestId, formUserData);
    // redirect to redirectUrl
    // window.location.href = trackingRequest.redirectUrl;
  };

  useEffect(() => {
    handlePageFlow();
  }, [trackingRequestId]);

  return <h1>{t("tracking.redirecting")}</h1>;
};

export default Tracking;
