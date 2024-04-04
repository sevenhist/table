import { FC, SetStateAction, useState } from "react"
import s from "./CheckoutDelivery.module.scss"
import { Field, FieldBox } from "components/ui/Input"
import { Select } from "components/Select"

interface City {
    id: number;
    city: string;
}

interface PostOffice {
    id: number;
    postOffice: string;
    cityId: number;
}

interface Postamt {
    id: number;
    postamt: string;
    cityId: number;
}

export interface CheckoutDeliveryProps {
    activeCityItem: City | null;
    fieldsStreet: Array<Field>;
    postOffices: PostOffice[];
    postAmts: Postamt[];
    setActivePostOfficeItem: React.Dispatch<React.SetStateAction<PostOffice | null>>;
    setActivePostamtItem: React.Dispatch<React.SetStateAction<Postamt | null>>;
    activePostOfficeItem: PostOffice | null;
    activePostamtItem: Postamt | null;
}
export const CheckoutDelivery: FC<CheckoutDeliveryProps> = (props) => {
    const radioInputsObj = {
        department: "department",
        postamt: "postamt",
        delivery: "delivery"
    }
    const [activeRadioInput, setActiveRadioInput] = useState(radioInputsObj.delivery)
    const changeActiveRadioInput = (activeRadio: string) => {
        setActiveRadioInput(activeRadio);
        props.setActivePostOfficeItem(null)
        props.setActivePostamtItem(null)
        props.fieldsStreet.forEach((item) => {
            if (item.reset) {
                item.reset();
            }
        });
    }
    
    return (
        <div className={`${!props.activeCityItem ? s.form__checkout__info__hide : ''} ${s.form__checkout__info}`}>
            <h2 className={s.form__checkout__title}>Доставка</h2>
            <div>
                <div className={s.custom__radio__wrapper}>
                    <div className={s.custom__radio}>
                        <input onClick={() => changeActiveRadioInput(radioInputsObj.department)} 
                                id={radioInputsObj.department} 
                                name="branch" 
                                type="radio"
                                value={"Самовивіз із відділення Нової пошти."} 
                                checked={activeRadioInput === radioInputsObj.department}/>
                        <label htmlFor={radioInputsObj.department}>Самовивіз із відділення Нової пошти.</label>
                    </div>
                    {
                        activeRadioInput === radioInputsObj.department &&
                        <div>
                            <p className={s.custom__radio__descr}>
                                Відправка замовлень здійснюється щодня, крім суботи та неділі! Очікуване прибуття на поштамат 1 - 2 дні,
                                автоповернення на 5 день. Номер ТТН буде відправлено до СМС повідомлення / email.
                            </p>
                            <div className={`${s.field} ${s.select}`} id="select-delivery">
                                <div className={s.select__wrapper}>
                                    <Select
                                        value={props.activePostOfficeItem}
                                        setValue={props.setActivePostOfficeItem}
                                        values={props.postOffices.filter((item) => item.cityId === props.activeCityItem?.id)}
                                        valueKey="postOffice"
                                        placeholder="Виберіть відповідне відділення"
                                        errorText="Оберіть правильний пункт"
                                        search
                                    />
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className={s.custom__radio__wrapper}>
                    <div className={s.custom__radio}>
                        <input onClick={() => changeActiveRadioInput(radioInputsObj.postamt)} 
                                id={radioInputsObj.postamt} 
                                name="postamt" 
                                type="radio"
                                value={"Самовивіз із відділення Нової пошти."}
                                checked={activeRadioInput === radioInputsObj.postamt}/>
                        <label htmlFor={radioInputsObj.postamt}>Самовивіз із поштомата Нової пошти</label>
                    </div>
                    {
                        activeRadioInput === radioInputsObj.postamt &&
                        <div>
                            <p className={s.custom__radio__descr}>
                                Відправка замовлень здійснюється щодня, крім суботи та неділі! Очікуване прибуття на поштамат 1 - 2 дні,
                                автоповернення на 5 день. Номер ТТН буде відправлено до СМС повідомлення / email.
                            </p>
                            <div className={`${s.field} ${s.select}`} id="select-delivery">
                                <div className={s.select__wrapper}>
                                    <Select
                                        value={props.activePostamtItem}
                                        setValue={props.setActivePostamtItem}
                                        values={props.postAmts.filter((item) => item.cityId === props.activeCityItem?.id)}
                                        valueKey="postamt"
                                        placeholder="Виберіть відповідне відділення"
                                        errorText="Оберіть правильний пункт"
                                        search
                                    />
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className={s.custom__radio__wrapper}>
                    <div className={s.custom__radio}>
                        <input onClick={() => changeActiveRadioInput(radioInputsObj.delivery)} 
                                id={radioInputsObj.delivery} 
                                name="courier" 
                                type="radio"
                                value={"Кур'єрська доставка Новою Поштою"} 
                                checked={activeRadioInput === radioInputsObj.delivery} 
                                defaultChecked/>
                        <label htmlFor={radioInputsObj.delivery}>Кур'єрська доставка Новою Поштою</label>
                    </div>
                    {
                        activeRadioInput === radioInputsObj.delivery &&
                        <div>
                            <p className={s.custom__radio__descr}>
                                Відправка замовлень здійснюється щодня, крім суботи та неділі! Очікуване прибуття на поштамат 1 - 2 дні,
                                автоповернення на 5 день. Номер ТТН буде відправлено до СМС повідомлення / email.
                            </p>
                            <div className={s.form__checkout__courier}>
                                {
                                    props.fieldsStreet.map((adress) => {
                                        return (
                                            <FieldBox
                                                title={adress.title}
                                                register={adress.register}
                                                name={adress.name}
                                                required={adress.required}
                                                patternValue={adress.patternValue}
                                                message={adress.message}
                                                errors={adress.errors}
                                                type={adress.type}
                                                watch={adress.watch}
                                                validation={adress.validation}
                                                value={adress.value}
                                                placeholder={adress.placeholder}
                                                className={s.form__checkout__field}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}