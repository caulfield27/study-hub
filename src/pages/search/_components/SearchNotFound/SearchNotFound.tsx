import { Search } from "lucide-react";
import { useI18n } from "@/shared/i18n";

interface Props {
  query: string;
}

export const SearchNotFound = ({ query }: Props) => {
  const { t } = useI18n();
  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="text-center">
        <Search className="w-16 h-16 text-neutral-50 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-neutral-300 mb-2">{t("search.noResults")}</h2>
        <p className="text-gray-400">
          {t("search.noResultsDescription", { query })}
        </p>
      </div>
    </div>
  );
};
