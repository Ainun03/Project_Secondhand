import React, { useState, useEffect } from 'react';
import { BsBox } from 'react-icons/bs';
import { FiHeart, FiDollarSign } from 'react-icons/fi';
import { MdArrowForwardIos } from 'react-icons/md';

// Components
import AllCategory from '../../component/category/AllCategory';
import LovedCategory from '../../component/category/LovedCategory';
import SoldCategory from '../../component/category/SoldCategory';
import Navbar from '../../component/navbar/navbar';
import UserCard from '../../component/card/userCard';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../slices/userSlice';
import { productBySellerId } from '../../slices/productSlice';

// React Router
import { useNavigate } from 'react-router-dom';

const ListJual = () => {
  const [category, setCategory] = useState('all');

  const navigate = useNavigate();

  const { auth, user } = useSelector(state => state);
  const dispatch = useDispatch();

  // Get User
  useEffect(() => {
    dispatch(getUsers({ token: auth.login.token }));
  }, [dispatch, auth]);

  // Get List Jualan
  useEffect(() => {
    dispatch(productBySellerId({
      token: auth.login.token,
      id: auth.login.id
    }));
  }, [dispatch, auth]);

  // Check user data
  const isUserDataCompleted = () => {
    if (user.data.username !== null && user.data.city !== null && user.data.address !== null && user.data.phoneNumber !== null) {
    } else {
      navigate('/info-profile');
    }
  };

  useEffect(() => {
    isUserDataCompleted();
  }, []);

  return (
    <div className='relative'>
      <Navbar />
      <div className='px-4 mx-auto max-w-4xl pt-0 pb-20 absolute top-20 md:relative md:top-0'>
        <h2 className='hidden md:block text-xl font-bold md:my-7'>Daftar Jual Saya</h2>
        <UserCard image={user.data.imageUser} name={user.data.username} city={user.data.city} />
        <div className='flex flex-col md:flex-row mt-5 gap-4'>
          <div>
            {/* Category Web */}
            <div className='hidden md:flex flex-col rounded-lg shadow-main p-7 justify-evenly w-60'>
              <span className='text-base font-bold mb-5'>Kategori</span>
              <div className='flex flex-col gap-5'>
                <div className={category === 'all' ? 'flex flex-row items-center justify-between text-[#7126B5] cursor-pointer' : 'flex flex-row items-center justify-between hover:text-[#7126B5] cursor-pointer'} onClick={() => setCategory('all')}>
                  <div className='flex flex-row items-center'>
                    <BsBox size={20} />
                    <span className='ml-2 text-base font-semibold'>Semua Produk</span>
                  </div>
                  <MdArrowForwardIos />
                </div>
                <div className={category === 'loved' ? 'flex flex-row items-center justify-between text-[#7126B5] cursor-pointer' : 'flex flex-row items-center justify-between hover:text-[#7126B5] cursor-pointer'} onClick={() => setCategory('loved')}>
                  <div className='flex flex-row items-center'>
                    <FiHeart size={20} />
                    <span className='ml-2 text-base font-semibold'>Diminati</span>
                  </div>
                  <MdArrowForwardIos />
                </div>
                <div className={category === 'sold' ? 'flex flex-row items-center justify-between text-[#7126B5] cursor-pointer' : 'flex flex-row items-center justify-between hover:text-[#7126B5] cursor-pointer'} onClick={() => setCategory('sold')}>
                  <div className='flex flex-row items-center'>
                    <FiDollarSign size={20} />
                    <span className='ml-2 text-base font-semibold'>Terjual</span>
                  </div>
                  <MdArrowForwardIos />
                </div>
              </div>
            </div>
            {/* Category Web End */}

            {/* Category Mobile */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar text-clip md:hidden">
              <button onClick={() => setCategory('all')} className={category === 'all' ? 'snap-center rounded-lg flex flex-shrink-0 bg-primary text-white text-md px-4 py-2 transition ease-in-out duration-200' : 'snap-center rounded-lg flex flex-shrink-0 bg-[#E2D4F0] text-black text-md px-4 py-2 hover:bg-primary hover:text-white transition ease-in-out duration-200'}>
                <BsBox className='my-auto mr-1' />
                <span>Semua Produk</span>
              </button>
              <button onClick={() => setCategory('loved')} className={category === 'loved' ? 'snap-center rounded-lg flex flex-shrink-0 bg-primary text-white text-md px-4 py-2 transition ease-in-out duration-200' : 'snap-center rounded-lg flex flex-shrink-0 bg-[#E2D4F0] text-black text-md px-4 py-2 hover:bg-primary hover:text-white transition ease-in-out duration-200'}>
                <FiHeart className='my-auto mr-1' />
                <span>Diminati</span>
              </button>
              <button onClick={() => setCategory('sold')} className={category === 'sold' ? 'snap-center rounded-lg flex flex-shrink-0 bg-primary text-white text-md px-4 py-2 transition ease-in-out duration-200' : 'snap-center rounded-lg flex flex-shrink-0 bg-[#E2D4F0] text-black text-md px-4 py-2 hover:bg-primary hover:text-white transition ease-in-out duration-200'}>
                <FiDollarSign className='my-auto mr-1' />
                <span>Terjual</span>
              </button>
            </div>
            {/* Category Mobile End */}

          </div>
          <div className='w-full'>
            {category === 'all' && <AllCategory />}
            {category === 'loved' && <LovedCategory />}
            {category === 'sold' && <SoldCategory />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListJual;