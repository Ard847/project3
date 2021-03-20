// functions
import getSession from "./getSession";
import fetcher from './fetcher';

const checkForOverdue = (allTasks) => {

  console.log('called');

  const houseID = getSession('houseID');
  let token = getSession('token').split('"');
  token = token[1];

  allTasks.forEach(async (task) => {
    const todayDate = new Date();
    console.log('overdue task =',task.nextDate, typeof(task.nextDate));
    // const parsedDate = Date.parse(task.nextDate);
    // console.log('parsedDate =', parsedDate);
    const endDate = new Date(task.nextDate);
    endDate.setDate(endDate.getDate() + Number(task.completeBy));
    // console.log('endDate =', endDate);
    // console.log('task.taskName =', task.taskName);
    // console.log('todayDate =', todayDate);
    // console.log('todayDate > endDate =', todayDate > endDate);

    if (todayDate > endDate){
      console.log('task.taskName =', task.taskName);
      const url = `/api/task/updateStatus/${houseID}`
      const body = {
        taskID: task.id,
        newStatus: 'overdue',
      }

      const updateTaskResponse = await fetcher(url, 'PUT', body, token);
      console.log('updateTaskResponse =', updateTaskResponse);
    }

  });
}

export default checkForOverdue;