// packages
import React, { useState, useEffect } from 'react';
import { NavLink} from 'react-router-dom';

// styles
import './ChooseHouse.css';

// hooks
import useGetHouseholds from '../../hooks/useGetHouseholds';

// components
import WelcomeTitles from '../../components/WelcomeTitles';

// functions
import getSession from '../../functions/getSession';
import fetcher from '../../functions/fetcher';

//cloudinary
import {Image} from 'cloudinary-react';


const ChooseHouse = () => {
  const households = useGetHouseholds();
  // console.log('households =', households)
  const [imageIds,setImageIds] = useState()
  const id = getSession('id');
  let token = getSession('token').split('"')
  token = token[1]
  
  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetcher(`/api/images/${id}`,"Get",'',token)
      setImageIds(response)
      //console.log('res',response[0])
    } 
    fetchImages()
  },[])

  return (
    <>
      <WelcomeTitles />
      <section>
        <article id='home-content' className='flex'>
          
          <div id='create-household'>
            <NavLink
              to='/createHousehold'
            >
              <img
                className='household-img'
                src=''
                alt=''
              />
              <p>Create New Household</p>
            </NavLink>
          </div>

          <div id='current-household' className='flex'>

            {households.map((household,index) => {
              return (
                <div key={household.id} className='household'>
                  <NavLink 
                    to={{
                      pathname: `/dashboard/${id}/${household.id}`,
                      aboutProps: { houseName: household.houseName },
                    }} >
                    {imageIds && /* imageIds.map( (imageId) =>*/
                      imageIds[index] == null ?(<img
                      className='household-img'
                      src=''
                      alt=''
                    />):(<Image
                        key = {index} 
                        cloudName = 'dii2emagu'
                        publicId = {imageIds && imageIds.length >0 ? imageIds[index] : imageIds}
                        className='household-img'
                      />)}
                    <p>{household.houseName}</p>
                  </NavLink>
                </div>
              )
            })}

          </div>

        </article>
      </section>
    </>
  )
}

export default ChooseHouse;