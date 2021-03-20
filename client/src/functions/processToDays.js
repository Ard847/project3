const formatMonths = (months) => {
  console.log('months need formatting', months);
  if (months === 12){
    return 365;
  } else {
    return Math.floor(months * 30.42);
  }
  
}

const processToDays = async (taskData) => {
  console.log('taskData =', taskData);

  // DURATION
  let duration = '';
  switch (taskData.duration.unit) {
    case 'mins':
      duration = taskData.duration.time * 1;
      break;
    case 'hours':
      duration = taskData.duration.time * 60;
      break;
  }

  // REPEAT
  let repeat ='';
  switch (taskData.repeat.unit) {
    case 'days':
      repeat = taskData.repeat.time * 1;
      break;
    case 'weeks':
      repeat = taskData.repeat.time * 7;
      break;
    case 'months':
      repeat = formatMonths(Number(taskData.repeat.time))
      break;
  }

  // ALERT
  let alertBefore = '';
  switch (taskData.alert.unit) {
    case 'days':
      alertBefore = taskData.alert.time * 1;
      break;
    case 'weeks':
      alertBefore = taskData.alert.time * 7;
      break;
    case 'months':
      alertBefore = formatMonths(Number(taskData.alert.time));
      break;
  }

  // COMPLETE
  let complete = '';
  switch (taskData.complete.unit) {
    case 'days':
      complete = taskData.complete.time * 1;
      break;
    case 'weeks':
      complete = taskData.complete.time * 7;
      break;
  }

  const timings = {
    duration: duration,
    repeat: repeat,
    alert: alertBefore,
    complete: complete,
  }
  
  return timings;

}

export default processToDays;