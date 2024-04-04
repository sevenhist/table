import { FC } from 'react';

import s from './Loader.module.scss';
import { Container } from 'components/ui/Container';
import preloader from "../../img/preloader.gif"

export const Loader: FC = () => {
  return (
      <div className={s.loader}>
        <img className={s.preloader} src={preloader} alt="Preloader" />
      </div>
  );
};

export const PageLoader: FC = () => {
  return (
      <div className={s.page_loader}>
        <img className={s.preloader} src={preloader} alt="Preloader" />
      </div>
  );
};

