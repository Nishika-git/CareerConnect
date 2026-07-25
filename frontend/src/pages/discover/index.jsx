import react, { useEffect } from "react";
import UserLayout from "@/layout/UserLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import { getAllUsers } from "@/config/redux/action/authAction";
import { useDispatch , useSelector} from "react-redux";

export default function Discoverpage(){
    const authState = useSelector((state) => state.auth)
    const dispatch = useDispatch()


    useEffect(() =>{
        if(!authState.all_profiles_fetched){
            dispatch(getAllUsers())
        }
    })

    return(
        <UserLayout>
           
           <DashboardLayout>
            <div>
                <h1>Discover</h1>
            </div>
           </DashboardLayout>
       
        </UserLayout>
    )
}