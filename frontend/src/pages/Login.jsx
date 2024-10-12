import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock, faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faGithub,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { updateName } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import useLocalStorageState from '../useLocalStorageState';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../ui/Footer';
// import ToastMessageLogin from '../ui/ToastMessageLogin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const user = useSelector((state) => state.user);
  console.log(user);

  const url = 'https://movie-app-server-niy5.onrender.com/users';
  // const [token, setToken] = useState('');

  // const [username, setUsername] = useState('');
  const [curState, setCurState] = useState('Login');
  // const [toastStatus, setToastStatus] = useState({
  //   visible: false,
  //   type: '',
  //   message: '',
  // });
  // const [toastKey, setToastKey] = useState(0);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // const handleLoginFail = () => {
  //   setToastStatus({
  //     visible: true,
  //     type: 'error',
  //     message: 'Incorrect email or password',
  //   });

  //   setToastKey(toastKey + 1);
  // };

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (curState === 'Login') {
      newUrl += '/login';
    } else {
      newUrl += '/signup';
    }

    try {
      const response = await axios.post(newUrl, data);

      // Kiểm tra toàn bộ response
      console.log('Response:', response.data);

      if (response.data.status === 'success') {
        if (curState === 'Login') {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('loginSuccess', 'true');
          // lưu lại tên user để hiển thị ở header
          // localStorage.setItem('loggedInUsername', response.data.name);
          // console.log('username: ', response.data.name);

          // setToastStatus({
          //   visible: true,
          //   type: 'success',
          //   message: 'Login successful',
          // });
          // toast.success('Login successful', {
          //   className: 'large-font-toast',
          // });
          navigate('/');
        } else {
          // setToastStatus({ visible: true, type: 'success' });
          setCurState('Login');
          // setToastStatus({
          //   visible: true,
          //   type: 'success',
          //   message: 'Sign up successful',
          // });
        }
      } else {
        // handleLoginFail();
        toast.error('Incorrect email or password', {
          className: 'large-font-toast',
        });
      }
    } catch (error) {
      // handleLoginFail();
      toast.error('Incorrect email or password', {
        className: 'large-font-toast',
      });
    }
  };

  useEffect(() => {
    console.log('data: ', data);
  }, [data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // function handleSubmit(e) {
  //   console.log('handleSubmit');
  //   e.preventDefault();

  //   // if (!username) return;
  //   // console.log('username', username);
  //   // dispatch(updateName(username));

  //   // const redirectTo = location.state?.from || '/';
  //   // navigate(redirectTo);
  //   // localStorage.setItem('loggedInUsername', username);
  //   navigate('/');
  // }

  return (
    <div className="w-full">
      <ToastContainer />
      <div className="flex min-h-screen w-full flex-wrap justify-center bg-[#999] bg-cover bg-no-repeat p-10">
        <div className="pt-18 w-[500px] items-center justify-center overflow-hidden rounded-xl bg-white p-32">
          <form className="w-full" onSubmit={onLogin}>
            <span className=" block pb-20 text-center text-7xl font-bold leading-5 text-[#333]">
              {curState === 'Login' ? 'Login' : 'Sign up'}
            </span>
            {curState !== 'Login' && (
              <div className="relative mb-12 w-full border-b-2 border-solid border-[#d9d9d9] pb-4">
                <span className=" font-regular pl-2 text-3xl leading-6 text-[#333]">
                  Username
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-4 block h-14 w-full border-none pl-16 pr-2 text-3xl font-medium leading-5 text-[#333] outline-none"
                  placeholder="Username"
                  value={data.name}
                  onChange={onChangeHandler}
                />
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute left-2 top-14 text-3xl text-[#a8a6a6]"
                />
              </div>
            )}

            <div className="relative mb-12 w-full border-b-2 border-solid border-[#d9d9d9] pb-4">
              <span className=" font-regular pl-2 text-3xl leading-6 text-[#333]">
                Email
              </span>
              <input
                type="text"
                name="email"
                required
                className="mt-4 block h-14 w-full border-none pl-16 pr-2 text-3xl font-medium leading-5 text-[#333] outline-none"
                placeholder="Email"
                value={data.email}
                onChange={onChangeHandler}
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-2 top-14 text-4xl text-[#a8a6a6]"
              />
            </div>

            <div className="relative mb-12 overflow-hidden border-b-2 border-solid border-[#d9d9d9] pb-4">
              <span className="font-regular pl-2 text-3xl leading-6 text-[#333]">
                Password
              </span>
              <input
                type="password"
                name="password"
                value={data.password}
                required
                className="mt-4 block h-14 w-full border-none pl-16 pr-2 text-3xl font-medium leading-5 text-[#333] outline-none"
                placeholder="Password"
                onChange={onChangeHandler}
              />
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-2 top-14 text-3xl text-[#a8a6a6]"
              />
            </div>
            {curState !== 'Login' && (
              <div className="relative mb-12 w-full border-b-2 border-solid border-[#d9d9d9] pb-4">
                <span className=" font-regular pl-2 text-3xl leading-6 text-[#333]">
                  Confirm Password
                </span>
                <input
                  type="password"
                  name="passwordConfirm"
                  value={data.passwordConfirm}
                  required
                  className="mt-4 block h-14 w-full border-none pl-16 pr-2 text-3xl font-medium leading-5 text-[#333] outline-none"
                  placeholder="Confirm Password"
                  onChange={onChangeHandler}
                />
                <FontAwesomeIcon
                  icon={faCheck}
                  className="absolute left-2 top-14 text-4xl text-[#a8a6a6]"
                />
              </div>
            )}
            <div className="pb-16 pt-4 text-right text-2xl text-[#3b5998]">
              <a href="#">Forgot password?</a>
            </div>
            <div className="mb-16 flex flex-wrap justify-center">
              <div className=" relative z-[1] mx-auto block w-full overflow-hidden rounded-[25px] shadow-md">
                <div className=" absolute -left-full top-0 -z-[1] h-full w-300 bg-primary transition-all duration-400 ease-in-out "></div>
                <button
                  type="submit"
                  className="flex h-[50px] w-full items-center justify-center border-none px-5 font-poppins-semibold text-3xl font-bold uppercase leading-5 text-[#4a4a4a] outline-none hover:bg-[#deca17]"
                >
                  {curState === 'Login' ? 'Login' : 'Sign up'}
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
                {curState === 'Login'
                  ? "Don't have an account?"
                  : 'Already have an account?'}
              </span>
              <a
                onClick={() => {
                  curState === 'Login'
                    ? setCurState('Signup')
                    : setCurState('Login');
                }}
                className="cursor-pointer text-[#3b5998] hover:underline"
              >
                {curState === 'Login' ? 'Sign up' : 'Login'}
              </a>
            </div>
          </form>
        </div>
      </div>
      {/* {toastStatus.visible && (
        <ToastMessageLogin
          key={toastKey}
          type={toastStatus.type}
          message={toastStatus.message}
        />
      )} */}

      <Footer />
    </div>
  );
}

export default Login;
