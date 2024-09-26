"use client"

import Input from "@components/segments/Input"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@components/segments/Header"

const PROGRAM_DETAILS = {
  program: '',
  memberId: '',
}

const ProgramsAdd = () => {
  const [isSaving, setIsSaving] = useState(false)
  const [programDetails, setProgramDetails] = useState(PROGRAM_DETAILS)

  const { data: session } = useSession();
  const router = useRouter();
  
  const saveProgram = async (e) => {
    e.preventDefault() // Prevent browsers default behavior for button submit.
    setIsSaving(true)
    
    try {
      const response = await fetch('/api/user/programs/add', {
        method: 'POST',
        body: JSON.stringify({
          userId: session.user.id,
          program: programDetails.program,
          memberId: programDetails.memberId,
        }),
      });

      console.log('response: ', response)

      if (response.ok) {
        router.push('/profile/programs')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="w-full">
      <Header 
        title="Reward Programs" 
        subtitle="Add a new reward program." 
        showNav 
        navLeft="<" 
        navLeftLink="/profile/programs"
      />
        <form className="w-full mt-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            <Input
              id='program'
              label='Reward Program'
              type='text'
              placeholder='(e.g. Hilton Honors)'
              onChange={(e) => setProgramDetails({...programDetails, program: e.target.value})}
              full
            />
            <Input
              id='memberId'
              label='Membership Id'
              type='text'
              placeholder='Program number or Id'
              onChange={(e) => setProgramDetails({...programDetails, memberId: e.target.value})}
              full
            />
          </div>
        </form>
        <div className="flex justify-end">
          <button 
            type='submit'
            className="black_btn"
            onClick={(e) => saveProgram(e)}
          >
            Save
          </button>  
        </div>
        
    </section>
  )
}

export default ProgramsAdd