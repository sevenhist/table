import { FC, SetStateAction } from "react"
import s from "./InformationComponent.module.scss"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { fetchSetProfileInfo, selectUser } from "features/user/userSlice"
import { ROUTES } from "app/routes"
import { FieldBox } from "components/ui/Input"

export type InputsCabinet = {
    Email: string,
    First_name: string,
    Last_name: string
}

export type InputsProps = {
    setActivePasswordButton: React.Dispatch<SetStateAction<any>>
}

export const InformationComponent:FC<InputsProps> = ({setActivePasswordButton})  => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputsCabinet>({
        mode: 'all'
    })
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onSubmit = (data: InputsCabinet) => {
        console.log(JSON.stringify(data), "DAS SIND DIE DATEN");
        const email = data.Email;
        const first_name = data.First_name;
        const last_name = data.Last_name;
        console.log(first_name)
        dispatch(fetchSetProfileInfo({ email, first_name, last_name }))
            .then(() => { navigate(`${ROUTES.PRIVATE.cabinet}/${ROUTES.PRIVATE.personalInformation}`) })
        window.location.reload();
    };


    const fields = [
        {
            name: 'First_name',
            required: "Поле обов'язкове до заповнення!",
            title: 'Імʼя',
            type: 'text',
            value: user?.first_name
        },
        {
            name: 'Last_name',
            required: "Поле обов'язкове до заповнення!",
            title: 'Прізвище',
            type: 'text',
            value: user?.last_name
        },
        {
            name: 'Email',
            required: "Поле обов'язкове до заповнення!",
            patternValue: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
            message: 'Будь ласка введіть дійсну адресу електронної пошти!',
            title: 'Емейл',
            type: 'text',
            value: user?.email
        }
    ];
    return (
        <div>
            <h1 className={s.settings__title}>Персональна інформація</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={s.settings__inputs}>
                {fields.map((field) => (
                    <FieldBox
                        className={s.settings__input}
                        title={field.title}
                        register={register}
                        name={field.name}
                        required={field.required}
                        patternValue={field.patternValue}
                        message={field.message}
                        errors={errors}
                        type={field.type}
                        value={field.value}
                    />
                ))
                }
                <div className={s.settings__butons}>
                    <div className={s.settings__change}>
                        <button type="button" onClick={() => setActivePasswordButton(true)}>Змінити пароль</button>
                    </div>
                    <div className={s.settings__submit}>
                        <button className={s.settings__save} type="submit">Зберегти</button>
                    </div>
                </div>
            </form>
        </div>
    )
}