import { useGlobalStore } from "@/shared/store";
import type { Props } from "./PostReview.types";
import { Alert } from "@heroui/alert";
import { Link } from "react-router";
import { ControlledRating, Rating } from "@/shared/ui/Rating/Rating";
import { useState } from "react";
import { Button } from "@heroui/button";
import { Send } from "lucide-react";
import { api } from "@/shared/api/api.handlers";
import { apiRoutes } from "@/shared/api/api.routes";
import { Avatar } from "@heroui/avatar";
import { formatDate } from "@/shared/utils/formateDate";

export const PostReview = ({ bookId, reviews, onSuccess }: Props) => {
  // zustand store states
  const isAuthed = useGlobalStore((state) => state.isAuthed);
  const user = useGlobalStore((state) => state.user);

  // locale states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const payload = {
        book_id: bookId,
        user_id: user?.id,
        rating: newRating,
        comment: newReview,
      };
      await api.sendRequest([
        {
          method: "post",
          url: apiRoutes.books.postReview(bookId),
          data: payload,
        },
        "private",
      ]);
      onSuccess();
      setIsSuccess(true);
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Неизвестная ошибка");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 max-sm:text-xl">
        Отзывы пользователей ({reviews.length})
      </h2>

      <form
        onSubmit={handleSubmit}
        onReset={() => {
          setError(null);
          setNewRating(5);
          setNewReview("");
        }}
        className="mb-8 bg-neutral-700 rounded-xl p-6 max-sm:p-4"
      >
        {!isAuthed && (
          <div className="flex items-center justify-center w-full">
            <Alert
              color="warning"
              endContent={<Link to={"/auth"}>Войти</Link>}
              description="Войдите в аккаунт чтобы оставить отзыв"
              variant="faded"
            />
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center w-full">
            <Alert
              color="danger"
              endContent={
                <Button color="danger" size="md" variant="flat" type="reset">
                  Повторить
                </Button>
              }
              title="Не удалось опубликовать отзыв"
              description={error}
              variant="faded"
            />
          </div>
        )}
        {isSuccess ? (
          <div className="flex items-center justify-center w-full">
            <Alert
              color="success"
              title="Ваш отзыв успешно опубликован"
              description={""}
              variant="faded"
            />
          </div>
        ) : (
          <>
            <h3 className="text-lg font-semibold mb-4">Поделитесь своими мыслями</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Ваш рейтинг</label>
                <ControlledRating
                  value={newRating}
                  onChange={(rating) => setNewRating(rating)}
                  isDisabled={!isAuthed}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ваш отзыв</label>
                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Что вы думаете об этой книге?"
                  rows={4}
                  className="w-full bg-neutral-600 px-4 py-3 border border-neutral-500 rounded-lg focus:ring-2 focus:ring-neutral-800 focus:border-transparent transition-all outline-none resize-none"
                  required
                  disabled={!isAuthed}
                />
              </div>

              <Button
                color="primary"
                type="submit"
                isDisabled={isSubmitting || !isAuthed}
                isLoading={isSubmitting}
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Публикуется..." : "Опубликовать"}
              </Button>
            </div>
          </>
        )}
      </form>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg">
              Пока нет отзывов. Станьте первым, кто поделится своим мнением!
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-neutral-700 border border-neutral-600 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <Avatar color="primary" name={review.username} />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{review.username}</h4>
                      <p className="text-sm text-neutral-400">{formatDate(review.created_at)}</p>
                    </div>
                    <Rating rating={review.rating} />
                  </div>
                  <p className="leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
