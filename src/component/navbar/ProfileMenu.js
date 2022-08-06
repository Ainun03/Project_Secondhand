import React from 'react';

import { useNavigate } from 'react-router-dom';

// Icons
import { FiLogIn, FiUser } from "react-icons/fi";

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from '../../slices/authSlice';
import { clearData } from '../../slices/userSlice';

function ProfileMenu({ hidden }) {
  const dispatch = useDispatch();

  const { auth } = useSelector(state => state);

  const navigate = useNavigate();

  return (
    <div className={`${hidden} bg-white absolute z-[999] rounded-2xl shadow-main px-5 py-3  w-80 transition ease-in-out duration-300`}>
      <div onClick={() => {
        auth.login.token ? navigate('/info-profile') : navigate('/login');
      }} className='flex items-center py-3 gap-2 cursor-pointer'>
        <FiUser size={20} />
        <span>Profil</span>
      </div>
      {auth.login.token ? (<div onClick={() => {
        dispatch(logout());
        dispatch(clearData());
      }} className='flex border-t border-gray-200 items-center py-3 gap-2 cursor-pointer'>
        <FiLogIn size={20} />
        <span>Keluar</span>
      </div>) : (<div onClick={() => {
        navigate('/login');
      }} className='flex border-t border-gray-200 items-center py-3 gap-2 cursor-pointer'>
        <FiLogIn size={20} />
        <span>Masuk</span>
      </div>)}
    </div>
  );
}

export default ProfileMenu;