/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // User Signup State 
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });





        /**========================================================================
    *========================================================================**/

        const userLoginFunction = async () => {
            // validation 
            if (userLogin.email === "" || userLogin.password === "") {
                toast.error("All Fields are required")

            }
            setLoading(true);
            try {
                const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
                // console.log(users.user)

                try {
                    const q = query(
                        collection(fireDB, "user"),
                        where('uid', '==', users?.user?.uid)
                    );
                    const data = onSnapshot(q, (QuerySnapshot) => {
                        let user;
                        QuerySnapshot.forEach((doc) => user = doc.data());
                        localStorage.setItem("users", JSON.stringify(user) )
                        setUserLogin({
                            email: "",
                            password: ""
                        })
                        toast.success("Login Successfully");
                        setLoading(false);
                        if(user.role === "user") {
                            navigate('/user-dashboard');
                        }else{
                            navigate('/admin-dashboard');
                        }
                    });
                    return () => data;
                    
                } catch (error) {
                    console.log(error)
                    setLoading(false);
                }






            } catch (error) {
                console.log(error);
                setLoading(false);
                toast.error("Login Failed");
            }
       
        }
    





    return (
        <div className='flex justify-center items-center h-screen'>
             {loading && <Loader />}
            {/* Login Form  */}
            <div className="login_Form bg-cyan-50 px-1 lg:px-8 py-6 border border-cyan-900 rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-cyan-900 '>
                        Login
                    </h2>
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                    <input
                    style={{ color: 'black' }}
                        type="email"
                        placeholder='Email Address'


                        value={userLogin.email}
                        onChange={(e) => {
                            setUserLogin({
                                ...userLogin,
                                email: e.target.value
                            })
                        }}


                        className='bg-cyan-50 border text-cyan-900  border-cyan-900 px-2 py-2 w-96 rounded-md outline-none placeholder-cyan-900'
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                    style={{ color: 'black' }}



  

                        value={userLogin.password}
                        onChange={(e) => {
                            setUserLogin({
                                ...userLogin,
                                password: e.target.value
                            })
                        }}

                        type="password"
                        placeholder='Password'
                        className='bg-cyan-50 border text-cyan-900  border-cyan-900 px-2 py-2 w-96 rounded-md outline-none placeholder-cyan-900'
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                     onClick={userLoginFunction}
                        type='button'
                        className='bg-cyan-900 hover:bg-cyan-800 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Login
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Don't Have an account <Link className=' text-cyan-900 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Login;
