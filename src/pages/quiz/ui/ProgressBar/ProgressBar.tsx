

export function ProgressBar({value} : {value: number}) {
  
  function colorDep(){
    return `${value > 0 && value < 50 ? '#ef233c' : 
    (value >= 50 && value < 80 ? '#ffd449' : '#2dc653')}`

  }

  return null;
  // return (
  //   <Box sx={{ position: 'relative', display: 'inline-flex' }} >
  //     <CircularProgress variant="determinate" style={{color:colorDep()}}/>
  //     <Box
  //       sx={{
  //         top: 0,
  //         left: 0,
  //         bottom: 0,
  //         right: 0,
  //         position: 'absolute',
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'center',

  //       }}

  //     >
  //       <Typography
  //         variant="caption"
  //         component="div"
  //         color='GrayText'
  //       >{`${Math.round(value)}%`}</Typography>
  //     </Box>
  //   </Box>
  // );
};