import { useState, FC } from "react";
import axios, { Axios, AxiosError } from "axios";

interface IUser {
    email: string,
    id: string,
    isActivated: boolean
}

interface IAuthResponse {
    user: IUser,
    accessToken: string
}

interface IGetUsersResponse {
    users: string[]
}

export const RegistartionForm: FC = () => {

    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");

    const [accessToken, setAccessToken] = useState<string>("");
    const [user, setUser] = useState<IUser | null>(null); // | - or
    const [users, setUsers] = useState<string[]>([]);
    const [error, setError] = useState<AxiosError<{ message: string }> | null>(null);

    const handleChangeEmail = (email: string) => setEmail(email);
    const handleChangePassword = (password: string) => setPassowrd(password);

    const handleSubmitForm = () => {
        axios
            .post<IAuthResponse>("http://localhost:5000/api/registration", { email, password })
            .then((resp) => {
                setUser(resp.data.user);
                setAccessToken(resp.data.accessToken);
                console.log(resp);
            })
            .catch((error: AxiosError<{ message: string }>) => {
                setError(error);
                console.error("Error: ", error)
            })
    };

    const handleLoginForm = () => {
        axios
            .post<IAuthResponse>("http://localhost:5000/api/login", { email, password })
            .then((resp) => {
                setUser(resp.data.user);
                setAccessToken(resp.data.accessToken);
                console.log(resp);
            })
            .catch((error: AxiosError<{ message: string }>) => {
                setError(error);
                console.error("Error: ", error)
            })
    }

    const handleGetArray = () => {
        axios
            .get<IGetUsersResponse>("http://localhost:5000/api/users")
            .then((resp) => {
                setUsers(resp.data.users);
                console.log(resp);
            })
            .catch((error: AxiosError<{ message: string }>) => {
                console.error("Error: ", error)
            })
    }



    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => handleChangeEmail(e.target.value)}
                placeholder="email"
            />
            <input
                type="text"
                value={password}
                onChange={(e) => handleChangePassword(e.target.value)}
                placeholder="password"
            />
            <button type="button" onClick={handleSubmitForm}>
                Register
            </button>
            {/* <button type="button" onClick={handleLoginForm}>
                Login
            </button>
            <button type="button" onClick={handleGetArray}>
                    GetUsers
            </button> */}
            {user &&
                <div>
                    <div>email: {user?.email}</div>
                    <div>id: {user?.id}</div>
                    <div>accesToken: {accessToken}</div>
                </div>
            }
            {users.length ?
                <div>
                    <div>Users:</div>
                    <div>
                        {users.map((user) => (
                            <p>{user}</p>
                        ))}
                    </div>
                </div> : ''
            }
            {
                error && <div>Error: {error.response?.data.message}</div>
            }
        </div>
    );
};