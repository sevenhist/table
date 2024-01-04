import s from './DealerComponent.module.scss';

export const DealerComponent = () => {
    return (
        <div className={s.dealership}>
            <div className={s.dealership__container}>
                <h1 className={`${s.cabinet__title} ${s.title} ${s.title__secondary}`}>
                    ЯК СТАТИ НОВИМ ПАРТНЕРОМ ІНТЕРНЕТ МАГАЗИНУ COFFE IMPORT?
                </h1>
                <h2 className={s.dealership__subtitle}>На початку співпраці з нами, вам потрібно:</h2>
                <ul className={s.dealership__list}>
                
                </ul>
            </div>
        </div>
    )
}