import { ROUTES } from "app/routes";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import s from './UserComponent.module.scss';
import { FieldBox } from "components/ui/Input";
import { Field, useForm } from "react-hook-form";
import { useAppSelector } from "app/hooks";
import { selectUser } from "features/user/userSlice";

export type InputsCabinet = {
    Email: string,
}

export const UserComponent: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputsCabinet>({
        mode: 'all'
    })
    const onSubmit = (data: InputsCabinet) => {
        const email = data.Email;
    }
    const user = useAppSelector(selectUser)
    const fields = [
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
        <div className={s.settings}>
            <h1 className={s.settings__title}>Персональна інформація</h1>
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
        </div>
    )
}