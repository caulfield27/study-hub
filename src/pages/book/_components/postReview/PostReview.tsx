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
import { useI18n } from "@/shared/i18n";

export const PostReview = ({ bookId, reviews, onSuccess }: Props) => {
  const { locale, t } = useI18n();
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
      setError(e?.response?.data?.message ?? t("auth.unknownError"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <h2 className="theme-text text-2xl font-bold mb-6 max-sm:text-xl">
        {t("library.userReviews", { count: reviews.length })}
      </h2>

      <form
        onSubmit={handleSubmit}
        onReset={() => {
          setError(null);
          setNewRating(5);
          setNewReview("");
        }}
        className="theme-surface-soft mb-8 rounded-xl p-6 max-sm:p-4 border theme-border"
      >
        {!isAuthed && (
          <div className="flex items-center justify-center w-full">
            <Alert
              color="warning"
              endContent={<Link to={"/auth"}>{t("common.login")}</Link>}
              description={t("library.loginToReview")}
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
                  {t("common.retry")}
                </Button>
              }
              title={t("library.reviewPublishError")}
              description={error}
              variant="faded"
            />
          </div>
        )}
        {isSuccess ? (
          <div className="flex items-center justify-center w-full">
            <Alert
              color="success"
              title={t("library.reviewPublishSuccess")}
              description={""}
              variant="faded"
            />
          </div>
        ) : (
          <>
            <h3 className="theme-text text-lg font-semibold mb-4">{t("library.shareThoughts")}</h3>

            <div className="space-y-4">
              <div>
                <label className="theme-text-muted block text-sm font-medium mb-2">{t("library.yourRating")}</label>
                <ControlledRating
                  value={newRating}
                  onChange={(rating) => setNewRating(rating)}
                  isDisabled={!isAuthed}
                />
              </div>

              <div>
                <label className="theme-text-muted block text-sm font-medium mb-2">{t("library.yourReview")}</label>
                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder={t("library.reviewPlaceholder")}
                  rows={4}
                  className="theme-surface w-full px-4 py-3 border theme-border rounded-lg focus:ring-2 focus:ring-(--primary-color)/35 focus:border-transparent transition-all outline-none resize-none"
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
                {isSubmitting ? t("library.publishing") : t("library.publish")}
              </Button>
            </div>
          </>
        )}
      </form>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="theme-text-muted text-lg">
              {t("library.noReviews")}
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="theme-surface-soft border theme-border rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <Avatar color="primary" name={review.username} />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="theme-text font-semibold">{review.username}</h4>
                      <p className="theme-text-muted text-sm">{formatDate(review.created_at, locale, t)}</p>
                    </div>
                    <Rating rating={review.rating} />
                  </div>
                  <p className="theme-text-muted leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
