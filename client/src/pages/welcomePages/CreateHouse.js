// packages
import { NavLink } from 'react-router-dom';

// styles
import './CreateHouse.css';

// components
import HouseForm from '../../components/forms/HouseForm';
import WelcomeTitles from '../../components/WelcomeTitles';

// functions
import getSession from '../../functions/getSession';

// hooks


const CreateHouse = () => {

  const id = getSession('id');

  return (
    <>
      <WelcomeTitles />
      <section>
        <article id='create-household-content'>
          <h2> Create New Household</h2>

          <div id='create-household'>
            <img
              className='household-img'
              src=''
              alt=''
            />
          </div>
          <HouseForm userID={id} type={'create'} />

          <h2> Join an Existing Household</h2>
          <HouseForm userID={id} type={'join'} />

          <NavLink to='/logIn/:userID' >Back to Households</NavLink>
        </article>
      </section>
    </>

  );
}

export default CreateHouse;