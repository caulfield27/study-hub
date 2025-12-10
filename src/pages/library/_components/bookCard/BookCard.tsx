import { base_url } from "@/shared/api/api.config";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import type { Props } from "./BookCard.types";

export const Book = ({ book, onBookOpen }: Props) => {
  function handleRead(e: any) {
    window.open(e.target.value, "_blank");
  }

  return (
    <Card className="w-48 max-sm:w-full">
      <CardBody>
        <div className="flex flex-col gap-[15px]">
          <img
            src={`${base_url}/${book.image}`}
            alt={book.name}
            className="max-w-full h-[200px] max-sm:h-[300px] object-cover"
          />
          <div className="flex flex-col gap-[5px]">
            <span className="h-12 overflow-hidden font-bold line-clamp-2">
              {book.name}
            </span>
            <span className="h-6 overflow-hidden line-clamp-1 text-[#d4d4d4]">
              {book.author}
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            <Button color="primary" onPress={handleRead}>читать</Button>
            <Button color="secondary" onPress={onBookOpen}>подробнее</Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
