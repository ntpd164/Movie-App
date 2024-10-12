import { useState, useEffect } from 'react';

export default function Test() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/test')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return <h1>{message}</h1>;
}
