import DashboardLayout from "@/layout/DashboardLayout";
import UserLayout from "@/layout/UserLayout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import clientServer from "@/config";
import { BASE_URL } from "@/config";
import { getAboutUser } from "@/config/redux/action/authAction";
import { getAllPosts } from "@/config/redux/action/postAction";

export default function ProfilePage() {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth)
    const postReducer = useSelector((state) => state.posts)
    const [userProfile, setUserProfile] = useState({})
    const [userPosts, setUserPosts] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpens, setIsModalOpens] = useState(false);
    const [inputData, setInputData] = useState({ company: '', position: '', years: '' })
    const [educationData, setEducationData] = useState({ school: '', degree: '', fieldOfStudy: '' })

    useEffect(() => {
        dispatch(getAboutUser({ token: localStorage.getItem("token") }))
        dispatch(getAllPosts())
    }, [])

    useEffect(() => {
        if (authState.user != undefined) {
            setUserProfile(authState.user)
            let post = postReducer.posts.filter((post) => {
                return post.userId.username === authState.user.userId.username
            })
            setUserPosts(post);
        }
    }, [authState.user, postReducer.posts])

    const updateProfilePicture = async (file) => {
        const formData = new FormData();
        formData.append("profile_picture", file);
        formData.append("token", localStorage.getItem("token"));
        const response = await clientServer.post("/update_profile_picture", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        dispatch(getAboutUser({ token: localStorage.getItem("token") }))
    }


    const updateProfileData = async () => {
        const request = await clientServer.post("/user_update", {
            token: localStorage.getItem("token"),
            name: userProfile.userId.name
        });

        const response = await clientServer.post("/update_profile_data", {
            token: localStorage.getItem("token"),
            bio: userProfile.bio,
            currentPost: userProfile.currentPost,
            pastWork: userProfile.pastWork,
            education: userProfile.education
        });
        dispatch(getAboutUser({ token: localStorage.getItem("token"), }));
    }


    const handleWorkInputChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    }

    const handleEducationInputChange = (e) => {
        const { name, value } = e.target;
        setEducationData({ ...educationData, [name]: value });
    }

    return (
        <UserLayout>
            <DashboardLayout>
                {authState.user && userProfile.userId &&
                    <div className={styles.container}>
                        <div className={styles.backDropContainer}>
                            <label htmlFor='profilePictureUpload' className={styles.backDrop_overlay}>
                                <p>Edit</p>
                            </label>
                            <input onChange={(e) => {
                                updateProfilePicture(e.target.files[0])
                            }} hidden type='file' id='profilePictureUpload' />
                            <img src={`${BASE_URL}/${userProfile.userId.profilePicture}`} alt="backdrop" />
                        </div>
                        <div className={styles.profileContainer_details}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column", gap: "0.7rem"
                            }}>
                                <div style={{ display: "flex", flexDirection: "column", width: "fit-content" }}>
                                    <input className={styles.nameEdit} type="text" value={userProfile.userId.name} onChange={(e) => {
                                        setUserProfile({ ...userProfile, userId: { ...userProfile.userId, name: e.target.value } })
                                    }} />
                                    <p>@{userProfile.userId.username}</p> &nbsp;
                                    <div>
                                        <textarea value={userProfile.bio} onChange={(e) => {
                                            setUserProfile({ ...userProfile, bio: e.target.value });
                                        }}
                                            rows={Math.max(3, Math.ceil(userProfile.bio.length / 80))}
                                            style={{ width: "100%" }}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div>
                                <h2>Activity</h2>
                                <br />
                                <button style={{ paddingInline: "0.8rem", paddingBlock: "0.3rem", background: "transparent", borderRadius: "50px" }}>Posts</button>
                                <br />
                                <br />
                                {userPosts.map((post) => {
                                    return (
                                        <div key={post._id} className={styles.postCard}>
                                            <div className={styles.card}>
                                                <div className={styles.card_profileContainer}>
                                                    <div>
                                                        <p style={{ whiteSpace: "pre-wrap" }}>{post.body}</p>

                                                        {post.media !== "" ? <img className={styles.postImage} src={`${BASE_URL}/${post.media}`} alt="post" /> : <div style={{ width: "3.4rem", height: "3.4rem" }}> </div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={styles.workHistory}>
                            <h4>Work History</h4>
                            <div className={styles.workHistoryContainer}>
                                {
                                    userProfile.pastWork.map((work, index) => {
                                        return (
                                            <div key={index} className={styles.workHistoryCard}>
                                                <p style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.8rem" }} > {work.company} - {work.position}</p>
                                                <p>{work.years}</p>
                                            </div>
                                        )
                                    })
                                }
                                <button className={styles.addWorkButton} onClick={() => {
                                    setIsModalOpen(true)
                                }}>Add Work</button>
                            </div>
                        </div>

                        <div className={styles.education}>
                            <h4>Educational qualifications</h4>
                            <div className={styles.educationContainer}>
                                {
                                    userProfile.education.map((education, index) => {
                                        return (
                                            <div key={index} className={styles.educationCard}>
                                                <p style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.8rem" }} > {education.school} - {education.degree}</p>
                                                <p>{education.fieldOfStudy}</p>
                                            </div>
                                        )
                                    })
                                }
                                <button className={styles.addEducation} onClick={() => {
                                    setIsModalOpens(true)
                                }}>Add Educational Qualifications</button>
                            </div>
                        </div>

                        {
                            userProfile != authState.user &&
                            <div onClick={() => {
                                updateProfileData();
                            }} className={styles.updateProfileBtn}> Update Profile</div>
                        }
                    </div>
                }
                {
                    isModalOpen &&
                    <div onClick={() => {
                        setIsModalOpen(false)
                    }}
                        className={styles.commentsContainer}>
                        <div onClick={(e) => {
                            e.stopPropagation()
                        }}
                            className={styles.allCommentsContainer}>
                            <input onChange={handleWorkInputChange} name='company' className={styles.inputField} type="text" placeholder="Company name" />
                            <input onChange={handleWorkInputChange} name='position' className={styles.inputField} type="text" placeholder="Position" />
                            <input onChange={handleWorkInputChange} name='years' className={styles.inputField} type="number" placeholder="Years of experience" />

                            <div onClick={() => {
                                setUserProfile({ ...userProfile, pastWork: [...userProfile.pastWork, inputData] })
                                setIsModalOpen(false)
                            }} className={styles.updateProfileBtn}>Add Work</div>

                        </div>
                    </div>
                }

                {
                    isModalOpens &&
                    <div onClick={() => {
                        setIsModalOpens(false)
                    }}
                        className={styles.commentsContainer}>
                        <div onClick={(e) => {
                            e.stopPropagation()
                        }}
                            className={styles.allCommentsContainer}>
                            <input onChange={handleEducationInputChange} name='school' className={styles.inputField} type="text" placeholder="School name" />
                            <input onChange={handleEducationInputChange} name='degree' className={styles.inputField} type="text" placeholder="Degree" />
                            <input onChange={handleEducationInputChange} name='fieldOfStudy' className={styles.inputField} type="text" placeholder="Field of Study" />

                            <div onClick={() => {
                                setUserProfile({ ...userProfile, education: [...userProfile.education, educationData] })
                                setIsModalOpens(false)
                            }} className={styles.updateProfileBtn}>Add Educational Qualifications</div>

                        </div>
                    </div>
                }
            </DashboardLayout>
        </UserLayout>
    )
}


