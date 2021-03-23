// packages
import { useEffect, useState, useCallback } from 'react';

// functions
import fetcher from '../functions/fetcher';
import getSession from '../functions/getSession';


const useGetImages = () => {

  let token = getSession('token').split('"');
  token = token[1];
  const houseID = getSession('houseID');
  const userID = getSession('id');

  // state
  const [imageID, setImageID] = useState('');

  // images handler ---------------------------------------------------------------
  
  const fetchImages = useCallback(async () => {

    const url = `/api/images/user/${houseID}&${userID}`;
    const response = await fetcher( url , 'GET', '', token);
    // console.log('useGetImages, response = ', response);
    setImageID(response.currentUser);

  },[token, userID, houseID]);

  useEffect(() => {

    fetchImages();

  }, [fetchImages]);

  return [imageID]; 
}

export default useGetImages;