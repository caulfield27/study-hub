import { useNavigate } from "react-router";
import { Button } from "@heroui/button";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="
        flex justify-center items-center
        max-xl:flex-col
      "
    >
      <div
        className="
          max-w-[700px]
          max-sm:max-w-[500px]
        "
      >
        <h1
          className="
            text-[32px] font-bold
            max-[490px]:text-[24px]
          "
        >
          Разблокируйте свой потенциал в программировании с курсами Study Hub.
        </h1>

        <p className="text-[17px] tracking-wider mt-4 max-sm:text-[14px]">
          Добро пожаловать в Study Hub — платформу, где мы помогаем вам овладеть
          искусством программирования. Откройте для себя разнообразие курсов,
          разработанных как для начинающих, так и для опытных разработчиков.
          Будь то веб-разработка, анализ данных или создание мобильных
          приложений — у нас есть всё необходимое, чтобы помочь вам добиться
          успеха. Присоединяйтесь к нам в увлекательном путешествии обучения и
          инноваций уже сегодня!
        </p>

        <Button
          onPress={() => navigate("/quizes")}
          color="primary"
          className="mt-6 max-sm:w-full"
        >
          Проверить свои знания
        </Button>
      </div>
      <div className="max-sm:mt-12">
        <img
          src="/mainImg.svg"
          alt="programming computer photo"
          className="max-sm:max-w-[80%] mx-auto"
        />
      </div>
    </div>
  );
}

export default Home;
