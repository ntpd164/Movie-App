import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateName } from '../features/user/userSlice';
import { useState, useRef, useEffect } from 'react';
import useOutsideAlerter from '../useOutsideAlerter';
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

  const [username, setUsername] = useState(initialUsername);
  const [mobileNumber, setMobileNumber] = useState(initialMobileNumber);
  const [email, setEmail] = useState(initialEmail);
  const [address, setAddress] = useState(initialAddress);
  const [postcode, setPostcode] = useState(initialPostcode);
  const [state, setState] = useState(initialState);
  const [area, setArea] = useState(initialArea);
  const [country, setCountry] = useState(initialCountry);

  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useOutsideAlerter(profileRef, () => navigate('/'));

  useEffect(() => {
    localStorage.setItem('loggedInUsername', username);
    localStorage.setItem('mobileNumber', mobileNumber);
    localStorage.setItem('email', email);
    localStorage.setItem('address', address);
    localStorage.setItem('postcode', postcode);
    localStorage.setItem('state', state);
    localStorage.setItem('area', area);
    localStorage.setItem('country', country);
  }, [username, mobileNumber, email, address, postcode, state, area, country]);

  function handleSaveProfile() {
    dispatch(updateName(username));
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      navigate('/');
    }, 1000);
  }

  return (
    <div>
      <div
        ref={profileRef}
        className="container mx-auto my-5 rounded bg-white "
      >
        <div className="flex flex-wrap">
          <div className="w-full border-r md:w-1/4">
            <div className="mt-[120px] flex flex-col items-center p-3 text-center">
              <img
                className=" mt-5 h-[200px] w-[300px] "
                src="../src/assets/img/other/defaultUser.png"
                alt="Avatar"
              ></img>
              <span className="mt-5 font-poppins-bold text-3xl text-[#525151]">
                Hello, {username}!
              </span>
            </div>
          </div>

          <div className="mx-4 w-full border-r md:w-5/12">
            <div className="p-3 py-5">
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
              <div className="mb-3 mt-7 flex justify-center">
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

          <div className="ml-auto mr-6 mt-4">
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
