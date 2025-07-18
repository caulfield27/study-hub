import styles from "./Home.module.css";

function Home() {
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
        <button onClick={() => {}}>Start to learn free</button>
      </div>
      <div className={styles.header_img}>
        <img src="/mainImg.svg" alt="programming computer photo" />
      </div>
    </div>
  );
}

export default Home;
