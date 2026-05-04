import { Card, CardBody, CardFooter } from "@heroui/card";
import { CircularProgress } from "@heroui/progress";
import type { Props } from "./Progress.types";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { useI18n } from "@/shared/i18n";

export const Progress = ({ value, maxPoint, handleShowResult }: Props) => {
  const { t } = useI18n();
  const gradient =
    value < 50
      ? "linear-gradient(to bottom right, #7c3aed, #4c1d95)"
      : value < 80
      ? "linear-gradient(to bottom right, #8b5cf6, #7c3aed)"
      : "linear-gradient(to bottom right, #c4b5fd, #8b5cf6)";
  return (
    <Card className="w-70 h-70 border-none" style={{ background: gradient }}>
      <CardBody className="justify-center items-center pb-0">
        <CircularProgress
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-white",
            track: "stroke-white/10",
            value: "text-3xl font-semibold text-white",
          }}
          showValueLabel={true}
          strokeWidth={4}
          value={value}
        />
      </CardBody>
      <CardFooter className="justify-center items-center pt-0 flex flex-col gap-2">
        <Chip
          classNames={{
            base: "border-1 border-white/30",
            content: "text-white/90 text-small font-semibold",
          }}
          variant="bordered"
        >
          {t("quizzes.points", { value, maxPoint })}
        </Chip>
        <Button variant="light" className="text-white!" onPress={handleShowResult}>
          {t("quizzes.showAnswers")}
        </Button>
      </CardFooter>
    </Card>
  );
};
