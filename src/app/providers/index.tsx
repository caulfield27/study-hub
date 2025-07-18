import { RouterProvider } from "react-router";
import { router } from "./router";

export function Provider(){
    return <RouterProvider router={router}/>
}