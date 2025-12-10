import useSwr from "swr";
import { apiRoutes } from "@/shared/api/api.routes";
import { api } from "@/shared/api/api.handlers";
import { DataLoader } from "@/shared/ui/DataLoader/DataLoader";
import type { IQuiz } from "@/shared/types/types";
import { useNavigate } from "react-router";
import { Timer } from "lucide-react";
import { Rating } from "@/shared/ui/Rating/Rating";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";

function Quizes() {
  const navigate = useNavigate();
  const swrKey = {
    method: "get",
    url: apiRoutes.quizes.get,
  };
  const { data: quizes, isLoading } = useSwr<IQuiz[]>([swrKey,'public'], api.sendRequest, {
    revalidateOnFocus: false,
  });

  return (
    <>
      <div>
        {/* <h1 className="font-bold text-3xl">Тесты и практика</h1> */}
        <div className="w-full flex flex-wrap justify-center items-start gap-8 max-sm:gap-5">
          {isLoading ? (
            <DataLoader />
          ) : quizes ? (
            quizes.map((quiz) => (
              <Card key={quiz.id} className="w-[250px] max-sm:w-full">
                <CardBody className="flex flex-col gap-6 max-sm:gap-2 justify-center items-center">
                  <span
                    className="
                  font-bold text-center text-[20px] max-sm:text-[14px]
                  h-6 overflow-hidden text-ellipsis
                  line-clamp-1
                "
                  >
                    {quiz.name}
                  </span>

                  <img
                    src={quiz.img}
                    alt={quiz.name}
                    className="w-[100px] h-[100px]"
                  />
                  <Rating rating={quiz.complexity} />
                  <div className="flex flex-row justify-center items-center gap-1">
                    <Timer className="max-sm:w-4"/>
                    <span className="max-sm:text-[12px]">3 мин</span>
                  </div>
                  <Button
                    onPress={() => navigate(`/quizes/${quiz.id}`)}
                    color="primary"
                    variant="ghost"
                    className="w-full"
                  >
                    Начать
                  </Button>
                </CardBody>
              </Card>
            ))
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Quizes;
