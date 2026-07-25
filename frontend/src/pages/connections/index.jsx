import react from "react";
import UserLayout from "@/layout/UserLayout";
import DashboardLayout from "@/layout/DashboardLayout";

export default function Connections(){
    return(
        <UserLayout>
           
           <DashboardLayout>
            <div>
                <h1>Connections</h1>
            </div>
           </DashboardLayout>
       
        </UserLayout>
    )
}