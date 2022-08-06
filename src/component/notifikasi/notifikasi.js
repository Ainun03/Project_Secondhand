import React, { useEffect } from 'react';

// Icons
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getOfferBySeller } from '../../slices/offerSlice';

// React Router
import { useNavigate } from 'react-router-dom';

const Notifikasi = ({ hidden }) => {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { offer, auth } = useSelector(state => state);

	useEffect(() => {
		dispatch(getOfferBySeller(auth.login.id));
	}, [dispatch]);

	return (
		<div className={`${hidden} bg-white absolute z-[999] rounded-2xl shadow-main px-5 py-3  w-80 transition ease-in-out duration-300`}>
			{
				offer.offers ? offer.offers.slice(0, 3).map((item, index) => (
					<div key={index} className='flex py-2' onClick={() => navigate('/info-penawar')}>
						<div className='mr-3'>
							<img className='w-12 h-12 rounded-md object-cover' src={item.imageProduct[0] ? item.imageProduct[0] : '/assets/images/img-profile.png'} alt='product' />
						</div>
						<div className='text-left'>
							<p className='text-neutralGray text-xs mb-1'>Penawaran Produk</p>
							<h1 className='font-medium mb-0'>{item.productName ? item.productName : 'Nama Kosong'}</h1>
							<h1 className='font-medium mb-0'>{item.price ? new Intl.NumberFormat('id-ID',
								{ style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
							).format(item.price) : 'Free'}</h1>
							<h1 className='font-medium mb-0'>Ditawar {item.price ? new Intl.NumberFormat('id-ID',
								{ style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
							).format(item.price - 200) : 'Free'}</h1>
						</div>
						<div className='date ml-auto text-neutralGray text-xs'>
							<p>20 Apr 2022</p>
						</div>
					</div>
				)) : <span>Belum Ada Notifikasi</span>
			}
		</div >
	);
};

export default Notifikasi;