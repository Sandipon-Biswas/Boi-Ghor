import { useNavigate, useParams } from "react-router";

import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import Layout from "../../components/navbar/layout/Layout";
import Pagination from "../../components/Pagination";

const CategoryPage = () => {
            const [currentPage, setCurrentPage] = useState(1);
            const [postsPerPage, setPostsPerPage] = useState(10);
            const lastPostIndex = currentPage * postsPerPage;
            const firstPostIndex = lastPostIndex - postsPerPage;
    const { categoryname } = useParams();
    const context = useContext(myContext);
    const { getAllProduct, loading } = context;

    const navigate = useNavigate();

    const filterProduct = getAllProduct.filter((obj) => obj.category.includes(categoryname))


    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        // console.log(item)
        dispatch(addToCart(item));
        toast.success("Add to cart")
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Delete cart")
    }

    // console.log(cartItems)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])
    return (
        <Layout >
            <div className="mt-10">
                {/* Heading  */}
                <div className="">
                    <h1 className=" text-center mb-5 text-2xl font-semibold first-letter:uppercase">{categoryname}</h1>
                </div>

                {/* main  */}
                {loading ?
                    <>
                        <div className="flex justify-center">
                            <Loader />
                        </div>
                    </>
                    :
                    <>
                        <section className="text-gray-600 body-font">
                        <div className="container px-5 py-5 mx-auto">
    <div className="flex flex-wrap -m-4 justify-center">
        {filterProduct.length > 0 ? (
            <>
                {filterProduct.slice(firstPostIndex, lastPostIndex).map((item, index) => {
                    const { id, title, price, productImageUrl,description } = item;
                    return (
                        <div key={index} className="p-4 w-1/2 md:w-1/3 xl:w-1/4">
                            <div className="border border-gray-800 rounded-xl overflow-hidden shadow-md cursor-pointer">
                               <div className="flex justify-center align-center">
                                <img
                                    onClick={() => navigate(`/productinfo/${id}`)}
                                    className=""
                                    src={productImageUrl}
                                    alt="blog"
                                />
                                </div>
                                <div className="p-6">
                                
                                    <h1 className="title-font text-lg font-medium text-white mb-3">
                                        {title.substring(0, 25)}
                                    </h1>
                                    <p className="text-sm" >
                                                {description.substring(0, 35)}...
                                            </p>
                        <h1 className=" text-red-700 mt-3 title-font text-lg font-medium mb-3">
                            ৳{price}
                        </h1>

                                    <div className="flex justify-center">
                                        {cartItems.some((p) => p.id === item.id) ? (
                                            <button
                                                onClick={() => deleteCart(item)}
                                                className="bg-green-900 hover:bg-green-500 w-full text-white py-[4px] rounded-lg font-bold"
                                            >
                                                Delete from Cart
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => addCart(item)}
                                                className="bg-cyan-900 hover:bg-cyan-800 w-full text-white py-[4px] rounded-lg font-bold"
                                            >
                                                Add to Cart
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </>
        ) : (
            <div className="text-center">
                <div className="flex justify-center">
                    <img
                        className="mb-2"
                        src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                        alt="No product found"
                    />
                </div>
                <h1 className="text-black text-xl">No {categoryname} product found</h1>
            </div>
        )}
    </div>
</div>

                          
                        </section>
                    </>
                }
            </div>
            <div className="mb-5">
                              {/* pagination end */}
            <Pagination
                totalPosts={filterProduct.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
            {/* pagination end */}
            </div>
        </Layout>
    );
}

export default CategoryPage;