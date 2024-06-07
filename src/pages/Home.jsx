import { Link } from "react-router-dom";
import { useContext } from "react";
import { BsArrowRight } from "react-icons/bs";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user, token } = useContext(AuthContext);

  return (
    <div className=" w-full h-full">
      <div className=" w-screen h-screen flex flex-col items-center justify-center">
        <div className=" border-2 border-[#0f0505] rounded-2xl p-[10vh]">
          {token && user ? (
            <div className=" flex flex-col gap-5 items-center">
              <h1 className=" text-[20px] font-extrabold">
                You are logged in as {user.name}
              </h1>
              <div className="w-[250px] flex flex-row justify-between items-center gap-5">
                <div className="text-[20px] text-blue-700 font-extrabold">
                  View Profile
                </div>
                <Link
                  to="/profile"
                  className=" w-10 h-10 rounded-full border border-[#0f0505] flex items-center justify-center"
                >
                  <BsArrowRight />
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className=" w-[250px] flex flex-row items-center justify-between gap-5 ">
                <div className="text-[40px] text-blue-700 font-extrabold">
                  Log In
                </div>
                <Link
                  to="/login"
                  className=" w-10 h-10 rounded-full border border-[#0f0505] flex items-center justify-center"
                >
                  <BsArrowRight />
                </Link>
              </div>
              <div className="w-[250px] flex flex-row justify-between items-center gap-5">
                <div className="text-[40px] text-blue-700 font-extrabold">
                  Sign Up
                </div>
                <Link
                  to="/signup"
                  className=" w-10 h-10 rounded-full border border-[#0f0505] flex items-center justify-center"
                >
                  <BsArrowRight />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
