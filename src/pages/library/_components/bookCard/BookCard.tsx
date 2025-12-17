import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import type { Props } from "./BookCard.types";
import { Image } from "@heroui/image";
import { getFile } from "@/shared/utils/getFile";
import { PencilLine } from "lucide-react";
import { Rating } from "@/shared/ui/Rating/Rating";
import { useNavigate } from "react-router";
import { cn } from "@/shared/utils/clx";

export const Book = ({ book, isScrollable }: Props) => {
  const navigate = useNavigate();

  return (
    <Card className={cn("w-48 shrink-0", !isScrollable && 'max-sm:w-full')}>
      <CardBody className="p-0">
        <div className="flex flex-col gap-3.5">
          <div className={cn("w-full flex", !isScrollable && "max-sm:justify-center max-sm:mt-2")}>
            <Image
              alt={book.name}
              src={getFile(book.image)}
              className="w-48 h-64 object-cover"
            />
          </div>
          <div className="px-3 pb-3 flex flex-col gap-3">
            <div className="flex flex-col gap-2.5">
              <span className="h-12 overflow-hidden font-bold line-clamp-2">
                {book.name}
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 justify-start items-center">
                  <PencilLine size={14} className="shrink-0" />
                  <span className="h-6 overflow-hidden line-clamp-1 text-[#d4d4d4]">
                    {book.author}
                  </span>
                </div>
                <div className="text-[#d4d4d4] flex flex-row justify-start items-center gap-2">
                  <span>{book.rating_avg ?? 0}</span>
                  <Rating rating={book.rating_avg ?? 0} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <Button  color="primary" onPress={() => navigate(`/library/${book.id}`)}>
                Перейти
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
