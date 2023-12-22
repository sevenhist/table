import { useAppSelector } from 'app/hooks';
import { selectUser } from 'features/user/userSlice';
import { FC } from 'react';

import s from './UserAvatar.module.scss';

interface UserAvatarProps { }

export const UserAvatar: FC<UserAvatarProps> = () => {
    const user = useAppSelector(selectUser)!

    return (
        <div className={s.avatar}>
            <span className={s.avatar_name}>{user.email.substring(0, 1)}</span>
        </div>
    );
};
