import { useNavigate } from 'react-router-dom';

export default function UserProfile({ username = '' }) {
  const navigate = useNavigate();

  function handleSaveProfile() {
    navigate('/');
  }

  return (
    <div className="container mx-auto my-5 rounded bg-white ">
      <div className="flex flex-wrap">
        <div className="w-full border-r md:w-1/4">
          <div className="mt-[120px] flex flex-col items-center p-3 text-center">
            <img
              className=" mt-5 h-[200px] w-[300px] "
              src="../src/assets/defaultUser.png"
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
                ></input>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap">
              <div className="w-full px-2">
                <label className="block text-xl font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="text"
                  className="mt-3 block w-full rounded-md border border-solid border-[#d0cccc] p-3 text-2xl text-[#333] shadow-sm"
                  placeholder="enter mobile number"
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

        <div></div>
      </div>
    </div>
  );
}
