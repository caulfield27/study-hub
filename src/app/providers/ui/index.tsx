
import {HeroUIProvider} from "@heroui/system";
import type { ReactNode } from "react";
import {ToastProvider} from '@heroui/toast';

export const UiProvider = ({children}:{children: ReactNode}) => {
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-right" toastOffset={40}/>
      {children}
    </HeroUIProvider>
  );
}