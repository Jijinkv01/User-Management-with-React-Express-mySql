import React from 'react'
import HomepageNavbar from '../../components/user/HomepageNavbar'
// import EditProfile from '../../components/user/EditProfile'
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext.jsx';

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <HomepageNavbar />
      <div className="flex justify-center items-center px-4 py-10 sm:py-16 md:py-20">
    <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-700">
      Welcome {user?.user.username}!
    </h1>
  </div>
      {/* <EditProfile /> */}
        
    </div>
  )
}

export default Home