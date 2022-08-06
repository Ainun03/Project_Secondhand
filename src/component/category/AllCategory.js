import React from 'react';
import AddProductButton from '../button/AddProductButton';
import Card from '../card/card';

// Redux
import { useSelector } from 'react-redux';

const AllCategory = (props) => {
  const { productBySeller } = useSelector(state => state.product);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
      <AddProductButton />
      {productBySeller.length > 0 && productBySeller.map(item => <Card key={item.productId} product={item} />)}
    </div>
  );
};

export default AllCategory;