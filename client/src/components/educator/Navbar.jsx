import React from 'react'
import { assets } from '../../assets/assets';
import { UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user } = useUser();

  return (
    <div className="
      flex items-center justify-between 
      px-4 md:px-10 py-3
      bg-slate-900/70 border-b border-slate-800/60
      backdrop-blur-xl
      text-slate-100
    ">
      <Link to="/">
        <img
          src={assets.academix_logo}
          alt="logo"
          className="w-28 lg:w-32 h-12 object-contain cursor-pointer"
        />
      </Link>

      <div className="flex items-center gap-4 text-slate-200">
        <p className="text-sm md:text-base">
          Hi!{" "}
          <span className="font-semibold text-cyan-400">
            {user ? user.fullName : "Developer"}
          </span>
        </p>

        {user ? (
          <UserButton />
        ) : (
          <img
            className="w-9 h-9 rounded-full border border-slate-600 object-cover"
            src={assets.profile_img}
            alt="profile"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
