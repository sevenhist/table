import { useAppDispatch } from "app/hooks"
import { fetchLogin, fetchRegistration } from "features/user/userSlice";
import s from './RegistrationForm.module.scss'
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
    Last_name: string
}
export const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        mode: 'all'
    })
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const email = data.Email;
        const password = data.Password;
        const first_name = data.Name;
        const last_name = data.Last_name;
        dispatch(fetchRegistration({ email, password, first_name, last_name }))
            .then(() => { navigate('/cabinet') })
    }
    const fields: Array<Field> = [
        {
            register: register,
            name: 'Name',
            required: "Поле обов'язкове до заповнення!",
            errors: errors,
            title: "Ім'я",
            type: 'text'
        },
        {
            register: register,
            name: 'Last_name',
            required: "Поле обов'язкове до заповнення!",
            errors: errors,
            title: "Прізвище",
            type: 'text'
        },
        {
            register: register,
            name: 'Email',
            required: "Поле обов'язкове до заповнення!",
            patternValue: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
            message: 'Будь ласка введіть дійсну адресу електронної пошти!',
            errors: errors,
            title: 'Емейл',
            type: 'text'
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
        {
            register: register,
            name: 'Confirm_password',
            required: "Поле обов'язкове до заповнення!",
            patternValue: /[0-9a-zA-Z!@#$%^&*]{8,}/g,
            message: 'Невірно вказаний пароль!',
            errors: errors,
            title: 'Підтвердити пароль',
            type: 'password',
            validation: "Password",
            watch: watch,
        },
    ];

    return (
        <div className={s.login}>
            <div className={`${s.login__container} ${s.login__container_lAnim}`}>
                <form onSubmit={handleSubmit(onSubmit)} className={s.login__form}>
                    <Logo className={s.login__logo} withText={false} />
                    <h1 className={s.login__title}>Реєстрація</h1>
                    <p className={s.login__subtitle}>Створіть обліковий запис та отримайте доступ до особистого кабінету.</p>
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
                                    watch={field.watch}
                                    validation={field.validation}
                                />
                            ))}
                            </div>
                        </div>
                    <div className={s.login__button}>
                        <Button type="submit">Регістрація</Button>
                    </div>
                    <p className={s.login__redirect}>
                        Вже маєте обліковий запис?
                        <Link className={s.login__container_rAnim} to={ROUTES.AUTH.login}>Увійти!</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}