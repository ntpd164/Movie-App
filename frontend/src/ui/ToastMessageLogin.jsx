import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

function ToastMessageLogin({ key, type, message }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [key]);

  if (!show) return null;
  return (
    <div
      className="fixed right-20 top-20 max-w-xl rounded-xl border border-gray-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
      role="alert"
      //   tabindex="-1"
      aria-labelledby="hs-toast-success-example-label"
    >
      <div className="flex p-4">
        {type === 'success' ? (
          <div className="shrink-0">
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="mt-0.5 size-10 shrink-0 text-green-500"
            />
          </div>
        ) : (
          <div className="shrink-0">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="mt-0.5 size-10 shrink-0 text-red-dark"
            />
          </div>
        )}
        <div className="ms-3">
          <p
            id="hs-toast-success-example-label"
            className="text-3xl text-gray-700 dark:text-neutral-400"
          >
            {type === 'success' && message === 'Login successful'
              ? 'Login successful'
              : message === 'Sign up successful'
              ? 'Sign up successful'
              : type === 'error'
              ? 'Incorrect email or password'
              : 'Sign up failed'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ToastMessageLogin;
