import Link from "next/link";
import { useSession } from "next-auth/react";

const SideNav = ({ onClose }) => {
  const { data: session } = useSession();

  return (
    <div className="fixed top-16 left-0 w-64 h-full bg-white shadow-lg z-50">
      <div className="flex flex-col items-center mt-10">
        <div className="flex">
          {session?.user ? (
            <div>
              <Link 
                href="/flights" 
                className="black_btn" 
                onClick={onClose}
              >
                Flights
              </Link>
              <Link 
                href="/hotels" 
                className="black_btn mt-3"
                onClick={onClose}
              >
                Hotels
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
