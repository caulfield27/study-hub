import { QuizCard } from "@/pages/quizes/_components";
import type { ISearchData } from "../../SearchTypes";
import { getQuizes } from "@/pages/quizes/Quizes.utils";
import { Book } from "@/pages/library/_components";
import { useI18n } from "@/shared/i18n";

interface Props {
  data: ISearchData;
  total: number;
  query: string;
}

export const SearchResult = ({ data, total, query }: Props) => {
  const { t } = useI18n();
  const { books, quizes: quizesData, courses } = data;
  const quizes = getQuizes(quizesData);
  return (
    <div className="h-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-(--foreground) mb-2">{t("search.results")}</h1>
          <p className="text-(--muted-foreground)">
            {t("search.found", { total, query })}
          </p>
        </div>

        <div className="space-y-8">
          {courses.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold text-(--foreground)">{t("search.videos")}</h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {courses.length}
                </span>
              </div>
              <div className="flex flex-row flex-nowrap gap-6 overflow-auto no-scrollbar">
                {courses.map(() => (
                  <div></div>
                ))}
              </div>
            </section>
          )}

          {books.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold text-(--foreground)">{t("search.books")}</h2>
                <span className="bg-rose-100 text-rose-800 text-sm font-medium px-3 py-1 rounded-full">
                  {books.length}
                </span>
              </div>
              <div className="flex flex-row flex-nowrap gap-6 overflow-auto no-scrollbar">
                {books.map((book) => (
                  <Book key={book.id} book={book} isScrollable />
                ))}
              </div>
            </section>
          )}

          {quizes.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold text-(--foreground)">{t("search.quizzes")}</h2>
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                  {quizes.length}
                </span>
              </div>
              <div className="flex flex-row flex-nowrap gap-6 overflow-auto no-scrollbar">
                {quizes.map((quiz) => (
                  <QuizCard key={quiz.name} quizes={quiz.quizes} isScrollable />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
