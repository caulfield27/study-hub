import type { IQuizeDetails } from "@/shared/types/types";

export interface Props{
    quizes: IQuizeDetails[];
    isScrollable?: boolean;
}