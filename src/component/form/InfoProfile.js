import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, Link} from 'react-router-dom';
// icon
import { AiOutlineArrowLeft } from 'react-icons/ai';
// json
import regions from "./data/regions.json";
// toast
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
// slice
import { updateInfoProfil } from "../../slices/profilSlice";
// antd
import ImgCrop from 'antd-img-crop';
import { CameraOutlined, LoadingOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

//// ----- Image  ------\\\\\\
const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!');
	}

	const isLt2M = file.size / 1024 / 1024 < 2;

	if (!isLt2M) {
		message.error('Image must smaller than 2MB!');
	}

	return isJpgOrPng && isLt2M;
};
//// ----- end Image  ------\\\\\\

const InfoProfile = () => {
	//// ----- Redux  ------\\\\\\
	const { auth, user, profil } = useSelector(state => state);
	const [submitted, setSubmitted] = useState(false);
	const [{ alt, src }, setImg] = useState({
		alt: 'Upload an Image'
	});
	const [image, setImage] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	//// ----- State Profil  ------\\\\\\    
	const initialProfileState = {
		userId: auth.login.id,
		username: auth.login.username ? auth.login.username : "",
		email: auth.login.email,
		city: user.data.city ? user.data.city : "",
		address: user.data.address ? user.data.address : "",
		phoneNumber: user.data.phoneNumber ? user.data.phoneNumber : "",
		image: user.data.url ? user.data.url : ""
	};
	const [currentProfil, setCurrentProfil] = useState(initialProfileState);

	//// ----- Regions  ------\\\\\\
	const allProvinces = regions.map((region) => region.provinsi);
	const handleChangeProvince = (e) => {
		setCurrentProfil(
			regions.find((region) => region.provinsi === e.target.value)
		);
	};
	//// ----- end Regions  ------\\\\\\

	//// ----- handle Image  ------\\\\\\
	const handleChangeImage = (info) => {
		if (info.file.status === 'uploading') {
			getBase64(info.file.originFileObj, (url) => {
				setImg({
					src: URL.createObjectURL(info.file.originFileObj),
					alt: info.file.originFileObj.name
				});
				return;
			});
			setImage(info.file.originFileObj);
		}
	};
	const [loading, setLoading] = useState(false);
	const uploadButton = (
		<div className="bg-[#d3adf7]  rounded-xl"
			style={{
				width: 100,
				height: 100,
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			}}
		>
			{loading ? <LoadingOutlined /> : <CameraOutlined style={{ color: '#722ed1', fontSize: '20px' }} />}

		</div>
	);
	//// ----- end Image  ------\\\\\\

	//// ----- Submit  ------\\\\\\
	const clickUpdateProfil = () => {
		setSubmitted(true);

		if (image !== '' && currentProfil.username !== "" && currentProfil.city !== "" && currentProfil.address !== "" && currentProfil.phoneNumber !== "") {
			toast.loading("Memperbarui profil . . .", {
				position: "top-center",
				autoClose: 10000,
			});
			dispatch(updateInfoProfil({
				userId: currentProfil.userId,
				username: currentProfil.username,
				email: currentProfil.email,
				city: currentProfil.city,
				address: currentProfil.address,
				phoneNumber: currentProfil.phoneNumber,
				image: image,
			}))

				.unwrap()
				.then(() => {
					// dispatch(fillData())  
					toast.dismiss();
					toast.success("Berhasil memperbarui profil!", {
						position: "top-center",
						autoClose: 2000,
					});
                    setTimeout(()=> {
                        navigate("/");
                    }, 2000)


				});
		}
	};

	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={5000}
			/>
			<div className='bg-white shadow hidden md:block'>
				<div className="container mx-auto max-w-6xl flex justify-between px-4 py-4">
					<img src='/assets/images/logo.png' alt='logo' />
					<div className=" mr-16 text-center">
						<h1>Lengkapi Info Akun</h1>
					</div>
					<div >

					</div>
				</div>
			</div>

			<div className="flex container mx-auto max-w-3xl md:hidden pt-2">
				<div className=" ml-4  ">
					<Link to="/" >
						<AiOutlineArrowLeft style={{ color: '#000000' }} size={20} />
					</Link>
				</div>

				<div className="mr-10 w-full text-center">
					<h1>Lengkapi Info Akun</h1>
				</div>
			</div>

			<div className="flex container  mx-auto max-w-3xl pt-3" >
				<div className=" mr-6 py-4 hidden md:block ">
					<Link to="/" >
						<AiOutlineArrowLeft style={{ color: '#000000' }} size={20} />
					</Link>
				</div>
				<div className="w-full p-6 " >

					<div className="text-center">
						<ImgCrop rotate>
							<Upload
								name="image"
								id="image"
								type="file"
								value={currentProfil.image}
								accept="image/png, image/jpg, image/jpeg"
								className="avatar-uploader "
								showUploadList={false}
								action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
								beforeUpload={beforeUpload}
								onChange={handleChangeImage}
							>
								{image ? (
									<img
										htmlFor="image"
										id="image"
										src={src}
										alt="avatar"
										style={{
											width: '20%',
											height: '20%',
											display: 'inline-flex'
										}}
									/>
								) : (
									uploadButton
								)}
							</Upload>
						</ImgCrop>
						{/* {src === '' && submitted ? <span className='text-red-600 flex justify-center mt-1'>*Silahkan masukkan Gambarmu</span> : ''}  */}
						
					</div>

					<div className="mb-4 pt-5">
						<label className="block">
							<span className="block mb-1 text-sm font-medium text-slate-700">
								Nama*
							</span>
							<input
								value={currentProfil.username}
								onChange={(e) => setCurrentProfil({ ...currentProfil, username: e.target.value })}
								type="text"
								placeholder="Nama"
								className=" w-full rounded-xl"
							/>

							{currentProfil.username === '' && submitted ? <span className='text-red-600 mt-1'>*Silahkan isi namamu</span> : ''}
						</label>
					</div>

					<div className="mb-4">
						<label className="relative">
							<span className="block mb-1 text-sm font-medium text-slate-700">Kota*</span>
							<select
								onChange={(e) => handleChangeProvince && setCurrentProfil({ ...currentProfil, city: e.target.value })}
								required
								value={currentProfil.city}
								name="province"
								className="
                                    w-full           
                                    block
                                    mt-1
                                    rounded-xl                 
                                    shadow-sm
                                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                    "  >

								<option className="" value='' disabled selected >
									Pilih Kota
								</option>
								{allProvinces.map((province) => (
									<option key={province} value={province}>
										{province}
									</option>
								))}

							</select>

						</label>
						{currentProfil.city === '' && submitted ? <span className='text-red-600 mt-1'>*Silahkan Isi Kotamu</span> : ''}

					</div>
					<div className="mb-4 block">
						<label className="block ">
							<span className="block mb-1 text-sm font-medium text-slate-700">Alamat*</span>

							<textarea
								onChange={(e) => setCurrentProfil({ ...currentProfil, address: e.target.value })}
								value={currentProfil.address}
								name="message" type="text"
								className="flex w-full h-20 rounded-xl" placeholder="Contoh: Jalan Ikan Hiu 26"
							/>
						</label>
						{currentProfil.address === '' && submitted ? <span className='text-red-600 mt-1'>*Silahkan Isi Alamatmu</span> : ''}
					</div>
					<div className="mb-4 block">
						<label className="block">
							<span className="block mb-1 text-sm font-medium text-slate-700">No Handphone*</span>
							<input
								onChange={(e) => setCurrentProfil({ ...currentProfil, phoneNumber: e.target.value })}
								value={currentProfil.phoneNumber}
								type='number' placeholder="Contoh +62812345678"
								className=" w-full rounded-xl "
							/>
						</label>
						{currentProfil.phoneNumber === '' && submitted ? <span className='text-red-600 mt-1'>*Silahkan Isi No Handphone mu</span> : ''}

					</div>
					<div className=" mb-4 ">
						<button type="submit" onClick={() => clickUpdateProfil()}
							className="px-4 w-full py-2 mr-4 border-2 hover:bg-[#7126B5CC] border-primary bg-primary text-white font-semibold rounded-xl">
							Simpan
						</button>
					</div>
				</div>
			</div>
		</>

	);
};
export default InfoProfile;