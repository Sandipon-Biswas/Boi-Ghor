import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { useParams } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import Layout from "../navbar/layout/Layout";

const ProductInfo = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const [product, setProduct] = useState(null);
    const { id } = useParams();

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    // Function to fetch product data
    const getProductData = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            if (productTemp.exists()) {
                setProduct({ ...productTemp.data(), id: productTemp.id });
            } else {
                setProduct(null); // Handle case where product doesn't exist
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    // Fetch product data when component mounts or when id changes
    useEffect(() => {
        getProductData();
    }, [id]); // Re-run when id changes

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Removed from cart");
    };

    return (
        <Layout>
            <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
                {loading || !product ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="max-w-6xl px-4 mx-auto">
                        <div className="flex flex-wrap mb-24 -mx-4">
                            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                                <img
                                    className="w-full  rounded-lg"
                                    src={product.productImageUrl}
                                    alt={product.title}
                                />
                            </div>
                            <div className="w-full px-4 md:w-1/2">
                                <div className="lg:pl-20">
                                    <h2 className="text-2xl font-semibold text-gray-100 ">
                                        {product.title}
                                    </h2>
                                    <p className="text-sm my-2 text-green-100 " >  {product.category} </p>
                                    <p className="text-sm my-2 text-green-100 " >  {product.date} </p>
                                    <p className="text-2xl font-semibold text-red-700 my-4">
                                        ৳ {product.price}
                                    </p>
                                    <p>{product.description}</p>
                                    <div className="flex gap-4 mt-4">
                                        {cartItems.some((p) => p.id === product.id) ? (
                                            <button
                                                onClick={() => deleteCart(product)}
                                                className="w-full px-4 py-3 bg-red-600 text-white rounded-xl"
                                            >
                                                Remove from Cart
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => addCart(product)}
                                                className="w-full px-4 py-3 bg-cyan-900 text-white rounded-xl"
                                            >
                                                Add to Cart
                                            </button>
                                        )}
                                        {/* <button className="w-full px-4 py-3 bg-cyan-700 text-white rounded-xl">
                                            Buy Now
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </Layout>
    );
};

export default ProductInfo;
