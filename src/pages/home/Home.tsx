import { useNavigate } from "react-router";
import { Button } from "@heroui/button";
import { ArrowRight, BookOpen, Code2, Sparkles, Trophy } from "lucide-react";
import hero from "/hero.webp";
import { PopularBooks } from "./_components";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-14">
      <section className="relative min-h-screen flex items-centeroverflow-hidden">
        <div className="relative w-full">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-(--primary-color)/10 border border-orange-500/20 rounded-full">
                  <Sparkles className="w-4 h-4 text-(--primary-color)" />
                  <span className="text-sm font-medium text-(--primary-color)">
                    Освойте навыки программирования
                  </span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                    Учитесь кодить
                    <span className="block bg-linear-to-r from-(--primary-color) to-(--primary-color-dark) bg-clip-text text-transparent">
                      По-своему
                    </span>
                  </h1>
                  <p className="text-xl text-neutral-300 leading-relaxed max-w-xl">
                    Получите доступ к тысячам курсов по программированию, подробным учебным
                    материалам и интерактивным тестам. Создавайте реальные проекты и осваивайте
                    навыки, которые действительно важны.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    className="max-sm:w-full"
                    color="primary"
                    variant="shadow"
                    size={"lg"}
                    endContent={<ArrowRight />}
                  >
                    Начать обучение
                  </Button>
                  <Button className="max-sm:w-full" variant="shadow" size={"lg"}>
                    Посмотреть курсы
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-800">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-(--primary-color)">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">500+</p>
                      <p className="text-sm text-neutral-500">Курсов</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-(--primary-color)">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">1000+</p>
                      <p className="text-sm text-neutral-500">Книг</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-(--primary-color)">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">5000+</p>
                      <p className="text-sm text-neutral-500">Тестов</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative lg:block">
                <div className="absolute inset-0 bg-linear-to-tr from-(--primary-color)/20 to-(--primary-color-dark)/20 rounded-3xl blur-3xl" />
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl shadow-black/50">
                    <img
                      src={hero}
                      alt="Developer coding on laptop with multiple screens"
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-neutral-950/80 via-transparent to-transparent" />
                  </div>

                  <div className="absolute -bottom-6 -left-6 max-sm:-bottom-2 max-sm:left-3 bg-neutral-900 border border-neutral-800 rounded-xl p-4 max-sm:p-2.5 shadow-xl backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 max-sm:w-8 max-sm:h-8 bg-linear-to-br from-(--primary-color) to-(--primary-color-dark) rounded-lg flex items-center justify-center">
                        <Code2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">50K+ Учащихся</p>
                        <p className="text-sm text-neutral-400">Ежедневно</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -top-6 -right-6 max-sm:right-3 bg-neutral-900 border border-neutral-800 rounded-xl p-4 max-sm:p-2.5 shadow-xl backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 bg-linear-to-br from-neutral-300 to-neutral-600 rounded-full border-2 border-neutral-900" />
                        <div className="w-8 h-8 bg-linear-to-br from-blue-400 to-blue-700 rounded-full border-2 border-neutral-900" />
                        <div className="w-8 h-8 bg-linear-to-br from-orange-400 to-orange-600 rounded-full border-2 border-neutral-900" />
                      </div>
                      <span className="text-white font-semibold text-sm">+200 сегодня</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-6">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
          Популярные книги
        </h2>
        <PopularBooks />
      </section>
    </div>
  );
}

export default Home;
