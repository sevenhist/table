import { ChangeEvent, FC, SetStateAction, useEffect, useState } from "react"
import s from "./Selectmenu.module.scss"
import { useAppDispatch } from "app/hooks";
import { Dispatch } from "@reduxjs/toolkit";
import useOutsideClick from "hooks/useClickOutside";



interface SelectMenuProps {
    array: Array<any>;
    placeholder?: string,
    inputValue: React.Dispatch<ChangeEvent<HTMLInputElement>>;
    activeItem: any,
    setActiveItem: React.Dispatch<SetStateAction<any>>,
    selectedValue: string,
    errorMessage: string,
    title?: string,
    startWithTwoLetters?: boolean
}
export const SelectMenu: FC<SelectMenuProps> = (props) => {
    const [defaultArray, setDefaultArray] = useState(props.array)
    const [hideArray, setHideArray] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState(false)

    useEffect(() => {
        const filteredInputValue = inputValue.toLowerCase(); // Преобразуйте значение ввода в нижний регистр
        const newFilteredArray = props.array.filter((item) => {
            const selectedValue = (item[props.selectedValue]).toLowerCase(); // Убедитесь, что selectedValue определен и преобразуйте его в нижний регистр
            // Проверьте, содержит ли item[props.selectedValue] подстроку inputValue
            return selectedValue.includes(filteredInputValue);
        });
        setDefaultArray(newFilteredArray);
    }, [inputValue]);

    useEffect(() => {
        setError(false)
    }, [])

    const hideArrayMenu = () => {
        setHideArray(false)
        const foundedValue = props.array.find((item) => item[props.selectedValue] === inputValue)
        if (!foundedValue) {
            setError(true)
        } else {
            setError(false)
        }
        props.setActiveItem(foundedValue)
    }
    const openArrayMenu = () => {
        if(props.startWithTwoLetters) {
            if (inputValue.length > 2) {
                setHideArray(true)
            }
        } else {
            setHideArray(true)
        }
    }
    const ref = useOutsideClick({ callback: hideArrayMenu })
    const onInputChange = (inputValue: string) => {
        setInputValue(inputValue);
        if(props.startWithTwoLetters) {
            if (inputValue.length > 1) {
                setHideArray(true)
            } else if (inputValue.length < 2) {
                setHideArray(false)
            }
        } else {
            setHideArray(true)
        }
    };
    const onItemClick = (item: string) => {
        setInputValue(item)
        const activeItem = props.array.find((value) => value[props.selectedValue] === item)
        props.setActiveItem(activeItem)
        setHideArray(false)
    }
    console.log(hideArray, "hideArrayCond")
    return (
        <div className={s.select__wrapper} ref={ref} >
            <div className={s.select__container}>
                <p className={`${error ? s.select__title__red : ''} ${s.select__title}`}>{props.title}</p>
                <input onClick={openArrayMenu} value={inputValue} className={`${error ? s.select__input__red : ''} ${s.select__input}`} placeholder={props.placeholder} onChange={(e) => onInputChange(e.target.value)} />
            </div>
            {hideArray &&
                <div className={`${s.select}`} >
                    {
                        defaultArray.length > 0 ?
                            <div className={s.select__menu}>
                                <ul className={s.select__list}>
                                    {
                                        hideArray && defaultArray.map((item) => {
                                            return (
                                                <li>
                                                    <button type="button" className={`${item[props.selectedValue] === inputValue && s.select__active} ${s.select__btn}`} onClick={() => { onItemClick(item[props.selectedValue]) }}>
                                                        {item[props.selectedValue]}
                                                    </button>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            :
                            <p className={s.select__undefined}>Нічого не знайдено</p>
                    }
                </div>
            }
            <p className={`${error ? s.error__message : s.error__message__hide}`}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>
                {props.errorMessage}
            </p>
        </div>
    )
}