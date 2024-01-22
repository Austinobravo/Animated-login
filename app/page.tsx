"use client"
import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  username: z.string().min(6,"This field must have 6 characters"),
  password: z.string().min(6,"This field must have 6 characters")
})

const page = () => {
    const {register, formState:{errors, isValid, isLoading},getValues} = useForm({
        mode: "all",
        resolver: zodResolver(schema)
    })
    const router = useRouter()
    const [hover, setHover] = React.useState(false)
    const [showDetails, setShowDetails] = React.useState(false)
    const [formData, setFormData] = React.useState({
        username: "",
        password: ""
    })

    const onChange = async (e:any) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})

    }

    const onSubmit = (e:any) => {
        e.preventDefault()
        if (formData.username === "username" && formData.password === "password"){
            router.push("/welcome")
        }else{
            setShowDetails(true)

        }
    }
  return (
    <section className='flex flex-col justify-center items-center mx-auto   h-screen'>
        <div className=''>
            <div className='bg-blue-700 py-3 px-40  font-bold rounded-t-md  shadow-lg text-white'>
                <h1>Login Page</h1>
            </div>
            <form className='bg-white shadow-md  border-2 rounded-b-md py-7 px-6 space-y-4' onSubmit={onSubmit}>
                <div className='flex flex-col space-y-2 ' >
                    <label htmlFor='username' className='text-sm font-bold'>Username</label>
                    {showDetails &&
                        <span className='bg-green-400 py-1 px-4 text-white text-xs rounded-md'>Username : username</span>
                    }
                    <input {...register("username")} type='text' onChange={onChange}  name='username' id='username' placeholder='Your username' className='border-2 px-2 py-2 rounded-md '/>
                    <span className="text-red-500">
                        <ErrorMessage name="username" errors={errors}/>
                    </span>
                </div>
                <div className='flex flex-col space-y-2 '>
                    <label htmlFor='password' className='text-sm font-bold'>Password</label>
                    {showDetails && 
                        <span className='bg-green-400 py-1 px-4 text-white text-xs rounded-md'>Password : password</span>
                    }
                    <input {...register("password")} type='password' onChange={onChange} name='password' id='password' placeholder='Your password' className='border-2 px-2 py-2 rounded-md '/>
                    <span className="text-red-500">
                        <ErrorMessage name="password" errors={errors}/>
                    </span>
                </div>
                <div className='mx-auto w-fit' >
                    {/* <button type='submit' onMouseEnter={()=>setHover(!isValid)} className={`bg-blue-700 mx-auto rounded-md py-2 px-6 text-white text-center w-fit`} style={{transform: `translateX(${hover  ? 0 : "130px"})`, transition: "transform .5s linear"}}>Sign in</button> */}
                    {!isValid ?
                        <button type='submit' onMouseEnter={()=>setHover(!hover)} className={`bg-blue-700 mx-auto rounded-md py-2 px-6 text-white text-center w-fit`} style={{transform: `translateX(${!hover ? 0 : "130px"})`, transition: "transform .5s linear"}}>Sign in</button>
                        : 
                        <button type='submit'  className={`bg-blue-700 mx-auto rounded-md py-2 px-6 text-white text-center w-fit`} >{isLoading ? "Signing In" : "Sign in"}</button>
                    }
                </div>

            </form>
        </div>
    </section>
  )
}

export default page