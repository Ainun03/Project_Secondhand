import React, { Fragment, useState } from 'react';

// Icons
import { FiSearch, FiLogIn, FiUser } from "react-icons/fi";
import { IoClose, IoMenu } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineUnorderedList } from "react-icons/ai";

// React Router
import { useNavigate } from 'react-router-dom';

// Components
import Notifikasi from '../notifikasi/notifikasi';
import ProfileMenu from './ProfileMenu';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';
import { clearData } from '../../slices/userSlice';

function Navbar() {
	const [show, setShow] = useState(true);
	const [notif, setNotif] = useState(true);
	const [profileMenu, setProfileMenu] = useState(true);

	const navigate = useNavigate();

	const handleClick = () => {
		setShow(current => !current);
	};

	const profileMenuClick = () => {
		setProfileMenu(!profileMenu);
	};

	// Redux
	const dispatch = useDispatch();
	const { auth } = useSelector(state => state);

	const notifClick = () => {
		if (auth.login.token) {
			setNotif(current => !current);
		} else {
			navigate('/login');
		}
	};

	return (
		<Fragment>
			<div className='bg-transparent md:bg-white md:shadow absolute md:static w-full top-7 flex z-[30] md:block md:top-0 md:z-0'>
				<div className="container mx-4 md:mx-auto w-full max-w-6xl md:px-4 flex md:py-4">
					<button onClick={handleClick} className='bg-white md:hidden rounded-lg p-2 text-xl'>
						<IoMenu />
					</button>
					<img role='button' onClick={() => navigate('/')} className='hidden md:block' src='/assets/images/logo.png' alt='logo' />
					<div className="form-search w-full md:w-80 bg-white md:bg-[#EEEEEE] rounded-lg ml-4 flex text-[#8A8A8A] text-sm px-6 py-2 md:py-0">
						<input className='w-full text-black bg-transparent focus:outline-none' placeholder='Cari di sini ...' alt='search' />
						<span className='my-auto text-lg'> <FiSearch /> </span>
					</div>
					<div className="hidden md:block ml-auto">
						<div className='flex'>
							<div className=' mr-3'>
								<button className='text-2xl '>
									<AiOutlineUnorderedList />
								</button>
							</div>
							<div className='notif mr-3 relative'>
								<button onClick={notifClick} className='text-2xl my-auto'>
									<span className="flex h-[10px] w-[10px] absolute right-0">
										<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
										<span className="relative inline-flex rounded-full h-[10px] w-[10px] bg-purple-500"></span>
									</span>
									<IoMdNotificationsOutline />
								</button>
								<Notifikasi hidden={notif ? 'translate-x-full scale-0' : '-translate-x-[90%]'} />
							</div>
							<div className=''>
								<button className='text-2xl mr-3' onClick={profileMenuClick}>
									<FiUser />
								</button>
								<ProfileMenu hidden={profileMenu ? 'translate-x-full scale-0' : '-translate-x-[90%]'} />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div role='button' onClick={handleClick} className={`overlay fixed z-40 h-full w-full bg-slate-600 opacity-40 inset-x-0 cursor-default transition ease-in-out duration-700 md:-translate-x-full ${show ? "hidden" : ""}`}></div>
			<div className={`fixed bg-white h-full left-0 w-1/2 z-50 md:-translate-x-full p-5 ${show ? "-translate-x-full transition ease-in-out duration-1000" : "transition ease-in-out duration-1000"}`}>
				<div className='title flex justify-between mb-3 items-center'>
					<h1 className='font-bold text-base cursor-pointer' onClick={() => navigate('/')}>Second Hand.</h1>
					<button onClick={handleClick} className='text-3xl'>
						<IoClose />
					</button>
				</div>
				<p className='cursor-pointer' onClick={() => navigate('/info-penawar')}>Notifikasi</p>
				<p className='cursor-pointer' onClick={() => navigate('/info-profile')}>Profil</p>
				{
					auth.login.token ? (
						<div className="">
							<button onClick={() => {
								dispatch(logout());
								dispatch(clearData());
							}} className='flex bg-primary text-white py-2 px-4 rounded-xl hover:bg-[#7126B5CC] ease-in-out duration-200'>
								<span className='my-auto mr-2 hover:animate-bounce'> <FiLogIn /> </span> Keluar
							</button>
						</div>
					) : (
						<div className="">
							<button onClick={() => navigate('/login')} className='flex bg-primary text-white py-2 px-4 rounded-xl hover:bg-[#7126B5CC] ease-in-out duration-200'>
								<span className='my-auto mr-2 hover:animate-bounce'> <FiLogIn /> </span> Masuk
							</button>
						</div>
					)
				}
			</div>
		</Fragment>
	);
}

export default Navbar;