// packages
import React from 'react';

// styles
import './DashboardHome.css';

// hooks
import useSiteLocation from '../../hooks/useSiteLocation';

const DashboardHome = ({match, location}) => {

  console.log('match =', match );
  console.log(location);
  useSiteLocation(location);
  
  return (
    <h3>Dashboard {match.params.householdID}</h3>
  )

}

export default DashboardHome;