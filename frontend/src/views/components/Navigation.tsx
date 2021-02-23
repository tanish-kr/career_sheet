import React, { FC } from "react";
import { Dispatch } from "redux";
// import { connect } from "react-redux";
// import { useTranslation } from "react-i18next";
// import { TransitionActions } from "../../ducks/translations"
//
interface NavigationProps {
  lang?: string;
  dispatch: Dispatch;
}
//
const Navigation: FC<NavigationProps> = () => {
  //   const { t, i18n } = useTranslation();
  //   const { lang, dispatch } = this.props;
  //   return (
  //     <Section>
  //       <Button onClick={() => setLang(lang === "en" ? "ja" : "en")}>
  //         {t("switch_language")}
  //       </Button>
  //     </Section>
  //   )
  return <div></div>;
};
//
export default Navigation;
