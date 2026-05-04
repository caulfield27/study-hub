import { Button } from "@heroui/button";
import { AlertCircle } from "lucide-react";
import { useI18n } from "@/shared/i18n";

interface Props{
    refetch: () => void;
}

export const SearchError = ({refetch} : Props) => {
    const { t } = useI18n();
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-(--foreground) mb-2">
            {t("search.error")}
          </h2>
          <Button color="primary" onPress={refetch}>{t("common.retry")}</Button>
        </div>
      </div>
    );
}
