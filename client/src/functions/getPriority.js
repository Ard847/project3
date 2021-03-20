const getPriority = (task) => {

  // console.log('task =', task);
  const todayDate = new Date();
  const endDate = new Date(task.nextDate);
  endDate.setDate(endDate.getDate() + Number(task.completeBy));
  const startDate = new Date(task.nextDate);
  startDate.setDate(startDate.getDate() - Number(task.alertBefore));
  
  if (task.nextDate === null){
    return {
      'backgroundColor': 'unset',
      'borderRadius': '5px',
      'padding': '3px 6px',
    }
  }

  if(task.status === 'complete'){
    return {
      'backgroundColor': 'rgba(8, 243, 125, 0.5)',
      'borderRadius': '5px',
      'padding': '3px 6px',
    }
  }

  // if task is overdue
  if (endDate < todayDate) {
    return {
      'backgroundColor': 'rgba(243, 40, 26, 0.5)',
      'borderRadius': '5px',
      'padding': '3px 6px',
    }
  }

  if ( endDate > todayDate && task.status !== 'complete') {
    
    const currentRange = Math.floor((todayDate - startDate) / (1000 * 3600 * 24));
    // console.log('currentRange =', currentRange);
    const fullRange = Math.floor((endDate - startDate) / (1000 * 3600 * 24));
    // console.log('fullRange =', fullRange);

    const rangePercentage = currentRange / fullRange;
    // green
    if( rangePercentage <= 0.2){
      return {
        'backgroundColor': 'rgba(8, 243, 39, 0.5)',
        'borderRadius': '5px',
        'padding': '3px 6px',
      }
    }
    // yellow/green 
    if( rangePercentage > 0.2 && rangePercentage <= 0.4){
      return {
        'backgroundColor': 'rgba(161, 243, 8, 0.5)',
        'borderRadius': '5px',
        'padding': '3px 6px',
      }
    }
    // yellow
    if( rangePercentage > 0.4 && rangePercentage <= 0.6){
      return {
        'backgroundColor': 'rgba(243, 239, 8, 0.5)',
        'borderRadius': '5px',
        'padding': '3px 6px',
      }
    }
    // orange 
    if( rangePercentage > 0.6 && rangePercentage <= 0.8){
      return {
        'backgroundColor': 'rgba(248, 180, 34, 0.5)',
        'borderRadius': '5px',
        'padding': '3px 6px',
      }
    }
    // red/orange 
      if( rangePercentage > 0.8){
        return {
          'backgroundColor': 'rgba(248, 120, 34, 0.5)',
          'borderRadius': '5px',
          'padding': '3px 6px',
        }
      }
  }
}

export default getPriority;