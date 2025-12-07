import { RouterProvider } from "react-router";
import { router } from "./router";
import { UiProvider } from "./ui";

export function Provider() {
  return (
    <UiProvider>
      <RouterProvider router={router} />
    </UiProvider>
  );
}
