import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Card(props) {
  const navigate = useNavigate();
  const { auth } = useSelector(state => state);

  const item = props.product;

  return (
    <div className='card rounded-md p-2 shadow-main h-48 cursor-pointer' onClick={() => {
      // Checking product seller with user logged\
      if ((item.userId == auth.login.id && auth.login.id !== undefined)) {
        navigate(`/seller-product/${item.productId}`);
      } else {
        navigate(`/buyer-product/${item.productId}`);
      }
    }}>
      <img className="rounded-md h-[100px] w-screen object-cover" src={item.imageProduct[0]} alt='product' />
      <div className="card-body px-2 pt-2 pb-3">
        <h3 className='font-semibold'>{item.productName ? item.productName : `Product ${item.users.username}`}</h3>
        <h5 className='text-xs text-neutralGray my-1'>{item.categoryName ? item.categoryName : item.categories.categoryName}</h5>
        <h3 className='font-semibold'>
          {
            new Intl.NumberFormat('id-ID',
              { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
            ).format(item.price)
          }
        </h3>
      </div>
    </div>
  );
}

export default Card;