/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "../../components/loader/Loader";

const Signup = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  // User Signup State
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const userSignupFunction = async () => {
    // Validation
    if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
      toast.error("All Fields are required");
      return; // Prevent further execution
    }

    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

      // Create user object
      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      // Create user reference and add user details
      const userRefrence = collection(fireDB, "user");
      await addDoc(userRefrence, user); // Await Firestore operation

      setUserSignup({
        name: "",
        email: "",
        password: "",
        role: "user",
      });

      toast.success("Signup Successfully");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />}
      {/* Signup Form */}
      <div className="login_Form bg-cyan-50 px-1 lg:px-8 py-6 border border-cyan-100 rounded-xl shadow-md">
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-cyan-900">Signup</h2>
        </div>

        <div className="mb-3">
          <input
          style={{ color: 'black' }}
            type="text"
            placeholder="Full Name"
            value={userSignup.name}
            onChange={(e) => setUserSignup({ ...userSignup, name: e.target.value })}
            className="bg-cyan-50 border text-cyan-900  border-cyan-900 px-2 py-2 w-96 rounded-md outline-none placeholder-cyan-900"
          />
        </div>

        <div className="mb-3">
          <input
             style={{ color: 'black' }}
            type="email"
            placeholder="Email Address"
            value={userSignup.email}
            onChange={(e) => setUserSignup({ ...userSignup, email: e.target.value })}
            className="bg-cyan-50 border text-cyan-900  border-cyan-900 px-2 py-2 w-96 rounded-md outline-none placeholder-cyan-900"
          />
        </div>

        <div className="mb-5">
          <input
             style={{ color: 'black' }}
            type="password"
            placeholder="Password"
            value={userSignup.password}
            onChange={(e) => setUserSignup({ ...userSignup, password: e.target.value })}
            className="bg-cyan-50 border text-cyan-900  border-cyan-900 px-2 py-2 w-96 rounded-md outline-none placeholder-cyan-900"
          />
        </div>

        <div className="mb-5">
          <button
            onClick={userSignupFunction}
            type="button"
            className="bg-cyan-900 hover:bg-cyan-800 w-full text-white text-center py-2 font-bold rounded-md"
          >
            Signup
          </button>
        </div>

        <div>
          <h2 className="text-black">
            Have an account? <Link className="text-cyan-900 font-bold" to={"/login"}>Login</Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
