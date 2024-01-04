import { FC } from 'react';

import s from './Loader.module.scss';
import { Container } from 'components/ui/Container';

export const Loader: FC = () => {
  return (
    <Container>
      <div className={s.loader}>
        Loading...
      </div>
    </Container>
  );
};

export const PageLoader: FC = () => {
  return (
    <Container>
      <div className={s.page_loader}>
        Loading...
      </div>
    </Container>
  );
};

