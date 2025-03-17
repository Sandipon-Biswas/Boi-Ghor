import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./searchBar/SearchBar";
import { useSelector } from "react-redux";



const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    
    
    // console.log(user)
     // navigate 
     const navigate = useNavigate();
        // logout function 
        const logout = () => {
            localStorage.clear('users');
            navigate("/login")
        }
        const cartItems = useSelector((state) => state.cart);
        const cartTotal = cartItems.map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

     
          
        
    // navList Data
    const navList = (
        <ul className="flex space-x-3 text-white font-medium text-b  px-5 ">
            {/* Home */}
            <li>
                <Link to={'/'}>Home</Link>
            </li>

            {/* All Product */}
            <li>
                <Link to={'/allproduct'}>All Product</Link>
            </li>

            {/* Signup */}
          {!user ?  <li>
                <Link to={'/signup'}>Signup</Link>
            </li>:""}

        {/* Signup */}
            {!user ? <li>
                <Link to={'/login'}>Login</Link>
            </li> : ""}

            {/* User */}
           {/* User */}
           {user?.role === "user" && <li>
                <Link to={'/user-dashboard'}>{user?.name}</Link>
            </li>}
            {/* Admin */}
            {user?.role === "admin" && <li>
                <Link to={'/admin-dashboard'}>{user?.name}</Link>
            </li>}

            {/* logout */}

            {user &&     <li onClick={logout} className=" cursor-pointer "  >
                logout
            </li>}


            {/* Cart */}
            <li>
                <Link to={'/cart'}>
                
                Cart (<span className="  " >{cartItems.length}</span>)
                </Link>
            </li>
        </ul>
    )
    return (
                    <div className="navbar  shadow-sm bg-cyan-900 sticky top-0 ">
            <div className="flex-1">
            <Link to={'/'}>
                    <img className=" w-8 h-8 " src="https://cdn-icons-png.flaticon.com/128/3485/3485893.png" alt="" />
            </Link>
        
            </div>
            <div className="flex-none">
                <SearchBar/>
                <div className="dropdown dropdown-end">
                <Link to={'/cart'} tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                    <span className="badge badge-sm indicator-item">{cartItems.length}</span>
                    </div>
                </Link>
               
                </div>
                <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-600 rounded-full dark:bg-gray-600">
    <span class="font-medium text-gray-100 dark:text-gray-300">{user?.name?.slice(0, 2)}</span>
</div>
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                 <li>
          <a className="justify-between">
            Profile
            
          </a>
        </li>
                    {/* User */}
           {/* User */}
           {user?.role === "user" && <li>
                <Link to={'/user-dashboard'}>{user?.name} <span className="badge">Name</span> </Link> 
            </li>}
            {/* Admin */}
            {user?.role === "admin" && <li>
                <Link to={'/admin-dashboard'}>{user?.name} <span className="badge">Role</span> </Link>
            </li>}
                 
                                {/* Home */}
            <li>
                <Link to={'/'}>Home</Link>
            </li>

            {/* All Product */}
            <li>
                <Link to={'/allproduct'}>All Product</Link>
            </li>

            {/* Signup */}
          {!user ?  <li>
                <Link to={'/signup'}>Signup</Link>
            </li>:""}

        {/* Signup */}
            {!user ? <li>
                <Link to={'/login'}>Login</Link>
            </li> : ""}



            {/* logout */}
            {user &&     <li style={{marginLeft:"10px"}} onClick={logout} className=" mt-3 btn btn-sm btn-outline btn-error "  >
                Logout
            </li>}

        

                   
                </ul>
                </div>
            </div>
            </div>
     
    );
}

export default Navbar;
