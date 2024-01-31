import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";
import axios from "axios";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/activation`, {
            activation_token,
          })
          .then((res) => console.log(res))
          .catch((err) => {
            console.log(err);
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      {error ? (
        <p> your token is expired</p>
      ) : (
        <p>Your Account created Successfully</p>
      )}
    </div>
  );
};

export default ActivationPage;
