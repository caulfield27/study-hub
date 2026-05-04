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

interface Props {
  initialReviews: ICourseReview[];
}

export const CourseReviews = ({ initialReviews }: Props) => {
  const { locale, t } = useI18n();
  const isAuthed = useGlobalStore((state) => state.isAuthed);
  const user = useGlobalStore((state) => state.user);
  const [reviews, setReviews] = useState(initialReviews);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const displayedName = user?.username ?? "";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!displayedName || !comment.trim()) {
      return;
    }

    setReviews((prev) => [
      {
        id: Date.now(),
        username: displayedName,
        rating,
        comment: comment.trim(),
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);
    setComment("");
    setRating(5);
    setIsSubmitted(true);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="theme-text text-2xl font-semibold">
          {t("courses.courseReviews")}
        </h2>
        <p className="theme-text-muted">{t("courses.reviewsSubtitle")}</p>
      </div>

      <Card className="theme-surface-soft border p-5">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isAuthed && (
            <Alert
              color="warning"
              description={t("courses.loginToReview")}
              endContent={<Link to="/auth">{t("common.login")}</Link>}
              variant="flat"
            />
          )}

          {isSubmitted && (
            <Alert
              color="success"
              description={t("courses.reviewAdded")}
              variant="flat"
            />
          )}
          <div className="space-y-2">
            <label className="theme-text-muted text-sm">
              {t("courses.yourRating")}
            </label>
            <ControlledRating value={rating} onChange={setRating} />
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
            color="primary"
            type="submit"
            startContent={<Send className="h-4 w-4" />}
          >
            {t("common.submit")}
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
            <Card key={review.id} className="theme-surface border p-5">
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
                      <span className="theme-text text-sm">
                        {review.rating.toFixed(1)}
                      </span>
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
