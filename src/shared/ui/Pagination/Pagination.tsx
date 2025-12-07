import styles from "./Pagination.module.css";
// import { useRouter, useSearchParams, usePathname } from "next/navigation"

interface Props {
  total: number;
  currentPage: number;
  limit: number;
  handleChange: (event: unknown, value: number) => void;
}

export function CustomPagination({ total, currentPage, limit, handleChange }: Props) {
  // return (
  //   <Stack spacing={2}>
  //     <Pagination
  //       defaultValue={currentPage}
  //       className={styles.pagination}
  //       count={Math.ceil(total / limit)}
  //       page={currentPage}
  //       onChange={handleChange}
  //     />
  //   </Stack>
  // );
  return null;
}
