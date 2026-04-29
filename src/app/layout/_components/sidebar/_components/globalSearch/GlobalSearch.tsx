import { cn } from "@/shared/utils/clx";
import { Input } from "@heroui/input";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

export const GlobalSearch = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const handleSearch = () => {
    window.removeEventListener("click", handleOpenSearch);
    setShowInput(false);
    if (!searchValue) return;
    setSearchValue("");
    navigate(`/search?q=${searchValue}`);
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node;
    if (!inputRef.current?.contains(target) && !btnRef.current?.contains(target)) {
      setShowInput(false);
      window.removeEventListener("click", handleClickOutside);
    }
  };

  const handleOpenSearch = () => {
    setTimeout(() => window.addEventListener("click", handleClickOutside));
    setShowInput(true);
  };

  useEffect(() => {
    if (showInput) {
      inputRef.current?.focus();
    }
  }, [showInput]);

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
          ref={btnRef}
          onClick={handleOpenSearch}
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
          className={cn("w-[200px]", !showInput && "hidden")}
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
