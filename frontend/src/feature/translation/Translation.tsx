import React, { type FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type TransitionState, setLang } from "../../redux/modules/translations";
import { i18n } from "../../locales/config";
import jaIcon from "../../images/ja.png";
import enIcon from "../../images/en.png";

export const TranslationComponent: FC = () => {
  const lang = useSelector<TransitionState, string>((state) => state.lang);
  const dispatch = useDispatch();

  const translationLang = (lang: string) => {
    void i18n.changeLanguage(lang);
    dispatch(setLang(lang));
  };

  useEffect(() => {
    if (lang) {
      void i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <div>
      <img
        src={jaIcon}
        alt="ja"
        title="ja"
        onClick={() => translationLang("ja")}
      />
      <img
        src={enIcon}
        alt="en"
        title="en"
        onClick={() => translationLang("en")}
      />
    </div>
  );
};
