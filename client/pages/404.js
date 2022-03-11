import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const NotFound = () => {

  //-----------------------------------
  // HOOKS & VARIABLES
  //-----------------------------------

  // Next Hooks - Router
  const router = useRouter();

  // ii) React Hooks - Effects
  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  });

  //------------------------------------------
  // JSX
  //------------------------------------------
  
  return (
    <div className="text-center my-5">
      <h1>Ooooops...</h1>
      <h2>That page cannot be found</h2>
      <p>
        Go back to the <Link href="/">Homepage</Link>
      </p>
    </div>
  );
};

export default NotFound;
