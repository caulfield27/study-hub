import { Input } from "@heroui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export const GlobalSearch = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (!searchValue) return;
    setSearchValue("");
    navigate(`search?q=${searchValue}`);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Input
      placeholder="Ищите курсы, книги, тесты..."
      value={searchValue}
      color="secondary"
      className="w-full"
      classNames={{ input: "placeholder:text-neutral-500" }}
      endContent={
        <div role="button" onClick={handleSearch} className="cursor-pointer">
          <Search />
        </div>
      }
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchValue(e.target.value)
      }
      onKeyDown={handleKeyPress}
    />
  );
};
