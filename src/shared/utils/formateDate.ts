import { formatRelativeDate, type Locale } from "@/shared/i18n";

export const formatDate = (
  dateString: string,
  locale: Locale,
  t: (key: string, params?: Record<string, string | number>) => string,
) => formatRelativeDate(dateString, locale, t);
