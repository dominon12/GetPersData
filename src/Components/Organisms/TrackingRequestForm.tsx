import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import "./TrackingRequestForm.scss";
import Button from "../Atoms/Button";
import ToggleSwitch from "../Atoms/ToggleSwitch";
import Input from "../Atoms/Input";
import Subtitle from "../Atoms/Subtitle";
import Title from "../Atoms/Title";
import SocialLinks from "../Molecules/SocialLinks";

const TrackingRequestForm: React.FC = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [hideAddress, setHideAddress] = useState(true);
  const [askGeolocation, setAskGeolocation] = useState(false);
  const [askVideo, setAskVideo] = useState(false);
  const [askAudio, setAskAudio] = useState(false);

  const handleFormSubmit = () => {};

  return (
    <div className="tracking-request-form">
      <Title className="tracking-request-form__title">{t("form.title")}</Title>
      <Subtitle className="tracking-request-form__subtitle">
        {t("form.options")}
      </Subtitle>
      <div className="tracking-request-form__form-fields">
        <Input
          value={email}
          handleChange={setEmail}
          placeholder={t("form.fields.your_email")}
          label={t("form.fields.email")}
          type="email"
          required
        />
        <Input
          value={redirectUrl}
          handleChange={setRedirectUrl}
          placeholder={t("form.fields.redirectUrlExplicit")}
          label={t("form.fields.redirectUrl")}
          type="url"
          required
        />
        <ToggleSwitch
          checked={hideAddress}
          handleChange={setHideAddress}
          label={t("form.fields.hideAddress")}
        />
        <ToggleSwitch
          checked={askGeolocation}
          handleChange={setAskGeolocation}
          label={t("form.fields.askGeolocation")}
        />
        <ToggleSwitch
          checked={askVideo}
          handleChange={setAskVideo}
          label={t("form.fields.askVideo")}
        />
        <ToggleSwitch
          checked={askAudio}
          handleChange={setAskAudio}
          label={t("form.fields.askAudio")}
        />
      </div>
      <div className="horizontal-container">
        <Button buttonStyle="primary" onClick={handleFormSubmit}>
          {t("form.begin")}
        </Button>
        <SocialLinks />
      </div>
    </div>
  );
};

export default TrackingRequestForm;
