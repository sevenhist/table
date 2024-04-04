import { FC, useState } from "react"
import s from "./CheckoutPay.module.scss"

interface secondRadioInputObjProps {
    normalyPay: string,
    privateBankPay: string
}

interface CheckoutPayProps {
    secondRadioInputObj: secondRadioInputObjProps,
    secondActiveRadioInput: string,
    setSecondActiveRadioInput: React.Dispatch<React.SetStateAction<any>>
}

export const CheckoutPay: FC<CheckoutPayProps> = ({secondRadioInputObj, secondActiveRadioInput, setSecondActiveRadioInput}) => {
    const changeSecondActiveRadioInput = (activeRadio: string) => {
        setSecondActiveRadioInput(activeRadio)
    }
    return (
        <div className={s.pay__part}>
            <h2 className={s.form__checkout__title}>Оплата</h2>
            <div>
                <div className={s.custom__radio__wrapper}>
                    <div className={s.custom__radio}>
                        <input onClick={() => changeSecondActiveRadioInput(secondRadioInputObj.normalyPay)} id="pay1" name="pay" type="radio"
                            value={"Оплата при отриманні."} defaultChecked />
                        <label htmlFor="pay1">Оплата при отриманні.</label>
                    </div>
                    {
                        secondActiveRadioInput === secondRadioInputObj.normalyPay &&
                        <div>
                            <p className={s.custom__radio__descr}>
                                Варіанти для оплати: на відділенні готівкою при отриманні, на відділенні карткою,
                                попередня оплата додатка Нової пошти.
                            </p>
                        </div>
                    }
                </div>
                <div className={s.custom__radio__wrapper}>
                    <div className={s.custom__radio}>
                        <input onClick={() => changeSecondActiveRadioInput(secondRadioInputObj.privateBankPay)} id="pay2" name="pay" type="radio"
                            value={"Оплата за реквізитами Приват Банку"} />
                        <label htmlFor="pay2">Оплата за реквізитами Приват Банку</label>
                    </div>
                    {
                        secondActiveRadioInput === secondRadioInputObj.privateBankPay &&
                        <div>
                            <p className={s.custom__radio__descr}>
                                Комісія за платіж 0% від суми. Резерв замовлення на 24 години.
                                Зарахування коштів, що очікується: ПриватБанк від 5 до 30 хвилин,
                                інший банк можлива затримка до 3-х робочих днів.
                            </p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}