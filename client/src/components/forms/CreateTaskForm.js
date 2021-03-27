// packages
import React, { useState, useContext } from 'react';

// styles
import './Forms.css';
import './CreateTaskForm.css';

// context
import TaskContext from '../../context/TaskContext';

// functions
import fetcher from '../../functions/fetcher';
import getSession from '../../functions/getSession';
import processToDays from '../../functions/processToDays';


const CreateTaskForm = () => {

  const { refreshTasks } = useContext(TaskContext);

  const [taskData, setTaskData] = useState({
    name: '',
    duration: {
      time: '',
      unit: '',
    },
    repeat: {
      time: '',
      unit: '',
    },
    alert: {
      time: '',
      unit: '',
    },
    complete: {
      time: '',
      unit: '',
    },
  });
  const [createNewSuccess, setCreateNewSuccess] = useState(false);
  const [createNewError, setCreateNewError] = useState(false);
  const [isFieldEmpty, setisFieldEmpty] = useState(false);

  const handleReset = async (event) => {
    event.stopPropagation();
    setCreateNewSuccess(false);
    setCreateNewError(false);
    setisFieldEmpty(false);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    // console.log('taskData =', taskData);

    const houseID = getSession('houseID')
    let token = getSession('token').split('"');
    token = token[1]

    // console.log('taskData =', taskData);


      // console.log('all form is filled');
      const timings = await processToDays(taskData);
      // console.log('timings =', timings);

      const body = {
        name: taskData.name,
        timings: timings,
      }
    // validation 
    //console.log(taskData.repeat)
    if(body.name === '' || body.timings.alert === '' || body.timings.complete === '' || body.timings.duration === '' || 
       body.timingsrepeat === '' || taskData.duration.unit === ''  || taskData.repeat.unit === '' || taskData.alert.unit  === '' || taskData.complete.unit === ''){
      setisFieldEmpty(true)
      return
    }

    //console.log('all form is filled');

      const url = `/api/task/createNew/${houseID}`;
      const createTaskResponse = await fetcher(url, 'POST', body, token);
      // console.log('createTaskResponse =', createTaskResponse);
      if (createTaskResponse.message === 'success') {
        setisFieldEmpty(false)
        setCreateNewSuccess(true);
        setTimeout(() => {
          setCreateNewSuccess(false);
        }, 2000);
        refreshTasks();
      }
      if (createTaskResponse.message === 'error') {
        refreshTasks();
        setCreateNewError(true);
        setTimeout(() => {
          setCreateNewError(false);
        }, 2000);
      }
  }

  const handleRadioInput = (event) => {
    const target = event.target;
    // console.log('target =', target); 

    if (target.name === 'duration') {
      let newTaskData = { ...taskData }
      newTaskData.duration.unit = target.value;
      // console.log('newTaskData =',newTaskData);
      setTaskData(newTaskData);
    }

    if (target.name === 'repeat') {
      let newTaskData = { ...taskData }
      newTaskData.repeat.unit = target.value;
      // console.log('newTaskData =',newTaskData);
      setTaskData(newTaskData);
    }

    if (target.name === 'alert') {
      let newTaskData = { ...taskData }
      newTaskData.alert.unit = target.value;
      // console.log('newTaskData =',newTaskData);
      setTaskData(newTaskData);
    }

    if (target.name === 'complete') {
      let newTaskData = { ...taskData }
      newTaskData.complete.unit = target.value;
      // console.log('newTaskData =',newTaskData);
      setTaskData(newTaskData);
    }
  }

  const handleTextInput = (event) => {
    const value = event.target.value;
    let newTaskData = { ...taskData }
    newTaskData.name = value;
    // console.log('newTaskData =',newTaskData);
    setTaskData(newTaskData);
  }

  const handleNumberInput = (event) => {
    const target = event.target;
    // console.log('target =', target);
    if (target.name === 'duration') {
      let newTaskData = { ...taskData }
      newTaskData.duration.time = target.value;
      // console.log('newTaskData =',newTaskData);
      setTaskData(newTaskData);
    }

    if (target.name === 'repeat') {
      let newTaskData = { ...taskData }
      newTaskData.repeat.time = target.value;
      // console.log('newTaskData =',newTaskData);
      setTaskData(newTaskData);
    }

    if (target.name === 'alert') {
      let newTaskData = { ...taskData }
      newTaskData.alert.time = target.value;
      // console.log('newTaskData =',newTaskData);
      setTaskData(newTaskData);
    }

    if (target.name === 'complete') {
      let newTaskData = { ...taskData }
      newTaskData.complete.time = target.value;
      // console.log('newTaskData =',newTaskData);
      setTaskData(newTaskData);
    }
  }


  return (
    <form id='create-task'>
      <div id='name-input-section'>
        <label className='CTF-lable' htmlFor='task-name'>Task Name:</label>
        <input
          id='task-name'
          type='text'
          placeholder='Name your task'
          onChange={handleTextInput}
        />
      </div>
      <div id='duration-number'>
        <label className='CTF-lable' htmlFor='duration'>Duration:</label>
        <input
          id='duration'
          type='number'
          placeholder='How long will it take? (1-90)'
          min='1'
          max='90'
          name='duration'
          onChange={handleNumberInput}
        />
      </div>
      <div id='duration-radio'>
        <input
          id='hours'
          type='radio'
          name='duration'
          value='hours'
          onChange={handleRadioInput}
        /><label htmlFor='hours'>Hours</label>
        <input
          id='mins'
          type='radio'
          name='duration'
          value='mins'
          onChange={handleRadioInput}
        />
        <label htmlFor='mins'>Minutes</label>
      </div>
      <div id='repeat-number'>
        <label className='CTF-lable' htmlFor='duration'>Repeat every...</label>
        <input
          id='repeat'
          type='number'
          placeholder='How often should it occur? (1-18)'
          min='1'
          max='18'
          name='repeat'
          onChange={handleNumberInput}
        />
      </div>
      <div id='repeat-radio'>
        <input
          id='repeat-days'
          type='radio'
          name='repeat'
          value='days'
          onChange={handleRadioInput}
        />
        <label htmlFor='repeat-days'>Days</label>
        <input
          id='repeat-weeks'
          type='radio'
          name='repeat'
          value='weeks'
          onChange={handleRadioInput}
        />
        <label htmlFor='repeat-weeks'>Weeks</label>
        <input
          id='repeat-months'
          type='radio'
          name='repeat'
          value='months'
          onChange={handleRadioInput}
        />
        <label htmlFor='repeat-months'>Months</label>
      </div>
      <div id='alert-number'>
        <label className='CTF-lable' htmlFor='duration'>Alert time:</label>
        <input
          id='alert'
          type='number'
          placeholder='When do you want to be notified? (1-6)'
          min='1'
          max='6'
          name='alert'
          onChange={handleNumberInput}
        />
      </div>
      <div id='alert-radio'>
        <input
          id='alert-days'
          type='radio'
          name='alert'
          value='days'
          onChange={handleRadioInput}
        />
        <label htmlFor='alert-days'>Days</label>
        <input
          id='alert-weeks'
          type='radio'
          name='alert'
          value='weeks'
          onChange={handleRadioInput}
        />
        <label htmlFor='alert-weeks'>Weeks</label>
        <input
          id='alert-months'
          type='radio'
          name='alert'
          value='months'
          onChange={handleRadioInput}
        />
        <label htmlFor='alert-months'>Months</label>
      </div>

      <div id='complete-number'>
        <label className='CTF-lable' htmlFor='duration'>Completion time:</label>
        <input
          id='completeBy'
          type='number'
          placeholder='How long to complete the task? (1-4)'
          min='1'
          max='4'
          name='complete'
          onChange={handleNumberInput}
        />
      </div>
      <div id='complete-radio'>
        <input
          id='complete-days'
          type='radio'
          name='complete'
          value='days'
          onChange={handleRadioInput}
        />
        <label htmlFor='complete-days'>Days</label>
        <input
          id='complete-weeks'
          type='radio'
          name='complete'
          value='weeks'
          onChange={handleRadioInput}
        />
        <label htmlFor='complete-weeks'>Weeks</label>
      </div>

      <input className="input-submit" type='submit' onClick={handleSubmit} />
      <input className="input-submit" type='reset' onClick={handleReset}/>

      {createNewSuccess && (
        <p className='success text-centre'>Task Created!</p>
      )}
      {createNewError && (
        <p className='error text-centre'>Whoops Something went wrong.</p>
      )}
      {isFieldEmpty && (
        <p className="error text-center" >Please fill every empty field</p>
      )}

    </form>
  );
}

export default CreateTaskForm;