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

// const Half = () => (
//   <svg width="16" height="16" viewBox="0 0 16 16">
//     <defs>
//       <linearGradient id="half">
//         <stop offset="50%" stopColor="yellow" />
//         <stop offset="50%" stopColor="transparent" />
//       </linearGradient>
//     </defs>
//     <path
//       fill="url(#half)"
//       stroke="yellow"
//       d="M8 .25l2.47 5.01 5.53.8-4 3.9.94 5.49L8 12.77l-4.94 2.68.94-5.49-4-3.9 5.53-.8z"
//     />
//   </svg>
// );

export const Rating = ({ rating }: { rating: number }) => {
  const stars = () => {
    switch (Math.floor(rating)) {
      case 1:
        return (
          <>
            <Full />
            <Empty />
            <Empty />
            <Empty />
            <Empty />
          </>
        );
      case 2:
        return (
          <>
            <Full />
            <Full />
            <Empty />
            <Empty />
            <Empty />
          </>
        );
      case 3:
        return (
          <>
            <Full />
            <Full />
            <Full />
            <Empty />
            <Empty />
          </>
        );
      case 4:
        return (
          <>
            <Full />
            <Full />
            <Full />
            <Full />
            <Empty />
          </>
        );
      case 5:
        return (
          <>
            <Full />
            <Full />
            <Full />
            <Full />
            <Full />
          </>
        );
      default:
        return null;
    }
  };

  return <div className="flex flex-row">{stars()}</div>;
};
