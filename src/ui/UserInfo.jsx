import { useState } from 'react';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UserInfo({ username, onLogout }) {
  // const username = useSelector((state) => state.user.username);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const avt =
    localStorage.getItem('avatar') || './src/assets/img/other/defaultUser.png';

  const handleMouseEnter = () => {
    if (username !== '') setShowMenu(true);
  };

  const handleMouseLeave = () => {
    setShowMenu(false);
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
    <div className="z-10 ml-[100px] flex">
      <div
        className="relative cursor-pointer rounded-full border-[3px] border-primary"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          className="{username === '' ? 'cursor-pointer' : ''} h-[45px] w-[45px] rounded-full"
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
            </ul>
            {/* Arrow-like shape */}
            <div className="absolute -top-10 right-8 h-0 w-0 rotate-180  transform border-x-[18px] border-y-[14px] border-solid border-transparent border-t-[white]"></div>
          </div>
        )}
      </div>
      <p className="ml-6 mt-4 text-3xl">
        {username === '' ? (
          <button
            href="#"
            className="font-poppins-regular text-white"
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
