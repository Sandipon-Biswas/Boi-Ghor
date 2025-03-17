import { useContext, useEffect,useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import toast from "react-hot-toast";
import { Timestamp } from "firebase/firestore";
import Pagination from "../Pagination";

const HomePageProductCard = () => {
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(8);
    // pagination
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const context = useContext(myContext);
    const { loading, getAllProduct } = context;
    
    const cartItems = useSelector((state) => state.cart);

    // Convert Firestore Timestamp to a serializable format
    const formatCartItem = (item) => ({
        ...item,
        time: item.time instanceof Timestamp ? item.time.toMillis() : item.time,
    });

    const addCart = (item) => {
        dispatch(addToCart(formatCartItem(item)));
        toast.success("Added to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(formatCartItem(item)));
        toast.success("Removed from cart");
    };

    // Save cart items to localStorage when updated
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);


    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
  // (firstPostIndex, lastPostIndex);

    return (
        <div className="mt-10">
            {/* Heading */}
            <div className="text-center mb-5">
                <h1 className="text-2xl font-semibold">Bestselling Products</h1>
            </div>

            {/* Main Product Section */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-5 mx-auto">
                    <div className="flex justify-center">{loading && <Loader />}</div>

                    <div className="grid gap-4 md:gap-4 lg:gap-4 xl:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {getAllProduct.slice(firstPostIndex, lastPostIndex).map((item, index) => {
                            const { id, title, price, productImageUrl,description,category } = item;

                            return (
                                <div key={index} className="  rounded-xl overflow-hidden  cursor-pointer">
                                    <div className="border border-gray-800  rounded-xl overflow-hidden ">
                                        <div className="flex justify-center items-center ">
                                        <img
                                            onClick={() => navigate(`/productinfo/${id}`)}
                                            className=""
                                            src={productImageUrl}
                                            alt={title}
                                        />
                                        </div>
                                        <div className="p-6">
                                            
                                            <h1 className="text-sm lg:text-lg md:text-sm xl:text-xl font-medium text-white mb-3">
                                                {title.substring(0, 15)}
                                            </h1>
                                            <p className="text-sm my-2 text-green-50 " >  {category} </p>

                                            <p className="text-sm" >
                                                {description.substring(0, 25)}...
                                            </p>
                                            
                                            <h1 className="text-red-700 mt-3 text-sm lg:text-lg md:text-sm xl:text-xl font-medium  mb-3">
                                                ৳{price}
                                            </h1>

                                            <div className="flex justify-center">
                                            {cartItems.some((p)=> p.id === item.id) 
                                                
                                                ?
                                                <button
                                                    onClick={() => deleteCart(item)}
                                                    className=" bg-green-900 hover:bg-green-500 w-full text-white py-[4px] rounded-lg font-bold"> Delete to Cart
                                                </button>

                                                : 

                                                <button
                                                    onClick={() => addCart(item)}
                                                    className=" bg-cyan-900 hover:bg-cyan-800 w-full text-white py-[4px] rounded-lg font-bold">Add to Cart
                                                </button>
                                            }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            {/* pagination */}
            <div className="mb-5">
            <Pagination
                totalPosts={getAllProduct.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
            </div>
            {/* pagination end */}
        </div>
    );
};

export default HomePageProductCard;
