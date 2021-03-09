// packages
import { NavLink } from 'react-router-dom';

// styles
import './CreateHouse.css';

// components
import HouseForm from '../forms/HouseForm';


const CreateHouse = () => {

  const id = 'Sam';

  return (
    <article id='create-household-content'>
      <h2> Create New Household</h2>

      <div id='create-household'>
        <img
          className='household-img'
          src=''
          alt=''
        />
      </div>
      <HouseForm userID={id} type={'create'}/>

      <h2> Join an Existing Household</h2>
      <HouseForm userID={id} type={'join'}/>

      <NavLink to='/' >Back to Households</NavLink>
    </article>
  );
}

export default CreateHouse;