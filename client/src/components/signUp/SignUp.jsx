import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "../../styles/Styles";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = () => {};
  const handleFileinput = (e) => {
    const file = e.target.files[0];
    setAvatar(file)
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col justify-center
     py-12 sm:px-6 lg:px-8 "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Sign-in to Your Account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md border rounded-md border-gray-400 ">
        <div className=" mt-1 bg-white flex flex-col items-center justify-center">
          <div className="mt-2 flex items-center justify-center  ">
            <span className="inline-block h-[8rem] w-[8rem] rounded-full overflow-hidden">
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="avatar"
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <RxAvatar className="h-10 w-10" />
              )}
            </span>
          </div>
          <label
            htmlFor="file-input"
            className=" text:sm font-medium cursor-pointer  border rounded-md text-sm shadow-sm  border-gray-400  text-gray-700"
          >
            <span>upload avatar</span>
            <input
              type="file"
              name="avatar"
              id="file-input"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileinput}
              className="sr-only"
            />
          </label>
        </div>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:pxpx-10">
          <form className="space-y-6">
            <div>
              <label
                className="block ml-2 text-sm font-medium text-gray-700 "
                htmlFor="name"
              >
                Name
              </label>
              <div className="flex items-center py-2 px-2 bg-gray-200 rounded-md ">
                <input
                  className="appearance-none block w-full px-3 
                py2 bg-transparent placeholder:text-black/50 outline-none rounded-md "
                  type="name"
                  name="name"
                  required
                  placeholder="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
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
                {visible  ? (
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

            <button
              type="submit"
              className=" group relative w-full h-10 flex justify-center
               py-2 px-4 border border-transparent text-white text-sm
                font-medium rounded-md bg-blue-500 hover:bg-blue-700"
            >
              Submit
            </button>
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link
                to="/"
                className="text-blue-600 pl-2"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
