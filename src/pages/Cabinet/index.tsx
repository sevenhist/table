import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectUser, setAuth, setUser } from 'features/user/userSlice';
import { Container } from 'components/ui/Container';
import { toast } from 'react-toastify';
import AuthService from 'api/services/AuthService';

import s from './Cabinet.module.scss';
import { Content } from './components/Content/Content';
import { Header } from 'components/Header';

interface CabinetProps { }

export const Cabinet: FC<CabinetProps> = () => {
    return (
        <div className={s.profile}>
            <Container>
                <Header />
                <Content />
            </Container>
        </div>
    );
};
