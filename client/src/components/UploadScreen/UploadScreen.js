// import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners'
import './UploadScreen.css'

export default function UploadScreen(props) {
    return (
        <div className='backdrop-screen'>
            <ClipLoader className='loader' size={50}  color={'#000'} loading={props.uploading}  />
        </div>
    );
}