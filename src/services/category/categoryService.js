import http from '../../http-common';

const getCategoryByName = async ({ token, name }) => {
  const cat = await http.get(`categories/get-category-by-categoryname/Elektronik`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return (cat);
};

// HERE, we need to add getAllCategories!

const categoryService = { getCategoryByName };

export default categoryService;