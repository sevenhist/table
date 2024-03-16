import { FC, useEffect } from 'react'
import s from './Characters.module.scss'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { fetchProduct, selectOneProduct } from 'features/user/shopSlice'
import { Container } from 'components/ui/Container'
import { NavigationProduct } from '../NavigationProduct'

export const Characters: FC = () => {
    const { id } = useParams()
    const dipsatch = useAppDispatch()
    useEffect(() => {
        dipsatch(fetchProduct(id as string))
    }, []) // позволяет указывать функцию, которая будет запущена после того, как React обновит DOM(сайт)
    const product = useAppSelector(selectOneProduct)
    return (
        <Container>
            <div className={s.product__block}>
                <h2 className={s.product__subtitle}>Характеристики</h2>
                <ul className={`${s.product__characters} ${s.characters_product}`}>
                    <li className={s.characters_product__item}>
                        <span className={s.characters_product__name}>Виробник:</span>
                        <p className={s.characters_product__value}>{product?.vendor}</p>
                    </li>
                    {
                        product?.params?.map((parameter) => {
                            return (
                                <li className={s.characters_product__item} key={parameter.name}>
                                    <span className={s.characters_product__name}>{parameter.name}</span>
                                    <p className={s.characters_product__value}>{parameter.value}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </Container>
    )
}