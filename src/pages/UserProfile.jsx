import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateName } from '../features/user/userSlice';
import { useState, useRef } from 'react';
import useOutsideAlerter from '../hooks/useOutsideAlerter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function UserProfile() {
  const initialUsername = localStorage.getItem('loggedInUsername') || '';
  const initialMobileNumber = localStorage.getItem('mobileNumber') || '';
  const initialEmail = localStorage.getItem('email') || '';
  const initialAddress = localStorage.getItem('address') || '';
  const initialPostcode = localStorage.getItem('postcode') || '';
  const initialState = localStorage.getItem('state') || '';
  const initialArea = localStorage.getItem('area') || '';
  const initialCountry = localStorage.getItem('country') || '';
  const initialAvatar =
    localStorage.getItem('avatar') || '../src/assets/img/other/defaultUser.png';

  const [username, setUsername] = useState(initialUsername);
  const [mobileNumber, setMobileNumber] = useState(initialMobileNumber);
  const [email, setEmail] = useState(initialEmail);
  const [address, setAddress] = useState(initialAddress);
  const [postcode, setPostcode] = useState(initialPostcode);
  const [state, setState] = useState(initialState);
  const [area, setArea] = useState(initialArea);
  const [country, setCountry] = useState(initialCountry);
  const [avatar, setAvatar] = useState(initialAvatar);

  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useOutsideAlerter(profileRef, () => navigate('/'));

  function handleSaveProfile() {
    localStorage.setItem('loggedInUsername', username);
    localStorage.setItem('mobileNumber', mobileNumber);
    localStorage.setItem('email', email);
    localStorage.setItem('address', address);
    localStorage.setItem('postcode', postcode);
    localStorage.setItem('state', state);
    localStorage.setItem('area', area);
    localStorage.setItem('country', country);
    localStorage.setItem('avatar', avatar);

    dispatch(updateName(username));
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      navigate('/');
    }, 1000);
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div>
      <div
        ref={profileRef}
        className="min-h-screen w-full rounded bg-white md:mx-auto md:my-5 md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]"
      >
        <div className="relative flex w-full flex-wrap">
          <div className="w-full border-r md:w-1/4">
            <div className="mt-20 flex flex-col items-center p-3 text-center md:mt-[120px]">
              <img
                className="mt-5 h-32 w-32 rounded-full object-cover sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-72 lg:w-72"
                src={avatar}
                alt="Avatar"
              ></img>
              <label className="mt-3 cursor-pointer font-poppins-medium text-2xl font-medium text-blue-500">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                Change Avatar
              </label>
              <span className="mt-5 font-poppins-bold text-3xl text-[#525151]">
                Hello, {username}!
              </span>
            </div>
          </div>

          <div className="w-full border-r md:mx-4 md:w-5/12">
            <div className="p-3">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="my-8 ml-2 text-right font-poppins-semibold text-4xl text-[#333] ">
                  Profile Settings
                </h4>
              </div>
              <div className="mt-2 flex flex-wrap">
                <div className="w-full px-2">
                  <label className="block text-xl font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    className="mt-3 block w-full rounded-md border border-solid border-[#d0cccc] p-3 text-2xl text-[#333] text-[#333] shadow-sm"
                    placeholder={username}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap">
                <div className="w-full px-2">
                  <label className="block text-xl font-medium text-gray-700">
                    Mobile Number
                  </label>
                  <input
                    type="number"
                    className="mt-3 block w-full rounded-md border border-solid border-[#d0cccc] p-3 text-2xl text-[#333] shadow-sm"
                    placeholder="enter mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap">
                <div className="w-full px-2">
                  <label className="block text-xl font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="text"
                    className="mt-3 block w-full rounded-md border border-solid border-[#d0cccc] p-3 text-2xl text-[#333] shadow-sm"
                    placeholder="enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap">
                <div className="w-full px-2">
                  <label className="block text-xl font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    className="mt-3 block w-full rounded-md border border-solid border-[#d0cccc] p-3 text-2xl text-[#333] shadow-sm"
                    placeholder="enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap">
                <div className="w-full px-2">
                  <label className="block text-xl font-medium text-gray-700">
                    Postcode
                  </label>
                  <input
                    type="text"
                    className="mt-3 block w-full rounded-md border border-solid border-[#d0cccc] p-3 text-2xl text-[#333] shadow-sm"
                    placeholder="enter postcode"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap">
                <div className="w-full px-2">
                  <label className="block text-xl font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    className="mt-3 block w-full rounded-md border border-solid border-[#d0cccc] p-3 text-2xl text-[#333] shadow-sm"
                    placeholder="enter state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap">
                <div className="w-full px-2">
                  <label className="block text-xl font-medium text-gray-700">
                    Area
                  </label>
                  <input
                    type="text"
                    className="mt-3 block w-full rounded-md border border-solid border-[#d0cccc] p-3 text-2xl text-[#333] shadow-sm"
                    placeholder="enter area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap">
                <div className="w-full px-2">
                  <label className="block text-xl font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    className="mt-3 block w-full rounded-md border border-solid border-[#d0cccc] p-3 text-2xl text-[#333] shadow-sm"
                    placeholder="enter country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="mb-6 mt-7 flex justify-center">
                <button
                  className="btn btn-primary profile-button rounded bg-blue-500 px-4 py-2 text-2xl text-white"
                  type="button"
                  onClick={handleSaveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>

          <div className="absolute right-4 top-4">
            <button
              className="text-5xl text-red-dark"
              onClick={() => navigate('/')}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          </div>
        </div>
        {showPopup && (
          <div className=" fixed left-1/2 top-0 m-4 -translate-x-1/2 transform rounded-lg bg-green-500 p-4 shadow-lg transition-transform duration-500 ease-out">
            <p className="text-2xl font-medium">Saved profile successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
}
