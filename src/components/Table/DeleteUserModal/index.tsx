import { FC } from "react"
import s from "./DeleteUserModal.module.scss"
import { User, deleteUserFromUsers } from "features/user/tableSlice"
import { useAppDispatch } from "app/hooks"
import closeIcon from "../../../img/delete.svg"

interface DeleteUserModalProps {
    onCloseFunc: () => void,
    user: User
}

export const DeleteUserModal: FC<DeleteUserModalProps> = ({onCloseFunc, user}) => {
    const dispatch = useAppDispatch()
    const deleteUser = (user: User) => {
        dispatch(deleteUserFromUsers(user.id))
        onCloseFunc()
    }
    return (
        <div className={s.modal} onClick={onCloseFunc}>
            <div className={s.modal__overlay}>
                <div className={s.modal__content} onClick={(e) => e.stopPropagation()}>
                    <img onClick={onCloseFunc} src={closeIcon} className={s.modal__closeIcon} />
                    <div className={s.modal__text}>Are you sure that you want delete this user:<p>{user.name}</p> ?</div>
                    <div className={s.modal__buttons}>
                        <button className={s.modal__delete} onClick={() => deleteUser(user)}>Delete</button>
                        <button className={s.modal__canel} onClick={onCloseFunc}>Canel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}