import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';

// redux + axios
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

// icon + antd
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';

// toast
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
// slice
import { updateProduct } from "../../slices/productSlice";

// Imaege
const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
};

const EditProduct = () => {
	// ------- category  ---  /////
	const url = 'https://binar-secondhand-production.herokuapp.com/categories/get-all-category';
	const [category, setCategory] = useState([]);
	const getCategory = () => {
		axios.get(url).then((res) => {
			setCategory(res.data);
		});
	};
	useEffect(() => {
		getCategory();
	}, []);
	//// ----- end Category  ------\\\\\\

	//// ----- redux  ------\\\\\\
	const { auth, product } = useSelector(state => state);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { id } = useParams();
	const productData = product.products.find(i => i.productId == id);
	//// ----- Image  ------\\\\\\	
	const [image, setImage] = useState(null);
	const [{ alt, src }, setImg] = useState({
		// src: placeholder,
		alt: 'Upload an Image'
	});
	const [fileList, setFileList] = useState([]);
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

	//// ----- State Product  ------\\\\\\

	const initialProductState = {
		token: auth.login.token,
		productId: productData.productId,
		categoryId: productData.categories.categoryId ? productData.categories.categoryId : "",
		productName: productData.productName ? productData.productName : "",
		price: productData.price ? productData.price : "",
		description: productData.description ? productData.description : "",
	};

	const [currentProduct, setCurrentProduct] = useState(initialProductState);
	const [submitted, setSubmitted] = useState(false);

	//// ----- handle Category  ------\\\\\\	
	const handleChangeCategory = (e) => {
		setCategory(
			category.find((item) => item.categoryName === e.target.value)
		);
	};
	////// ----- Submit  ------\\\\\\
	const clickUpdateProduct = () => {
		setSubmitted(true);
		if (currentProduct.productName !== "" && currentProduct.price !== "" && currentProduct.categoryId !== "" && image !== "" && currentProduct.description !== "") {
			toast.loading("Edit Product . . .", {
				position: "top-center",
				autoClose: 5000,
			});
			dispatch(updateProduct({
				token: currentProduct.token,
				productId: currentProduct.productId,
				categoryId: currentProduct.categoryId,
				productName: currentProduct.productName,
				price: currentProduct.price,
				image: image,
				description: currentProduct.description,
			}))
				.unwrap()
				.then(() => {
					toast.dismiss();
					toast.success("Berhasil Update Product!", {
						position: "top-center",
						autoClose: 5000,
					});
					navigate(`/list-jual`);
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
				<div className="container mx-auto max-w-6xl flex justify-between py-4">
					<div className="left-nav flex">
						<img src='/assets/images/logo.png' alt='logo' />
					</div>

				</div>
			</div>

			<div className="flex container mx-auto max-w-3xl md:hidden pt-2">
				<div className=" ml-4  ">
					<Link to="/list-jual" >
						<AiOutlineArrowLeft style={{ color: '#000000' }} size={20} />
					</Link>
				</div>

				<div className="mr-10 w-full text-center">
					<h1>Edit Produk</h1>
				</div>
			</div>

			<div className=" flex container mx-auto max-w-3xl pt-3">
				<div className=" mr-6 py-6 hidden md:block ">
					<Link to="/list-jual" >
						<AiOutlineArrowLeft style={{ color: '#000000' }} size={20} />
					</Link>
				</div>

				<div className=" w-full p-6">
					<div className="mb-4 block">
						<label className="block">
							<span className="block mb-1 text-sm font-medium text-slate-700">Nama Produk</span>

							<input
								value={currentProduct.productName}
								onChange={(e) => setCurrentProduct({ ...currentProduct, productName: e.target.value })}
								type="text" placeholder="Nama Produk"
								className=" w-full rounded-xl"
							/>
							{currentProduct.productName === '' && submitted ? <span className='text-red-600 mt-1'>*Silahkan isi nama product</span> : ''}
						</label>
					</div>
					<div className="mb-4 block">
						<label className="block">
							<span className="block mb-1 text-sm font-medium text-slate-700">Harga Produk</span>
							<input
								value={currentProduct.price}
								onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
								type="number" placeholder="Rp 0,00"
								className=" w-full rounded-xl"
							/>
							{currentProduct.price === '' && submitted ? <span className='text-red-600 mt-1'>*Silahkan isi harga</span> : ''}
						</label>
					</div>
					<div className="mb-4 block">
						<label className="block">
							<span className="block mb-1 text-sm font-medium text-slate-700">Category</span>
							<select
								required
								value={currentProduct.categoryId}
								onChange={(e) => handleChangeCategory && setCurrentProduct({ ...currentProduct, categoryId: e.target.value })}
								className="
                                    block
                                    w-full
                                    mt-1
                                    rounded-xl
                                    shadow-sm
                                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                    "
							>
								<option className="" value="" disabled selected>Pilih Category</option>
								{category.map((item) => (
									<option key={item.categoryId} value={item.categoryId}>
										{item.categoryName}
									</option>
								))}
							</select>
							{currentProduct.categoryId === '' && submitted ? <span className='text-red-600 mt-1'>*Silahkan isi category</span> : ''}
						</label>
					</div>
					<div className="mb-4 ">
						<label className="block ">
							<span className="block mb-1 text-sm font-medium text-slate-700">Deskripsi</span>
							<textarea
								value={currentProduct.description}
								onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
								name="massage" type="text"
								className="flex w-full h-20 rounded-xl" placeholder="Contoh: Jalan Ikan Hiu 26"
							/>
							{currentProduct.description === '' && submitted ? <span className='text-red-600 mt-1'>*Silahkan isi Deskripsi</span> : ''}
						</label>
					</div>
					<div className="mb-4 ">
						<label className="block ">
							<span className="block mb-1 text-sm font-medium text-slate-700">Foto Produk</span>
						</label>

							<ImgCrop rotate>
								<Upload
									name="image"
									id="image"
									type="file"
									action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
									listType="picture-card"
									// fileList={image}
									// beforeUpload={beforeUpload}
									onChange={handleChangeImage}
								>
									{/* <PlusOutlined /> */}
									{fileList.length < 5 && <PlusOutlined/>}
								</Upload>
							</ImgCrop>


					</div>
					<div className=" mb-4 ">
						<button type="submit"
							onClick={() => clickUpdateProduct()}
							className="px-4 w-full py-2   border-2 hover:bg-[#7126B5CC] border-primary bg-primary text-white font-semibold rounded-xl">
							Terbitkan
						</button>
					</div>
				</div>
			</div>
		</>

	);
};
export default EditProduct;