import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";


const ProductDetail = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProduct, getAllProductFunction } = context;
    const navigate =useNavigate();
     // Delete product 
     const deleteProduct = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB , 'products', id))
            toast.success('Product Deleted successfully')
            getAllProductFunction();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <div>
            <div className="py-5 flex justify-between items-center">
                <h1 className=" text-xl text-cyan-900 font-bold">All Product</h1>
                <Link to={'/addproduct'}>
                    <button className="px-5 py-2 bg-cyan-900 hover:bg-cyan-800 text-white border border-cyan-900 rounded-lg">Add Product</button>
                </Link>
            </div>

            <div className="flex justify-center relative top-20">
                {loading && <Loader />}
            </div>

            <div className="w-full overflow-x-auto mb-5">
                <table className="w-full text-left border border-collapse sm:border-separate border-cyan-900 text-cyan-900" >
                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-cyan-900 text-white bg-cyan-900 font-bold fontPara">S.No.</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-cyan-900 text-white bg-cyan-900 font-bold fontPara">Image</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-cyan-900 text-white bg-cyan-900">Title</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-cyan-900 text-white bg-cyan-900">Price</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-cyan-900 text-white bg-cyan-900">Category</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-cyan-900 text-white bg-cyan-900"> Date</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-cyan-900 text-white bg-cyan-900">Action</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-cyan-900 text-white bg-cyan-900">Action</th>
                        </tr>
                        {getAllProduct.map((item, index) => {
                            const { id, title, price, category, date, productImageUrl } = item
                            return (
                                <tr key={index} className="text-white">
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-cyan-900 text-white">{index + 1}.</td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-cyan-900 text-white first-letter:uppercase">
                                        <div className="flex justify-center">
                                            <img className="w-20 " src={productImageUrl} alt="" />
                                        </div>
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-cyan-900 text-white first-letter:uppercase">{title}</td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-cyan-900 text-white first-letter:uppercase">₹{price}</td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-cyan-900 text-white first-letter:uppercase">{category}</td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-cyan-900 text-white first-letter:uppercase">{date}</td>
                                    <td onClick={()=>navigate(`/updateproduct/${id}`)} className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-cyan-900 text-green-500 cursor-pointer ">Edit</td>
                                    <td onClick={()=> deleteProduct(id)} className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-cyan-900 text-red-500 cursor-pointer ">Delete</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetail;
