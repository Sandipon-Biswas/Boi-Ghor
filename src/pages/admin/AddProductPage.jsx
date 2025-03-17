import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

const categoryList = [
    { name: "please select" },
    { name: "উপন্যাস" },
    { name: "কবিতা" },
    { name: "ছোটগল্প" },
    { name: "প্রবন্ধ" },
    { name: "ইতিহাস" },
    { name: "জীবনী" },
    { name: "শিশু সাহিত্য" },
    { name: "বিজ্ঞান ও প্রযুক্তি" },
    { name: "ভ্রমণ কাহিনী" },
    { name: "মোটিভেশনাল বই" },
    { name: "রহস্য ও ভৌতিক গল্প" },
    { name: "ধর্মীয় বই" },
    { name: "ইসলামিক" },
    { name: "English" },

    
];

const AddProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        quantity: 1,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    });

    const addProductFunction = async () => {
        if (!product.title || !product.price || !product.productImageUrl || !product.category || !product.description) {
            return toast.error("All fields are required");
        }

        setLoading(true);
        try {
            const productRef = collection(fireDB, "products");
            await addDoc(productRef, product);
            toast.success("Product added successfully");
            navigate("/admin-dashboard");
        } catch (error) {
            console.log(error);
            toast.error("Failed to add product");
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            {loading && <Loader />}
            <div className="bg-oklch(0.129 0.042 264.695) px-8 py-6 border border-cyan-200 rounded-xl shadow-md w-96">
                <h2 className="text-center text-2xl font-bold text-white">Add Product</h2>
                <div className="mb-3">
                    <input type="text" placeholder="Product Title" value={product.title} onChange={(e) => setProduct({ ...product, title: e.target.value })} className="w-full px-2 py-2 border border-cyan-200 rounded-md outline-none text-white" />
                </div>
                <div className="mb-3">
                    <input type="number" placeholder="Product Price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} className="w-full px-2 py-2 border border-cyan-200 rounded-md outline-none " />
                </div>
                <div className="mb-3">
                    <input type="text" placeholder="Product Image URL" value={product.productImageUrl} onChange={(e) => setProduct({ ...product, productImageUrl: e.target.value })} className="w-full px-2 py-2 border border-cyan-200 rounded-md outline-none text-white" />
                </div>
                <div className="mb-3">
                    <select value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} className="w-full px-2 py-2 border border-cyan-200 rounded-md outline-none">
                        <option disabled>Select Product Category</option>
                        {categoryList.map((item, index) => (
                            <option key={index} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <textarea placeholder="Product Description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} rows="4" className="w-full px-2 py-2 border border-cyan-200 rounded-md outline-none text-white"></textarea>
                </div>
                <button onClick={addProductFunction} className="w-full bg-cyan-900 text-white py-2 font-bold rounded-md hover:bg-cyan-800">Add Product</button>
            </div>
        </div>
    );
};

export default AddProductPage;
