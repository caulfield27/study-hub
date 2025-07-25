import { useParams } from "react-router";
import useSwr from "swr";
import { apiRoutes } from "../../shared/api/api.routes";
import { sendRequest } from "../../shared/api/api.handlers";
import type { IQuiz } from "../quizes/types/types";
import { useState, type ChangeEvent } from "react";
import { Button, FormControlLabel, Radio, RadioGroup, Rating } from "@mui/material";
import { PageLoader } from "../../shared/ui/Loader/PageLoader";
import styles from "./Quiz.module.css";
// import { ProgressBar } from "./ui/ProgressBar/ProgressBar";
import { Timer } from "./ui/Timer/Timer";
import Swal from "sweetalert2";
import { Result } from "./ui/Result/Result";

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
  const reset = () => {
    setQuestionIndex(0);
    setIsFinished(false);
    setUserSelects([]);
  };
  const [result, setResult] = useState(0);

  // event handlers
  function handleSelectChange(event: ChangeEvent<HTMLInputElement>) {
    const updatedUserSelects = [...userSelects];
    updatedUserSelects[questionIndex] = event.target.value;
    setUserSelects(updatedUserSelects);
  }

  function handleNextQuestion() {
    const isCorrect = quiz?.questions[questionIndex].correct === userSelects[questionIndex];
    setResult((prev) => (isCorrect ? prev + 10 : prev + 0));
    if (questionIndex + 1 === quiz?.questions?.length) {
      setIsFinished(true);
    } else {
      setQuestionIndex((prev) => prev + 1);
    }
  }

  function handleTimeOver() {
    Swal.fire({
      icon: "error",
      title: "Время вышло :(",
      text: "вы не успели пройти тест во время",
      confirmButtonText: "Повторить",
      confirmButtonColor: "var(--primaryMainColor)",
    }).then(() => {
      reset();
    });
  }

  // render ui
  if (isFinished) {
    return <Result result={result} quiz={quiz!} onReset={reset} userSelects={userSelects} />;
  };

  return isLoading ? (
    <PageLoader />
  ) : quiz ? (
    <div className={styles.quiz_container}>
      <div className={styles.quiz_container_header}>
        <img src={quiz?.img} alt={quiz?.name} />
        <span>{quiz.name}</span>
        <Rating
          className={styles.raiting}
          name="quiz-complex"
          value={quiz.complexity}
          precision={0.5}
          readOnly
        />
      </div>
      <div className={styles.quiz_content}>
        <div className={styles.quiz_header}>
          <div className={styles.question}>
            <span className={styles.q}>Question:</span>
            <span className={styles.id}>{quiz.questions[questionIndex].id}</span>
            <span className={styles.length}> | {quiz.questions.length}</span>
          </div>
          <Timer seconds={0} mintes={1} onTimeOver={handleTimeOver} />
          {/* {<ProgressBar value={0} />} */}
        </div>
        <div>
          <p>{quiz.questions[questionIndex].question}</p>
        </div>
        <div className={styles.quiz_body}>
          <RadioGroup
            aria-labelledby="quiz-options"
            defaultValue="quiz"
            name="quiz-options"
            value={userSelects[questionIndex] || ""}
            onChange={handleSelectChange}
            className={styles.options_wrap}
          >
            {quiz.questions[questionIndex].variants.map((variant: string) => {
              return (
                <FormControlLabel
                  key={variant}
                  value={variant}
                  control={<Radio checked={userSelects[questionIndex] === variant} color="error" />}
                  label={variant}
                  className={styles.quiz_options}
                />
              );
            })}
          </RadioGroup>
        </div>
        <div className={styles.quiz_footer}>
          <Button
            disabled={!userSelects[questionIndex]}
            variant="contained"
            color="success"
            onClick={handleNextQuestion}
          >
            {questionIndex == quiz.questions.length - 1 ? "Finish" : `Next`}
          </Button>
        </div>
      </div>
    </div>
  ) : null;
}

export default Quiz;
