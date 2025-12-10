import { Card, CardBody, CardHeader } from "@heroui/card";
import type { ReactNode } from "react";

export const AuthContainer = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="min-w-xl max-sm:min-w-full">
        <CardHeader className="text-2xl font-semibold">{title}</CardHeader>
        <CardBody>{children}</CardBody>
      </Card>
    </div>
  );
};
