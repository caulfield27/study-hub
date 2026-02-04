import { QuizCard } from "@/pages/quizes/_components";
import type { ISearchData } from "../../SearchTypes";
import { getQuizes } from "@/pages/quizes/Quizes.utils";
import { Book } from "@/pages/library/_components";

interface Props {
  data: ISearchData;
  total: number;
  query: string;
}

export const SearchResult = ({ data, total, query }: Props) => {
  const { books, quizes: quizesData, courses } = data;
  const quizes = getQuizes(quizesData);
  return (
    <div className="h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-100 mb-2">Результаты поиска</h1>
          <p className="text-neutral-300">
            Найдено <span className="font-semibold">{total}</span> результатов для "
            <span className="font-semibold">{query}</span>"
          </p>
        </div>

        <div className="space-y-8">
          {courses.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold text-neutral-100">Видеоуроки</h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {courses.length}
                </span>
              </div>
              <div className="flex flex-row flex-nowrap gap-6 overflow-auto no-scrollbar">
                {courses.map((course) => (
                  <div></div>
                ))}
              </div>
            </section>
          )}

          {books.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold text-neutral-100">Книги</h2>
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
                <h2 className="text-2xl font-bold text-neutral-100">Тесты</h2>
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
