import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "../../styles/Styles";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col justify-center
     py-12 sm:px-6 lg:px-8 "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Login to Your Account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md border rounded-md border-gray-400 ">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:pxpx-10">
          <form className="space-y-6" >
            <div>
              <label
                className="block ml-2 text-sm font-medium text-gray-700 "
                htmlFor="email"
              >
                Email
              </label>
              <div className="flex items-center py-2 px-2 bg-gray-200 rounded-md ">
                <input
                  className="appearance-none block w-full px-3 
                py2 bg-transparent placeholder:text-black/50 outline-none rounded-md "
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                className="block ml-2 text-sm font-medium text-gray-700 "
                htmlFor="password"
              >
                Password
              </label>
              <div className="flex items-center py-2 px-2 bg-gray-200 rounded-md ">
                <input
                  className="appearance-none block w-full px-3 
                py2 bg-transparent placeholder:text-black/50 outline-none rounded-md "
                  type={visible ? "text" : "password"}
                  name="pssword"
                  required
                  placeholder="password"
                  autoComplete="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {visible ? (
                  <FaEye
                    className="cursor-pointer"
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <FaEyeSlash
                    className="cursor-pointer"
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div className={`${styles.normalFlex} justify-between`}>
              <div className={`${styles.normalFlex} ml-2`}>
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 
                focus:ring-blue-500 border-gray-300"
                  name="remember-me"
                  id="remember-me"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-medium text-blue-600 hover:bg-blue-700"
                >
                  {" "}
                  forgot password
                </a>
              </div>
            </div>
            <button
              type="submit"
              className=" group relative w-full h-10 flex justify-center
               py-2 px-4 border border-transparent text-white text-sm
                font-medium rounded-md bg-blue-500 hover:bg-blue-700"
            >
              Submit
            </button>
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Don't have an account?</h4>
              <Link
                to="/signup"
                className="text-blue-600 pl-2"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
