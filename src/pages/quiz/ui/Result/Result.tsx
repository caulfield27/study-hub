import "../../../../app/globals.css";
import styles from "./Result.module.css";
import { Button, Rating } from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { Modal } from "../../../../shared/ui/Modal/Modal";
import type { IQuiz } from "../../../quizes/types/types";
import { useState } from "react";
import { splitQuestion } from "../../../../shared/utils/utils";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
const success = "/success.png";
const complete_img = "/completeOrange.jpg";

interface Props {
  result: number;
  onReset: () => void;
  quiz: IQuiz;
  userSelects: string[];
}

export function Result({ result, quiz, onReset, userSelects }: Props) {
  const maxPoint = quiz.questions.length * 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className={styles.modal_content}>
            <div className={styles.modal_header}>
              <button onClick={() => setIsModalOpen(false)}>&#10006;</button>
            </div>
            <div className={styles.modal_body}>
              {quiz.questions.map((question, ind) => {
                const [questionText, questionCode] = splitQuestion(question.question);
                return (
                  <div className={styles.question_wrap} key={question.id}>
                    <div className={styles.modal_question}>Вопрос {question.id}</div>
                    <div className={styles.question}>
                      <p>{questionText}</p>
                      {questionCode ? (
                        <SyntaxHighlighter language={quiz.lang ?? ""} style={darcula}>
                          {questionCode}
                        </SyntaxHighlighter>
                      ) : null}
                    </div>
                    <div className={styles.options_wrap}>
                      {question.variants.map((option) => (
                        <div
                          className={
                            option === question.correct
                              ? styles.correct_background
                              : option === userSelects[ind]
                              ? styles.wrong_background
                              : styles.variants
                          }
                          key={option}
                        >
                          {userSelects[ind] === question.correct && userSelects[ind] === option && (
                            <img className={styles.correct} src={success} alt="success icon" />
                          )}
                          <div className={styles.answer_wrap}>
                            <div>{option}</div>
                            <span
                              className={
                                option === userSelects[ind]
                                  ? styles.your_answer
                                  : styles.display_none
                              }
                            >
                              ваш ответ
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      )}
      <div className={styles.completed}>
        <div className={styles.completed_image}>
          <img src={complete_img} alt="complete illustration" />
          <div className={styles.quiz_info}>
            <img src={quiz.img} alt={quiz.name} />
            <div className={styles.info_text}>
              <span className={styles.name_info}>
                Название:<span className={styles.name}>{quiz.name}</span>
              </span>
              <div className={styles.complex}>
                <span className={styles.complex_text}>Сложность:</span>
                <Rating
                  className={styles.raiting}
                  name="quiz-complex"
                  value={quiz.complexity}
                  precision={0.5}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.completed_result}>
          <h1>Вы прошли тест! Ваш резултат</h1>
          <span className={styles.final_result}>{`${result} из ${maxPoint} баллов`}</span>
          {/* <ProgressBar value={result} /> */}
          <div className={styles.complete_button_wrap}>
            <Button variant="contained" color="success" onClick={() => setIsModalOpen(true)}>
              <ChecklistIcon className={styles.button_icon} />
              Показать ответы
            </Button>
            <Button variant="contained" color="primary" onClick={onReset}>
              Вернуться к тестам
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
