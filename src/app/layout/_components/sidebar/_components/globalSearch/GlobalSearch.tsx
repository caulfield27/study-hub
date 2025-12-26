import { Input } from "@heroui/input";
import { Search } from "lucide-react";

export const GlobalSearch = () => {
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log(event.currentTarget.value);
    }
  };

  return (
    <Input
      placeholder="Ищите курсы, книги, тесты..."
      color="secondary"
      className="w-full"
      classNames={{ input: "placeholder:text-neutral-500" }}
      endContent={<Search />}
      onKeyDown={handleSearch}
    />
  );
};
