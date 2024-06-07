import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { user, token } = useContext(AuthContext);

  return (
    <header className="container ">
      <div className="flex items-center justify-center gap-5 px-[10px] py-[5px]">
        <div className="navigation">
          <Link
            to="/home"
            className=" border-[#0f0505] border  rounded-2xl p-2"
          >
            Home
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {token && user ? (
            <div>
              <Link to="/profile">
                <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                  <img
                    src={user?.photo}
                    className=" w-full rounded-full"
                    alt="user-avatar"
                  />
                </figure>
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <button className=" bg-blue-700 py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
