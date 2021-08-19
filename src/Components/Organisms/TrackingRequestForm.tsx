import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import "./TrackingRequestForm.scss";
import Button from "../Atoms/Button";
import Subtitle from "../Atoms/Subtitle";
import Title from "../Atoms/Title";
import SocialLinks from "../Molecules/SocialLinks";
import Form from "../Molecules/Form";
import { FormField, TrackingRequest } from "../../Types/Types";
import { checkFormValid } from "../../Services/FormService";
import StoriesCarousel from "./StoriesCarousel";
import { getStories } from "../../Services/StoriesService";
import Loading from "../Molecules/Loading";
import CopyLink from "../Molecules/CopyLink";

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
      placeholder: t("form.fields.redirectUrlExplicit"),
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
    },
  ];

  const [formState, setFormState] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [resultLink, setResultLink] = useState<string | null>(null);

  const getTrackingLink = () => {
    const getParams = new URLSearchParams(formState).toString();
    const trackingLink = `${
      window.location.href
    }tracking?${getParams.toString()}`;
    
    if (formState.hideUrl) { // if needs to hide url
      // TODO: hide url here
    }
    return trackingLink;
  };

  const handleGenerateTrackingLink = () => {
    const formValid = checkFormValid(formFields, formState);
    if (formValid) {
      setIsLoading(true);
      const link = getTrackingLink();
      setFormState({});
      setResultLink(link);
      setTimeout(() => setIsLoading(false), DEFAULT_DELAY);
    }
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
            <Button buttonStyle="primary" onClick={handleGenerateTrackingLink}>
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
