import { useAppSelector } from "app/hooks"
import { selectAuth, selectUser } from "features/user/userSlice"


export const ShowRegistration = () => {
    const user = useAppSelector(selectUser)
    const isAuth = useAppSelector(selectAuth)
    return (
        <div>
            <h1>{user?.isActivated ? `Аккаунт потвержден по почте` : 'Потвдердите аккаунт'}</h1>
            {isAuth ?
            <div>
                <h1>Пользователь авторизован</h1>
                {user && (
                    <div>
                        User Registration Email is <p>{user.email}</p>
                        User Registration id is <p>{user.id}</p>
                        User Registration isActivated is <p>{user.isActivated}</p>
                    </div>
                )}
            </div>
            : 
            <div>
                <h1>Авторизуйтесь!</h1>
            </div>
            }
        </div>
    )
}