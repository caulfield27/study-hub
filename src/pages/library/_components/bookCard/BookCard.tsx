import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import type { Props } from "./BookCard.types";
import { Image } from "@heroui/image";
import { getFile } from "@/shared/utils/getFile";
import { PencilLine } from "lucide-react";
import { Rating } from "@/shared/ui/Rating/Rating";
import { useNavigate } from "react-router";
import { cn } from "@/shared/utils/clx";
import { useI18n } from "@/shared/i18n";

export const Book = ({ book, isScrollable }: Props) => {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <Card className={cn("theme-surface w-[270px] shrink-0 border", !isScrollable && "max-sm:w-full")}>
      <CardBody className="p-0">
        <div className="flex flex-col gap-3.5">
          <div className={cn("w-full flex", !isScrollable && "max-sm:justify-center max-sm:mt-2")}>
            <Image
              alt={book.name}
              src={getFile(book.image)}
              width={270}
              height={330}
              className="rounded-none rounded-tl-large rounded-tr-large"
            />
          </div>
          <div className="px-3 pb-3 flex flex-col gap-3">
            <div className="flex flex-col gap-2.5">
              <span className="theme-text h-12 overflow-hidden font-bold line-clamp-2">
                {book.name}
              </span>
              <div className="flex flex-col gap-1">
                <div className="theme-text-muted flex flex-row gap-2 justify-start items-center">
                  <PencilLine size={14} className="shrink-0" />
                  <span className="h-6 overflow-hidden line-clamp-1">
                    {book.author}
                  </span>
                </div>
                <div className="theme-text-muted flex flex-row justify-start items-center gap-2">
                  <span className="theme-text font-medium">{book.rating_avg ?? 0}</span>
                  <Rating rating={book.rating_avg ?? 0} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <Button  color="primary" onPress={() => navigate(`/library/${book.id}`)}>
                {t("library.openBook")}
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
