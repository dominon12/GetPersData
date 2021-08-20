import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import "./TrackingRequestForm.scss";
import Button from "../Atoms/Button";
import Subtitle from "../Atoms/Subtitle";
import Title from "../Atoms/Title";
import SocialLinks from "../Molecules/SocialLinks";
import Form from "../Molecules/Form";
import StoriesCarousel from "./StoriesCarousel";
import Loading from "../Molecules/Loading";
import CopyLink from "../Molecules/CopyLink";
import URLS from "../../Services/Urls";
import { getStories } from "../../Services/StoriesService";
import { FormField } from "../../Types/Types";
import { checkFormValid } from "../../Services/FormService";
import { LINK_SHORTENER_TOKEN } from "../../Services/Credentials";

const shortifyUrl = async (url: string) => {
  // won't work with localhost
  const res = await fetch(URLS.linkShortenerAPI, {
    method: "POST",
    body: JSON.stringify({ long_url: url }),
    headers: {
      Authorization: `Bearer ${LINK_SHORTENER_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  if (res.status === 200 || res.status === 201) {
    const { link } = await res.json();
    return link;
  }
  return url;
};

const TrackingRequestForm: React.FC = () => {
  const { t } = useTranslation();

  const DEFAULT_DELAY = 1500;

  const formFields: FormField[] = [
    {
      id: 1,
      type: 1,
      name: "email",
      placeholder: t("form.fields.your_email"),
      label: t("form.fields.email"),
      htmlType: "email",
      required: true,
      regexp:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      defaultValue: "",
    },
    {
      id: 2,
      type: 1,
      name: "redirectUrl",
      placeholder: "https://...",
      label: t("form.fields.redirectUrl"),
      htmlType: "url",
      required: true,
      regexp:
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      defaultValue: "",
    },
    {
      id: 3,
      type: 2,
      name: "hideUrl",
      label: t("form.fields.hideUrl"),
      defaultValue: true,
      required: false,
    },
    {
      id: 4,
      type: 2,
      name: "askGeolocation",
      label: t("form.fields.askGeolocation"),
      defaultValue: false,
      required: false,
    },
    {
      id: 5,
      type: 2,
      name: "askVideo",
      label: t("form.fields.askVideo"),
      defaultValue: false,
      required: false,
    },
    {
      id: 6,
      type: 2,
      name: "askAudio",
      label: t("form.fields.askAudio"),
      defaultValue: false,
      required: false,
      showIfValue: [
        {
          id: 7,
          type: 3,
          name: "audioDuration",
          label: t("form.fields.audioDuration"),
          defaultValue: 1500,
          required: true,
          selectValues: [
            { id: 1, value: 1500, displayValue: "1.5 seconds" },
            { id: 2, value: 3000, displayValue: "3 seconds" },
            { id: 3, value: 5000, displayValue: "5 seconds" },
            { id: 4, value: 10000, displayValue: "10 seconds" },
          ],
        },
      ],
    },
  ];

  const [formState, setFormState] = useState<any>({});
  const [formValid, setFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resultLink, setResultLink] = useState<string | null>(null);

  useEffect(() => {
    const isFormValid = checkFormValid(formFields, formState);
    if (formValid !== isFormValid) setFormValid(isFormValid);
  }, [formState]);

  const getTrackingLink = async () => {
    // get GET params
    const getParams = new URLSearchParams(formState).toString();
    // construct a link
    let trackingLink = `${window.location.href}track?${getParams.toString()}`;
    // if needed, hide link using url shortener service
    if (formState.hideUrl) trackingLink = await shortifyUrl(trackingLink);
    return trackingLink;
  };

  const handleGenerateTrackingLink = async () => {
    setIsLoading(true);
    const link = await getTrackingLink();
    setFormState({});
    setResultLink(link);
    setTimeout(() => setIsLoading(false), DEFAULT_DELAY);
  };

  const handleStartAgain = () => {
    setIsLoading(true);
    setResultLink(null);
    setTimeout(() => setIsLoading(false), DEFAULT_DELAY);
  };

  return (
    <div className="tracking-request-form">
      <Title className="tracking-request-form__title">{t("form.title")}</Title>
      <StoriesCarousel
        stories={getStories(t)}
        containerClass="show-after-laptop"
      />

      {isLoading ? (
        <Loading /> // Link is generating
      ) : resultLink ? (
        <CopyLink link={resultLink} handleStartAgain={handleStartAgain} /> // Link has been generated
      ) : (
        <>
          <Subtitle className="tracking-request-form__subtitle">
            {t("form.options")}
          </Subtitle>
          <Form
            fields={formFields}
            formState={formState}
            setFormState={setFormState}
            className="tracking-request-form__form"
          />
          <div className="tracking-request-form__button-container">
            <Button
              buttonStyle="primary"
              onClick={handleGenerateTrackingLink}
              disabled={!formValid}
            >
              {t("form.begin")}
            </Button>
            <SocialLinks />
          </div>
        </>
      )}
    </div>
  );
};

export default TrackingRequestForm;
