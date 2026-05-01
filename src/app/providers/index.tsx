import { RouterProvider } from "react-router";
import { router } from "./router";
import { UiProvider } from "./ui";
import { I18nProvider } from "@/shared/i18n";
import { ThemeProvider } from "@/shared/theme";

export function Provider() {
  return (
    <UiProvider>
      <ThemeProvider>
        <I18nProvider>
          <RouterProvider router={router} />
        </I18nProvider>
      </ThemeProvider>
    </UiProvider>
  );
}
