import { useNavigate } from "react-router";
import { Button } from "@heroui/button";
import { ArrowRight, BookOpen, Code2, GraduationCap, Sparkles, Trophy } from "lucide-react";
import hero from "/hero.webp";
import { PopularBooks, RecomendedQuizes } from "./_components";
import { useI18n } from "@/shared/i18n";

function Home() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-14">
      <section className="relative flex items-center">
        <div className="relative w-full">
          <div className="w-full">
            <div className="flex flex-row max-[1600px]:flex-col gap-12 items-start justify-between">
              <div className="space-y-8 w-full">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-(--primary-color)/10 border border-(--primary-color)/20 rounded-full">
                  <Sparkles className="w-4 h-4 text-(--primary-color)" />
                  <span className="text-sm font-medium text-(--primary-color)">
                    {t("home.badge")}
                  </span>
                </div>

                <div className="space-y-4">
                  <h1 className="theme-text text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                    {t("home.title")}
                    <span className="block bg-linear-to-r from-(--primary-color) to-(--primary-color-dark) bg-clip-text text-transparent">
                      {t("home.titleAccent")}
                    </span>
                  </h1>
                  <p className="theme-text-muted text-xl leading-relaxed max-w-xl">
                    {t("home.description")}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    className="max-sm:w-full"
                    color="primary"
                    variant="shadow"
                    size={"lg"}
                    endContent={<ArrowRight />}
                    onPress={() => navigate("video-courses")}
                  >
                    {t("home.startLearning")}
                  </Button>
                  <Button
                    onPress={() => navigate("quizes")}
                    className="max-sm:w-full"
                    variant="flat"
                    size={"lg"}
                    endContent={<GraduationCap />}
                  >
                    {t("home.testKnowledge")}
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-8 border-t theme-border">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-(--primary-color)">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="theme-text text-2xl font-bold">500+</p>
                      <p className="theme-text-muted text-sm">{t("home.courses")}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-(--primary-color)">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="theme-text text-2xl font-bold">1000+</p>
                      <p className="theme-text-muted text-sm">{t("home.books")}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-(--primary-color)">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="theme-text text-2xl font-bold">5000+</p>
                      <p className="theme-text-muted text-sm">{t("home.quizzes")}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full relative lg:block min-[1600px]:mt-24">
                <div className="absolute inset-0 rounded-3xl" />
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden border theme-border shadow-2xl shadow-black/20">
                    <img
                      src={hero}
                      alt="Developer coding on laptop with multiple screens"
                      className="w-full h-auto object-cover min-[1600px]:max-w-3xl"
                    />
                  </div>

                  <div className="theme-surface absolute -bottom-6 -left-6 max-sm:-bottom-2 max-sm:left-3 border rounded-xl p-4 max-sm:p-2.5 shadow-xl backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 max-sm:w-8 max-sm:h-8 bg-linear-to-br from-(--primary-color) to-(--primary-color-dark) rounded-lg flex items-center justify-center">
                        <Code2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="theme-text font-semibold">{t("home.students")}</p>
                        <p className="theme-text-muted text-sm">{t("home.daily")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="theme-surface absolute -top-6 -right-6 max-sm:right-3 border rounded-xl p-4 max-sm:p-2.5 shadow-xl backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 bg-linear-to-br from-neutral-300 to-neutral-600 rounded-full border-2 theme-border" />
                        <div className="w-8 h-8 bg-linear-to-br from-blue-400 to-blue-700 rounded-full border-2 theme-border" />
                        <div className="w-8 h-8 bg-linear-to-br from-violet-400 to-violet-700 rounded-full border-2 theme-border" />
                      </div>
                      <span className="theme-text font-semibold text-sm">{t("home.todayPlus")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-6">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className="theme-text text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
            {t("home.popularBooks")}
          </h2>
          <Button size="lg" color="primary" onClick={() => navigate("/library")} variant="light">
            {t("home.allBooks")}
          </Button>
        </div>
        <PopularBooks />
      </section>
      <section className="flex flex-col gap-6">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className="theme-text text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
            {t("home.recommendedQuizzes")}
          </h2>
          <Button size="lg" color="primary" onClick={() => navigate("/quizes")} variant="light">
            {t("home.allQuizzes")}
          </Button>
        </div>
        <RecomendedQuizes />
      </section>
    </div>
  );
}

export default Home;
