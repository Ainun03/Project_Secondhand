import React, { Fragment } from 'react';

function ModalsTawar() {
    return (
        <Fragment>
            <div className='modal-body'>
                <h1 className='font-medium text-sm mb-4'>Yeay kamu berhasil mendapat harga yang sesuai</h1>
                <p className='text-sm text-neutralGray'>
                    Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya
                </p>
                <div className='modal-product mb-4 p-4 bg-[#EEEEEE] rounded-2xl'>
                    <div className='flex'>
                        <img src='/assets/images/img-profile.png' alt='produuct' />
                        <div className='info-product  ml-3 my-auto'>
                            <strong className='font-medium text-sm'>Nama Pembeli</strong>
                            <p className='text-sm text-neutralGray'>Kota</p>
                        </div>
                    </div>
                    <div className='flex mt-4'>
                        <img src='/assets/images/img-profile.png' alt='produuct' />
                        <div className='info-product  ml-3 my-auto'>
                            <strong className='font-medium text-sm'>Jam Tangan</strong>
                            <p className='text-sm text-neutralGray'>Ditawar Rp 200.000</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default ModalsTawar;