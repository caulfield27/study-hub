import { useMemo, useState } from "react";
import { Alert } from "@heroui/alert";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Link } from "react-router";
import { Send } from "lucide-react";
import { Rating, ControlledRating } from "@/shared/ui/Rating/Rating";
import { useGlobalStore } from "@/shared/store";
import { formatDate } from "@/shared/utils/formateDate";
import type { ICourseReview } from "../../VideoCoursesTypes";

interface Props {
  initialReviews: ICourseReview[];
}

export const CourseReviews = ({ initialReviews }: Props) => {
  const isAuthed = useGlobalStore((state) => state.isAuthed);
  const user = useGlobalStore((state) => state.user);
  const [reviews, setReviews] = useState(initialReviews);
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const displayedName = useMemo(() => user?.username ?? author.trim(), [author, user]);

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
    setAuthor("");
    setIsSubmitted(true);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Отзывы</h2>
        <p className="text-neutral-400">Оценки и впечатления от студентов курса</p>
      </div>

      <Card className="border border-neutral-800 bg-neutral-900/80 p-5">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isAuthed && (
            <Alert
              color="warning"
              description="Войдите в аккаунт, чтобы оставить отзыв от своего имени."
              endContent={<Link to="/auth">Войти</Link>}
              variant="faded"
            />
          )}

          {isSubmitted && (
            <Alert
              color="success"
              description="Отзыв добавлен локально и отображается в списке ниже."
              variant="faded"
            />
          )}

          {!user && (
            <Input
              label="Ваше имя"
              placeholder="Например, Aigerim"
              value={author}
              onValueChange={setAuthor}
            />
          )}

          <div className="space-y-2">
            <label className="text-sm text-neutral-300">Ваша оценка</label>
            <ControlledRating value={rating} onChange={setRating} />
          </div>

          <Textarea
            label="Ваш отзыв"
            placeholder="Что было полезно в курсе?"
            minRows={4}
            value={comment}
            onValueChange={setComment}
          />

          <Button color="primary" type="submit" startContent={<Send className="h-4 w-4" />}>
            Submit review
          </Button>
        </form>
      </Card>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <Card className="border border-dashed border-neutral-800 bg-neutral-900/60 p-8 text-center text-neutral-400">
            Пока нет отзывов по этому курсу.
          </Card>
        ) : (
          reviews.map((review) => (
            <Card
              key={review.id}
              className="border border-neutral-800 bg-neutral-900/80 p-5"
            >
              <div className="flex gap-4">
                <Avatar color="primary" name={review.username} />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-medium text-white">{review.username}</p>
                      <p className="text-sm text-neutral-500">
                        {formatDate(review.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Rating rating={review.rating} />
                      <span className="text-sm text-white">{review.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-neutral-300">{review.comment}</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
