import { useAppSelector } from 'app/hooks';
import s from './DealerComponent.module.scss';
import { selectUser } from 'features/user/userSlice';

export const DealerComponent = () => {
    const user = useAppSelector(selectUser);
    return (
        <div className={s.dealership}>
            {
                user?.isActivated ?
                    <div className={s.dealership__container}>
                        <h1 className={`${s.cabinet__title} ${s.title} ${s.title__secondary}`}>Знижка. Яка ціна для дилеру?</h1>
                        <div className={s.cabinet__text}>
                            <p>Знижка починає призначатися після 10 замовлень. Починаючи з 11-го замовлення нараховується знижка магазину в розмірі -3% від роздрібної вартості сайту. Нарахування знижки - це разова операція, яка проводиться нашими менеджерами в ручному режимі, оскільки система не може відстежити номер замовлення і автоматично встановити знижку. Прохання, щоб уникнути затримок, повідомити цю інформацію: «Встановіть нарахування знижки -3% для мене».</p>
                        </div>
                        <h1 className={`${s.cabinet__title} ${s.title} ${s.title__secondary}`}>Особистий баланс</h1>
                        <div className={s.cabinet__text}>
                            <p>
                                Система взаєморозрахунків – це особистий баланс, яким Ви маєте можливість самостійно керувати. Особистий баланс доступний Вам на момент створення замовлення, система виводить залишок на поточний момент. Історія Ваших замовлень доступна в особистому кабінеті: всі деталі, які ніколи не змінюються, не затираються.
                            </p>
                        </div>
                        <h1 className={`${s.cabinet__title} ${s.title} ${s.title__secondary}`}>Оформлення замовлення</h1>
                        <div className={s.cabinet__text}>
                            <p>
                                Увага! Додавши товари у кошик, найголовніше виставити свою вартість націнки в полі <strong>«Ваша ціна»</strong>. Чому це необхідно? Залишивши поле «Ваша ціна» порожнім, Ви повідомляєте нам, що це замовлення необхідно відправити за ціною яка вказана на нашому сайті. На жаль ми не можемо контролювати цю інформацію, адже ми не знаємо принцип Вашої роботи: Наприклад, Ви працюєте з націнкою в 3% або Ви працюєте з клієнтами по передоплаті (отримуючи передоплату у розмірі своєї націнки і т.д.). Виходячи з цього, прохання заповнюйте поле<strong>«Ваша ціна»</strong> у будь-якому випадку, навіть, якщо додавати націнку до нашої ціни не потрібно, просто впишіть ціну нашого сайту.
                            </p>
                        </div>
                        <h1 className={`${s.cabinet__title} ${s.title} ${s.title__secondary}`}>Зворотній зв'язок</h1>
                        <div className={s.cabinet__text}>
                            <p>
                                Інформація щодо товарів будь-якого характеру. Прохання, перед зверненням за допомогою до відповідального менеджера, ознайомтеся, будь ласка, з усією доступною інформацією на сайті. На картці товару Ви знайдете всю необхідну інформацію щодо комплектації та технічних характеристик, а також відповіді на запитання, що часто ставляться.
                            </p>
                            <p>
                                Уточнення за Вашим замовленням. Виникли питання? Потрібна допомога? Найшвидшу відповідь Ви зможете отримати у чат-підтримці. Для швидкої оперативної обробки напишіть відповідальній менеджеру, попередньо відразу вказавши номер замовлення. Будь ласка, не дублюйте звернення, дочекайтеся відповіді на поставлене запитання.
                            </p>
                            <p>
                                <em>Увага! Телефони сайту, тобто менеджерам Call-центру магазину, не доступна інформація на Ваші замовлення.</em>
                                <em>Увага! Не використовуйте месенджер від Facebook Messenger для чату з нами.</em>
                                <em>Увага! Встановивши зв'язок у чаті з нами (Вайбер або Телеграм) не закривайте, не видаляйте його.</em>
                            </p>
                        </div>
                    </div>
                    :
                    <div className={s.dealership__container}>
                        <h1 className={`${s.cabinet__title} ${s.title} ${s.title__secondary}`}>
                            ЯК СТАТИ НОВИМ ПАРТНЕРОМ ІНТЕРНЕТ МАГАЗИНУ COFFE IMPORT?
                        </h1>
                        <h2 className={s.dealership__subtitle}>На початку співпраці з нами, вам потрібно:</h2>
                        <ul className={s.dealership__list}>
                            <li>Крок 1: Мати власний кабінет, тобто зареєструватися як клієнт на сайті;</li>
                            {
                                !user?.isActivated &&
                                <li className={s.unactivated}>
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>
                                    Крок 2: <a href="http://mail.google.com/mail/." rel="noreferrer" target="_blank">Підтвердити </a>електронну пошту
                                </li>
                            }
                        </ul>
                    </div>
            }
        </div>
    )
}