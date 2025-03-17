import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import myContext from "../../../context/myContext";

const SearchBar = () => {
    const context = useContext(myContext);
    const { getAllProduct } = context;
    const [search, setSearch] = useState("");

    // Filter Search Data (Case-Insensitive)
    const filterSearchData = getAllProduct.filter((obj) => 
        obj.title.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 12);

    const navigate = useNavigate();
    return (
        <div className="mx-3">
            {/* Search input */}
            <div className="input flex justify-center">
                <input
                    type="text"
                    placeholder='Search here'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='bg-gray-900 placeholder-gray-400 rounded-lg px-2 py-2 w-60 lg:w-80 md:w-60 lx:w-90 outline-none text-white '
                />
            </div>

            {/* Search drop-down */}
            {/* Search drop-down */}
<div className="flex justify-center">
    {search && (
        <div className="block absolute bg-gray-200 w-96 md:w-96 lg:w-96 z-50 my-1 rounded-lg px-2 py-2 
                        max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
            {filterSearchData.length > 0 ? (
                filterSearchData.map((item, index) => (
                    <div onClick={() => navigate(`/productinfo/${item.id}`)} key={index} 
                         className="border-b-2 border-gray-400 py-2 px-2 cursor-pointer hover:bg-gray-300">
                        <div className="flex items-center gap-2 text-blue-gray-900">
                            <img className="w-10" src={item.productImageUrl} alt={item.title} />
                            {item.title}  -  ৳{item.price}
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex justify-center">
                    <img className="w-20" src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png" alt="No results found" />
                </div>
            )}
        </div>
    )}
</div>

        </div>
    );
};

export default SearchBar;
