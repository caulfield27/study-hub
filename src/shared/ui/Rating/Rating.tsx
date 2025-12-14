import { cn } from "@/shared/utils/clx";
import { useState } from "react";

const Full = () => (
  <svg width="16" height="16" fill="yellow">
    <path d="M8 .25l2.47 5.01 5.53.8-4 3.9.94 5.49L8 12.77l-4.94 2.68.94-5.49-4-3.9 5.53-.8z" />
  </svg>
);

const Empty = () => (
  <svg width="16" height="16" fill="none" stroke="white">
    <path d="M8 .25l2.47 5.01 5.53.8-4 3.9.94 5.49L8 12.77l-4.94 2.68.94-5.49-4-3.9 5.53-.8z" />
  </svg>
);

const Half = () => (
  <svg width="16" height="16" viewBox="0 0 16 16">
    <defs>
      <linearGradient id="half">
        <stop offset="50%" stopColor="yellow" />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
    </defs>
    <path
      fill="url(#half)"
      stroke="yellow"
      d="M8 .25l2.47 5.01 5.53.8-4 3.9.94 5.49L8 12.77l-4.94 2.68.94-5.49-4-3.9 5.53-.8z"
    />
  </svg>
);

export const Rating = ({ rating }: { rating: number }) => {
  const renderStar = (index: number) => {
    const starValue = index + 1;

    if (rating >= starValue) return <Full />;
    if (rating >= starValue - 0.5) return <Half />;
    return <Empty />;
  };

  return (
    <div className="flex flex-row">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i}>{renderStar(i)}</div>
      ))}
    </div>
  );
};

export const ControlledRating = ({
  value,
  onChange,
  isDisabled = false,
}: {
  value: number;
  onChange: (val: number) => void;
  isDisabled?: boolean;
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const display = hoverValue ?? value;
  const renderStar = (starValue: number) => {
    if (display >= starValue) return <Full />;
    if (display >= starValue - 0.5) return <Half />;
    return <Empty />;
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          onMouseEnter={() => setHoverValue(i + 1)}
          onMouseLeave={() => setHoverValue(null)}
          onClick={() => onChange(i + 1)}
          className={cn(
            "cursor-pointer p-0 border-0 outline-0 bg-none",
            isDisabled && "cursor-default pointer-events-none opacity-60"
          )}
        >
          {renderStar(i + 1)}
        </button>
      ))}
    </div>
  );
};
