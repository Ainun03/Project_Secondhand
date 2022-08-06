import React, { Fragment, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Slice
import { addOffer } from '../../slices/offerSlice';

// Toast
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";

function Modal({ image, productName, price }) {
	// ID Param
	const { id } = useParams();

	// Redux
	const { auth, product, user } = useSelector(state => state);
	const productData = product.products.find(i => i.productId == id);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [submitted, setSubmitted] = useState(false);

	// State
	const initialOfferState = {
		token: auth.login.token,
		username: user.data.username,
		productId: productData.productId,
		offerPrice: "",
	};
	const [currentOffer, setCurrentOffer] = useState(initialOfferState);

	// Submit Offer   
	const clickOffer = () => {
		setSubmitted(true);
		if (currentOffer.offerPrice !== "") {
			toast.loading("Mengirim Penawaran . . .", {
				position: "top-center",
				autoClose: 5000,
			});
			dispatch(addOffer({
				token: currentOffer.token,
				username: currentOffer.username,
				productId: currentOffer.productId,
				offerPrice: currentOffer.offerPrice
			}))
				.unwrap()
				.then(() => {
					navigate("/");
				});
		}
	};

	return (
		<Fragment>
			<ToastContainer
				position="top-center"
				autoClose={5000}
			/>
			<div className='modal-body'>

				<h1 className='font-medium text-sm mb-4'>Masukkan Harga Tawarmu</h1>
				<p className='text-sm text-neutralGray'>
					Harga tawaranmu akan diketahui penual, jika penjual cocok kamu akan segera dihubungi penjual.
				</p>
				<div className='modal-product mb-4 p-4 bg-[#EEEEEE] rounded-2xl flex'>
					<img className='w-14 rounded-xl' src={productData ? productData.imageProduct[0] : 'https://static.vecteezy.com/system/resources/previews/003/475/012/original/confused-man-with-question-mark-concept-flat-illustration-free-vector.jpg'} alt='produuct' />
					<div className='info-product ml-3 my-auto'>
						<strong className='font-medium text-sm'>{productData ? productData.productName : 'Undefined'}</strong>
						<h3 className='text-sm'>{
							productData ? new Intl.NumberFormat('id-ID',
								{ style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
							).format(productData.price) : 'Free'
						}</h3>
					</div>
				</div>
				<div className='price mb-4'>
					<label>
						<h2 className='text-xs'>Harga Tawar</h2>
						<div className='rounded-2xl shadow-main'>
							<input
								value={currentOffer.offerPrice}
								onChange={(e) => setCurrentOffer({ ...currentOffer, offerPrice: e.target.value })}
								className='border-none focus:outline-none w-full text-black bg-transparent px-4 py-2'
								placeholder='Rp 0,00' />
						</div>
					</label>
					{currentOffer.offerPrice === '' && submitted ? <span className='text-red-600 mt-1'>*Silahkan isi Harga Negomu</span> : ''}
				</div>
				<button onClick={clickOffer} className='rounded-2xl bg-primary hover:bg-[#7126B5CC] w-full py-3 text-white text-sm font-medium'>
					Kirim
				</button>
			</div>
		</Fragment>
	);
}

export default Modal;