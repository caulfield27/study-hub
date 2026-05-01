import { useEffect, type ReactNode } from "react";
import i18n from "i18next";
import { I18nextProvider, initReactI18next, useTranslation } from "react-i18next";
import en from "./locales/en.json";
import ru from "./locales/ru.json";
import tg from "./locales/tg.json";

export type Locale = "ru" | "tg" | "en";

const STORAGE_KEY = "study-hub-locale";
const FALLBACK_LOCALE: Locale = "en";
const SUPPORTED_LOCALES: Locale[] = ["ru", "tg", "en"];

const resources = {
  ru: { translation: ru },
  tg: { translation: tg },
  en: { translation: en },
} as const;

function isLocale(value: string | null | undefined): value is Locale {
  return value === "ru" || value === "tg" || value === "en";
}

function detectInitialLocale(): Locale {
  const savedLocale = localStorage.getItem(STORAGE_KEY);
  if (isLocale(savedLocale)) {
    return savedLocale;
  }

  const browserLocale = navigator.language.toLowerCase();
  if (browserLocale.startsWith("ru")) {
    return "ru";
  }
  if (browserLocale.startsWith("tg")) {
    return "tg";
  }

  return FALLBACK_LOCALE;
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: detectInitialLocale(),
    fallbackLng: FALLBACK_LOCALE,
    supportedLngs: SUPPORTED_LOCALES,
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
  });
}

function getLocaleFromI18n(): Locale {
  const language = i18n.resolvedLanguage ?? i18n.language;
  return isLocale(language) ? language : FALLBACK_LOCALE;
}

function getIntlLocale(locale: Locale) {
  return locale === "ru" ? "ru-RU" : locale === "tg" ? "tg-TJ" : "en-US";
}

type TranslateParams = Record<string, string | number>;

export function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const syncDomLanguage = (language: string) => {
      const locale = isLocale(language) ? language : FALLBACK_LOCALE;
      localStorage.setItem(STORAGE_KEY, locale);
      document.documentElement.lang = locale;
    };

    syncDomLanguage(getLocaleFromI18n());
    i18n.on("languageChanged", syncDomLanguage);

    return () => {
      i18n.off("languageChanged", syncDomLanguage);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export function useI18n() {
  const { t: translate } = useTranslation();
  const locale = getLocaleFromI18n();

  return {
    locale,
    setLocale: (nextLocale: Locale) => {
      void i18n.changeLanguage(nextLocale);
    },
    t: (key: string, params?: TranslateParams) => translate(key, params) as string,
  };
}

export function getLocalizedCourseLanguageLabel(language: Locale, t: (key: string, params?: TranslateParams) => string) {
  return t(`locales.${language}`);
}

export function getLocalizedCategoryLabel(category: string, t: (key: string, params?: TranslateParams) => string) {
  const map: Record<string, string> = {
    Frontend: "courses.frontend",
    Backend: "courses.backend",
    DevOps: "courses.devops",
    Mobile: "courses.mobile",
    "Data Science": "courses.dataScience",
    Career: "courses.career",
  };

  return map[category] ? t(map[category]) : category;
}

export function formatRelativeDate(
  dateString: string,
  locale: Locale,
  t: (key: string, params?: TranslateParams) => string,
) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return t("common.today");
  if (diffInDays === 1) return t("common.yesterday");

  if (diffInDays < 7) {
    if (locale === "ru") {
      if (diffInDays === 1) return t("common.daysAgoOne", { count: diffInDays });
      if (diffInDays < 5) return t("common.daysAgoFew", { count: diffInDays });
      return t("common.daysAgoMany", { count: diffInDays });
    }

    return t("common.daysAgoMany", { count: diffInDays });
  }

  if (diffInDays < 30) {
    return t("common.weeksAgo", { count: Math.floor(diffInDays / 7) });
  }

  return date.toLocaleDateString(getIntlLocale(locale), {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
