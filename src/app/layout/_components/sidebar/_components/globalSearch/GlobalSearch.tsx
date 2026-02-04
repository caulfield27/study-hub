import { useGlobalStore } from "@/shared/store";
import { cn } from "@/shared/utils/clx";
import { Input } from "@heroui/input";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

export const GlobalSearch = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const isSidebarHidden = useGlobalStore((state) => state.isSidebarHidden);
  const setIsSidebarHidden = useGlobalStore((state) => state.setIsSidebarHidden);
  const searchClicked = useRef(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleSearch = () => {
    if (window.innerWidth <= 930) {
      setIsSidebarHidden(true);
    }

    if (!searchValue) return;
    navigate(`/search?q=${searchValue}`);
  };

  useEffect(() => {
    if (!isSidebarHidden && searchClicked.current) {
      inputRef.current?.focus();
    }
  }, [isSidebarHidden]);

  function handleOpenSearch() {
    if (!searchClicked.current) {
      searchClicked.current = true;
    }
    setIsSidebarHidden(false);
  }

  return (
    <>
      <button
        onClick={handleOpenSearch}
        className={cn(
          "cursor-pointer flex justify-center items-center border-0 outline-0 bg-[#1d1d1d] p-2 rounded-xl",
          !isSidebarHidden && "hidden",
        )}
      >
        <Search />
      </button>
      <Input
        ref={inputRef}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="Ищите курсы, книги, тесты..."
        color="secondary"
        className={cn("w-full min-w-[170px] max-sm:min-w-[120px]", isSidebarHidden && "hidden")}
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
    </>
  );
};
