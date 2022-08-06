import React, { useState, useEffect } from 'react';
import { Button, Radio, Space } from 'antd';
import ModalsTawar from '../../component/modal/ModalsPenawar';

// Icons
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsWhatsapp } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';

// React Router
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getOfferBySeller } from '../../slices/offerSlice';
import { updateProduct } from '../../slices/productSlice';

function PenawarPage({ checkStatus }) {
	const [isAccept, setisAccept] = useState(false);

	const isAcceptClick = () => {
		setisAccept(current => !current);
	};

	const navigate = useNavigate();

	// modals radio button
	const [data, setData] = useState(true);
	const [disabled, setDisabled] = useState(true);
	const [value, setValue] = useState(true);

	const onChange = (e) => {
		setData(e.target.value);
	};

	const isStatusClick = () => {
		setValue(current => !current);
	};

	const statusClick = () => {
		isStatusClick();
	};

	const toggleDisabled = () => {
		setDisabled(!disabled);
	};
	// end modals radio

	const [showModal, setShowModal] = useState(true);

	const modalClick = () => {
		setShowModal(current => !current);
	};

	const doubleClick = () => {
		isAcceptClick();
		modalClick();
	};

	const [showAlert, setShowAlert] = useState(true);

	const alertClick = () => {
		setShowAlert(current => !current);
	};

	const maClick = () => {
		modalClick();
	};

	// Redux
	const dispatch = useDispatch();
	const { auth, offer, user, product } = useSelector(state => state);

	const [productId, setProductId] = useState('');

	const statusAlertClick = () => {
		isStatusClick();
		alertClick();
		isAccept(!disabled);

		// dispatch(updateProduct({
		// 	token: auth.login.token,
		// 	productId: productId,
		// 	categoryId: product.products.filter(item => item.productId == productId).categories,
		// 	productName: productName,
		// 	price: price,
		// 	image: image,
		// 	description: currentProduct.description,
		// }))
		// 	.unwrap()
		// 	.then(() => {
		// 		toast.dismiss();
		// 		toast.success("Berhasil Update Product!", {
		// 			position: "top-center",
		// 			autoClose: 5000,
		// 		});
		// 		navigate(`/list-jual`);
		// 	});

	};

	// Buyer State
	const [buyer, setBuyer] = useState((user.list.filter(item => item.email == offer.offers[0].buyer))[0].username);
	const [buyerImage, setBuyerImage] = useState((user.list.filter(item => item.email == offer.offers[0].buyer))[0].imageUser);

	useEffect(() => {
		dispatch(getOfferBySeller(auth.login.id));
	}, [dispatch]);

	return (
		<div className="">
			{/* {modals} */}
			<div className='modal'>
				<div role='button' onClick={modalClick} className={`fixed overlay bg-black opacity-50 z-[999] h-full w-full inset-x-0 cursor-default transition duration-[850ms] ${showModal ? "hidden" : ""} `}>
				</div>
				<div className={`fixed top-[85%] md:top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-b-none rounded-t-2xl md:rounded-2xl z-[999] w-full h-full md:h-auto md:w-[360px] p-8 transition ease-in-out duration-700 ${showModal ? "translate-y-[150%] md:scale-0" : ""} `}>
					<div className='flex justify-end text-3xl -mt-5 md:-mt-0 mb-6 md:mb-0'>
						<img role='button' onClick={modalClick} className='mx-auto md:hidden' src='/assets/images/mobile-modal.png' alt='mobile-modal' />
						<IoClose className='hidden md:block' onClick={modalClick} role='button' />
					</div>
					<ModalsTawar />
					<button onClick={maClick} className='rounded-2xl bg-primary flex text-center justify-between hover:bg-[#7126B5CC] w-full py-3 text-white text-sm font-medium'>
						<div></div>
						<span className='pl-6'>Hubungi via Whatsapp</span>
						<span className='my-1 pr-6 '><BsWhatsapp /></span>
					</button>
				</div>
			</div>

			<div className='modals-radio'>
				<div role='button' onClick={isStatusClick} className={`fixed overlay bg-black opacity-50 z-[999] h-full w-full inset-x-0 cursor-default transition duration-[850ms] ${value ? "hidden" : ""} `}>
				</div>
				<div className={`fixed top-[85%] md:top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-b-none rounded-t-2xl md:rounded-2xl z-[999] w-full h-full md:h-auto md:w-[360px] p-8 transition ease-in-out duration-700 ${value ? "translate-y-[200%]" : ""} `}>
					<div className='flex justify-end text-3xl -mt-5 md:-mt-0 mb-6 md:mb-0'>
						<img role='button' onClick={isStatusClick} className='mx-auto md:hidden' src='/assets/images/mobile-modal.png' alt='mobile-modal' />
						<IoClose className='hidden md:block' onClick={isStatusClick} role='button' />
					</div>
					<div>
						<h1 className='font-medium text-sm mb-5'>Perbarui status penjualan produkmu</h1>
					</div>
					<Radio.Group onChange={onChange} value={data}>
						<Space direction="vertical">
							<Radio onClick={toggleDisabled} className='font-medium text-sm' value={1}>Berhasil Terjual
								<p className='text-sm text-neutralGray'>
									Kamu telah sepakat menjual produk ini kepada pembeli
								</p>
							</Radio>
							<Radio onClick={toggleDisabled} className='font-medium text-sm' value={2}>Batalkan transaksi
								<p className='text-sm text-neutralGray'>
									Kamu membatalkan transaksi produk ini dengan pembeli
								</p>
							</Radio>
						</Space>
					</Radio.Group>
					<Button
						onClick={statusAlertClick}
						className='mt-4 w-full'
						style={{
							color: '#ffffff',
							borderRadius: 15,
							height: 45,
						}}
						type='primary'
						defaultChecked={false} disabled={disabled}
					>
						Kirim
					</Button>
				</div>
			</div>
			{/* Modals End */}

			{/* Navbar */}
			<div className='bg-white shadow hidden md:block'>
				<div className="container mx-auto max-w-6xl flex justify-between px-4 py-4">
					<img onClick={() => navigate('/')} src='/assets/images/logo.png' alt='logo' />
					<div className=" mr-16 text-center">
						<h1>Info Penawar</h1>
					</div>
					<div >
					</div>
				</div>
			</div>
			{/* Navbar End */}

			{/* Penawar */}
			<div className='container mx-auto  '>
				{/* Alert */}
				{checkStatus ? (<></>) : (
					<div className={`alert fixed md:absolute inset-x-1/2 -translate-x-1/2 top-20 md:top-4 bg-lime-500 text-white z-[999] bg-primary rounded-lg w-96 flex justify-between items-center px-5 py-2 transition ease-in-out duration-1000 ${showAlert ? 'scale-0' : ''}`}>
						<h1 className='m-0 text-white'>Status produk berhasil diperbarui</h1>
						<IoClose role='button' onClick={alertClick} className='text-lg' />
					</div>
				)}
				{/* End Alert */}
				{/* mobile */}
				<div className="flex container mx-auto max-w-3xl md:hidden pt-2">
					<div className=" ml-4 ">
						<button to='/' className='color-none' >
							<AiOutlineArrowLeft size={20} onClick={() => navigate('/')} />
						</button>
					</div>
					<div className="mr-10 w-full text-center">
						<h1>Info Penawar</h1>
					</div>
				</div>
				<div className='px-4 md:hidden '>
					<div className='modal-product mt-4 mb-4 p-4 shadow-md bg-[#EEEEEE] rounded-2xl'>
						<div className='flex'>
							<img src={buyerImage} alt='produuct' />
							<div className='info-product  ml-3 my-auto'>
								<strong className='font-medium text-sm'>{buyer}</strong>
								<p className='text-sm text-neutralGray'>Malang</p>
							</div>
						</div>
					</div>
				</div>
				{/* mobile end */}

				{/* web */}
				<div className=' md:block hidden'>
					<div></div>
					<div className='flex '>
						<div className=" py-4 absolute pl-40">
							<botton className="" >
								<AiOutlineArrowLeft size={20} onClick={() => navigate('/')} />
							</botton>
						</div>
						<div className='modal-product max-w-3xl shadow-md mx-auto w-full mt-4 mb-4 p-4 bg-[#EEEEEE] rounded-2xl'>
							<div className='flex'>
								<img className='w-12 h-12' src={buyerImage} alt='produuct' />
								<div className='info-product  ml-3 my-auto'>
									<strong className='font-medium text-sm'>{buyer}</strong>
									<p className='text-sm text-neutralGray'>Malang</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* web end */}
				<div className=''>
					<div className='modal-product max-w-3xl mx-auto mb-4 p-4 py-2 rounded-2xl'>
						<h1 className='pb-2'>Daftar Produkmu yang Ditawar</h1>
						<div className='flex flex-col gap-7'>
							{
								offer.offers.length > 0 ? offer.offers.map((item, index) => (
									<div key={index} className='cursor-pointer' onClick={() => {
										setBuyer((user.list.filter(i => i.email == item.buyer))[0].username);
										setBuyerImage((user.list.filter(i => i.email == item.buyer))[0].imageUser);
									}}>
										<div className='flex'>
											<div className='flex-none'>
												<img
													className='w-12 h-12 rounded-md object-cover'
													src={
														item.imageProduct[0] ? item.imageProduct[0] : item.imageProduct[0]
													}
													alt='produuct' />
											</div>
											<div className='info-product ml-3 my-auto'>
												<p className='text-sm text-neutralGray'>Penawaran produk</p>
												<h1 className='font-medium text-sm'>{
													item.productName ? item.productName : '-'
												}</h1>
												<h1 className='font-medium text-sm'>{
													item.price ? new Intl.NumberFormat('id-ID',
														{ style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
													).format(item.price) : '-'
												}</h1>
												<h1 className='font-medium text-sm'>ditawar {
													item.offerPrice ? new Intl.NumberFormat('id-ID',
														{ style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
													).format(item.offerPrice) : '-'
												}</h1>
											</div>
										</div>
										{/* web button */}
										<div className="pt-2"  >
											{isAccept ? (
												<div className='md:inline-flex hidden w-full justify-end'>
													<button type="preview" className=" text-center hover:bg-[#7126B5CC] py-2 mr-4 w-1/5  border-2 border-primary text-dark font-semibold rounded-2xl">
														Tolak
													</button>
													<button type="submit" onClick={doubleClick} className="px-4  w-1/5 py-2 border-2 hover:bg-[#7126B5CC] border-primary bg-primary text-white font-semibold rounded-2xl">
														Terima
													</button>
												</div>
											) : (
												<div className='md:inline-flex hidden w-full justify-end'>
													<button type="preview" onClick={statusClick} className=" text-center hover:text-white  hover:bg-[#7126B5CC] py-2 mr-4 w-1/5  border-2 border-primary text-dark font-semibold rounded-2xl">
														Status
													</button>
													<button type="submit" onClick={modalClick} className="px-4  w-1/5 py-2 border-2 flex text-center justify-between hover:bg-[#7126B5CC] border-primary bg-primary text-white font-semibold rounded-2xl">
														<span className='pl-2'>Hubungi di</span>
														<span className='my-1 mr-1 '><BsWhatsapp /></span>
													</button>
												</div>
											)}
										</div>
										{/* end */}

										{/* mobile button */}
										<div className=" pt-2  ">
											{isAccept ? (
												<div className='flex w-full md:hidden pt-2'
												>
													<button type="preview" className=" text-center py-2 mr-4 w-1/2 hover:bg-[#7126B5CC]  border-2 border-primary text-dark font-semibold rounded-2xl">
														Tolak
													</button>
													<button type="submit" onClick={doubleClick} className="px-4  w-1/2 py-2 border-2 hover:bg-[#7126B5CC] border-primary  bg-primary text-white font-semibold rounded-2xl">
														Terima
													</button>
												</div>
											) : (
												<div className='flex w-full md:hidden pt-2'>
													<button type="preview" onClick={statusClick} className=" text-center py-2 mr-4 w-1/2 hover:text-white hover:bg-[#7126B5CC]  border-2 border-primary text-dark font-semibold rounded-2xl">
														Status
													</button>
													<button type="submit" onClick={modalClick} className="px-4 flex text-center justify-between w-1/2 py-2 border-2 hover:bg-[#7126B5CC] border-primary  bg-primary text-white font-semibold rounded-2xl">
														<div></div>
														<span className='pl-5'>Hubungi di</span>
														<span className='my-1 mr-4 '><BsWhatsapp /></span>
													</button>
												</div>
											)}
										</div>
										{/* end */}
									</div>
								)) : <span>Belum Ada Produk yang Ditawar</span>
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default PenawarPage;