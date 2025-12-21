// import { api } from "@/shared/api/api.handlers";
// import { apiRoutes } from "@/shared/api/api.routes";
// import type { IQuizResponse } from "@/shared/types/types";
// import useSwr from "swr";

export const RecomendedQuizes = () => {
  return <></>
    // api
  // const swrParams = {
  //   method: "get",
  //   url: apiRoutes.quizes,
  // };
  // const { data: quizes, isLoading } = useSwr<{
  //   data: IQuizResponse[];
  //   total: number;
  // }>([swrParams, "public"], api.sendRequest);
  // // temp slice until backend ready
  // const slicedQuizes = quizes?.data.slice(0,4) ?? [];

//   return (
//     <div className="flex flex-row flex-nowrap gap-6 overflow-x-auto no-scrollbar">
//       {isLoading ? (
//         <BooksSkeleton size={4} isScrollable/>
//       ) : (
//         books?.data?.map((book) => <Book key={book.id} book={book} isScrollable={true}/>)
//       )}
//     </div>
//   );
}