// packages
import React from 'react';

// styles
import './Instructions.css';

// components
import InstructionCard from '../../components/InstructionCard';



const Instructions = () => {

  return (
    <section id='instructions-content'>

      <div>
        <h1 className="text-center instruction-title">How to use: </h1>
        <h3 className="subheading text-center">Here are some steps you can follow to make using this app easier</h3>

      </div>

      <div className="card-container">

        <div className="cards">
          <div className="circle">
            <h2>01</h2>
          </div>
          <div className="card-content">
            <p>Login or register if you don't have an account</p>
          </div>
        </div>

        <div className="cards">
          <div className="circle">
            <h2>02</h2>
          </div>
          <div className="card-content">
            <p>Schedule tasks using our easy to use kanban board</p>
          </div>
        </div>

        <div className="cards">
          <div className="circle">
            <h2>03</h2>
          </div>
          <div className="card-content">
            <p>Invite your family and assign tasks to each memeber</p>
          </div>
        </div>

      </div>

      <div>
        <h2 className="text-center subheading">Managing your Home: </h2>
        <h3 className="subheading text-center">Here are some steps you can follow to make using this app easier</h3>
      </div>

      <div className="lg-card-container">

        <InstructionCard title={'Dashboard Home'} initialContent={
          'This initial page shows you the household overview and creates quick lists for you to see what needs doing.'
        }>
          <hr />
          <p>
            Tick tasks completed. If you make a mistake you will need
            to correct the due date and status in task manager.
              </p>
          <hr />
          <h6>Todays Tasks</h6>
          <p>
            These are unassigned tasks that need completing by the household.
            All tasks are available for everyone to complete but you can add
            assignments to highlight certain jobs for certain people.
              </p>
          <hr />
          <h6>My Tasks</h6>
          <p>
            Tasks that are assigned to you.
              </p>
          <hr />
          <h6>Assigned Tasks</h6>
          <p>
            Tasks assigned to other members of your
            household. The emphasis here is on teamwork within your
            household. There is not facility yet for private tasks.
              </p>
          <hr />
          <h6>Coming up This Month</h6>
          <p>
            Shows you tasks that will be occurring
            this month and are less frequent than weekly such as mot, car
            insurance and book hair cuts etc.
              </p>
          <hr />
          <h6>Overdue and Complete</h6>
          <p>
            Any task assigned or otherwise that is overdue is shown in the
            Overdue column and all completed tasks for the day are shown in
            the Completed column assigned or otherwise.
              </p>
        </InstructionCard>

        <InstructionCard title={'Create a Task'} initialContent={
          `
          You can do this from any of the dashboard related pages by opening the
          module from the navigation bar. Here you name the task and enter the task
          data such as duration and when you want to be alerted to the task.
        `
        }>
          <hr />
          <h6>Duration</h6>
          <p>
            How long the task will take to do.
              </p>
          <hr />
          <h6>Repeat every …</h6>
          <p>
            How often you want the task to occur; or to put it another way,
            how many days after you last completed the task you want it to occur again.
            This way if you do not complete the task until 3 days after the due date,
            you will not be asked to vacuum only 3 days later.
              </p>
          <p>
            This is also why it is important to set the tolerance on important tasks
            to minimum or 0 values to make sure it repeats on time.
              </p>
          <p>
            This can also be edited manually in the All tasks view of task Manager later.
              </p>
          <hr />
          <h6>Alert</h6>
          <p>
            How many days or weeks before the task is due to occur do you want it to appear in your task list.
              </p>
          <p>
            For instance, if your car insurance is due on 1st April you will likely want to have it appear
            several weeks before, so you can action it.
              </p>
          <hr />
          <h6>Completion Time</h6>
          <p>
            How much tolerance your task has to be completed, i.e. how urgent is the deadline.
              </p>
          <p>
            For example, your car insurance cannot exceed the due date of the 1st April, so you would set
            this field to 0. However, booking a hair appointment is less critical or you may need to allow
            time for the task to be completed
            at a weekend and so you may give yourself an extra couple of days to complete this.
              </p>
          <hr />
          <p>
            Clicking submit will save your task and allow you to create a new one.
            Reset will clear the form for you.
              </p>
          <p>
            Once you have created a task you will need to set the due date from the task
            manager window as it is not yet an active task.
              </p>
        </InstructionCard>

        <InstructionCard 
            title={'Task Manager'} 
            initialContent={
          `
           This is where you can manage the individual tasks a little more in depth,
              set the due dates and see the time a task will take you to do.
           `
        } >
          <hr />
          <p>Change the view using the select dropdown menu.</p>
          <p>Open Task editor by clicking any task in any view.</p>
          <hr />
          <h6>Kanban View</h6>
          <p>
            Initial display on entering task manager it can also be reselected
            in the drop-down menu on this page. Here you will have task cards
            that display the name, duration, and assignment of each task. Here
            there is an option to set a task in motion with an in-progress field.
            This does not show on the dashboard home overview list, however.
              </p>
          <p>
            You cannot drag ‘tasks to do’ cards into the assigned column, you must
            assign the task in the task editor by clicking on the task card. To
            unassign the task you may drag it back to the tasks to do column and
            the member will be removed.
              </p>
          <p>
            Once complete drag it to the complete column. When you complete a task,
            you will notice the due date will change to show the next date it will
            be shown. The completed task will remain in your completed list only for
            the day you complete it, it will then not show again until it is time to
            complete the task again.
              </p>
          <p>
            If you drag a completed task back to the to do column the new due date
            will not change and you may find it disappears from view, you can access
            all tasks associated with your household in the ‘All tasks View’ to
            manually reset the due date.
              </p>
          <hr />
          <h6>All Tasks View</h6>
          <p>
            This is accessed by the select drop down menu in the task manager. It will show all tasks you have created sorted by earliest occurring due date at the top of the list. Clicking on a table row will open the task editor.
              </p>
          <p>
            Here you can see ALL tasks associated with the household even events that are not due to occur. If you have accidently completed a task and you wish to undo you can change the due date here in task editor.
              </p>
          <p>
            At the end of each table row is a delete button to remove a task from your job’s lists for good. You can also see when the task was last completed. Task priority. Each task has a priority color associated with it. There are 5 priority warning colors starting with green through to orange red. Red is reserved for overdue tasks and minty green for complete.
              </p>
          <p>
            Each task has a range of dates it should be completed within from the alert date to the tolerance date. The priority is calculated based on percentage of time through this range that has passed. Eg a 10 day task range will show green on days 1 and 2, yellow/green on days 3 – 4 red/ orange on days 9-10 and red thereafter.
              </p>
        </InstructionCard>

        <div className="cards large">
          <h2 className='lower-layer'>Activating a Task</h2>
          <div className="circle" >
            <h2>Activating a Task</h2>
          </div>
          <div className='card-content'>
            <p>
              This is as simple as setting the first due date.
              Click on either the task card or table row to open the task editor.
            </p>
          </div>
        </div>

        <div className="cards large">
          <h2 className='lower-layer'>Task Editor</h2>
          <div className="circle" >
            <h2>Task Editor</h2>
          </div>
          <div className='card-content'>
            <p>
              To open task editor just click on either a task card in the Kanban view
              or a table row in the All-tasks table view.
            </p>
            <p>
              Here you can edit the name of the task and all the time relevant fields
              you initially set in create a task.
            </p>
            <p>
              The assign member function will set the member automatically but if you
              change the other fields you must press save. The save buttons will save
              all changes made in one click.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}

export default Instructions;