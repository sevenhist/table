import { FC, useState } from "react"
import s from "./EditUserModal.module.scss"
import { User, updateUserToUsers } from "features/user/tableSlice"
import closeIcon from "../../../img/delete.svg"
import { useAppDispatch } from "app/hooks"

interface EditUserModalProps {
    onCloseFunc: () => void,
    user: User
}

export const EditUserModal: FC<EditUserModalProps> = ({ onCloseFunc, user }) => {
    const [nameInput, setNameInput] = useState(user.name)
    const [emailInput, setEmailInput] = useState(user.email)
    const [statusInput, setStatusInput] = useState(user.status)
    const [roleInput, setRoleInput] = useState(user.role)

    const [saveButton, setSaveButton] = useState(false)
    const dispatch = useAppDispatch()
    const onSaveClick = () => {
            setSaveButton(true)
            const newUser = {
                name: nameInput,
                email: emailInput,
                status: statusInput,
                role: roleInput,
                id: user.id
            }
            dispatch(updateUserToUsers(newUser))
            onCloseFunc()
    }
    return (
        <div className={s.modal} onClick={onCloseFunc}>
            <div className={s.modal__overlay}>
                <div className={s.modal__content} onClick={(e) => e.stopPropagation()}>
                    <img onClick={onCloseFunc} src={closeIcon} className={s.modal__closeIcon} />
                    <div className={s.modal__name}>
                        <p>Name: </p>
                        <input value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
                    </div>
                    <div className={s.modal__email}>
                        <p>Email: </p>
                        <input value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                    </div>
                    <div className={s.modal__status}>
                        <p>Status: </p>
                        <input value={statusInput} onChange={(e) => setStatusInput(e.target.value)} />
                    </div>
                    <div className={s.modal__role}>
                        <p>Role: </p>
                        <input value={roleInput} onChange={(e) => setRoleInput(e.target.value)} />
                    </div>
                    <button className={s.modal__save} onClick={onSaveClick}>Save</button>
                </div>
            </div>
        </div>
    )
}