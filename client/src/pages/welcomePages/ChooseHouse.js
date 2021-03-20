// packages
import React, { useState } from 'react';
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


const ChooseHouse = () => {
  const [fileInputState,setFileInputState] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const [previewSource,setPreviewSource] = useState('')
  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result) 
    }
  }

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if(!previewSource) return;
    uploadImage(previewSource)
    //const reader = new FileReader();
   // reader.
  }

  const uploadImage = async (base64EncodedImage) => {
    let token = getSession('token').split('"')
    token = token[1]
    console.log(base64EncodedImage)
    try{
      await fetcher('/api/images/upload','Post',{data :base64EncodedImage},token)
    }catch(e){
      console.log("error image",e)
    }
  }
 
  const households = useGetHouseholds();
  // console.log('households =', households);

  const id = getSession('id');

  return (
    <>
      <WelcomeTitles />
      <section>
        <article id='home-content' className='flex'>
          <form onSubmit = {handleSubmitFile}>
            <input type = "file" name = "image" onChange = {handleFileInputChange} value = {fileInputState}/>
            <button type = "submit"> Submit</button>
          </form>
          {previewSource && (
            <img src = {previewSource} alt = "chosen" style = {{height : '200px'}} />
          )}
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

            {households.map((household) => {
              return (
                <div key={household.id} className='household'>
                  <NavLink 
                    to={{
                      pathname: `/dashboard/${id}/${household.id}`,
                      aboutProps: { houseName: household.houseName },
                    }} >
                    <img
                      className='household-img'
                      src=''
                      alt=''
                    />
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