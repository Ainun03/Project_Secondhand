import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ image, name, city }) => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-row rounded-lg shadow-main py-4 px-5 items-center justify-between'>
      <div className='flex flex-row items-center justify-between'>
        <img
          className='w-[40px] h-[40px] rounded-md'
          src={image ? image : '/assets/images/img-profile.png'}
          alt={name}
          height={'48px'}
          width={'48px'}
        />
        <div className='flex flex-col justify-evenly h-[48px] ml-4'>
          <span className='text-sm font-bold'>{name ? name : 'Anonim'}</span>
          <span className='text-xs text-slate-500'>{city ? city : 'Tidak Diketahui'}</span>
        </div>
      </div>
      <button onClick={() => { navigate('/info-profile'); }} className='border-2 border-blue-800 px-3 py-1 rounded-xl font-bold'>Edit</button>
    </div>
  );
};

export default UserCard;