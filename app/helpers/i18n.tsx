import * as RNLocalize from "react-native-localize";

import pt from "app/resources/locales/pt-BR";
import en from "app/resources/locales/en-US";

const I18n = require("i18n-js");

I18n.translations = {
  pt,
  en
};

I18n.defaultLocale = "en-US";
I18n.fallbacks = true;

const locales = RNLocalize.getLocales();
if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}
export const toggleLanguage = () => {
  I18n.locale = I18n.locale == "en-US" ? "pt-BR" : "en-US";
}
export default I18n;
