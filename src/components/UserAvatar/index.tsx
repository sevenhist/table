import { useAppSelector } from 'app/hooks';
import { selectUser } from 'features/user/userSlice';
import { FC, useEffect } from 'react';

import s from './UserAvatar.module.scss';

interface UserAvatarProps { }

export const UserAvatar: FC<UserAvatarProps> = () => {
    const user = useAppSelector(selectUser)! // null немає

    return (
        <i className={s.avatar_name}>{user?.first_name?.slice(0, 1)}
            {
                !user?.isActivated &&
                <i className={s.warning}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg></i>
            }
        </i>
    );
};
