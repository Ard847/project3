// packages
import React, { useEffect, useState } from 'react';

// styles
import './EditTask.css';

// hooks
import useGetMembers from '../hooks/useGetMembers';

// functions
import fetcher from '../functions/fetcher';
import getSession from '../functions/getSession';


const EditTask = ({ task, refresh }) => {

  // console.log('EditTask, props, task =', task);
  const members = useGetMembers();

  const [taskData, setTaskData] = useState({
    id: task.id,
    taskName: task.taskName,
    alertBefore: task.alertBefore,
    completeBy: task.completeBy,
    completedDate: task.completedDate,
    duration: task.duration,
    householdID: task.householdID,
    nextDate: task.nextDate,
    repeatEvery: task.repeatEvery,
    status: task.status,
    userID: task.userID,
  });
  const [user, setUser] = useState({});
  const [displayDate, setDisplayDate] = useState('');
  // console.log('members =',members);
  // console.log('taskData =', taskData);

  // console.log("displayDate =", displayDate );
  useEffect(() => {
    // console.log('taskData.nextDate =', taskData.nextDate);
    if (taskData.nextDate === null) {
      setDisplayDate('Invalid Date');
    } else {
      const newDisplayDate = new Date(taskData.nextDate).toString().split(' ').splice(0, 4).join(' ');
      setDisplayDate(newDisplayDate);
    }
  }, [taskData]);

  useEffect(() => {

    const getUser = async () => {
      let newUser = await members.find(member => member.id === taskData.userID);
      setUser(newUser);
      // console.log('user taskData.userID true =', user);
    }

    const createUser = async () => {
      setUser(
        {
          id: 0,
          firstName: 'All Household',
          lastName: 'Members',
        }
      )
      // console.log('user taskData.userID false =', user);
    }

    if (taskData.userID) {
      getUser();
    }
    if (!taskData.userID) {
      createUser();
    }

  }, [taskData, members]);

  const handleInputChange = (event) => {
    const target = event.target;
    // console.log('target =', target);
    // console.log('target.name =', target.name);
    // console.log('target.value =', target.value);

    if (target.name === 'task-name') {
      let newTaskName = { ...taskData };
      newTaskName.taskName = target.value;
      setTaskData(newTaskName);
    }

    if (target.name === 'duration-input') {
      let newTaskDuration = { ...taskData };
      newTaskDuration.duration = target.value;
      setTaskData(newTaskDuration);
    }

    if (target.name === 'due-date-input') {
      const date = new Date(target.value);
      // console.log('date =', date);
      let newTaskDue = { ...taskData };
      newTaskDue.nextDate = date;
      setTaskData(newTaskDue);
    }

    if (target.name === 'alert-date-input') {
      let newTaskAlert = { ...taskData }
      newTaskAlert.alertBefore = target.value;
      setTaskData(newTaskAlert);
    }

    if (target.name === 'completeBy-date-input') {
      let newTaskComplete = { ...taskData };
      newTaskComplete.completeBy = target.value;
      setTaskData(newTaskComplete);
    }

    if (target.name === 'repeat-input') {
      let newTaskRepeat = { ...taskData };
      newTaskRepeat.repeatEvery = target.value;
      setTaskData(newTaskRepeat);
    }

  }

  const assignHouseholdMember = async (member) => {
    // console.log('assignHouseholdMember, member =', member);
    const url = `/api/task/updateUser/${taskData.householdID}`;
    const body = {
      taskID: task.id,
      user: member.id,
    }
    let token = getSession('token').split('"');
    token = token[1];
    const updateUserResponse = await fetcher(url, 'PUT', body, token);
    // console.log('updateUserResponse =', updateUserResponse.message);
    if (updateUserResponse.message === 'success') {
      // console.log('in this block');
      let newTaskData = { ...taskData };
      // console.log('newTaskData 1 =', newTaskData);
      newTaskData.userID = member.id;
      newTaskData.status = 'assigned';
      // console.log('newTaskData 2 =', newTaskData);
      setTaskData(newTaskData);
      refresh();
    };
  };

  const handleSave = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    // console.log('handleSave event =', event);
    event.preventDefault();
    event.stopPropagation();
    // console.log('taskData =', taskData);

    const houseID = getSession('houseID');
    let token = getSession('token').split('"');
    token = token[1];
    const url = `/api/task/updateAll/${houseID}`;

    const updateTaskResponse = await fetcher(url, 'PUT', taskData, token);
    // console.log('updateTaskResponse =', updateTaskResponse);
    if (updateTaskResponse.message === 'success') {
      refresh();
    }
  }

  // console.log('display date', displayDate, typeof(displayDate));

  return (
    <div id='task-information'>
      <div id='task-name' >
        <label htmlFor='task-name-input'>Task Name: </label>
        <input
          type='text'
          id='task-name-input'
          value={taskData.taskName}
          name='task-name'
          onChange={handleInputChange}
        />
        <button className='save-btn' onClick={handleSave}>Save</button>
      </div>

      <div id='assigned-to' >
        <p>Assigned To:
          <span style={{
            'backgroundColor': user?.color,
            'borderRadius': '5px',
            'padding': '3px 6px',
            }}
          >
            {`${user?.firstName} ${user?.lastName}`}
          </span>
        </p>
        <p>Assign a household member: </p>
        <div id='dash-members' className='container'>
          {members.map((member) => {
            return (
              <div key={member.id} className='member-profile' onClick={() => { assignHouseholdMember(member) }}>
                <img
                  className='member-img'
                  src=''
                  alt=''
                />
                <p
                  id='user-name'
                  style={{
                    'backgroundColor': member.color,
                    'borderRadius': '5px',
                    'padding': '3px 6px',
                  }}
                  className='text-centre'>{member.firstName} {member.lastName}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* <div id='status' >
        <p>Status: {taskData.status}</p>
      </div> */}

      <div id='duration' >
        <label htmlFor='durationinput'>The task takes
          <input
            type='number'
            id='duration-input'
            value={taskData.duration}
            name='duration-input'
            onChange={handleInputChange}
          />
          minutes to complete.
        </label>
        <button className='save-btn' onClick={handleSave}>Save</button>
      </div>

      <div id='due-date' >
        <p>Due Date: {displayDate === 'Invalid Date' ? 'No Date set' : displayDate}</p>
        <p>Set Date: </p>
        <input
          type='date'
          id='due-date-input'
          name='due-date-input'
          onChange={handleInputChange}
        />
        <button className='save-btn' onClick={handleSave}>Save</button>
      </div>

      <div id='alert-date' >
        <label htmlFor='alert-input'>Alert Me:
          <input
            type='number'
            id='alert-date-input'
            name='alert-date-input'
            value={taskData.alertBefore}
            onChange={handleInputChange}
          />
          Days Before.
        </label>
        <button className='save-btn' onClick={handleSave}>Save</button>
      </div>

      <div id='completeBy-date' >
        <label htmlFor='completeBy-date-input'>Deadline tollerance
        <input
            type='number'
            id='completeBy-date-input'
            value={taskData.completeBy}
            name='completeBy-date-input'
            onChange={handleInputChange}
          />
        days after.
        </label>
        <button className='save-btn' onClick={handleSave}>Save</button>
      </div>

      <div id='repeat-input' >
        <label htmlFor='durationinput'>The task will repeat every
          <input
            type='number'
            id='repeat-input'
            value={taskData.repeatEvery}
            name='repeat-input'
            onChange={handleInputChange}
          />
          days
        </label>
        <button className='save-btn' onClick={handleSave}>Save</button>
      </div>

    </div>
  )
}

export default EditTask;