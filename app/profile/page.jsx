"use client"

import { useSession } from "next-auth/react"
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@components/segments/Header";


const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();


  return (
    <section className="w-full">
      <Header title="Your Profile" />
      <div>
        <Image
          src={session?.user.image}
          alt="Profile Image"
          width={75}
          height={75}
          className="rounded-full"
        />
      </div>
      <div className="my-10">
        <Link href="profile/user">
          <div>
            <div className="flex justify-between">
              <h2 className="journi-page-subtitle">User Details</h2>
              <span className="journi-page-subtitle">{'>'}</span>
            </div>
            <p className="ml-2 text-gray-500">Your Journi account details</p>
          </div>
        </Link>

        <hr className="mt-3 mb-4" />

        <Link href="trips">
          <div>
            <div className="flex justify-between">
              <h2 className="journi-page-subtitle">Trips</h2>
              <span className="journi-page-subtitle">{'>'}</span>
            </div>
            <p className="ml-2 text-gray-500">Manage all of your upcoming trips</p>
          </div>
        </Link>

        <hr className=" mt-3 mb-4" />

        <Link href="profile/programs">
          <div>
            <div className="flex justify-between">
              <h2 className="journi-page-subtitle">Reward Programs</h2>
              <span className="journi-page-subtitle">{'>'}</span>
            </div>
            <p className="ml-2 text-gray-500">Keep all your rewards programs in one accessible place</p>
          </div>
        </Link>
        
        <hr className="mt-3 mb-4" />
      </div>
      
    </section>
  )
}

export default Profile