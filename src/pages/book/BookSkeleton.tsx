// import { Card } from "@heroui/card"
// import { Skeleton } from "@heroui/skeleton"

// export const BookSkeleton = () => {
//     return <div className="w-full mx-auto py-12">
//         <Card className="overflow-hidden">
//           <div className="grid min-[1100px]:grid-cols-3 gap-8 p-8 max-sm:p-4">
//             <div className="min-[1100px]:col-span-1 flex justify-center items-start">
//               <div className="sticky top-8">
//                 <div className="relative group">
//                   {/* <Image
//                     src={getFile(book.image)}
//                     alt={book.name}
//                     className="relative w-full h-auto rounded-xl shadow-2xl object-cover aspect-3/4"
//                   /> */}
//                   <Skeleton className="rounded-lg">
//                     {/* <div className="rounded-md h-"> */}
//                   </Skeleton>
//                 </div>

//                 <div className="mt-6 space-y-3 flex flex-col">
//                   <Button
//                     onPress={() => setShowPdfReader(true)}
//                     size="lg"
//                     color="primary"
//                     startContent={<BookOpen className="shrink-0" />}
//                   >
//                     Читать онлайн
//                   </Button>
//                   <Button
//                     size="lg"
//                     variant={"ghost"}
//                     startContent={<Download className="shrink-0" />}
//                     onPress={handleDownload}
//                   >
//                     Скачать PDF
//                   </Button>
//                 </div>

//                 <div className="mt-6 p-4 bg-neutral-700 rounded-xl space-y-3 text-neutral-200">
//                   <div className="flex items-center gap-2">
//                     <Calendar className="w-5 h-5 shrink-0" />
//                     <span className="text-sm">Опубликовано: {book.released}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <MessageSquare className="w-5 h-5 shrink-0" />
//                     <span className="text-sm">{book.reviews_count} отзывов</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="min-[1100px]:col-span-2 space-y-8">
//               <div>
//                 <h1 className="text-4xl min-[1100px]:text-5xl font-bold leading-tight mb-6 max-sm:text-2xl">
//                   {book.name}
//                 </h1>
//                 <p className="text-xl text-neutral-300 mb-6 max-sm:text-xl-[16px]">
//                   by {book.author}
//                 </p>
//                 <div className="flex items-center gap-6 mb-8">
//                   <div className="flex items-center gap-2">
//                     <Rating rating={book.rating_avg ?? 0} />
//                     <span className="text-2xl font-bold ml-2">{book.rating_avg ?? 0}</span>
//                   </div>
//                   <span>({book.reviews_count} оценок)</span>
//                 </div>
//               </div>
//               <Divider className="bg-neutral-700 mb-0" />
//               <div className="pt-6">
//                 <h2 className="text-2xl font-bold mb-4 max-sm:text-xl">Про книгу</h2>
//                 <p className="leading-relaxed text-lg text-neutral-300 max-sm:text-medium">
//                   {book.description}
//                 </p>
//               </div>
//               <Divider className="bg-neutral-700 mb-0" />

//               <div className="pt-8">
//                 <PostReview bookId={book.id} reviews={book.reviews} onSuccess={() => mutate()} />
//               </div>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
// } 