import { useState } from "react";
import { splitQuestion } from "@/shared/utils/utils";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Rating } from "@/shared/ui/Rating/Rating";
import { Progress } from "./_components";
import { Modal, ModalContent } from "@heroui/modal";
import { Button } from "@heroui/button";
import { ArrowLeft, CircleX } from "lucide-react";
import { useNavigate } from "react-router";
import type { Props } from "./Result.types";
import { useI18n } from "@/shared/i18n";
import { CircleCheckBig } from "lucide-react";

export function Result({ result, quiz, userSelects }: Props) {
  const { t } = useI18n();
  const maxPoint = quiz.questions.length * 10;
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size={window.innerWidth <= 768 ? "full" : "xl"}
        classNames={{
          backdrop: "z-[100]",
          wrapper: "z-[101]",
        }}
      >
        <ModalContent>
          <div className="p-4">
            <div className="h-[430px] flex flex-col gap-6 overflow-y-scroll overflow-x-hidden mt-5 max-md:h-screen max-md:overflow-y-auto max-md:pb-[50px]">
              {quiz.questions.map((question, ind) => {
                const [questionText, questionCode] = splitQuestion(
                  question.question,
                );
                return (
                  <div className="flex flex-col gap-3" key={question.id}>
                    <div className="text-[18px] font-bold">
                      {t("quizzes.questionWithNumber", { id: question.id })}
                    </div>
                    <div className="w-full flex flex-col justify-center text-(--foreground) font-semibold">
                      <p className="m-0">{questionText}</p>
                      {questionCode ? (
                        <SyntaxHighlighter
                          language={quiz.name.toLowerCase()}
                          style={darcula}
                        >
                          {questionCode}
                        </SyntaxHighlighter>
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-2">
                      {question.variants.map((option) => {
                        const isCorrect = option === question.correct;
                        const isSelected = option === userSelects[ind];

                        return (
                          <div
                            key={option}
                            className={`rounded-lg gap-1.5 flex flex-row items-center w-full p-2 pl-2 ${
                              isCorrect
                                ? "bg-[#5ec98e] text-white"
                                : isSelected
                                  ? "bg-[#fa6579] text-white"
                                  : "bg-(--surface-strong)"
                            }`}
                          >
                            {userSelects[ind] === question.correct &&
                              userSelects[ind] === option && <CircleCheckBig />}
                            {isSelected && !isCorrect && <CircleX />}
                            <div className="w-full flex flex-row justify-between items-center">
                              <div className="max-w-[300px]">{option}</div>
                              <span
                                className={`${
                                  isSelected
                                    ? "bg-(--surface-soft) px-2 py-1 text-(--foreground) rounded"
                                    : "hidden"
                                }`}
                              >
                                {t("quizzes.yourAnswer")}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ModalContent>
      </Modal>

      <div className="w-full h-full flex flex-col gap-10 justify-center items-center">
        <div className="flex justify-center items-center max-[500px]:flex-col">
          <div className="flex flex-row justify-center items-center gap-4 flex-wrap">
            <img src={quiz.img} alt={quiz.name} className="w-[120px]" />

            <div className="flex flex-col gap-2">
              <span className="text-(--foreground) flex items-center gap-1">
                {t("quizzes.resultTitle")}
                <span className="font-semibold">{quiz.name}</span>
              </span>

              <div className="flex items-center justify-center gap-1">
                <span className="text-(--foreground)">
                  {t("quizzes.complexity")}
                </span>
                <Rating rating={quiz.complexity} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 justify-center items-center">
          <Progress
            value={result}
            maxPoint={maxPoint}
            handleShowResult={() => setIsModalOpen(true)}
          />
        </div>
        <Button
          onPress={() => navigate("/quizes")}
          color="primary"
          variant="ghost"
          size="lg"
          startContent={<ArrowLeft />}
        >
          {t("quizzes.backToQuizzes")}
        </Button>
      </div>
    </>
  );
}
