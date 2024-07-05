import {
  faTiktok,
  faInstagram,
  faXTwitter,
  faYoutube,
  faSquareFacebook,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
  return (
    <footer className="mt-20">
      <button className="mx-auto flex rounded-lg bg-primary px-10 py-3 font-poppins-semibold text-2xl font-semibold text-black hover:bg-[#deca17]">
        Sign in for more access
      </button>
      <div className="mb-10 mt-10 flex items-center justify-center gap-x-8 font-poppins-bold font-semibold">
        <div className="rounded-xl border border-zinc-600 px-24 py-4 text-3xl">
          <h2 className="flex items-center justify-center">
            Follow us on social
          </h2>
          <div className=" my-4">
            <a className="mr-2 cursor-pointer rounded-full px-5 py-4 hover:bg-[#333333]">
              <FontAwesomeIcon icon={faTiktok} />
            </a>
            <a className="mr-2 cursor-pointer rounded-full px-5 py-4 hover:bg-[#333333]">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a className="mr-2 cursor-pointer rounded-full px-5 py-4 hover:bg-[#333333]">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <a className="mr-2 cursor-pointer rounded-full px-4 py-4 hover:bg-[#333333]">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a className="cursor-pointer rounded-full px-5 py-4 hover:bg-[#333333]">
              <FontAwesomeIcon icon={faSquareFacebook} />
            </a>
          </div>
        </div>
        <div className="flex rounded-xl border border-zinc-600 px-8 py-5 text-3xl">
          <div className="mr-[100px]">
            <h2 className="mb-1 mt-2">Get app</h2>
            <p className="font-poppins-regular text-2xl font-thin text-[#a5a5a5]">
              For Android and iOS
            </p>
          </div>
          <img
            src="../src/assets/img/other/appQR.png"
            alt="QR code for app download"
            className="h-24 w-24 rounded-md"
          />
        </div>
      </div>
      <div className="text-3xl">
        <div className="mb-8 flex items-center justify-center">
          <a className="mr-20 cursor-pointer font-poppins-semibold font-medium text-white hover:underline">
            Help
          </a>
          <a className="mr-20 cursor-pointer font-poppins-semibold font-medium text-white hover:underline">
            Site Index
          </a>
          <a className="mr-20 cursor-pointer font-poppins-semibold font-medium text-white hover:underline">
            Box Office Mojo
          </a>
          <a className="cursor-pointer font-poppins-semibold font-medium text-white hover:underline">
            License IMDb Data
          </a>
        </div>
        <div className="mb-10 flex items-center justify-center">
          <a className="mr-20 cursor-pointer font-poppins-semibold font-medium text-white hover:underline">
            Press Room
          </a>
          <a className="mr-20 cursor-pointer font-poppins-semibold font-medium text-white hover:underline">
            Advertising
          </a>
          <a className="mr-20 cursor-pointer font-poppins-semibold font-medium text-white hover:underline">
            Jobs
          </a>
          <a className="mr-20 cursor-pointer font-poppins-semibold font-medium text-white hover:underline">
            Conditions of Use
          </a>
          <a className="cursor-pointer font-poppins-semibold font-medium text-white hover:underline">
            Privacy Policy
          </a>
        </div>
        <div className="mb-10 flex items-center justify-center">
          <div className="relative">
            <span className="mr-[72px]">an</span>
            <img
              src="../src/assets/img/other/amazon.png"
              alt="Amazon logo"
              className="w-30 absolute left-6 top-0 mx-4 h-[35px] text-white"
            />
            <span className="">company</span>
          </div>
        </div>
        <div className="mb-10 flex items-center justify-center">
          © 1990-2024 by IMDb.com, Inc.
        </div>
      </div>
    </footer>
  );
}
