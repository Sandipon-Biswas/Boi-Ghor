/* eslint-disable react/prop-types */
import {
    Button,
    Dialog,
    DialogBody,
} from "@material-tailwind/react";
import { useState } from "react";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction,totalPay }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    return (
        <>
        
            <Button
                type="button"
                onClick={handleOpen}
                className="w-full px-4 py-3 text-center text-gray-100 bg-cyan-900 border border-transparent dark:border-gray-700 hover:border-cyan-800 hover:text-cyan-700 hover:bg-cyan-100 rounded-xl"
            >
                Buy now
            </Button>
            <Dialog open={open} handler={handleOpen} className=" bg-cyan-50">
                <DialogBody className="">
                    <div className="mb-3">
                        <h3 className="text-xl p-3 m-3 text-bold text-black ">  <span className="text-yellow-900" >৳{totalPay}</span> টাকা <span className="text-yellow-900 " >01841-172779</span> এই নাম্বারে বিকাশ বা নগতে পাঠান এবং এই ফ্রম পূরণ করে BuyNow বাটনে ক্লিক করুন  </h3>
                        <input
                            type="text"
                            name="name"
                            value={addressInfo.name}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    name: e.target.value
                                })
                            }}
                            placeholder='Enter your name'
                            className='bg-cyan-50 border border-cyan-200 px-2 py-2 w-full rounded-md outline-none text-black placeholder-black '
                        />
                    </div>
                    <div className="mb-3">
                        
                        <input
                            type="text"
                            name="address"
                            value={addressInfo.address}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    address: e.target.value
                                })
                            }}
                            placeholder='Enter your address'
                            className='bg-cyan-50 border border-cyan-200 px-2 py-2 w-full rounded-md outline-none text-black placeholder-black'
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="number"
                            name="pincode"
                            value={addressInfo.pincode}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    pincode: e.target.value
                                })
                            }}
                            placeholder='যে নাম্বার থেকে টাকা পাঠিয়েছেন'
                            className='bg-cyan-50 border border-cyan-200 px-2 py-2 w-full rounded-md outline-none  text-black placeholder-black'
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="mobileNumber"
                            value={addressInfo.mobileNumber}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    mobileNumber: e.target.value
                                })
                            }}
                            placeholder='Enter your mobileNumber'
                            className='bg-cyan-50 border border-cyan-200 px-2 py-2 w-full rounded-md outline-none text-black placeholder-black'
                        />
                    </div>

                    <div className="">
                        <Button

                            type="button"
                            onClick={() => {
                                handleOpen();
                                buyNowFunction();
                            }}
                            className="w-full px-4 py-3 text-center text-gray-100 bg-cyan-900 border border-transparent dark:border-gray-700 rounded-lg"
                        >
                            Buy now
                        </Button>
                    </div>

                </DialogBody>
            </Dialog>
        </>
    );
}

export default BuyNowModal;