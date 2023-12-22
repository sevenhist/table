import { FC } from 'react';

import s from './Loader.module.scss';

export const Loader: FC = () => {
  return (
    <div className={s.loader}>
       Loading...
    </div>
  );
};

export const PageLoader: FC = () => {
  return (
    <div className={s.page_loader}>
       Loading...
    </div>
  );
};

