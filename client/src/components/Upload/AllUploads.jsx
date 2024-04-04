import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import { useAuth } from "../../store/auth";

function AllUploads() {
    const {user} = useAuth()
    
  return (
    <>
    {user &&
     <div className="container flex flex-col justify-center">
     <div className="flex justify-center">
     <Toast>
     <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
       <HiCheck className="h-5 w-5" />
     </div>
     <div className="ml-3 text-sm font-normal">Login Successfull</div>
     <Toast.Toggle />
   </Toast>
     </div>
 
    
    
     <div className="w-full text-center md:w-1/3 mx-auto bg-white p-14">
     Your Latest Uploads will Appear Here
</div>
<div className="flex justify-end bottom-10 left-10 absolute">
<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
  Log Out
</button>
</div>

  </div>

    }
    
    </>
  
  )
}

export default AllUploads