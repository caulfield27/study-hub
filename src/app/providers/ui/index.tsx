
import {HeroUIProvider} from "@heroui/system";
import type { ReactNode } from "react";

export const UiProvider = ({children}:{children: ReactNode}) => {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  );
}