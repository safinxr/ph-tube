const s = 50000;
const hrsAndMin=(seconds)=> {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    return { hours, minutes };
  }
  
  const { hours, minutes } = hrsAndMin(s);
  console.log(`${hours}hrs ${minutes}min ago`);
