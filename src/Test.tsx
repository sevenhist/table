import { FC, SetStateAction } from "react"
import s from "./Test.module.scss"

interface InputsProps {
    values: string[]
    setValues: React.Dispatch<SetStateAction<string[]>>
}

export const Inputs: FC<InputsProps> = ({values, setValues}) => {
    const onInputChange = (value: string, index: number) => {
        setValues((prevValues) => prevValues.map((prevValue, oldIndex) => {
            if (index === oldIndex) {
                // Если значение удалено (длина равна 0), удаляем символ из строки
                if (value.length === 0) {
                    return prevValue.slice(0, -1); // Удаляем последний символ
                }
                // Если введена одна буква, заменяем предыдущее значение
                if (value.length === 1) {
                    return value;
                }
            }
            return prevValue;
        }));
    }
    return (
        <div className={s.inputs}>
            {
                values.map((value, index) => {
                    return (
                        <input type="text" value={value} onChange={(event) => onInputChange(event.target.value, index)}/>
                    )
                })
            }
        </div>
    )
}