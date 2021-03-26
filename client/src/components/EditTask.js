// packages
import React, { useEffect, useState, useContext } from 'react';
// styles
import './EditTask.css';
// images
import person from '../images/person.png';
// context
import MembersContext from '../context/MembersContext';
// functions
import fetcher from '../functions/fetcher';
import getSession from '../functions/getSession';
//cloudinary
import { Image } from 'cloudinary-react';



const EditTask = ({ task, refresh }) => {

  // console.log('EditTask, props, task =', task);
  const { members } = useContext(MembersContext);

  const houseID = getSession('houseID');
  const userID = getSession('id');
  let token = getSession('token').split('"');
  token = token[1];

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
  const [imageIds, setImageIds] = useState([]);
  const [isFieldEmpty, setisFieldEmpty] = useState(false);
  const [isSaved, setIsSaved] = useState(false)
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
      );
      // console.log('user taskData.userID false =', user);
    }

    if (taskData.userID) {
      getUser();
    }
    if (!taskData.userID) {
      createUser();
    }

  }, [taskData, members]);

  //Fetch user images
  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetcher(`/api/images/user/${houseID}&${userID}`, 'GET', '', token);
      //console.log(response);
      setImageIds(response.images);
      //console.log(imageIds);
    }
    fetchImages()
  }, [token, userID, houseID]);

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
    console.log('task',taskData)

    if(taskData.taskName === '' || taskData.duration === '' || taskData.alertBefore === '' || taskData.completeBy === ''   || taskData.repeatEvery  === '' ){
      setisFieldEmpty(true)
      return
    }
    setisFieldEmpty(false)

    const updateTaskResponse = await fetcher(url, 'PUT', taskData, token);
    // console.log('updateTaskResponse =', updateTaskResponse);
    if (updateTaskResponse.message === 'success') {
      refresh();
      setIsSaved(true)
    }
  }

  // console.log('display date', displayDate, typeof(displayDate));

  return (
    <div id='task-information'>

      <div id='task-name' >
        <label className='ETF-lable' htmlFor='task-name-input'><span className='ETF-lable'>TaskName:</span> </label>
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
        <p> <span className='ETF-lable'>Assigned To:</span>
          <span style={{
            'backgroundColor': user?.color,
            'borderRadius': '12px',
            'padding': '3px 12px',
            'color': '#fff',
            }}
          >
            {`${user?.firstName} ${user?.lastName}`}
          </span>
        </p>
        <p>Assign a household member: </p>
        <div id='dash-members' className='container'>
          {members.map((member, index) => {
            return (
              <div key={member.id} className='member-profile' onClick={() => { assignHouseholdMember(member) }}>
                {imageIds && imageIds[index] == null ? (<img
                className='member-img'
                src={person}
                alt='generic person'
              />) : (<Image
                key={index}
                cloudName='dii2emagu'
                publicId={imageIds && imageIds.length > 0 ? imageIds[index] : imageIds}
                className='member-img'
              />)}
              <p
                id='user-name'
                style={{
                  'backgroundColor': member.color,
                  'borderRadius': '12px',
                  'padding': '3px 12px',
                  'color':'#fff',
                }}
                  className='text-centre'>{member.firstName} {member.lastName}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div id='duration' >
        <p><span className='ETF-lable'>Duration:</span></p>
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
        <p><span className='ETF-lable' > Due Date:</span> {displayDate === 'Invalid Date' ? 'No Date set' : displayDate}</p>
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
        <label htmlFor='alert-input'><span className='ETF-lable'>Alert Me:</span>
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
        <label htmlFor='completeBy-date-input'><span className='ETF-lable' > Deadline tollerance </span>
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
        <label htmlFor='durationinput'>The task will <span className='ETF-lable' >repeat</span> every
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
      
      {isSaved && (
        <p className= 'success text-centre' >Your task was successfully updated</p>
      )}
      {isFieldEmpty && (
        <p className="error text-center" >Please fill every empty field</p>
      )}
    </div>
  )
}

export default EditTask;