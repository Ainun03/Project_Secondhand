import React, { Fragment, useEffect, useState } from 'react';

// Icons
import { FiSearch } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";

//  title
import { Helmet } from "react-helmet";

// Components
import Card from '../../component/card/card';
import Navbar from '../../component/navbar/navbar';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// React Router
import { useNavigate } from 'react-router-dom';

// Redux
import { getAllProduct } from '../../slices/productSlice';
import { fillData } from '../../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

//Toast
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";

const CenteredCarousel = () => {
  const params = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "150px",
    slidesToShow: 1,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const paramsMobile = {
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear"
  };

  return (
    <Fragment>
      <div className="py-6 mx-auto max-w-screen-2xl hidden md:block">
        <Slider {...params}>
          <div>
            <img className='mx-auto' src='/assets/images/img-banner.png' alt='banner' />
          </div>
          <div>
            <img className='mx-auto' src='/assets/images/img-banner.png' alt='banner' />
          </div>
          <div>
            <img className='mx-auto' src='/assets/images/img-banner.png' alt='banner' />
          </div>
        </Slider>
      </div>
      <div className="md:hidden overflow-hidden z-10">
        <Slider {...paramsMobile}>
          <div>
            <img className='w-full' src='/assets/images/mobile-banner.png' alt='banner' />
          </div>
          <div>
            <img className='w-full' src='/assets/images/mobile-banner.png' alt='banner' />
          </div>
        </Slider>
      </div>
    </Fragment>
  );
};

function Home() {
  const title = "Home - Secondhand";

  const [category, setCategory] = useState('all');
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const { auth, product } = useSelector(state => state);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(fillData(auth.login.id));
  }, [dispatch]);

  useEffect(() => {
    productFilter('all');
  }, [product]);

  // Function For Filtering Data From API
  const productFilter = (category) => {
    if (category == 'all') {
      setProducts(product.products.filter(item => item.productStatus == false));
    } else {
      setProducts(product.products.filter(item => item.productStatus == false && item.categories.categoryName == category));
    }
  };

  // Function For Handling User Change Category
  const handleCategoryClick = (ctg) => {
    setCategory(ctg);
  };

  // Fill State When User Change Category
  useEffect(() => {
    switch (category) {
      case 'all':
        productFilter(category);
        break;
      case 'Pakaian':
        productFilter(category);
        break;
      case 'Elektronik':
        productFilter(category);
        break;
      case 'Kesehatan':
        productFilter(category);
        break;
      case 'Kendaraan':
        productFilter(category);
        break;
      case 'Hobi':
        productFilter(category);
        break;
      default:
        break;
    }
  }, [category]);

  //TOast
  // useEffect(()=> {
  //   if(navigate === '/')
  // })
  //End Toast

  console.log('data', product);

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <ToastContainer
        position="top-center"
        autoClose={5000}
      />
      <div className='relative overflow-hidden'>
        <Navbar />
        <CenteredCarousel />
        <div className="container mx-auto  -translate-y-40 md:-translate-y-0 max-w-6xl overflow-hidden pb-5 px-4 z-[900]">
          <div className="category py-4">
            <h2 className='font-bold text-base py-3'>Telusuri Kategori</h2>
            <div className="list-category flex overflow-x-auto no-scrollbar text-clip">
              <button onClick={() => handleCategoryClick('all')} className={
                category == 'all' ? 'snap-center rounded-lg flex mr-4 bg-primary text-white text-md px-4 py-2 hover:bg-primary hover:text-white transition ease-in-out duration-200' : 'snap-center rounded-lg flex mr-4 bg-secondary text-[#3C3C3C] text-md px-4 py-2 hover:bg-primary hover:text-white transition ease-in-out duration-200'
              }>
                <FiSearch className='my-auto mr-1' />
                <span>Semua</span>
              </button>
              <button onClick={() => handleCategoryClick('Pakaian')} className='snap-center rounded-lg flex mr-4 bg-secondary text-[#3C3C3C] text-md px-4 py-2 hover:bg-primary hover:text-white transition ease-in-out duration-200'>
                <FiSearch className='my-auto mr-1' />
                <span>Pakaian</span>
              </button>
              <button onClick={() => handleCategoryClick('Elektronik')} className='snap-center rounded-lg flex mr-4 bg-secondary text-[#3C3C3C] text-md px-4 py-2 hover:bg-primary hover:text-white transition ease-in-out duration-200'>
                <FiSearch className='my-auto mr-1' />
                <span>Elektronik</span>
              </button>
              <button onClick={() => handleCategoryClick('Kesehatan')} className='snap-center rounded-lg flex mr-4 bg-secondary text-[#3C3C3C] text-md px-4 py-2 hover:bg-primary hover:text-white transition ease-in-out duration-200'>
                <FiSearch className='my-auto mr-1' />
                <span>Kesehatan</span>
              </button>
              <button onClick={() => handleCategoryClick('Kendaraan')} className='snap-center rounded-lg flex mr-4 bg-secondary text-[#3C3C3C] text-md px-4 py-2 hover:bg-primary hover:text-white transition ease-in-out duration-200'>
                <FiSearch className='my-auto mr-1' />
                <span>Kendaraan</span>
              </button>
              <button onClick={() => handleCategoryClick('Hobi')} className='snap-center rounded-lg flex mr-4 bg-secondary text-[#3C3C3C] text-md px-4 py-2 hover:bg-primary hover:text-white transition ease-in-out duration-200'>
                <FiSearch className='my-auto mr-1' />
                <span>Hobi</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {console.log(products)}
            {
              products ? (
                products.map(item => <Card key={item.productId} product={item} />)
              ) : (
                <div className='w-[90vw] text-center md:text-start'>
                  <p className='mt-20 text-lg font-bold'>Produk Kosong</p>
                </div>
              )
            }
          </div>
        </div>
        <div className="fixed bottom-5 inset-x-2/4 flex justify-center ">
          <button onClick={() => {
            auth.login.token ? navigate('list-jual') : navigate('/login');
          }} className='bg-primary px-5 py-2 rounded-lg shadow-2xl text-white flex hover:bg-[#9462c4] ease-in-out duration-200 disabled:opacity-40'>
            <span className='my-auto mr-2 text-lg'><HiPlus /></span>
            Jual
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;