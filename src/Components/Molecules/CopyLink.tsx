import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiFileCopy2Fill } from "react-icons/ri";
import { IoMdDoneAll } from "react-icons/io";

import "./CopyLink.scss";
import Button from "../Atoms/Button";
import Input from "../Atoms/Input";
import SocialLinks from "./SocialLinks";

interface Props {
  link: string;
  handleStartAgain: () => void;
}

const CopyLink: React.FC<Props> = ({ link, handleStartAgain }) => {
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  const copyLinkToClipboard = async () => {
    inputRef.current?.select();
    inputRef.current?.focus();
    try {
      await navigator.clipboard.writeText(link);
      setIsCopied(true);
    } catch {
      console.error("Unable to copy :(");
    }
  };

  const renderIcon = () =>
    isCopied ? (
      <IoMdDoneAll
        className="copy-link__icon done"
        onClick={() => setIsCopied(false)}
      />
    ) : (
      <RiFileCopy2Fill
        className="copy-link__icon copy"
        onClick={copyLinkToClipboard}
      />
    );

  return (
    <div className="copy-link">
      <div className="copy-link__container">
        <Input value={link} ref={inputRef} />
        {renderIcon()}
      </div>
      <div className="copy-link__button-container">
        <Button buttonStyle="primary" onClick={handleStartAgain}>
          {t("form.startAgain")}
        </Button>
        <SocialLinks />
      </div>
    </div>
  );
};

export default CopyLink;
