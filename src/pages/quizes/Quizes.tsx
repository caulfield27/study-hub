import styles from "./Quizes.module.css";
// import { useRouter } from 'next/navigation';
import useSwr from "swr";
import { apiRoutes } from "../../shared/api/api.routes";
import { sendRequest } from "../../shared/api/api.handlers";
import { DataLoader } from "../../shared/ui/DataLoader/DataLoader";
import type { IQuiz } from "./types/types";
import { useNavigate } from "react-router";
// import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
// import { quizes } from '@/store/quizes/quizUtils/questions';
// import { IGlobalQuestions } from '@/store/quizes/quizUtils/quizesTypes';
// import { useQuizes } from '@/store/quizes/quizes';
// import { setToStorage } from '@/utils/useLocaleStorage';
// import { Wrapper } from '@/components/wrapper/wrapper';
// import { useTheme } from '@/store/global/theme';

function Quizes() {
  const navigate = useNavigate();
  const swrKey = {
    method: "get",
    url: apiRoutes.quizes.get,
  };
  const { data: quizes, isLoading } = useSwr<IQuiz[]>(swrKey, sendRequest, {
    revalidateOnFocus: false,
  });
  // const navigate = useRouter()
  // const setQuestions = useQuizes((state) => state.setQuestions)
  // const resetQuiz = useQuizes((state) => state.resetQuiz)
  // const theme = useTheme((state)=> state.theme)

  // const OpenQuiz = (quiz: IGlobalQuestions) => {
  //     navigate.push('/quizes/quiz')
  //     setQuestions(quiz)
  //     setToStorage('questions', quiz)
  //     resetQuiz()
  // }

  return (
    <>
      <div className={styles.quizes_header}>
        <h1>Тесты и практика</h1>
      </div>
      <div className={styles.quizes_container}>
        {isLoading ? (
          <DataLoader />
        ) : quizes ? (
          quizes.map((quiz) => {
            return (
              <div className={styles.quiz_card} key={quiz.id}>
                <span className={styles.quiz_name}>{quiz.name}</span>
                <img src={quiz.img} alt={quiz.name} />
                <span>сложность:</span>
                {/* <Rating
                  className={styles.raiting}
                  name="quiz-complex"
                  value={quiz.complexity}
                  precision={0.5}
                  readOnly
                /> */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                    gap: "5px",
                  }}
                >
                  {/* <AvTimerIcon style={theme ? {color:'white'} : {color: 'black'}}/> */}
                  {/* <AvTimerIcon style={{ color: "black" }} /> */}
                  <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    3 мин
                  </span>
                </div>
                {/* <Button
                  // onClick={()=> OpenQuiz(quiz)}
                  onClick={() => navigate(`/quizes/${quiz.id}`)}
                  // variant={theme ? 'contained' : 'outlined'}
                  style={{width: "100%"}}
                  variant="contained"
                  color="primary"
                >
                  Начать
                </Button> */}
              </div>
            );
          })
        ) : null}
      </div>
    </>
  );
}

export default Quizes;
