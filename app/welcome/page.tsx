import React from 'react'

const page = () => {
  return (
    <section className='bg-green-200'>
        <div className='flex flex-col justify-center items-center h-screen mx-auto space-y-2 w-full'>
            <h1 className='text-2xl'>
                Welcome, User
            </h1>
            <p className='text-xs'>You made it..</p>
        </div>
    </section>
  )
}

export default page