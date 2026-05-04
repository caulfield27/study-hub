import { cn } from "@/shared/utils/clx";
import { Input } from "@heroui/input";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useI18n } from "@/shared/i18n";

export const GlobalSearch = () => {
  const { t } = useI18n();
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
    if (
      !inputRef.current?.contains(target) &&
      !btnRef.current?.contains(target)
    ) {
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
          placeholder={t("search.placeholder")}
          color="secondary"
          className="w-full min-w-42.5 max-sm:min-w-30"
          classNames={{
            input:
              "placeholder:text-(--muted-foreground) text-(--muted-foreground)",
            inputWrapper: [
              "bg-[var(--surface)]",
              "border border-[var(--border-color)]",
              "hover:bg-[var(--surface-soft)]",
              "focus-within:ring-2 focus-within:ring-[var(--primary-color)]",
            ],
          }}
          endContent={
            <button
              onClick={handleSearch}
              className="border-0 outline-none bg-transparent cursor-pointer"
            >
              <Search className="text-(--muted-foreground)" />
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
            "cursor-pointer flex justify-center items-center border outline-0 p-2 rounded-xl theme-surface theme-text",
            showInput && "hidden",
          )}
        >
          <Search />
        </button>
        {showInput && (
          <div className="fixed left-0 top-4 z-130 w-screen flex justify-center">
            <div className="w-[90vw]">
              <Input
                ref={inputRef}
                onChange={(event) => setSearchValue(event.target.value)}
                value={searchValue}
                placeholder={t("search.shortPlaceholder")}
                color="secondary"
                className="w-full"
                classNames={{
                  input:
                    "placeholder:text-(--muted-foreground) text-(--muted-foreground)",
                  inputWrapper: [
                    "bg-(--surface)",
                    "border border-(--border-color)",
                    "hover:bg-(--surface-soft)!",
                    "focus-within:ring-2 focus-within:ring-(--primary-color)",
                  ],
                }}
                endContent={
                  <button
                    onClick={handleSearch}
                    className="border-0 outline-none bg-transparent cursor-pointer"
                  >
                    <Search className="text-(--muted-foreground)" />
                  </button>
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
