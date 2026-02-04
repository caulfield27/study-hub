import { DataLoader } from "@/shared/ui/DataLoader/DataLoader";

interface Props {
  query: string;
}

export const SearchLoader = ({ query }: Props) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <DataLoader label={query} />
    </div>
  );
};
