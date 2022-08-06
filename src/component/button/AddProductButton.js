import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';

const AddProductButton = () => {
  const navigate = useNavigate();
  return (
    <div className='rounded-md border-2 border-dashed text-[#D0D0D0] border-[#D0D0D0] flex flex-col justify-center items-center cursor-pointer min-h-[12rem] md:min-w-[12rem] hover:text-blue-500 hover:border-blue-500' onClick={() => navigate('/info-product')}>
      <AiOutlinePlus size={25} />
      <span className='text-md mt-2'>Tambah Produk</span>
    </div>
  );
};

export default AddProductButton;