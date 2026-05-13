import { useState } from "react";
import { Alert } from "@heroui/alert";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Link } from "react-router";
import { Send } from "lucide-react";
import { Rating, ControlledRating } from "@/shared/ui/Rating/Rating";
import { useGlobalStore } from "@/shared/store";
import { formatDate } from "@/shared/utils/formateDate";
import type { ICourseReview } from "../../../videoCourses/VideoCoursesTypes";
import { useI18n } from "@/shared/i18n";
import { api } from "@/shared/api/api.handlers";
import { apiRoutes } from "@/shared/api/api.routes";

interface Props {
  course_id: number;
  reviews: ICourseReview[];
  onSuccess: () => void;
}

export const CourseReviews = ({ course_id, reviews, onSuccess }: Props) => {
  const { locale, t } = useI18n();
  const isAuthed = useGlobalStore((state) => state.isAuthed);
  const user = useGlobalStore((state) => state.user);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayedName = user?.username ?? "";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!displayedName || !comment.trim()) {
      return;
    }
    try {
      setIsSubmitting(true);
      const payload = {
        course_id,
        user_id: user?.id,
        rating: rating,
        comment,
      };
      await api.sendRequest([
        {
          method: "post",
          url: apiRoutes.courses.postReview(course_id),
          data: payload,
        },
        "private",
      ]);
      setIsSubmitted(true);
      setComment("");
      setRating(5);
      onSuccess();
    } catch (e: any) {
      setError(e?.response?.data?.message ?? t("auth.unknownError"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="theme-text text-2xl font-semibold">
          {t("courses.courseReviews")}
        </h2>
        <p className="theme-text-muted">{t("courses.reviewsSubtitle")}</p>
      </div>

      <Card className="theme-surface-soft border p-5 max-sm:border-0 max-sm: bg-transparent! max-sm:p-0 max-sm:shadow-none!">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isAuthed && (
            <Alert
              color="warning"
              description={t("courses.loginToReview")}
              endContent={<Link to="/auth">{t("common.login")}</Link>}
              variant="flat"
            />
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
                variant="flat"
              />
            </div>
          )}

          {isSubmitted && (
            <Alert
              color="success"
              description={t("library.reviewPublishSuccess")}
              variant="flat"
            />
          )}
          <div className="space-y-2">
            <label className="theme-text-muted text-sm">
              {t("courses.yourRating")}
            </label>
            <ControlledRating
              isDisabled={!isAuthed}
              value={rating}
              onChange={setRating}
            />
          </div>
          <div>
            <label className="theme-text-muted block text-sm font-medium mb-2">
              {t("courses.yourReview")}
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t("courses.courseReviewPlaceholder")}
              rows={4}
              className="theme-surface w-full px-4 py-3 border theme-border rounded-lg focus:ring-2 focus:ring-(--primary-color)/35 focus:border-transparent transition-all outline-none resize-none"
              required
              disabled={!isAuthed}
            />
          </div>

          <Button
            disabled={!isAuthed || isSubmitting}
            className="disabled:opacity-50 disabled:pointer-events-none"
            isLoading={isSubmitting}
            color="primary"
            type="submit"
            startContent={<Send className="h-4 w-4" />}
          >
            {isSubmitting ? t("library.publishing") : t("library.publish")}
          </Button>
        </form>
      </Card>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <Card className="theme-surface border-dashed theme-border p-8 text-center theme-text-muted">
            {t("courses.noCourseReviews")}
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="theme-surface border p-5 max-sm:py-4 max-sm:px-3">
              <div className="flex gap-4">
                <Avatar color="primary" name={review.username} />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="theme-text font-medium">
                        {review.username}
                      </p>
                      <p className="theme-text-muted text-sm">
                        {formatDate(review.created_at, locale, t)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Rating rating={review.rating} />
                    </div>
                  </div>
                  <p className="theme-text-muted text-sm leading-6">
                    {review.comment}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
