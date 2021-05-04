import { useEffect, useState } from "react";
import { getUserById } from "../firebase/service";

export default function useUser(userId) {
    const [activeUser, setActiveUser] = useState('')

    useEffect(() => {
        async function getUserData(userId) {
            const user = await getUserById(userId)
            setActiveUser(user)
        }
        if(userId) {
            getUserData(userId)
        }
    }, [userId])

    return {activeUser, setActiveUser}
}