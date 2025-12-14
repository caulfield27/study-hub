import { useState } from "react";
import { splitQuestion } from "@/shared/utils/utils";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Rating } from "@/shared/ui/Rating/Rating";
import { Progress } from "./_components";
import { Modal, ModalContent } from "@heroui/modal";
import { Button } from "@heroui/button";
const success = "/success.png";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import type { Props } from "./Result.types";

export function Result({ result, quiz, userSelects }: Props) {
  const maxPoint = quiz.questions.length * 10;
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size={window.innerWidth <= 768 ? "full" : "xl"}
      >
        <ModalContent>
          <div className="p-4">
            <div className="h-[430px] flex flex-col gap-6 overflow-y-scroll overflow-x-hidden mt-5 max-md:h-screen max-md:overflow-y-auto max-md:pb-[50px]">
              {quiz.questions.map((question, ind) => {
                const [questionText, questionCode] = splitQuestion(
                  question.question
                );
                return (
                  <div className="flex flex-col gap-3" key={question.id}>
                    <div className="text-[18px] font-bold">
                      Вопрос {question.id}
                    </div>
                    <div className="w-full flex flex-col justify-center text-white font-semibold">
                      <p className="m-0">{questionText}</p>
                      {questionCode ? (
                        <SyntaxHighlighter
                          language={quiz.lang ?? ""}
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
                            className={`rounded-lg flex flex-row items-center w-full p-2 pl-2 ${
                              isCorrect
                                ? "bg-[#5ec98e] text-white"
                                : isSelected
                                ? "bg-[#fa6579] text-white"
                                : "bg-[#404040]"
                            }`}
                          >
                            {userSelects[ind] === question.correct &&
                              userSelects[ind] === option && (
                                <img
                                  src={success}
                                  alt="success icon"
                                  className="w-5 h-5 mr-2 block"
                                />
                              )}
                            <div className="w-full flex flex-row justify-between items-center">
                              <div className="max-w-[300px]">{option}</div>
                              <span
                                className={`${
                                  isSelected
                                    ? "bg-[#404040] px-2 py-1 text-white rounded"
                                    : "hidden"
                                }`}
                              >
                                ваш ответ
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
              <span className="text-white flex items-center gap-1">
                Название:
                <span className="font-semibold">{quiz.name}</span>
              </span>

              <div className="flex items-center justify-center gap-1">
                <span className="text-white">Сложность:</span>
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
          Вернуться к тестам
        </Button>
      </div>
    </>
  );
}
