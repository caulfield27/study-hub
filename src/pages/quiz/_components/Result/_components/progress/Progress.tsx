import { Card, CardBody, CardFooter } from "@heroui/card";
import { CircularProgress } from "@heroui/progress";
import type { Props } from "./Progress.types";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";

export const Progress = ({ value, maxPoint, handleShowResult }: Props) => {
  const gradient =
    value < 50
      ? "linear-gradient(to bottom right, #ff4d4f, #d9363e)"
      : value < 80
      ? "linear-gradient(to bottom right, #fbbf24, #f59e0b)"
      : "linear-gradient(to bottom right, #4ade80, #22c55e)";
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
          {`${value} из ${maxPoint} баллов`}
        </Chip>
        <Button variant="light" color="secondary" onPress={handleShowResult}>
          Показать ответы
        </Button>
      </CardFooter>
    </Card>
  );
};
