import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock, faCheck } from '@fortawesome/free-solid-svg-icons';
// import {
//   faFacebook,
//   faGithub,
//   faGoogle,
// } from '@fortawesome/free-brands-svg-icons';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { updateName } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import useLocalStorageState from '../useLocalStorageState';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [isConfirmPasswordFocus, setIsConfirmPasswordFocus] = useState(false);
  const [isUsernameFocus, setIsUsernameFocus] = useState(false);

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

  const hasEmailContent = data.email !== '';
  const hasPasswordContent = data.password !== '';
  const hasConfirmPasswordContent = data.passwordConfirm !== '';
  const hasUsernameContent = data.name !== '';

  return (
    <div className="w-full">
      <ToastContainer />
      <div className={`flex min-h-screen w-full flex-wrap justify-center bg-[#999] bg-cover bg-no-repeat ${curState === 'Login' ? 'p-64' : 'p-32'} bg-login-background`}>
        <div className="pt-18 w-[500px] items-center justify-center overflow-hidden rounded-xl bg-transparent border border-zinc-400 p-32">
          <form className="w-full" onSubmit={onLogin}>
            <span className=" block pb-20 text-center text-7xl font-bold leading-5 text-white">
              {curState === 'Login' ? 'Login' : 'Sign up'}
            </span>
            {curState !== 'Login' && (
              <div className="relative mb-12 w-full">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="block h-[50px] w-full px-6 pt-2 pb-2 border-2 border-zinc-400 bg-transparent rounded-md focus:border-[#4eeefa] outline-none text-3xl text-white peer transition-colors duration-200"
                  value={data.name}
                  autoComplete='off'
                  onChange={onChangeHandler}
                  onFocus={() => setIsUsernameFocus(true)}
                  onBlur={() => {
                    setIsUsernameFocus(false);
                  }}
                />
                <label
                  htmlFor="name"
                  className={`absolute left-8  text-3xl transition-all  duration-200 transform scale-100 origin-left cursor-text bg-[#020025] px-2 ${
                    (hasUsernameContent || isUsernameFocus) ? '-top-4 left-4 text-[#4eeefa] text-2xl scale-90' : 'top-5 text-white'
                  } ${hasUsernameContent && !isUsernameFocus ? 'text-white' : ''}`}
                >
                  Username
                </label>
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute right-6 top-6 text-4xl text-[#a8a6a6]"
                />
            </div>
            )}

            <div className="relative mb-12 w-full">
              <input
                type="text"
                name="email"
                id="email"
                required
                className="block h-[50px] w-full px-6 pt-2 pb-2 border-2 border-zinc-400 bg-transparent rounded-md focus:border-[#4eeefa] outline-none text-3xl text-white peer transition-colors duration-200"
                value={data.email}
                autoComplete="off"
                onChange={onChangeHandler}
                onFocus={() => setIsEmailFocus(true)}
                onBlur={() => {
                  setIsEmailFocus(false);
                }}
              />
              <label
                htmlFor="email"
                className={`absolute left-8  text-3xl transition-all  duration-200 transform scale-100 origin-left cursor-text bg-[#020025] px-2 ${
                  (hasEmailContent || isEmailFocus) ? '-top-4 left-4 text-[#4eeefa] text-2xl scale-90' : 'top-5 text-white'
                } ${hasEmailContent && !isEmailFocus ? 'text-white' : ''}`}
              >
                Email address
              </label>
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute right-6 top-6 text-4xl text-[#a8a6a6]"
              />
            </div>

            <div className="relative mb-12 w-full">
              <input
                type="password"
                name="password"
                id="password"
                required
                className="block h-[50px] w-full px-6 pt-2 pb-2 border-2 border-zinc-400 bg-transparent rounded-md focus:border-[#4eeefa] outline-none text-3xl text-white peer transition-colors duration-200"
                value={data.password}
                onChange={onChangeHandler}
                onFocus={() => setIsPasswordFocus(true)}
                onBlur={() => {
                  setIsPasswordFocus(false);
                }}
              />
              <label
                htmlFor="password"
                className={`absolute left-8  text-3xl transition-all  duration-200 transform scale-100 origin-left cursor-text bg-[#020025] px-2 ${
                  (hasPasswordContent || isPasswordFocus) ? '-top-4 left-4 text-[#4eeefa] text-2xl scale-90' : 'top-5 text-white'
                } ${hasPasswordContent && !isPasswordFocus ? 'text-white' : ''}`}
              >
                Password
              </label>
              <FontAwesomeIcon
                icon={faLock}
                className="absolute right-6 top-6 text-4xl text-[#a8a6a6]"
              />
            </div>
            {curState !== 'Login' && (
              <div className="relative mb-12 w-full">
                <input
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  required
                  className="block h-[50px] w-full px-6 pt-2 pb-2 border-2 border-zinc-400 bg-transparent rounded-md focus:border-[#4eeefa] outline-none text-3xl text-white peer transition-colors duration-200"
                  value={data.passwordConfirm}
                  onChange={onChangeHandler}
                  onFocus={() => setIsConfirmPasswordFocus(true)}
                  onBlur={() => {
                    setIsConfirmPasswordFocus(false);
                  }}
                />
                <label
                  htmlFor="passwordConfirm"
                  className={`absolute left-8  text-3xl transition-all  duration-200 transform scale-100 origin-left cursor-text bg-[#020025] px-2 ${
                    (hasConfirmPasswordContent || isConfirmPasswordFocus) ? '-top-4 left-4 text-[#4eeefa] text-2xl scale-90' : 'top-5 text-white'
                  } ${hasConfirmPasswordContent && !isConfirmPasswordFocus ? 'text-white' : ''}`}
                >
                  Confirm Password
                </label>
                <FontAwesomeIcon
                  icon={faCheck}
                  className="absolute right-6 top-6 text-4xl text-[#a8a6a6]"
                />
            </div>
            )}
            <div className="pb-16 pt-4 text-right text-2xl text-[#a09f9f] font-poppins-semibold font-medium hover:underline">
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
            <div className="mt-10 flex items-center justify-center text-3xl">
              <span className="mr-4 text-white">
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
                className="cursor-pointer text-[#a09f9f] hover:underline font-poppins-semibold font-medium"
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
    </div>
  );
}

export default Login;
