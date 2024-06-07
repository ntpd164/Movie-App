import { useState } from 'react';

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative w-3xl  max-w-3xl overflow-y-auto bg-background-500">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '-' : '+'}
      </button>

      {isOpen && children}
    </div>
  );
}

export default Box;
