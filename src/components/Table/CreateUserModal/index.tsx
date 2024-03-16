import { useAppDispatch } from "app/hooks";
import s from "./CreateUserModal.module.scss";
import { FC, MutableRefObject, useEffect, useState } from "react";
import { addUserToUsers } from "features/user/tableSlice";
import closeIcon from "../../../img/delete.svg"
import { v4 as uuidv4 } from 'uuid';

interface CreateUserModalProps {
    onCloseFunc: () => void
}

export const CreateUserModal: FC<CreateUserModalProps> = ({onCloseFunc}) => {
    const [nameInput, setNameInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [statusInput, setStatusInput] = useState('')
    const [roleInput, setRoleInput] = useState('')

    const [submitButton, setSubmitButton] = useState(false)
    const dispatch = useAppDispatch()
    const uid = uuidv4();
    const onSubmitClick = () => {
        if(nameInput.length !== 0 && emailInput.length !== 0 && statusInput.length !== 0 && roleInput.length !== 0) {
            setSubmitButton(true)
            const user = {
                name: nameInput,
                email: emailInput,
                status: statusInput,
                role: roleInput,
                id: uid
            }
            dispatch(addUserToUsers(user))
            onCloseFunc()
        } else {
            setSubmitButton(false)
        }
    }
    useEffect(() => {
        if(nameInput.length !== 0 && emailInput.length !== 0 && statusInput.length !== 0 && roleInput.length !== 0) {
            setSubmitButton(true)
        } else {
            setSubmitButton(false)
        }
    }, [nameInput, emailInput, statusInput, roleInput])

    return (
        <div className={s.modal} onClick={onCloseFunc}>
            <div className={s.modal__overlay}>
                <div className={s.modal__content} onClick={(e) => e.stopPropagation()}>
                    <img onClick={onCloseFunc} src={closeIcon} className={s.modal__closeIcon} />
                    <div className={s.modal__name}>
                        <p>Name: </p>
                        <input value={nameInput} onChange={(e) => {setNameInput(e.target.value)}} />
                    </div>
                    <div className={s.modal__email}>
                        <p>Email: </p>
                        <input value={emailInput} onChange={(e) => {setEmailInput(e.target.value)}} />
                    </div>
                    <div className={s.modal__status}>
                        <p>Status: </p>
                        <input value={statusInput} onChange={(e) => {setStatusInput(e.target.value)}} />
                    </div>
                    <div className={s.modal__role}>
                        <p>Role: </p>
                        <input value={roleInput} onChange={(e) => {setRoleInput(e.target.value)}} />
                    </div>
                    <div onClick={onSubmitClick} className={`${!submitButton ? s.modal__submit__hide : ''} ${s.modal__submit}`}>
                        <button className={s.modal__submit__button}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}