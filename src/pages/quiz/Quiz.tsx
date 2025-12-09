import { useParams } from "react-router";
import useSwr from "swr";
import { apiRoutes } from "@/shared/api/api.routes";
import { sendRequest } from "@/shared/api/api.handlers";
import type { IQuiz } from "@/shared/types/types";
import { useState } from "react";
import { PageLoader } from "@/shared/ui/Loader/PageLoader";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Timer } from "../../shared/ui/Timer/Timer";
import { Result } from "./_components";
import { splitQuestion } from "@/shared/utils/utils";
import { Rating } from "@/shared/ui/Rating/Rating";
import { Radio, RadioGroup } from "@heroui/radio";
import { cn } from "@/shared/utils/clx";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";

function Quiz() {
  // api
  const { id } = useParams();
  const swrKey = {
    method: "get",
    url: apiRoutes.quizes.getById(id ?? ""),
  };
  const { data: quiz, isLoading } = useSwr<IQuiz>(swrKey, sendRequest);

  // locale states
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [isFinished, setIsFinished] = useState(false);
  const [userSelects, setUserSelects] = useState<string[]>([]);
  const [timerTrigger, setTimerTrigger] = useState(false);
  const [timeOver, setTimeOver] = useState(false);
  const reset = () => {
    setTimeOver(false);
    setQuestionIndex(0);
    setIsFinished(false);
    setUserSelects([]);
    setResult(0);
    setTimerTrigger((prev) => !prev);
  };
  const [result, setResult] = useState(0);
  const [questionText, formattedCode] = splitQuestion(
    quiz?.questions?.[questionIndex]?.question
  );

  // event handlers
  function handleSelectChange(value: string) {
    const updatedUserSelects = [...userSelects];
    updatedUserSelects[questionIndex] = value;
    setUserSelects(updatedUserSelects);
  }

  function handleNextQuestion() {
    const isCorrect =
      quiz?.questions[questionIndex].correct === userSelects[questionIndex];
    setResult((prev) => (isCorrect ? prev + 10 : prev + 0));
    if (questionIndex + 1 === quiz?.questions?.length) {
      setIsFinished(true);
    } else {
      setQuestionIndex((prev) => prev + 1);
    }
  }

  // render ui
  if (isFinished) {
    return <Result result={result} quiz={quiz!} userSelects={userSelects} />;
  }

  return isLoading ? (
    <PageLoader />
  ) : quiz ? (
    <div className="w-full flex flex-col justify-start items-center gap-5">
      <div
        className="
        flex justify-center items-center gap-2 mb-2
      "
      >
        <img src={quiz.img} alt={quiz.name} className="w-[60px]" />
        <span className="font-semibold">{quiz.name}</span>
        <Rating rating={quiz.complexity} />
      </div>

      <div
        className="
        min-w-[700px] rounded 
        max-[1100px]:min-w-full
        flex flex-col justify-center items-center gap-4
        max-[780px]:w-fit 
        max-[780px]:rounded max-[780px]:gap-6
      "
      >
        <div
          className="
          w-full bg-[#262626] rounded 
          flex justify-between items-center gap-4 
          pl-5 p-3
        "
        >
          <div className="flex flex-row justify-center items-center gap-1">
            <span className="font-bold">Вопрос:</span>
            <span className="text-[#db4422] font-semibold">
              {quiz.questions[questionIndex].id}
            </span>
            <span> | {quiz.questions.length}</span>
          </div>

          <Timer
            seconds={0}
            mintes={3}
            onTimeOver={() => setTimeOver(true)}
            startTimerTrigger={timerTrigger}
          />
        </div>

        {timeOver ? (
          <div className="flex items-center justify-center w-full">
            <Alert
              color="danger"
              description="К сожалению вы не успели пройти тест во время"
              endContent={
                <Button color="danger" size="md" variant="flat" onPress={reset}>
                  Повторить
                </Button>
              }
              title="Время вышло"
              variant="faded"
            />
          </div>
        ) : (
          <>
            <div className="w-full">
              <p>{questionText}</p>

              {formattedCode ? (
                <SyntaxHighlighter
                  language={quiz.lang ?? ""}
                  showLineNumbers
                  style={darcula}
                >
                  {formattedCode}
                </SyntaxHighlighter>
              ) : null}
            </div>

            <div className="w-full flex flex-col items-start gap-9">
              <RadioGroup
                className="w-full"
                value={userSelects[questionIndex] || ""}
                onValueChange={handleSelectChange}
              >
                {quiz.questions[questionIndex].variants.map(
                  (variant: string) => (
                    <Radio
                      key={variant}
                      value={variant}
                      classNames={{
                        base: cn(
                          "inline-flex m-0 bg-content1 items-center",
                          "flex-row max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                          "data-[selected=true]:border-[#404040]"
                        ),
                      }}
                    >
                      {variant}
                    </Radio>
                  )
                )}
              </RadioGroup>
            </div>

            <div className="w-full flex justify-start items-start mt-[-5px]">
              <Button
                onPress={handleNextQuestion}
                isDisabled={!userSelects[questionIndex]}
                variant="shadow"
                color="primary"
              >
                {questionIndex === quiz.questions.length - 1
                  ? "Завершить"
                  : "Далее"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  ) : null;
}

export default Quiz;
