import { useAppSelector } from "app/hooks"
import { selectUser } from "features/user/userSlice"


export const ShowEmail = () => {
    const user = useAppSelector(selectUser)
    return (
        <div>
            {user && (
            <div>
                User Email is <p>{user.email}</p>
                User id is <p>{user.id}</p>
                User isActivated is <p>{user.isActivated}</p>
            </div>
            )}
        </div>
    )
}