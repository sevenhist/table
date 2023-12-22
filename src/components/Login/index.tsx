import { LoginForm } from "components/Login/LoginForm/LoginForm";
import { Container } from "components/UI/Container";
import "./Login.scss";

export const Login = () => {
    return (
        <div>
            <Container>
                <LoginForm />
            </Container>
        </div>
    )
}