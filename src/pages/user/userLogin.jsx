import React, { useEffect, useState } from 'react'
import { setUserCredential } from '../../features/userAuthSlice'
import { useUserLoginMutation } from '../../features/userApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert2'



function UserLogin() {

    
    const [userLogin, {isLoading, isSuccess, error}] = useUserLoginMutation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userInfo = useSelector((state)=>state.userAuth.userInfo);
    // console.log(userInfo.userInfo)
    console.log("userInfo at login", userInfo)
    useEffect(()=>{
        if(userInfo){
          navigate("/")  
           
        }
    },[userInfo])




    const handleSignIn =async(e)=>{
        e.preventDefault()
        console.log(email, password)
        try {

        const res = await userLogin({email, password}).unwrap();
        
        console.log(res.userData)
        dispatch(setUserCredential({...res.userData}))
        navigate("/")
        
        
        
        }catch(error){
         

             swal.fire({
                icon:"error",
                title: "oops",
                text:error?.message || error.data.message || "unexpected Error"
            })
        }
        
    }


  return (
    <div>
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
        </h2>
        <Link to={"/user/register"} className="mt-2 text-center text-sm text-gray-600 max-w">Create Account
            
            {/* <Link to="#" className="font-medium text-blue-600 hover:text-blue-500"
            
            >
                User Login
            </Link> */}
        </Link>
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">



                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <div className="mt-1">
                        <input id="email" 
                        name="email"
                         type="email"
                         autoComplete="email"
                         value={email}
                         onChange={((e)=> setEmail(e.target.value))}
                           required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Enter your email address"/>
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="mt-1">
                        <input id="password"
                         name="password" type="password" 
                         autoComplete="current-password"
                         value={password}
                         onChange={((e)=> setPassword(e.target.value))}
                          required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Enter your password"/>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember_me" name="remember_me" type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                        <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>

                    <div className="text-sm">
                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <div>
                    <button type="submit"
                        className="group relative w-full flex 
                        justify-center py-2 px-4 border 
                        border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                        focus:outline-none focus:ring-2 focus:ring-offset-2
                         focus:ring-indigo-500"
                         onClick={handleSignIn}>
                        
                        Sign in
                    </button>
                </div>
            </form>


{/* optionall REndering using Props */}
            
            <div className="mt-6">

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-100 text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                    <div>
                        <a href="#"
                            className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            <img className="h-5 w-5" src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                                alt=""/>
                        </a>
                    </div>
                    <div>
                        <a href="#"
                            className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            <img className="h-5 w-5" src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                                alt=""/>
                        </a>
                    </div>
                    <div>
                        <a href="#"
                            className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            <img className="h-6 w-6" src="https://www.svgrepo.com/show/506498/google.svg"
                                alt=""/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
      
    </div>
  )
}

export default UserLogin
