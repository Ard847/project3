// functions
import getSession from "./getSession";
import fetcher from "./fetcher";


const checkTaskStatus = (allTasks) => {

  const houseID = getSession('houseID');
  let token =getSession('token') === null ? null : getSession('token').split('"');
  token = token === null ? null : token[1];
  if(allTasks === undefined) return
  allTasks.forEach( async (task) => {

    const todayDate = new Date().toLocaleDateString();
    const endDate = new Date(task.nextDate);
    const completedDate = new Date (task.completedDate).toLocaleDateString();
    endDate.setDate(endDate.getDate() + Number(task.completeBy));
    const startDate = new Date(task.nextDate);
    startDate.setDate(startDate.getDate() - Number(task.alertBefore));

    // console.log('completedDate < todayDate= ', completedDate !== todayDate);
    // console.log('todayDate = ', todayDate);
    // console.log('completedDate = ', completedDate);
    
    if (task.status === 'complete' && completedDate !== todayDate) {
      // console.log(`the task is ${task.taskName}`);

      const url = `/api/task/updateStatus/${houseID}`;
      const body = {
        taskID: task.id,
        newStatus: 'to-do',
      };
      await fetcher(url, 'PUT', body, token);
      
    }
  })

}

export default checkTaskStatus;