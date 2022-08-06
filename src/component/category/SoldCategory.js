import React from 'react';
import Card from '../card/card';

// Redux
import { useSelector } from 'react-redux';

const SoldCategory = () => {
  const { productBySeller } = useSelector(state => state.product);
  const soldProduct = productBySeller.filter(item => item.productStatus === true);

  return (
    <>
      {soldProduct.length > 0 ? (<div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {soldProduct.length > 0 && soldProduct.map(item => <Card key={item.productId} product={item} />)}
      </div>) : (<div className='flex justify-center'>
        <img className='mt-10 md:mt-0' src='/assets/images/not-found.png' alt='Not Found' />
      </div>)}
    </>
  );
};

export default SoldCategory;