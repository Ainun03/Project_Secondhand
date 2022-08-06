import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';

const Register = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const register = () => {
    setIsSubmitted(true);
    if (username !== '' && email !== '' && password !== '') {
      dispatch(registerUser({ username, email, password }));
    }
  };

  useEffect(() => {
    // TODO check token
    if (auth.login.token) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (auth.register.message) {
      navigate('/login');
    }
  }, [auth.register, navigate]);

  return (
    <div className='flex flex-col md:flex-row h-screen p-4 md:p-0'>
      <BiArrowBack size={26} className='md:hidden' onClick={() => navigate('/')} />
      <img className='hidden md:block w-2/4 object-cover' src='/assets/images/login_web.png' alt='Register' />
      <div className='mt-32 flex flex-col flex-grow justify-between md:justify-center md:mt-0 md:p-32'>
        <div>
          <h2 className='text-3xl font-bold'>Daftar</h2>
          <div className='my-6 flex flex-col text-base'>
            <label htmlFor='name'>Name</label>
            <input
              id='name'
              type='text'
              placeholder='Nama Lengkap'
              className='border border-[#D0D0D0] p-4 md:p-3 rounded-xl mt-1'
              onChange={(e) => setUsername(e.target.value)}
            />
            {username === '' && isSubmitted ? <span className='text-red-600 mt-1'>*Nama tidak boleh kosong</span> : ''}
            <label htmlFor='email' className='mt-3'>Email</label>
            <input
              id='email'
              type='email'
              placeholder='Contoh: johndoe@gmail.com'
              className='border border-[#D0D0D0] p-4 md:p-3 rounded-xl mt-1'
              onChange={(e) => setEmail(e.target.value)}
            />
            {email === '' && isSubmitted ? <span className='text-red-600 mt-1'>*Email tidak boleh kosong</span> : ''}
            <label htmlFor='password' className='mt-3'>Password</label>
            <div className='flex flex-row border border-[#D0D0D0] mt-1 pr-2 rounded-xl items-center justify-between'>
              <input
                id='password'
                type={isVisible ? 'text' : 'password'}
                placeholder='Masukkan password'
                className='flex-grow mr-1 border-0 rounded-l-xl p-4 md:p-3'
                onChange={(e) => setPassword(e.target.value)}
              />
              {
                isVisible ?
                  <AiOutlineEyeInvisible
                    onClick={() => setIsVisible(false)}
                    size={25}
                  /> :
                  <AiOutlineEye
                    onClick={() => setIsVisible(true)}
                    size={25}
                  />
              }
            </div>
            {password === '' && isSubmitted ? <span className='text-red-600 mt-1'>*Password tidak boleh kosong</span> : ''}
          </div>
          <button onClick={() => register()} className='w-full bg-primary py-4 md:p-3 rounded-xl text-white text-lg'>Daftar</button>
        </div>
        <p className='text-center text-lg md:mt-10'>Sudah punya akun? <span className='text-primary font-bold cursor-pointer' onClick={() => navigate('/login')}>Masuk disini</span></p>
      </div>
    </div>
  );
};

export default Register;