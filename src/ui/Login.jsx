import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faGithub,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateName } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import useLocalStorageState from '../useLocalStorageState';
import { useState } from 'react';

function Login() {
  const user = useSelector((state) => state.user);
  console.log(user);

  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();

  function handleSubmit(e) {
    console.log('handleSubmit');
    e.preventDefault();

    if (!username) return;
    console.log('username', username);
    dispatch(updateName(username));

    // const redirectTo = location.state?.from || '/';
    // navigate(redirectTo);
    localStorage.setItem('loggedInUsername', username);
    navigate('/');
  }

  return (
    <div className="w-full">
      <div className="flex min-h-screen w-full flex-wrap justify-center bg-[url('./assets/img/other/bg_img.jpg')] bg-cover bg-no-repeat p-10">
        <div className="pt-18 w-[500px] items-center justify-center overflow-hidden rounded-xl bg-white p-32">
          <form className="w-full" onSubmit={handleSubmit}>
            <span className=" block pb-20 text-center text-7xl font-bold leading-5 text-[#333]">
              Login
            </span>
            <div className="relative mb-12 w-full border-b-2 border-solid border-[#d9d9d9] pb-4">
              <span className=" font-regular pl-2 text-3xl leading-6 text-[#333]">
                Username
              </span>
              <input
                type="text"
                name="username"
                required
                className="mt-4 block h-14 w-full border-none pl-16 pr-2 text-3xl font-medium leading-5 text-[#333] outline-none"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-2 top-14 text-3xl text-[#a8a6a6]"
              />
            </div>

            <div className="relative overflow-hidden border-b-2 border-solid border-[#d9d9d9] pb-4">
              <span className="font-regular pl-2 text-3xl leading-6 text-[#333]">
                Password
              </span>
              <input
                type="password"
                name="password"
                required
                className="mt-4 block h-14 w-full border-none pl-16 pr-2 text-3xl font-medium leading-5 text-[#333] outline-none"
                placeholder="Password"
              />
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-2 top-14 text-3xl text-[#a8a6a6]"
              />
            </div>
            <div className="pb-16 pt-4 text-right text-2xl text-[#3b5998]">
              <a href="#">Forgot password?</a>
            </div>
            <div className="mb-16 flex flex-wrap justify-center">
              <div className=" relative z-[1] mx-auto block w-full overflow-hidden rounded-[25px] shadow-custom-login">
                <div className=" absolute -left-full top-0 -z-[1] h-full w-300 bg-custom-purple bg-custom-gradient transition-all duration-400 ease-in-out"></div>
                <button
                  type="submit"
                  className="flex h-[50px] w-full items-center justify-center border-none px-5 font-poppins-medium text-3xl uppercase leading-5 text-white outline-none"
                >
                  Login
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <a href="#" className="">
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="m-[10px] flex h-[50px] w-[50px] items-center justify-center rounded-[50%] text-[40px] text-[#3b5998]"
                />
              </a>
              <a href="#" className="">
                <FontAwesomeIcon
                  icon={faGithub}
                  className="m-[10px] flex h-[50px] w-[50px] items-center justify-center rounded-[50%] text-[40px] text-[#333]"
                />
              </a>
              <a href="#" className="">
                <FontAwesomeIcon
                  icon={faGoogle}
                  className="m-[10px] flex h-[50px] w-[50px] items-center justify-center rounded-[50%] text-[40px] text-[#dd4b39]"
                />
              </a>
            </div>
            <div className="mt-10 flex items-center justify-center text-3xl">
              <span className="mr-4 text-[#333]">
                Don&apos;t have an account?
              </span>
              <a href="#" className="text-[#3b5998]">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
