import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import "./TrackingRequestForm.scss";
import Button from "../Atoms/Button";
import Subtitle from "../Atoms/Subtitle";
import Title from "../Atoms/Title";
import SocialLinks from "../Molecules/SocialLinks";
import Form from "../Molecules/Form";
import { FormField } from "../../Types/Types";
import { checkFormValid } from "../../Services/FormService";
import StoriesCarousel from "./StoriesCarousel";
import { getStories } from "../../Services/StoriesService";

const TrackingRequestForm: React.FC = () => {
  const { t } = useTranslation();

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

  const [formState, setFormState] = useState({});

  const handleFormSubmit = () => {
    const formValid = checkFormValid(formFields, formState);
    if (formValid) {
      // TODO: call backend, get generated TrackingRequest's code, show it.
    }
  };

  return (
    <div className="tracking-request-form">
      <Title className="tracking-request-form__title">{t("form.title")}</Title>
      <StoriesCarousel
        stories={getStories(t)}
        containerClass="show-after-laptop"
      />
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
        <Button buttonStyle="primary" onClick={handleFormSubmit}>
          {t("form.begin")}
        </Button>
        <SocialLinks />
      </div>
    </div>
  );
};

export default TrackingRequestForm;
