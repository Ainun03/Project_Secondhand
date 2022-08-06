import http from '../../http-common';

const getAllProduct = async () => {
  return await http.get(`https://binar-secondhand-production.herokuapp.com/product/get-all-product`);
};

const getProductBySellerId = async ({ token, id }) => {
  return await http.get(`product/get-product-by-user/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

const getProductByName = async ({ token, name }) => {
  return await http.get(`product/find-product?productName=${name}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

const postProduct = async ({ userId, image, categoryId, productName, productStatus, price, description }) => {
  return await http.post(`product/add-product/`, {
    userId, image, categoryId, productName, productStatus, price, description
  }, {
    headers: {
      "Content-type": "multipart/form-data",
      'Authorization': `Bearer ${userId}`
    },
  });
};

const updateProduct = async ({ token, productId, image, categoryId, productName, price, description }) => {
  return await http.put(`product/add-product/`, {
    token, productId, image, categoryId, productName, price, description
  }, {
    headers: {
      "accept": "*/*",
      "Content-type": "multipart/form-data",
      'Authorization': `Bearer ${token}`
    },
  });
};

const productService = {
  updateProduct,
  getAllProduct,
  getProductBySellerId,
  postProduct
};
export default productService;
