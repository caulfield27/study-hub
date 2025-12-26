import { useState } from "react";
import type { Props } from "./QuizCatd.types";
import { Card, CardBody } from "@heroui/card";
import { Rating } from "@/shared/ui/Rating/Rating";
import { Timer } from "lucide-react";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router";
import { Select, SelectItem } from "@heroui/select";
import { cn } from "@/shared/utils/clx";

export const QuizCard = ({ quizes, isScrollable }: Props) => {
  const navigate = useNavigate();
  const [selectedQuiz, setSelectedQuiz] = useState(quizes[0]);
  return (
    <Card className={cn("w-[250px] shrink-0", !isScrollable && "max-sm:w-full")}>
      <CardBody className="flex flex-col gap-6 max-sm:gap-2 justify-center items-center">
        <Select
          color="secondary"
          value={selectedQuiz.complexity}
          className="max-w-xs"
          labelPlacement="outside"
          label="Выберите сложность"
          onSelectionChange={(key) =>
            setSelectedQuiz(
              quizes.find(
                (quiz) => String(quiz.complexity) === key.currentKey
              ) ?? selectedQuiz
            )
          }
        >
          {quizes.map((data) => (
            <SelectItem
              textValue={data.quiz.complexity + ""}
              key={data.quiz.complexity}
            >
              <div className="flex flex-row gap-1.5 justify-center items-center">
                <span>{data.complexity}</span>
                <Rating rating={data.complexity} />
              </div>
            </SelectItem>
          ))}
        </Select>
        <span
          className="
                  font-bold text-center text-[20px] max-sm:text-[14px]
                  h-6 overflow-hidden text-ellipsis
                  line-clamp-1
                "
        >
          {selectedQuiz.quiz.name}
        </span>

        <img
          src={selectedQuiz.quiz.img}
          alt={selectedQuiz.quiz.name}
          className="w-[100px] h-[100px]"
        />
        <Rating rating={selectedQuiz.complexity} />
        <div className="flex flex-row justify-center items-center gap-1">
          <Timer className="max-sm:w-4" />
          <span className="max-sm:text-[12px]">3 мин</span>
        </div>
        <Button
          onPress={() => navigate(`/quizes/${selectedQuiz.quiz.id}`)}
          color="primary"
          variant="shadow"
          className="w-full"
        >
          Начать
        </Button>
      </CardBody>
    </Card>
  );
};
