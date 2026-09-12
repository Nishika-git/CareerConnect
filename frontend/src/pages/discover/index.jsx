import react, { useEffect } from "react";
import UserLayout from "@/layout/UserLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import { getAllPosts } from "@/config/redux/action/postAction";
import { getAllUsers } from "@/config/redux/action/authAction";
import styles from "./index.module.css";
import { BASE_URL } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Discoverpage() {
    const authState = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const router = useRouter();

    useEffect(() => {
        if (!authState.all_profiles_fetched) {
            dispatch(getAllUsers())
        }
    }, [authState.all_profiles_fetched, dispatch])

    return (
        <UserLayout>

            <DashboardLayout>
                <div>
                    <h1>Discover</h1>
                    <div className={styles.allUserProfile}>
                        {authState.all_profiles_fetched && authState.all_users.map((user)=>{
                            if (!user.userId) return null;
                            return(
                                <div onClick={()=>{
                                    router.push(`/view_profile/${user.userId.username}`)
                                }} key={user._id} className={styles.userCard}>
                                    <img className={styles.userCard_image} src={`${BASE_URL}/${user.userId.profilePicture}`} alt="profile" />

                                    <div>
                                    <h2>{user.userId.name}</h2>
                                    <p>@{user.userId.username}</p>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </DashboardLayout>

        </UserLayout>
    )
}