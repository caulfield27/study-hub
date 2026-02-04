import { Button } from "@heroui/button";
import { AlertCircle } from "lucide-react";

interface Props{
    refetch: () => void;
}

export const SearchError = ({refetch} : Props) => {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-neutral-100 mb-2">
            Ошибка поиска.
          </h2>
          <Button color="primary" onPress={refetch}>Повторить</Button>
        </div>
      </div>
    );
}