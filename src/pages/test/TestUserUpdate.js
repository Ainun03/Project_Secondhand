import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteAllOffer } from '../../slices/offerSlice';

const TestUserUpdate = () => {
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();

  const save = () => {
    const formData = new FormData();

    // formData.append('username', 'john');
    formData.append('productId', 2);
    formData.append('offerPrice', 50000);
    // formData.append('productStatus', false);
    // formData.append('price', 300000);
    // formData.append('description', 'tes');
    // formData.append('image', image);

    axios.put('https://binar-secondhand-staging.herokuapp.com/offer/add-offer', formData, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2huIiwiaWF0IjoxNjU4Mjk3NDEzLCJleHAiOjE2NTgzODM4MTN9.cz1q9_K90tBh1keydwzqP50mh2HF0Wrn1TKedQfHXYbGzchiVpUqwoT3r6lSPJl1JzaLo9LOy_Bknyu5x9IyRQ'
      }
    })
      .then(() => console.log('data added'))
      .catch((e) => console.log(e.message));

  };

  return (
    <div>
      <input type={'text'} placeholder='username' onChange={e => setUsername(e.target.value)} />
      <input type={'text'} placeholder='city' onChange={e => setCity(e.target.value)} />
      <input type={'text'} placeholder='adress' onChange={e => setAddress(e.target.value)} />
      <input type={'number'} placeholder='phone number' onChange={e => setPhoneNumber(e.target.value)} />
      <input type={'file'} onChange={e => setImage(e.target.value)} />

      <button onClick={() => dispatch(deleteAllOffer())}>Save</button>
    </div>
  );
};

export default TestUserUpdate;