"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { Sling as Hamburger } from "hamburger-react";
import SideNav from '@components/SideNav';

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [showSideNav, setShowSideNav] = useState(false);

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setupProviders();
  }, []);

  const toggleSideNav = () => {
    setShowSideNav((prevState) => !prevState);
  };

  const closeSideNav = () => {
    setShowSideNav(false);
  };
  

  useEffect(() => {
    closeSideNav();
  }, []);

  return (
    <nav className="flex-between w-full bg-sky-300 px-3">

      { session &&
        <div className="toggle" onClick={toggleSideNav} style={{ zIndex: 2 }}>
          <Hamburger toggled={showSideNav} rounded label="Show menu" color="#fff" size={30} />
        </div>
      }

      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo-text.png"
          alt="Journi Logo"
          width={100}
          height={50}
        />
      </Link>

      <div className="flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">

            <Link href='/profile'>
              <Image
                src={session?.user.image}
                alt="Profile"
                width={35}
                height={35}
                className="rounded-full"
              />
            </Link>

            <button type='button' onClick={signOut} className="outline_btn">
              Sign Out
            </button>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {signIn(provider.id); }}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Render SideNav conditionally */}
      {showSideNav && <SideNav onClose={closeSideNav} />}
    </nav>
  );
};

export default Nav;
