import { cn } from "@/shared/utils/clx";
import { Input } from "@heroui/input";
import { Search } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

export const GlobalSearch = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = () => {
    setShowInput(false);
    if (!searchValue) return;
    setSearchValue("");
    navigate(`/search?q=${searchValue}`);
  };

  const openSearchInput = () => {
    setShowInput(true);
    inputRef.current?.focus();
  };

  return (
    <>
      <div className="max-[930px]:hidden block">
        <Input
          onChange={(event) => setSearchValue(event.target.value)}
          value={searchValue}
          placeholder="Ищите курсы, книги, тесты..."
          color="secondary"
          className={cn("w-full min-w-[170px] max-sm:min-w-[120px]")}
          classNames={{ input: "placeholder:text-neutral-500" }}
          endContent={
            <button onClick={handleSearch} className="border-0 outline-0 bg-none cursor-pointer">
              <Search />
            </button>
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
        />
      </div>
      <div className="max-[930px]:flex hidden justify-center items-center">
        <button
          onClick={openSearchInput}
          className={cn(
            "cursor-pointer flex justify-center items-center border-0 outline-0 bg-[#1d1d1d] p-2 rounded-xl",
            showInput && "hidden",
          )}
        >
          <Search />
        </button>
        <Input
          ref={inputRef}
          onChange={(event) => setSearchValue(event.target.value)}
          value={searchValue}
          color="secondary"
          placeholder="поиск..."
          className={cn("w-[150px]", !showInput && "hidden")}
          classNames={{ input: "placeholder:text-neutral-500 max-[930px]:placeholder:none" }}
          endContent={
            <button onClick={handleSearch} className="border-0 outline-0 bg-none cursor-pointer">
              <Search />
            </button>
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
        />
      </div>
    </>
  );
};
