import { useState } from 'react';
// import { useSelector } from 'react-redux';

function UserInfo({ username }) {
  // const username = useSelector((state) => state.user.username);
  const [showMenu, setShowMenu] = useState(false);

  const handleMouseEnter = () => {
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    setShowMenu(false);
  };

  return (
    <div className="flex justify-end">
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          className="w-24 cursor-pointer"
          src="./src/assets/defaultUser.png"
          alt="Avatar"
        ></img>
        {showMenu && (
          <div className="absolute -right-4 top-20 z-10 w-[160px] rounded-md bg-white p-2 text-2xl shadow-md">
            <ul>
              <li className=" hover:bg-[#e9e9e9]">
                <a
                  className=" block px-6 py-2 text-3xl text-[#706f6f]"
                  href="#"
                >
                  Profile
                </a>
              </li>
              <li className=" hover:bg-[#e9e9e9]">
                <a
                  className=" block px-6 py-2 text-3xl text-[#706f6f]"
                  href="#"
                >
                  Settings
                </a>
              </li>
              <li className=" hover:bg-[#e9e9e9]">
                <a
                  className=" block px-6 py-2 text-3xl text-[#706f6f]"
                  href="#"
                >
                  Logout
                </a>
              </li>
              {/* Add more menu items as needed */}
            </ul>
            {/* Arrow-like shape */}
            <div className="absolute -top-10 right-8 h-0 w-0 rotate-180  transform border-x-[18px] border-y-[14px] border-solid border-transparent border-t-[white]"></div>
          </div>
        )}
      </div>
      <p className="mt-2 text-3xl">
        {username === ''
          ? 'Welcome! Please enter your name.'
          : `Hello, ${username}!`}
      </p>
    </div>
  );
}

export default UserInfo;
