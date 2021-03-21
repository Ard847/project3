// functions
import getSession from "./getSession";
import fetcher from "./fetcher";


const checkTaskStatus = (allTasks) => {

  const houseID = getSession('houseID');
  let token = getSession('token').split('"');
  token = token[1];

  allTasks.forEach( async (task) => {

    const todayDate = new Date();
    const endDate = new Date(task.nextDate);
    endDate.setDate(endDate.getDate() + Number(task.completeBy));
    const startDate = new Date(task.nextDate);
    startDate.setDate(startDate.getDate() - Number(task.alertBefore));

    if (task.status === 'complete' && startDate > todayDate) {
      console.log(`the task is ${task.taskName}`);

      const url = `/api/task/updateStatus/${houseID}`;
      const body = {
        taskID: task.id,
        newStatus: 'to-do',
      };
      const updateStatusResponse = await fetcher(url, 'PUT', body, token);
      // console.log('updateResponse =', updateResponse);

      if (updateStatusResponse.message === 'success') {
        console.log(`updated ${task.taskName}`)
      }
    }
  })

}

export default checkTaskStatus;