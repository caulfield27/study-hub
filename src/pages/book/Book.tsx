import { api } from "@/shared/api/api.handlers";
import { apiRoutes } from "@/shared/api/api.routes";
import { Link, useParams } from "react-router";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import useSwr from "swr";
import { PageLoader } from "@/shared/ui/Loader/PageLoader";
import type { BookDetails } from "./Book.types";
import { Card } from "@heroui/card";
import { Image } from "@heroui/image";
import { getFile } from "@/shared/utils/getFile";
import { Button } from "@heroui/button";
import { BookOpen, Calendar, Download, MessageSquare } from "lucide-react";
import { Rating } from "@/shared/ui/Rating/Rating";
import { Divider } from "@heroui/divider";
import { useEffect, useState } from "react";
import { PdfReader, PostReview } from "./_components";

const Book = () => {
  // api
  const { id } = useParams();
  const swrKey = {
    method: "get",
    url: apiRoutes.books.getById(id ?? ""),
  };
  const {
    data: book,
    isLoading,
    mutate,
  } = useSwr<BookDetails>([swrKey, "public"], api.sendRequest);

  // locale states
  const [showPdfReader, setShowPdfReader] = useState(false);

  // event handlers
  async function handleDownload() {
    const response = await fetch(getFile(book?.pdf ?? ""));
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${book?.name ?? "book"}.pdf`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  // effect handlers
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return isLoading || !book ? (
    <PageLoader />
  ) : (
    <div>
      <Breadcrumbs color="secondary">
        <BreadcrumbItem>
          <Link to={"/library"}>Библиотека</Link>
        </BreadcrumbItem>
        <BreadcrumbItem isDisabled>{book.name}</BreadcrumbItem>
      </Breadcrumbs>
      {showPdfReader && (
        <PdfReader
          name={book.name}
          href={getFile(book.pdf)}
          onClose={() => setShowPdfReader(false)}
        />
      )}

      <div className="w-full mx-auto py-12">
        <Card className="overflow-hidden">
          <div className="flex flex-row gap-8 p-8 max-sm:p-4 max-[1200px]:flex-col">
            <div className="flex justify-center items-start shrink-0">
              <div className="w-full">
                <div className="w-full flex justify-center items-center">
                  <Image src={getFile(book.image)} alt={book.name} width={270} height={330}/>
                </div>

                <div className="mt-6 space-y-3 flex flex-col">
                  <Button
                    onPress={() => setShowPdfReader(true)}
                    size="lg"
                    color="primary"
                    startContent={<BookOpen className="shrink-0" />}
                  >
                    Читать онлайн
                  </Button>
                  <Button
                    size="lg"
                    variant={"ghost"}
                    startContent={<Download className="shrink-0" />}
                    onPress={handleDownload}
                  >
                    Скачать PDF
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-neutral-700 rounded-xl space-y-3 text-neutral-200">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 shrink-0" />
                    <span className="text-sm">Опубликовано: {book.released}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 shrink-0" />
                    <span className="text-sm">{book.reviews_count} отзывов</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 w-full">
              <div>
                <h1 className="text-4xl min-[1100px]:text-5xl font-bold leading-tight mb-6 max-sm:text-2xl">
                  {book.name}
                </h1>
                <p className="text-xl text-neutral-300 mb-6 max-sm:text-xl-[16px]">
                  by {book.author}
                </p>
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Rating rating={book.rating_avg ?? 0} />
                    <span className="text-2xl font-bold ml-2">{book.rating_avg ?? 0}</span>
                  </div>
                  <span>({book.reviews_count} оценок)</span>
                </div>
              </div>
              <Divider className="bg-neutral-700 mb-0" />
              <div className="pt-6">
                <h2 className="text-2xl font-bold mb-4 max-sm:text-xl">Про книгу</h2>
                <p className="leading-relaxed text-lg text-neutral-300 max-sm:text-medium">
                  {book.description}
                </p>
              </div>
              <Divider className="bg-neutral-700 mb-0" />

              <div className="pt-8">
                <PostReview bookId={book.id} reviews={book.reviews} onSuccess={() => mutate()} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Book;
