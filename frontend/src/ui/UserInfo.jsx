import { useState } from 'react';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UserInfo({ username, onLogout }) {
  // const username = useSelector((state) => state.user.username);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const avt =
    localStorage.getItem('avatar') || '/assets/img/other/defaultUser.png';

  const handleShowMenu = () => {
    if (username !== '') {
      setShowMenu(!showMenu);
    } else {
      navigate('/login');
    }
  };

  function handleLogout() {
    onLogout();
  }

  function handleLogin() {
    if (username === '') {
      navigate('/login');
    }
  }

  function onUserProfile() {
    if (username !== '') {
      navigate('/user/profile');
    }
  }

  function onWatchlist() {
    if (username !== '') {
      navigate('/user/watchlist');
    }
  }

  return (
    <div className="user-info z-10 hidden md:flex lg:ml-auto cursor-pointer select-none relative" onClick={handleShowMenu}>
      <div
        className={`relative ${
          username !== ''
            ? 'md:border-3 cursor-pointer rounded-full border-2 border-primary'
            : ''
        }`}
      >
        {/* Avatar */}
        <img
          className={`${
            username === '' ? 'cursor-pointer' : ''
          }  h-12 w-12 rounded-full object-cover sm:h-14 sm:w-14 md:h-[45px] md:w-[45px] lg:h-[50px] lg:w-[50px]`}
          src={avt}
          alt="Avatar"
        ></img>
        {showMenu && (
          <div className="absolute -right-4 top-20 z-10 w-[160px] rounded-md bg-white p-2 text-2xl shadow-md">
            <ul>
              <li className=" hover:bg-[#e9e9e9]">
                <a
                  className=" block px-6 py-2 text-3xl text-[#706f6f]"
                  href="#"
                  onClick={onUserProfile}
                >
                  Profile
                </a>
              </li>
              <li className=" hover:bg-[#e9e9e9]">
                <button
                  className=" block px-6 py-2 text-3xl text-[#706f6f]"
                  onClick={onWatchlist}
                >
                  Watchlist
                </button>
              </li>
              <li className=" hover:bg-[#e9e9e9]">
                <a
                  className=" block px-6 py-2 text-3xl text-[#706f6f]"
                  href="#"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </li>
              <li className=" hover:bg-[#e9e9e9]">
                <a
                  className=" block px-6 py-2 text-3xl text-[#706f6f]"
                  href="#"
                  onClick={() => navigate('/test')}
                >
                  Test
                </a>
              </li>
            </ul>
            {/* Arrow-like shape */}
            <div className="absolute -top-10 right-8 h-0 w-0 rotate-180  transform border-x-[18px] border-y-[14px] border-solid border-transparent border-t-[white]"></div>
          </div>
        )}
      </div>
      <p className="ml-6 mt-5 hidden text-3xl lg:flex select-none font-poppins-regular font-semibold text-white">
        {username === '' ? (
          <button
            href="#"
            className=""
            onClick={handleLogin}
          >
            Login
          </button>
        ) : (
          `Hi, ${username}!`
        )}
      </p>
    </div>
  );
}

export default UserInfo;
