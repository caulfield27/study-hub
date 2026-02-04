import { Search } from "lucide-react";

interface Props {
  query: string;
}

export const SearchNotFound = ({ query }: Props) => {
  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="text-center">
        <Search className="w-16 h-16 text-neutral-50 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-neutral-300 mb-2">Нет результатов</h2>
        <p className="text-gray-400">
          По запросу "<span className="font-semibold">{query}</span>" ничего не найдено, попробуйте
          использовать другое слово
        </p>
      </div>
    </div>
  );
};
