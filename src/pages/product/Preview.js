import React, { Component, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../component/navbar/navbar';
import Slider from "react-slick";
import Modal from '../../component/modal/Modal';

// Icons
import { IoClose } from 'react-icons/io5';
import { IoChevronBackCircle } from 'react-icons/io5';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../slices/productSlice';

export class FadeCarousel extends Component {
	constructor(props) {
		super(props);
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
	}
	next() {
		this.slider.slickNext();
	}
	previous() {
		this.slider.slickPrev();
	}
	render() {
		const settings = {
			fade: true,
			infinite: true,
			speed: 1500,
			autoplay: true,
			autoplaySpeed: 3000,
			slidesToShow: 1,
			slidesToScroll: 1
		};
		return (
			<div className='h-80 md:h-[436px] relative rounded-none md:rounded-2xl overflow-hidden'>
				<Slider ref={c => (this.slider = c)} {...settings}>
					<div>
						<img className='w-full object-cover' src={this.props.image} alt='product' />
					</div>
				</Slider>
				<div className='btn-carousel hidden md:block absolute left-3 top-[45%] '>
					<button className=" rounded-full " onClick={this.previous}>
						<img className='rotate-180' src='/assets/images/carousel-btn.png' alt='btn-carousel' />
					</button>
				</div>
				<div className='btn-carousel hidden md:block absolute right-3 top-[45%] '>
					<button className=" rounded-full " onClick={this.next}>
						<img src='/assets/images/carousel-btn.png' alt='btn-carousel' />
					</button>
				</div>
			</div>
		);
	}
}

function PrevProduct({ checkStatus }) {
	const [showModal, setShowModal] = useState(true);

	const modalClick = () => {
		setShowModal(current => !current);
	};

	const [showAlert, setShowAlert] = useState(true);

	const alertClick = () => {
		setShowAlert(current => !current);
	};

	const maClick = () => {
		modalClick();
		alertClick();
	};

	// Get Params
	const { userId } = useParams();

	// Redux
	const { auth, product } = useSelector(state => state);

	const productData = product.setPreview.find(i => i.userId == userId);

	const navigate = useNavigate();

	return (
		<div className='relative'>
			{/* Modal */}
			<div className='modal'>
				<div className={`fixed overlay bg-black opacity-50 z-[999] h-full w-full inset-x-0 cursor-default transition ease-in-out duration-[850ms] ${showModal ? "hidden" : ""}`}>
				</div>
				<div className={`fixed top-[85%] md:top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-b-none rounded-t-2xl md:rounded-2xl z-[999] w-full h-full md:h-auto md:w-[360px] p-8 transition ease-in-out duration-700 ${showModal ? "translate-y-[100%] md:scale-0" : ""}`}>
					<div className='flex justify-end text-3xl -mt-5 md:-mt-0 mb-6 md:mb-0'>
						<img role='button' onClick={modalClick} className='mx-auto md:hidden' src='/assets/images/mobile-modal.png' alt='mobile-modal' />
						<IoClose className='hidden md:block' role='button' onClick={modalClick} />
					</div>
					<Modal image={productData.imageProduct[0]} productName={productData.productName} price={productData.price} />
					<button onClick={maClick} className='rounded-2xl bg-primary hover:bg-[#7126B5CC] w-full py-3 text-white text-sm font-medium'>
						Kirim
					</button>
				</div>
			</div>
			{/* End Modal */}
			{/* <Navbar /> */}
			<div className='bg-transparent absolute z-10'>
				<IoChevronBackCircle className='m-3' size={30} color={'#E2D4F0'} onClick={() => navigate('/')} />
			</div>
			<div className='container mx-auto max-w-4xl pt-0 pb-20 md:py-7 relative'>
				{/* Alert */}
				{checkStatus ? (<></>) : (
					<div className={`alert fixed md:absolute inset-x-1/2 -translate-x-1/2 top-20 md:top-4 bg-lime-500 text-white z-[999] rounded-lg w-96 flex justify-between items-center px-5 py-2 transition ease-in-out duration-1000 ${showAlert ? 'scale-0' : ''}`}>
						<h1 className='m-0 text-white'>Harga tawarmu berhasil dikirim ke Penjual</h1>
						<IoClose role='button' onClick={alertClick} className='text-lg' />
					</div>
				)}
				{/* End Alert */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-x-0 md:gap-6'>
					{/* Carousel */}
					<div className='col-span-2 '>
						<FadeCarousel image={productData ? productData.imageProduct[0] : 'https://static.vecteezy.com/system/resources/previews/003/475/012/original/confused-man-with-question-mark-concept-flat-illustration-free-vector.jpg'} />
					</div>
					{/* End Carousel */}
					<div className='-mt-14 md:mt-0 md:static relative container mx-auto max-w-sm md:max-w-none md:mx-0'>
						<div className='mb-6'>
							<div className='shadow-main rounded-2xl p-4 md:mb-0 bg-white'>
								<h1 className='font-semibold mb-2'>{
									productData ? productData.productName : 'Undefined'
								}</h1>
								<h3 className='text-sm text-neutralGray mb-4'>{
									productData ? (productData.categories.categoryName).charAt(0).toUpperCase() + (productData.categories.categoryName).slice(1).toLowerCase() : 'Undefined'
								}</h3>
								<h2 className='font-medium md:mb-6'>{
									productData ? new Intl.NumberFormat('id-ID',
										{ style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
									).format(productData.price) : 'Free'
								}</h2>
								<div className='btn hidden md:block'>
									{/* Button */}
									{checkStatus ? (
										<div className='wrap-btn'>
											<button onClick={() => navigate('/list-jual')} className='bg-primary hover:bg-[#7126B5CC] text-white w-full rounded-2xl py-[10px] text-sm mb-3 transition ease-in-out duration-300'>
												Terbitkan
											</button>
											<button onClick={() => navigate(`/edit-product/${productData.productId}`)} className='border border-primary hover:bg-primary hover:text-white w-full rounded-2xl py-[10px] text-sm transition ease-in-out duration-300'>
												Edit
											</button>
										</div>
									) : (
										<div className='wrap-btn'>
											<button disabled={auth.login.token ? false : true} onClick={modalClick} className='bg-primary hover:bg-[#7126B5CC] text-white w-full rounded-2xl py-[10px] text-sm mb-3 transition ease-in-out duration-300 disabled:opacity-40'>
												Saya tertarik dan ingin Nego
											</button>
										</div>
									)}
									{/* End Button */}
								</div>
							</div>
						</div>
						<div className=''>
							<div className='shadow-main rounded-2xl p-4 flex'>
								<img className='w-12' src='/assets/images/img-profile.png' alt='profile' />
								<div className='info-profile ml-4'>
									<strong className='text-sm font-medium'>{productData ? (productData.users.username).charAt(0).toUpperCase() + (productData.users.username).slice(1).toLowerCase() : 'Anonymous'}</strong>
									<p className='text-xs text-neutralGray'>{productData ? (productData.users.city).charAt(0).toUpperCase() + (productData.users.city).slice(1).toLowerCase() : 'Anonymous'}</p>
								</div>
							</div>
						</div>
					</div>
					<div className='col-span-2 container mx-auto max-w-sm md:max-w-none md:mx-0 mt-6 md:mt-0'>
						<div className=' shadow-main rounded-2xl p-4'>
							<h1 className='font-medium text-sm mb-3'>Deskripsi</h1>
							<p className='text-neutralGray text-sm mb-4'>
								{productData ? productData.description : 'No Description'}
							</p>
						</div>
					</div>
				</div>
				{/* Button Mobile */}
				{checkStatus ? (
					<div className='md:hidden fixed w-full bottom-5 grid grid-cols-2 gap-4 px-5'>
						<button onClick={() => navigate(`/edit-product/${productData.productId}`)} className='border bg-white border-primary hover:bg-primary hover:text-white w-full rounded-2xl py-[10px] text-sm transition ease-in-out duration-300'>
							Edit
						</button>
						<button onClick={() => navigate('/list-jual')} className='bg-primary hover:bg-[#8433cf] text-white w-full rounded-2xl py-[10px] text-sm transition ease-in-out duration-300'>
							Terbitkan
						</button>
					</div>
				) : (
					<div className='md:hidden fixed w-full bottom-5 grid px-5'>
						<button disabled={auth.login.token ? false : true} onClick={modalClick} className='bg-primary hover:bg-[#8433cf] text-white w-full rounded-2xl py-[10px] text-sm transition ease-in-out duration-300 disabled:opacity-40'>
							Saya tertarik dan ingin Nego
						</button>
					</div>
				)}
				{/* End Button Mobile */}
			</div>
		</div>
	);
}

export default PrevProduct;