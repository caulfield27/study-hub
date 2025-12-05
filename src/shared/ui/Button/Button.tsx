import { cn } from "../../utils/clx";

export const Button = ({ ...props }: React.ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        "p-4 bg-(--primary) text-(--accent) rounded-lg border-0 outline-0 text-[18px] font-semibold cursor-pointer transition-all duration-300 ease-in-out",
        props.className && props.className
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};
