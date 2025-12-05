import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import { Button } from "../../shared/ui/Button/Button";

function Home() {
  const navigate = useNavigate();
  return (
    <div className={styles.home_container}>
      <div className={styles.header_text}>
        <h1>Разблокируйте свой потенциал в программировании с курсами Study Hub.</h1>
        <p>
          Добро пожаловать в Study Hub — платформу, где мы помогаем вам овладеть искусством
          программирования. Откройте для себя разнообразие курсов, разработанных как для начинающих,
          так и для опытных разработчиков. Будь то веб-разработка, анализ данных или создание
          мобильных приложений — у нас есть всё необходимое, чтобы помочь вам добиться успеха.
          Присоединяйтесь к нам в увлекательном путешествии обучения и инноваций уже сегодня!
        </p>
        <Button onClick={()=> navigate("/quizes")}>Проверить свои знания</Button>
      </div>
      <div className={styles.header_img}>
        <img src="/mainImg.svg" alt="programming computer photo" />
      </div>
    </div>
  );
}

export default Home;
