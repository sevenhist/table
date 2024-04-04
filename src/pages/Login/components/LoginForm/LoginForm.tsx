import { useAppDispatch } from "app/hooks"
import { fetchLogin } from "features/user/userSlice";
import s from './LoginForm.module.scss';
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "components/Logo";
import { Button } from "components/ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Field, FieldBox } from "components/ui/Input";
import { ROUTES } from "app/routes";

export type Inputs = {
    Email: string,
    Password: string,
    Name: string,
    LastName: string,
    ConfirmPassword: string
}
export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        mode: 'all'
    })
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const email = data.Email;
        const password = data.Password;
        dispatch(fetchLogin({ email, password }))
            .then(() => { navigate('/cabinet') })
    }
    const fields: Array<Field> = [
        {
            register: register,
            name: 'Email',
            required: "Поле обов'язкове до заповнення!",
            patternValue: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
            message: 'Будь ласка введіть дійсну адресу електронної пошти!',
            errors: errors,
            title: 'Емейл',
            type: 'text',
        },
        {
            register: register,
            name: 'Password',
            required: "Поле обов'язкове до заповнення!",
            patternValue: /[0-9a-zA-Z!@#$%^&*]{8,}/g,
            message: 'Мінімум 8 символів',
            errors: errors,
            title: 'Пароль',
            type: 'password'
        },
    ];

    return (
        <div className={s.login}>
            <div className={`${s.login__container} ${s.login__container_lAnim}`}>
                <form onSubmit={handleSubmit(onSubmit)} className={s.login__form}>
                    <Logo className={s.login__logo} withText={false} />
                    <h1 className={s.login__title}>Вхід</h1>
                    <p className={s.login__subtitle}>Авторизуйтеся, щоб отримати доступ до вашого облікового запису.</p>
                        <div className={s.login__fields}>
                            <div className={s.login__email_part}>
                            {fields.map((field) => (
                                <FieldBox
                                    title={field.title}
                                    register={field.register}
                                    name={field.name}
                                    required={field.required}
                                    patternValue={field.patternValue}
                                    message={field.message}
                                    errors={field.errors}
                                    type={field.type}
                                />
                            ))}
                            </div>
                        </div>
                    <div className={s.login__button}>
                        <Button type="submit">Увійти</Button>
                    </div>
                    <p className={s.login__redirect}>
                        Відсутній обліковий запис?
                        <Link className={s.login__container_rAnim} to={ROUTES.AUTH.registration}>Зареєструйтеся!</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}