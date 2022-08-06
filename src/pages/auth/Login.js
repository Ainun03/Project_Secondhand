import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Icon
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';

// Redux
import { loginUser } from '../../slices/authSlice';
import { getUsers } from '../../slices/userSlice';

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, user } = useSelector(state => state);

  const login = () => {
    setIsSubmitted(true);
    if (email !== '' && password !== '') {
      dispatch(loginUser({ email, password }));
      dispatch(getUsers({ token: auth.login.token }));
    }
  };

  // auto navigate to home when user already logged in
  useEffect(() => {
    if (auth.login.token) {
      navigate('/');
    }
  }, [auth, navigate]);

  return (
    <div className='flex flex-col md:flex-row h-screen p-4 md:p-0'>
      <BiArrowBack size={26} className='md:hidden' onClick={() => navigate('/')} />
      <img className='hidden md:block w-2/4 object-cover' src='/assets/images/login_web.png' alt='Login' />
      <div className='mt-32 flex flex-col flex-grow justify-between md:justify-center md:mt-0 md:p-32'>
        <div>
          <h2 className='text-3xl font-bold'>Masuk</h2>
          <div className='my-6 flex flex-col text-base'>
            <label htmlFor='email'>Email</label>
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
          <button type='submit' onClick={() => login()} className='w-full bg-primary py-4 md:p-3 rounded-xl text-white text-lg'>Masuk</button>
        </div>
        <p className='text-center text-base md:mt-10'>Belum punya akun? <span className='text-primary font-bold cursor-pointer' onClick={() => navigate('/register')}>Daftar disini</span></p>
      </div>
    </div>
  );
};

export default Login;