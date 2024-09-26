"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Card from "@components/segments/card"
import DataUtils from "@utils/dataUtils"
import Header from "@components/segments/Header"

const Programs = () => {
  const [programs, setPrograms] = useState([])

  const { data: session } = useSession();

  const fetchPrograms = async () => {
    if (!session) return

    const email = session.user.email
    const res = await fetch(`/api/user/${email}`);
    const data = await res.json();

    setPrograms(data?.programs)
  }


  useEffect(() => {
    fetchPrograms();
  }, [session])
  
  return (
    <section className="w-full">
      <Header 
        title="Reward Programs" 
        showNav 
        navLeft="<"
        navLeftLink="/profile"
        navRight="+" 
        navRightLink="programs/add"
      />
      {programs && programs.length ? (
        <>        
          {programs?.map((program) => (
              <div key={program._id} className="mt-4">
                <Card 
                  title={program.program}
                  data1={program.memberId}
                />
              </div>
            ))
          }
        </>
      ) : 
      (
        <div>No reward programs.</div>
      )}


    </section>
    
  )
}

export default Programs