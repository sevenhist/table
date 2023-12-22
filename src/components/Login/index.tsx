import { LoginForm } from "components/Login/LoginForm/LoginForm";
import "./Login.scss";
import { ShowEmail } from "components/Login/LoginForm/ShowEmail";
export const Login = () => {
    return (
        <div>
            <LoginForm />
            <ShowEmail />
        </div>
    )
}