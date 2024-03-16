import { Container } from "components/ui/Container"
import s from "./Checkout.module.scss"
import { Logo } from "components/Logo"
import { useForm } from "react-hook-form"
import { Inputs } from "pages/Login/components/LoginForm/LoginForm"
import { Field, FieldBox } from "components/ui/Input"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { SelectMenu } from "components/ui/SelectMenu"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { changeCountOnInput, deleteCartProduct, discrementCount, incrementCount, selectCartProducts, selectCartTotalPriceOfProducts } from "features/user/cartSlice"
import { CartModal } from "components/CartModal"
import { Link } from "react-router-dom"
import { ROUTES } from "app/routes"
import { Button, LinkButton } from "components/ui/Button"
import { Select } from "components/Select"
import useOutsideClick from "hooks/useClickOutside"


export const Checkout: FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        mode: 'all'
    })
    const dispatch = useAppDispatch()
    const cartArray = useAppSelector(selectCartProducts)
    const totalPrice = useAppSelector(selectCartTotalPriceOfProducts)
    const radioInputsObj = {
        department: "department",
        postamt: "postamt",
        delivery: "delivery"
    }
    const secondRadioInputObj = {
        pay1: "pay1",
        pay2: "pay2"
    }
    const [activeRadioInput, setActiveRadioInput] = useState(radioInputsObj.department)
    const [secondActiveRadioInput, setSecondActiveRadioInput] = useState(secondRadioInputObj.pay1)
    const changeActiveRadionInput = (activeRadio: string) => {
        setActiveRadioInput(activeRadio);
    }
    const changeSecondActiveRadioInput = (activeRadio: string) => {
        setSecondActiveRadioInput(activeRadio)
    }
    const fields: Array<Field> = [
        {
            register: register,
            name: 'Last_name',
            required: "Поле обов'язкове до заповнення!",
            errors: errors,
            title: "Прізвище",
            type: 'text'
        },
        {
            register: register,
            name: 'Name',
            required: "Поле обов'язкове до заповнення!",
            errors: errors,
            title: "Ім'я",
            type: 'text'
        },
        {
            register: register,
            name: 'Phone_number',
            required: "Поле обов'язкове до заповнення!",
            value: "+43",
            patternValue: /^\+43[0-9]{11}$/,
            message: 'Будь ласка напишіть правильно ваш номер телефону',
            errors: errors,
            title: "Мобільний телефон",
            type: 'tel'
        },
        {
            register: register,
            name: 'Email',
            required: "Поле обов'язкове до заповнення!",
            patternValue: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
            message: 'Будь ласка введіть дійсну адресу електронної пошти!',
            errors: errors,
            title: 'Емейл',
            type: 'text'
        }
    ];
    const [streetInput, setStreetInput] = useState('')
    const [houseInput, setHouseInput] = useState('')
    const [apartmentInput, setApartmentInput] = useState('')


    /////////////////////////////////////////////////////////////////////////////////////////////////
    const postOffices = [
        { id: 1, postOffice: "Department №1: Negrelligasse 5, Wien", cityId: 1 },
        { id: 2, postOffice: "Department №2: Hauptstraße 10, Wien", cityId: 1 },
        { id: 3, postOffice: "Department №3: Marktplatz 3, Wien", cityId: 1 },
        { id: 4, postOffice: "Department №4: Rathausplatz 7, Wien", cityId: 1 },
        { id: 5, postOffice: "Department №5: Bahnhofstraße 15, Wien", cityId: 1 },
        { id: 6, postOffice: "Department №6: Stadtpark 12, Wien", cityId: 1 },
        { id: 7, postOffice: "Department №7: Lerchengasse 8, Wien", cityId: 1 },
        { id: 8, postOffice: "Department №8: Schlossallee 20, Wien", cityId: 1 },
        { id: 9, postOffice: "Department №9: Industriestraße 25, Wien", cityId: 1 },
        { id: 10, postOffice: "Department №10: Lindenweg 18, Wien", cityId: 1 },
        { id: 11, postOffice: "Department №1: Hauptplatz 8, Rust", cityId: 2 },
        { id: 12, postOffice: "Department №2: Schulstraße 12, Rust", cityId: 2 },
        { id: 13, postOffice: "Department №3: Kirchenweg 15, Rust", cityId: 2 },
        { id: 14, postOffice: "Department №4: Berggasse 21, Rust", cityId: 2 },
        { id: 15, postOffice: "Department №5: Talweg 27, Rust", cityId: 2 },
        { id: 16, postOffice: "Department №6: Sonnenallee 30, Rust", cityId: 2 },
        { id: 17, postOffice: "Department №7: Mondstraße 33, Rust", cityId: 2 },
        { id: 18, postOffice: "Department №8: Sternplatz 37, Rust", cityId: 2 },
        { id: 19, postOffice: "Department №9: Marsweg 40, Rust", cityId: 2 },
        { id: 20, postOffice: "Department №10: Saturnring 45, Rust", cityId: 2 },
        { id: 21, postOffice: "Department №1: Hauptstraße 5, Innsbruck", cityId: 3 },
        { id: 22, postOffice: "Department №2: Schulweg 9, Innsbruck", cityId: 3 },
        { id: 23, postOffice: "Department №3: Kirchgasse 13, Innsbruck", cityId: 3 },
        { id: 24, postOffice: "Department №4: Bergstraße 17, Innsbruck", cityId: 3 },
        { id: 25, postOffice: "Department №5: Talstraße 21, Innsbruck", cityId: 3 },
        { id: 26, postOffice: "Department №6: Sonnenstraße 25, Innsbruck", cityId: 3 },
        { id: 27, postOffice: "Department №7: Mondgasse 29, Innsbruck", cityId: 3 },
        { id: 28, postOffice: "Department №8: Sternweg 33, Innsbruck", cityId: 3 },
        { id: 29, postOffice: "Department №9: Marsstraße 37, Innsbruck", cityId: 3 },
        { id: 30, postOffice: "Department №10: Saturngasse 41, Innsbruck", cityId: 3 },
        { id: 31, postOffice: "Department №1: Hauptstraße 3, Oberwart", cityId: 4 },
        { id: 32, postOffice: "Department №2: Schulweg 7, Oberwart", cityId: 4 },
        { id: 33, postOffice: "Department №3: Kirchgasse 11, Oberwart", cityId: 4 },
        { id: 34, postOffice: "Department №4: Bergstraße 15, Oberwart", cityId: 4 },
        { id: 35, postOffice: "Department №5: Talstraße 19, Oberwart", cityId: 4 },
        { id: 36, postOffice: "Department №1: Hauptstraße 2, Güssing", cityId: 5 },
        { id: 37, postOffice: "Department №2: Schulweg 6, Güssing", cityId: 5 },
        { id: 38, postOffice: "Department №3: Kirchgasse 10, Güssing", cityId: 5 },
        { id: 39, postOffice: "Department №4: Bergstraße 14, Güssing", cityId: 5 },
        { id: 40, postOffice: "Department №5: Talstraße 18, Güssing", cityId: 5 },
        { id: 41, postOffice: "Department №1: Hauptstraße 1, Klagenfurt", cityId: 6 },
        { id: 42, postOffice: "Department №2: Schulweg 5, Klagenfurt", cityId: 6 },
        { id: 43, postOffice: "Department №3: Kirchgasse 9, Klagenfurt", cityId: 6 },
        { id: 44, postOffice: "Department №4: Bergstraße 13, Klagenfurt", cityId: 6 },
        { id: 45, postOffice: "Department №5: Talstraße 17, Klagenfurt", cityId: 6 },
        { id: 46, postOffice: "Department №1: Hauptstraße 0, Villach", cityId: 7 },
        { id: 47, postOffice: "Department №2: Schulweg 4, Villach", cityId: 7 },
        { id: 48, postOffice: "Department №3: Kirchgasse 8, Villach", cityId: 7 },
        { id: 49, postOffice: "Department №4: Bergstraße 12, Villach", cityId: 7 },
        { id: 50, postOffice: "Department №5: Talstraße 16, Villach", cityId: 7 },
        { id: 51, postOffice: "Department №1: Hauptplatz 8, Wolfsberg", cityId: 8 },
        { id: 52, postOffice: "Department №2: Schulstraße 12, Wolfsberg", cityId: 8 },
        { id: 53, postOffice: "Department №3: Kirchenweg 15, Wolfsberg", cityId: 8 },
        { id: 54, postOffice: "Department №4: Berggasse 21, Wolfsberg", cityId: 8 },
        { id: 55, postOffice: "Department №5: Talweg 27, Wolfsberg", cityId: 8 },
        { id: 56, postOffice: "Department №1: Hauptstraße 5, Spittal an der Drau", cityId: 9 },
        { id: 57, postOffice: "Department №2: Schulweg 9, Spittal an der Drau", cityId: 9 },
        { id: 58, postOffice: "Department №3: Kirchgasse 13, Spittal an der Drau", cityId: 9 },
        { id: 59, postOffice: "Department №4: Bergstraße 17, Spittal an der Drau", cityId: 9 },
        { id: 60, postOffice: "Department №5: Talstraße 21, Spittal an der Drau", cityId: 9 },
        { id: 61, postOffice: "Department №1: Hauptstraße 5, Völkermarkt", cityId: 10 },
        { id: 62, postOffice: "Department №2: Schulweg 9, Völkermarkt", cityId: 10 },
        { id: 63, postOffice: "Department №3: Kirchgasse 13, Völkermarkt", cityId: 10 },
        { id: 64, postOffice: "Department №4: Bergstraße 17, Völkermarkt", cityId: 10 },
        { id: 65, postOffice: "Department №5: Talstraße 21, Völkermarkt", cityId: 10 },
        { id: 66, postOffice: "Department №1: Hauptstraße 5, Feldkirchen in Kärnten", cityId: 11 },
        { id: 67, postOffice: "Department №2: Schulweg 9, Feldkirchen in Kärnten", cityId: 11 },
        { id: 68, postOffice: "Department №3: Kirchgasse 13, Feldkirchen in Kärnten", cityId: 11 },
        { id: 69, postOffice: "Department №4: Bergstraße 17, Feldkirchen in Kärnten", cityId: 11 },
        { id: 70, postOffice: "Department №5: Talstraße 21, Feldkirchen in Kärnten", cityId: 11 },
        { id: 71, postOffice: "Department №1: Hauptplatz 8, St. Pölten", cityId: 12 },
        { id: 72, postOffice: "Department №2: Schulstraße 12, St. Pölten", cityId: 12 },
        { id: 73, postOffice: "Department №3: Kirchenweg 15, St. Pölten", cityId: 12 },
        { id: 74, postOffice: "Department №4: Berggasse 21, St. Pölten", cityId: 12 },
        { id: 75, postOffice: "Department №1: Hauptplatz 10, Wiener Neustadt", cityId: 13 },
        { id: 76, postOffice: "Department №2: Bahnhofstraße 15, Wiener Neustadt", cityId: 13 },
        { id: 77, postOffice: "Department №3: Ringstraße 20, Wiener Neustadt", cityId: 13 },
        { id: 78, postOffice: "Department №4: Schulplatz 25, Wiener Neustadt", cityId: 13 },
        { id: 79, postOffice: "Department №5: Kirchgasse 30, Wiener Neustadt", cityId: 13 },
        { id: 80, postOffice: "Department №1: Marktplatz 8, Waidhofen an der Ybbs", cityId: 14 },
        { id: 81, postOffice: "Department №2: Schulgasse 12, Waidhofen an der Ybbs", cityId: 14 },
        { id: 82, postOffice: "Department №3: Kirchplatz 15, Waidhofen an der Ybbs", cityId: 14 },
        { id: 83, postOffice: "Department №4: Bergstraße 21, Waidhofen an der Ybbs", cityId: 14 },
        { id: 84, postOffice: "Department №5: Tannenweg 27, Waidhofen an der Ybbs", cityId: 14 },
        { id: 85, postOffice: "Department №1: Hauptallee 10, Klosterneuburg", cityId: 15 },
        { id: 86, postOffice: "Department №2: Parkstraße 15, Klosterneuburg", cityId: 15 },
        { id: 87, postOffice: "Department №3: Gartenstraße 20, Klosterneuburg", cityId: 15 },
        { id: 88, postOffice: "Department №4: Schulweg 25, Klosterneuburg", cityId: 15 },
        { id: 89, postOffice: "Department №5: Bahnhofplatz 30, Klosterneuburg", cityId: 15 },
        { id: 90, postOffice: "Department №1: Hauptstraße 10, Krems an der Donau", cityId: 16 },
        { id: 91, postOffice: "Department №2: Schulplatz 15, Krems an der Donau", cityId: 16 },
        { id: 92, postOffice: "Department №3: Kirchgasse 20, Krems an der Donau", cityId: 16 },
        { id: 93, postOffice: "Department №4: Marktplatz 25, Krems an der Donau", cityId: 16 },
        { id: 94, postOffice: "Department №5: Bahnhofstraße 30, Krems an der Donau", cityId: 16 },
        { id: 95, postOffice: "Department №1: Hauptplatz 8, Mödling", cityId: 17 },
        { id: 96, postOffice: "Department №2: Marktgasse 12, Mödling", cityId: 17 },
        { id: 97, postOffice: "Department №3: Schulstraße 15, Mödling", cityId: 17 },
        { id: 98, postOffice: "Department №4: Ringplatz 21, Mödling", cityId: 17 },
        { id: 99, postOffice: "Department №5: Bahnhofsallee 27, Mödling", cityId: 17 },
        { id: 100, postOffice: "Department №1: Hauptweg 10, Linz", cityId: 18 },
        { id: 101, postOffice: "Department №2: Schulhof 15, Linz", cityId: 18 },
        { id: 102, postOffice: "Department №3: Kirchenplatz 20, Linz", cityId: 18 },
        { id: 103, postOffice: "Department №4: Marktweg 25, Linz", cityId: 18 },
        { id: 104, postOffice: "Department №5: Bahnhofsplatz 30, Linz", cityId: 18 },
        { id: 105, postOffice: "Department №1: Hauptallee 8, Wels", cityId: 19 },
        { id: 106, postOffice: "Department №2: Marktweg 12, Wels", cityId: 19 },
        { id: 107, postOffice: "Department №3: Schulplatz 15, Wels", cityId: 19 },
        { id: 108, postOffice: "Department №4: Bahnhofstraße 21, Wels", cityId: 19 },
        { id: 109, postOffice: "Department №5: Ringplatz 27, Wels", cityId: 19 },
        { id: 110, postOffice: "Department №1: Hauptstraße 10, Steyr", cityId: 20 },
        { id: 111, postOffice: "Department №2: Schulweg 15, Steyr", cityId: 20 },
        { id: 112, postOffice: "Department №3: Kirchenplatz 20, Steyr", cityId: 20 },
        { id: 113, postOffice: "Department №4: Marktplatz 25, Steyr", cityId: 20 },
        { id: 114, postOffice: "Department №5: Bahnhofsweg 30, Steyr", cityId: 20 },
        { id: 115, postOffice: "Department №1: Hauptplatz 8, Linz-Land", cityId: 21 },
        { id: 116, postOffice: "Department №2: Marktgasse 12, Linz-Land", cityId: 21 },
        { id: 117, postOffice: "Department №3: Schulstraße 15, Linz-Land", cityId: 21 },
        { id: 118, postOffice: "Department №4: Ringplatz 21, Linz-Land", cityId: 21 },
        { id: 119, postOffice: "Department №5: Bahnhofsallee 27, Linz-Land", cityId: 21 },
        { id: 120, postOffice: "Department №1: Hauptweg 10, Ried im Innkreis", cityId: 22 },
        { id: 121, postOffice: "Department №2: Schulhof 15, Ried im Innkreis", cityId: 22 },
        { id: 122, postOffice: "Department №3: Kirchenplatz 20, Ried im Innkreis", cityId: 22 },
        { id: 123, postOffice: "Department №4: Marktweg 25, Ried im Innkreis", cityId: 22 },
        { id: 124, postOffice: "Department №5: Bahnhofsplatz 30, Ried im Innkreis", cityId: 22 },
        { id: 125, postOffice: "Department №1: Hauptallee 8, Gmunden", cityId: 23 },
        { id: 126, postOffice: "Department №2: Marktweg 12, Gmunden", cityId: 23 },
        { id: 127, postOffice: "Department №3: Schulplatz 15, Gmunden", cityId: 23 },
        { id: 128, postOffice: "Department №4: Bahnhofstraße 21, Gmunden", cityId: 23 },
        { id: 129, postOffice: "Department №5: Ringplatz 27, Gmunden", cityId: 23 },
        { id: 130, postOffice: "Department №1: Hauptstraße 10, Salzburg", cityId: 24 },
        { id: 131, postOffice: "Department №2: Schulweg 15, Salzburg", cityId: 24 },
        { id: 132, postOffice: "Department №3: Kirchenplatz 20, Salzburg", cityId: 24 },
        { id: 133, postOffice: "Department №4: Marktplatz 25, Salzburg", cityId: 24 },
        { id: 134, postOffice: "Department №5: Bahnhofsweg 30, Salzburg", cityId: 24 },
        { id: 135, postOffice: "Department №1: Hauptplatz 8, Hallein", cityId: 25 },
        { id: 136, postOffice: "Department №2: Marktgasse 12, Hallein", cityId: 25 },
        { id: 137, postOffice: "Department №3: Schulstraße 15, Hallein", cityId: 25 },
        { id: 138, postOffice: "Department №4: Ringplatz 21, Hallein", cityId: 25 },
        { id: 139, postOffice: "Department №5: Bahnhofsallee 27, Hallein", cityId: 25 },
        { id: 140, postOffice: "Department №1: Hauptweg 10, Saalfelden am Steinernen Meer", cityId: 26 },
        { id: 141, postOffice: "Department №2: Schulhof 15, Saalfelden am Steinernen Meer", cityId: 26 },
        { id: 142, postOffice: "Department №3: Kirchenplatz 20, Saalfelden am Steinernen Meer", cityId: 26 },
        { id: 143, postOffice: "Department №4: Marktweg 25, Saalfelden am Steinernen Meer", cityId: 26 },
        { id: 144, postOffice: "Department №5: Bahnhofsplatz 30, Saalfelden am Steinernen Meer", cityId: 26 },
        { id: 145, postOffice: "Department №1: Hauptallee 8, Zell am See", cityId: 27 },
        { id: 146, postOffice: "Department №2: Marktweg 12, Zell am See", cityId: 27 },
        { id: 147, postOffice: "Department №3: Schulplatz 15, Zell am See", cityId: 27 },
        { id: 148, postOffice: "Department №4: Bahnhofstraße 21, Zell am See", cityId: 27 },
        { id: 149, postOffice: "Department №5: Ringplatz 27, Zell am See", cityId: 27 },
        { id: 150, postOffice: "Department №1: Hauptstraße 10, St. Johann im Pongau", cityId: 28 },
        { id: 151, postOffice: "Department №2: Schulweg 15, St. Johann im Pongau", cityId: 28 },
        { id: 152, postOffice: "Department №3: Kirchenplatz 20, St. Johann im Pongau", cityId: 28 },
        { id: 153, postOffice: "Department №4: Marktplatz 25, St. Johann im Pongau", cityId: 28 },
        { id: 154, postOffice: "Department №5: Bahnhofsweg 30, St. Johann im Pongau", cityId: 28 },
        { id: 155, postOffice: "Department №1: Hauptplatz 8, Bischofshofen", cityId: 29 },
        { id: 156, postOffice: "Department №2: Marktgasse 12, Bischofshofen", cityId: 29 },
        { id: 157, postOffice: "Department №3: Schulstraße 15, Bischofshofen", cityId: 29 },
        { id: 158, postOffice: "Department №4: Ringplatz 21, Bischofshofen", cityId: 29 },
        { id: 159, postOffice: "Department №5: Bahnhofsallee 27, Bischofshofen", cityId: 29 },
        { id: 160, postOffice: "Department №1: Hauptweg 10, Graz", cityId: 30 },
        { id: 161, postOffice: "Department №2: Schulhof 15, Graz", cityId: 30 },
        { id: 162, postOffice: "Department №3: Kirchenplatz 20, Graz", cityId: 30 },
        { id: 163, postOffice: "Department №4: Marktweg 25, Graz", cityId: 30 },
        { id: 164, postOffice: "Department №5: Bahnhofsplatz 30, Graz", cityId: 30 }
    ]
    const postAmts = [
        { id: 1, postamt: "Postamt №1: Negrelligasse 5, Wien", cityId: 1 },
        { id: 2, postamt: "Postamt №2: Hauptstraße 10, Wien", cityId: 1 },
        { id: 3, postamt: "Postamt №3: Marktplatz 3, Wien", cityId: 1 },
        { id: 4, postamt: "Postamt №4: Rathausplatz 7, Wien", cityId: 1 },
        { id: 5, postamt: "Postamt №5: Bahnhofstraße 15, Wien", cityId: 1 },
        { id: 6, postamt: "Postamt №6: Stadtpark 12, Wien", cityId: 1 },
        { id: 7, postamt: "Postamt №7: Lerchengasse 8, Wien", cityId: 1 },
        { id: 8, postamt: "Postamt №8: Schlossallee 20, Wien", cityId: 1 },
        { id: 9, postamt: "Postamt №9: Industriestraße 25, Wien", cityId: 1 },
        { id: 10, postamt: "Postamt №10: Lindenweg 18, Wien", cityId: 1 },
        { id: 11, postamt: "Postamt №1: Hauptplatz 8, Rust", cityId: 2 },
        { id: 12, postamt: "Postamt №2: Schulstraße 12, Rust", cityId: 2 },
        { id: 13, postamt: "Postamt №3: Kirchenweg 15, Rust", cityId: 2 },
        { id: 14, postamt: "Postamt №4: Berggasse 21, Rust", cityId: 2 },
        { id: 15, postamt: "Postamt №5: Talweg 27, Rust", cityId: 2 },
        { id: 16, postamt: "Postamt №6: Sonnenallee 30, Rust", cityId: 2 },
        { id: 17, postamt: "Postamt №7: Mondstraße 33, Rust", cityId: 2 },
        { id: 18, postamt: "Postamt №8: Sternplatz 37, Rust", cityId: 2 },
        { id: 19, postamt: "Postamt №9: Marsweg 40, Rust", cityId: 2 },
        { id: 20, postamt: "Postamt №10: Saturnring 45, Rust", cityId: 2 },
        { id: 21, postamt: "Postamt №1: Hauptstraße 5, Innsbruck", cityId: 3 },
        { id: 22, postamt: "Postamt №2: Schulweg 9, Innsbruck", cityId: 3 },
        { id: 23, postamt: "Postamt №3: Kirchgasse 13, Innsbruck", cityId: 3 },
        { id: 24, postamt: "Postamt №4: Bergstraße 17, Innsbruck", cityId: 3 },
        { id: 25, postamt: "Postamt №5: Talstraße 21, Innsbruck", cityId: 3 },
        { id: 26, postamt: "Postamt №6: Sonnenstraße 25, Innsbruck", cityId: 3 },
        { id: 27, postamt: "Postamt №7: Mondgasse 29, Innsbruck", cityId: 3 },
        { id: 28, postamt: "Postamt №8: Sternweg 33, Innsbruck", cityId: 3 },
        { id: 29, postamt: "Postamt №9: Marsstraße 37, Innsbruck", cityId: 3 },
        { id: 30, postamt: "Postamt №10: Saturngasse 41, Innsbruck", cityId: 3 },
        { id: 31, postamt: "Postamt №1: Hauptstraße 3, Oberwart", cityId: 4 },
        { id: 32, postamt: "Postamt №2: Schulweg 7, Oberwart", cityId: 4 },
        { id: 33, postamt: "Postamt №3: Kirchgasse 11, Oberwart", cityId: 4 },
        { id: 34, postamt: "Postamt №4: Bergstraße 15, Oberwart", cityId: 4 },
        { id: 35, postamt: "Postamt №5: Talstraße 19, Oberwart", cityId: 4 },
        { id: 36, postamt: "Postamt №1: Hauptstraße 2, Güssing", cityId: 5 },
        { id: 37, postamt: "Postamt №2: Schulweg 6, Güssing", cityId: 5 },
        { id: 38, postamt: "Postamt №3: Kirchgasse 10, Güssing", cityId: 5 },
        { id: 39, postamt: "Postamt №4: Bergstraße 14, Güssing", cityId: 5 },
        { id: 40, postamt: "Postamt №5: Talstraße 18, Güssing", cityId: 5 },
        { id: 41, postamt: "Postamt №1: Hauptstraße 1, Klagenfurt", cityId: 6 },
        { id: 42, postamt: "Postamt №2: Schulweg 5, Klagenfurt", cityId: 6 },
        { id: 43, postamt: "Postamt №3: Kirchgasse 9, Klagenfurt", cityId: 6 },
        { id: 44, postamt: "Postamt №4: Bergstraße 13, Klagenfurt", cityId: 6 },
        { id: 45, postamt: "Postamt №5: Talstraße 17, Klagenfurt", cityId: 6 },
        { id: 46, postamt: "Postamt №1: Hauptstraße 0, Villach", cityId: 7 },
        { id: 47, postamt: "Postamt №2: Schulweg 4, Villach", cityId: 7 },
        { id: 48, postamt: "Postamt №3: Kirchgasse 8, Villach", cityId: 7 },
        { id: 49, postamt: "Postamt №4: Bergstraße 12, Villach", cityId: 7 },
        { id: 50, postamt: "Postamt №5: Talstraße 16, Villach", cityId: 7 },
        { id: 51, postamt: "Postamt №1: Hauptplatz 8, Wolfsberg", cityId: 8 },
        { id: 52, postamt: "Postamt №2: Schulstraße 12, Wolfsberg", cityId: 8 },
        { id: 53, postamt: "Postamt №3: Kirchenweg 15, Wolfsberg", cityId: 8 },
        { id: 54, postamt: "Postamt №4: Berggasse 21, Wolfsberg", cityId: 8 },
        { id: 55, postamt: "Postamt №5: Talweg 27, Wolfsberg", cityId: 8 },
        { id: 56, postamt: "Postamt №1: Hauptstraße 5, Spittal an der Drau", cityId: 9 },
        { id: 57, postamt: "Postamt №2: Schulweg 9, Spittal an der Drau", cityId: 9 },
        { id: 58, postamt: "Postamt №3: Kirchgasse 13, Spittal an der Drau", cityId: 9 },
        { id: 59, postamt: "Postamt №4: Bergstraße 17, Spittal an der Drau", cityId: 9 },
        { id: 60, postamt: "Postamt №5: Talstraße 21, Spittal an der Drau", cityId: 9 },
        { id: 61, postamt: "Postamt №1: Hauptstraße 5, Völkermarkt", cityId: 10 },
        { id: 62, postamt: "Postamt №2: Schulweg 9, Völkermarkt", cityId: 10 },
        { id: 63, postamt: "Postamt №3: Kirchgasse 13, Völkermarkt", cityId: 10 },
        { id: 64, postamt: "Postamt №4: Bergstraße 17, Völkermarkt", cityId: 10 },
        { id: 65, postamt: "Postamt №5: Talstraße 21, Völkermarkt", cityId: 10 },
        { id: 66, postamt: "Postamt №1: Hauptstraße 5, Feldkirchen in Kärnten", cityId: 11 },
        { id: 67, postamt: "Postamt №2: Schulweg 9, Feldkirchen in Kärnten", cityId: 11 },
        { id: 68, postamt: "Postamt №3: Kirchgasse 13, Feldkirchen in Kärnten", cityId: 11 },
        { id: 69, postamt: "Postamt №4: Bergstraße 17, Feldkirchen in Kärnten", cityId: 11 },
        { id: 70, postamt: "Postamt №5: Talstraße 21, Feldkirchen in Kärnten", cityId: 11 },
        { id: 71, postamt: "Postamt №1: Hauptplatz 8, St. Pölten", cityId: 12 },
        { id: 72, postamt: "Postamt №2: Schulstraße 12, St. Pölten", cityId: 12 },
        { id: 73, postamt: "Postamt №3: Kirchenweg 15, St. Pölten", cityId: 12 },
        { id: 74, postamt: "Postamt №4: Berggasse 21, St. Pölten", cityId: 12 },
        { id: 75, postamt: "Postamt №1: Hauptplatz 10, Wiener Neustadt", cityId: 13 },
        { id: 76, postamt: "Postamt №2: Bahnhofstraße 15, Wiener Neustadt", cityId: 13 },
        { id: 77, postamt: "Postamt №3: Ringstraße 20, Wiener Neustadt", cityId: 13 },
        { id: 78, postamt: "Postamt №4: Schulplatz 25, Wiener Neustadt", cityId: 13 },
        { id: 79, postamt: "Postamt №5: Kirchgasse 30, Wiener Neustadt", cityId: 13 },
        { id: 80, postamt: "Postamt №1: Marktplatz 8, Waidhofen an der Ybbs", cityId: 14 },
        { id: 81, postamt: "Postamt №2: Schulgasse 12, Waidhofen an der Ybbs", cityId: 14 },
        { id: 82, postamt: "Postamt №3: Kirchplatz 15, Waidhofen an der Ybbs", cityId: 14 },
        { id: 83, postamt: "Postamt №4: Bergstraße 21, Waidhofen an der Ybbs", cityId: 14 },
        { id: 84, postamt: "Postamt №5: Tannenweg 27, Waidhofen an der Ybbs", cityId: 14 },
        { id: 85, postamt: "Postamt №1: Hauptallee 10, Klosterneuburg", cityId: 15 },
        { id: 86, postamt: "Postamt №2: Parkstraße 15, Klosterneuburg", cityId: 15 },
        { id: 87, postamt: "Postamt №3: Gartenstraße 20, Klosterneuburg", cityId: 15 },
        { id: 88, postamt: "Postamt №4: Schulweg 25, Klosterneuburg", cityId: 15 },
        { id: 89, postamt: "Postamt №5: Bahnhofplatz 30, Klosterneuburg", cityId: 15 },
        { id: 90, postamt: "Postamt №1: Hauptstraße 10, Krems an der Donau", cityId: 16 },
        { id: 91, postamt: "Postamt №2: Schulplatz 15, Krems an der Donau", cityId: 16 },
        { id: 92, postamt: "Postamt №3: Kirchgasse 20, Krems an der Donau", cityId: 16 },
        { id: 93, postamt: "Postamt №4: Marktplatz 25, Krems an der Donau", cityId: 16 },
        { id: 94, postamt: "Postamt №5: Bahnhofstraße 30, Krems an der Donau", cityId: 16 },
        { id: 95, postamt: "Postamt №1: Hauptplatz 8, Mödling", cityId: 17 },
        { id: 96, postamt: "Postamt №2: Marktgasse 12, Mödling", cityId: 17 },
        { id: 97, postamt: "Postamt №3: Schulstraße 15, Mödling", cityId: 17 },
        { id: 98, postamt: "Postamt №4: Ringplatz 21, Mödling", cityId: 17 },
        { id: 99, postamt: "Postamt №5: Bahnhofsallee 27, Mödling", cityId: 17 },
        { id: 100, postamt: "Postamt №1: Hauptweg 10, Linz", cityId: 18 },
        { id: 101, postamt: "Postamt №2: Schulhof 15, Linz", cityId: 18 },
        { id: 102, postamt: "Postamt №3: Kirchenplatz 20, Linz", cityId: 18 },
        { id: 103, postamt: "Postamt №4: Marktweg 25, Linz", cityId: 18 },
        { id: 104, postamt: "Postamt №5: Bahnhofsplatz 30, Linz", cityId: 18 },
        { id: 105, postamt: "Postamt №1: Hauptallee 8, Wels", cityId: 19 },
        { id: 106, postamt: "Postamt №2: Marktweg 12, Wels", cityId: 19 },
        { id: 107, postamt: "Postamt №3: Schulplatz 15, Wels", cityId: 19 },
        { id: 108, postamt: "Postamt №4: Bahnhofstraße 21, Wels", cityId: 19 },
        { id: 109, postamt: "Postamt №5: Ringplatz 27, Wels", cityId: 19 },
        { id: 110, postamt: "Postamt №1: Hauptstraße 10, Steyr", cityId: 20 },
        { id: 111, postamt: "Postamt №2: Schulweg 15, Steyr", cityId: 20 },
        { id: 112, postamt: "Postamt №3: Kirchenplatz 20, Steyr", cityId: 20 },
        { id: 113, postamt: "Postamt №4: Marktplatz 25, Steyr", cityId: 20 },
        { id: 114, postamt: "Postamt №5: Bahnhofsweg 30, Steyr", cityId: 20 },
        { id: 115, postamt: "Postamt №1: Hauptplatz 8, Linz-Land", cityId: 21 },
        { id: 116, postamt: "Postamt №2: Marktgasse 12, Linz-Land", cityId: 21 },
        { id: 117, postamt: "Postamt №3: Schulstraße 15, Linz-Land", cityId: 21 },
        { id: 118, postamt: "Postamt №4: Ringplatz 21, Linz-Land", cityId: 21 },
        { id: 119, postamt: "Postamt №5: Bahnhofsallee 27, Linz-Land", cityId: 21 },
        { id: 120, postamt: "Postamt №1: Hauptweg 10, Ried im Innkreis", cityId: 22 },
        { id: 121, postamt: "Postamt №2: Schulhof 15, Ried im Innkreis", cityId: 22 },
        { id: 122, postamt: "Postamt №3: Kirchenplatz 20, Ried im Innkreis", cityId: 22 },
        { id: 123, postamt: "Postamt №4: Marktweg 25, Ried im Innkreis", cityId: 22 },
        { id: 124, postamt: "Postamt №5: Bahnhofsplatz 30, Ried im Innkreis", cityId: 22 },
        { id: 125, postamt: "Postamt №1: Hauptallee 8, Gmunden", cityId: 23 },
        { id: 126, postamt: "Postamt №2: Marktweg 12, Gmunden", cityId: 23 },
        { id: 127, postamt: "Postamt №3: Schulplatz 15, Gmunden", cityId: 23 },
        { id: 128, postamt: "Postamt №4: Bahnhofstraße 21, Gmunden", cityId: 23 },
        { id: 129, postamt: "Postamt №5: Ringplatz 27, Gmunden", cityId: 23 },
        { id: 130, postamt: "Postamt №1: Hauptstraße 10, Salzburg", cityId: 24 },
        { id: 131, postamt: "Postamt №2: Schulweg 15, Salzburg", cityId: 24 },
        { id: 132, postamt: "Postamt №3: Kirchenplatz 20, Salzburg", cityId: 24 },
        { id: 133, postamt: "Postamt №4: Marktplatz 25, Salzburg", cityId: 24 },
        { id: 134, postamt: "Postamt №5: Bahnhofsweg 30, Salzburg", cityId: 24 },
        { id: 135, postamt: "Postamt №1: Hauptplatz 8, Hallein", cityId: 25 },
        { id: 136, postamt: "Postamt №2: Marktgasse 12, Hallein", cityId: 25 },
        { id: 137, postamt: "Postamt №3: Schulstraße 15, Hallein", cityId: 25 },
        { id: 138, postamt: "Postamt №4: Ringplatz 21, Hallein", cityId: 25 },
        { id: 139, postamt: "Postamt №5: Bahnhofsallee 27, Hallein", cityId: 25 },
        { id: 140, postamt: "Postamt №1: Hauptweg 10, Saalfelden am Steinernen Meer", cityId: 26 },
        { id: 141, postamt: "Postamt №2: Schulhof 15, Saalfelden am Steinernen Meer", cityId: 26 },
        { id: 142, postamt: "Postamt №3: Kirchenplatz 20, Saalfelden am Steinernen Meer", cityId: 26 },
        { id: 143, postamt: "Postamt №4: Marktweg 25, Saalfelden am Steinernen Meer", cityId: 26 },
        { id: 144, postamt: "Postamt №5: Bahnhofsplatz 30, Saalfelden am Steinernen Meer", cityId: 26 },
        { id: 145, postamt: "Postamt №1: Hauptallee 8, Zell am See", cityId: 27 },
        { id: 146, postamt: "Postamt №2: Marktweg 12, Zell am See", cityId: 27 },
        { id: 147, postamt: "Postamt №3: Schulplatz 15, Zell am See", cityId: 27 },
        { id: 148, postamt: "Postamt №4: Bahnhofstraße 21, Zell am See", cityId: 27 },
        { id: 149, postamt: "Postamt №5: Ringplatz 27, Zell am See", cityId: 27 },
        { id: 150, postamt: "Postamt №1: Hauptstraße 10, St. Johann im Pongau", cityId: 28 },
        { id: 151, postamt: "Postamt №2: Schulweg 15, St. Johann im Pongau", cityId: 28 },
        { id: 152, postamt: "Postamt №3: Kirchenplatz 20, St. Johann im Pongau", cityId: 28 },
        { id: 153, postamt: "Postamt №4: Marktplatz 25, St. Johann im Pongau", cityId: 28 },
        { id: 154, postamt: "Postamt №5: Bahnhofsweg 30, St. Johann im Pongau", cityId: 28 },
        { id: 155, postamt: "Postamt №1: Hauptplatz 8, Bischofshofen", cityId: 29 },
        { id: 156, postamt: "Postamt №2: Marktgasse 12, Bischofshofen", cityId: 29 },
        { id: 157, postamt: "Postamt №3: Schulstraße 15, Bischofshofen", cityId: 29 },
        { id: 158, postamt: "Postamt №4: Ringplatz 21, Bischofshofen", cityId: 29 },
        { id: 159, postamt: "Postamt №5: Bahnhofsallee 27, Bischofshofen", cityId: 29 },
        { id: 160, postamt: "Postamt №1: Hauptweg 10, Graz", cityId: 30 },
        { id: 161, postamt: "Postamt №2: Schulhof 15, Graz", cityId: 30 },
        { id: 162, postamt: "Postamt №3: Kirchenplatz 20, Graz", cityId: 30 },
        { id: 163, postamt: "Postamt №4: Marktweg 25, Graz", cityId: 30 },
        { id: 164, postamt: "Postamt №5: Bahnhofsplatz 30, Graz", cityId: 30 }
    ]
    const citiesAustria = [
        { id: 1, city: "Wien" },
        { id: 2, city: "Rust" },
        { id: 3, city: "Innsbruck" },
        { id: 4, city: "Oberwart" },
        { id: 5, city: "Güssing" },
        { id: 6, city: "Klagenfurt" },
        { id: 7, city: "Villach" },
        { id: 8, city: "Wolfsberg" },
        { id: 9, city: "Spittal an der Drau" },
        { id: 10, city: "Völkermarkt" },
        { id: 11, city: "Feldkirchen in Kärnten" },
        { id: 12, city: "St. Pölten" },
        { id: 13, city: "Wiener Neustadt" },
        { id: 14, city: "Waidhofen an der Ybbs" },
        { id: 15, city: "Klosterneuburg" },
        { id: 16, city: "Krems an der Donau" },
        { id: 17, city: "Mödling" },
        { id: 18, city: "Linz" },
        { id: 19, city: "Wels" },
        { id: 20, city: "Steyr" },
        { id: 21, city: "Linz-Land" },
        { id: 22, city: "Ried im Innkreis" },
        { id: 23, city: "Gmunden" },
        { id: 24, city: "Salzburg" },
        { id: 25, city: "Hallein" },
        { id: 26, city: "Saalfelden am Steinernen Meer" },
        { id: 27, city: "Zell am See" },
        { id: 28, city: "St. Johann im Pongau" },
        { id: 29, city: "Bischofshofen" },
        { id: 30, city: "Graz" },
    ];
    const [activeCityItem, setActiveCityItem] = useState<{
        id: number,
        city: string
    } | null>(null);
    const [activePostOfficeItem, setActivePostOfficeItem] = useState<{
        id: number,
        postOffice: string,
        cityId: number
    } | null>(null);
    const [activePostamtItem, setActivePostamtItem] = useState<{
        id: number,
        postamt: string,
        cityId: number
    } | null>(null);
    useEffect(() => {
        if (activeCityItem?.id !== activePostOfficeItem?.cityId) {
            setActivePostOfficeItem(null)
            setActivePostamtItem(null)
        }
    }, [activeCityItem])
    ////////////////////////////////////////////////////////////////////////////////////////////////
    const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
    const showButtonDelete = (productId: string, e: React.MouseEvent<HTMLDivElement>) => {
        setDeleteItemId(productId)
        e.stopPropagation()
    }
    const handleChangeInputCart = (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
        dispatch(changeCountOnInput({ productId, newCount: e.target.value }));
    };

    return (
        <div>
            {
                totalPrice !== 0 ?
                    <div className={s.checkout}>
                        <Container>
                            <div className={s.checkout__top}>
                                <Logo className={s.checkout__logo} withText={true}></Logo>
                                <h1 className={`${s.checkout__title} ${s.title}`}>Оформлення замовлення</h1>
                            </div>
                            <div className={s.checkout__col}>
                                <form className={`${s.checkout__form} ${s.form__checkout}`}>
                                    <h2 className={s.form__checkout__title}>Контактні дані</h2>
                                    <div className={s.form__checkout__fields}>
                                        {fields.map((field) => (
                                            <div className={s.field} key={field.name}>
                                                <FieldBox
                                                    title={field.title}
                                                    register={field.register}
                                                    name={field.name}
                                                    required={field.required}
                                                    patternValue={field.patternValue}
                                                    message={field.message}
                                                    errors={field.errors}
                                                    type={field.type}
                                                    watch={field.watch}
                                                    validation={field.validation}
                                                    value={field.value}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <Select
                                        value={activeCityItem}
                                        setValue={setActiveCityItem}
                                        values={citiesAustria}
                                        valueKey="city"
                                        placeholder="Виберіть своє місто"
                                        errorText="Місто вказане не вірно"
                                    />
                                    <div className={`${!activeCityItem ? s.form__checkout__info__hide : ''} ${s.form__checkout__info}`}>
                                        <h2 className={s.form__checkout__title}>Доставка</h2>
                                        <div>
                                            <div className={s.custom__radio__wrapper}>
                                                <div className={s.custom__radio}>
                                                    <input onClick={() => changeActiveRadionInput(radioInputsObj.department)} id="delivery-branch" name="delivery" type="radio"
                                                        value={"Самовивіз із відділення Нової пошти."} defaultChecked />
                                                    <label htmlFor="delivery-branch">Самовивіз із відділення Нової пошти.</label>
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
                                                                    value={activePostOfficeItem}
                                                                    setValue={setActivePostOfficeItem}
                                                                    values={postOffices.filter((item) => item.cityId === activeCityItem?.id)}
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
                                                    <input onClick={() => changeActiveRadionInput(radioInputsObj.postamt)} id="delivery-postamt" name="delivery" type="radio"
                                                        value={"Самовивіз із відділення Нової пошти."} />
                                                    <label htmlFor="delivery-postamt">Самовивіз із поштомата Нової пошти</label>
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
                                                                    value={activePostamtItem}
                                                                    setValue={setActivePostamtItem}
                                                                    values={postAmts.filter((item) => item.cityId === activeCityItem?.id)}
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
                                                    <input onClick={() => changeActiveRadionInput(radioInputsObj.delivery)} id="delivery-courier" name="delivery" type="radio"
                                                        value={"Кур'єрська доставка Новою Поштою"} />
                                                    <label htmlFor="delivery-courier">Кур'єрська доставка Новою Поштою</label>
                                                </div>
                                                {
                                                    activeRadioInput === radioInputsObj.delivery &&
                                                    <div>
                                                        <p className={s.custom__radio__descr}>
                                                            Відправка замовлень здійснюється щодня, крім суботи та неділі! Очікуване прибуття на поштамат 1 - 2 дні,
                                                            автоповернення на 5 день. Номер ТТН буде відправлено до СМС повідомлення / email.
                                                        </p>
                                                        <div className={s.form__checkout__courier}>
                                                            <div className={s.field}>
                                                                <input placeholder="Вулиця" className={`${s.field__input}`} value={streetInput} onChange={(e) => { setStreetInput(e.target.value) }} />
                                                            </div>
                                                            <div className={s.field}>
                                                                <input placeholder="Будинок" className={`${s.field__input}`} value={houseInput} onChange={(e) => { setHouseInput(e.target.value) }} />
                                                            </div>
                                                            <div className={s.field}>
                                                                <input placeholder="Квартира" className={`${s.field__input}`} value={apartmentInput} onChange={(e) => { setApartmentInput(e.target.value) }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <h2 className={s.form__checkout__title}>Оплата</h2>
                                        <div>
                                            <div className={s.custom__radio__wrapper}>
                                                <div className={s.custom__radio}>
                                                    <input onClick={() => changeSecondActiveRadioInput(secondRadioInputObj.pay1)} id="pay1" name="pay" type="radio"
                                                        value={"Оплата при отриманні."} defaultChecked />
                                                    <label htmlFor="pay1">Оплата при отриманні.</label>
                                                </div>
                                                {
                                                    secondActiveRadioInput === secondRadioInputObj.pay1 &&
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
                                                    <input onClick={() => changeSecondActiveRadioInput(secondRadioInputObj.pay2)} id="pay2" name="pay" type="radio"
                                                        value={"Оплата за реквізитами Приват Банку"} />
                                                    <label htmlFor="pay2">Оплата за реквізитами Приват Банку</label>
                                                </div>
                                                {
                                                    secondActiveRadioInput === secondRadioInputObj.pay2 &&
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
                                    <div className={s.form__checkout__footer}>
                                        <Button className={s.form__checkout__footer__button} type="submit">{"Підтвердити замовлення"}</Button>
                                    </div>
                                </form>
                                <div className={s.cart__checkout}>
                                    <h2 className={s.cart__checkout__title}>Кошик</h2>
                                    {
                                        cartArray.map((product) => {
                                            return (
                                                <div className={`${s.basket__window__body} ${s.body__basket__window}`}>
                                                    <ul className={s.cart__list}>
                                                        <li className={s.cart__item}>
                                                            <Link to={`${ROUTES.product}/${product.id}`} className={s.cart__item__img} key={product.id}>
                                                                <img src={product.imgUrl} alt={product.title} />
                                                            </Link>
                                                            <Link to={`${ROUTES.product}/${product.id}`} className={s.cart__item__title}>
                                                                {product.title}
                                                            </Link>
                                                            <div className={s.cart__item__form}>
                                                                <button onClick={() => dispatch(discrementCount(product.id))} className={`${(product.count ?? 0) < 2 && s.disable} ${s.cart__item__increase}`}>-</button>
                                                                <input className={s.cart__item__quantity} type='text' value={product.count ?? ''} onChange={(e) => handleChangeInputCart(e, product.id)} onFocus={(e) => e.target.select()} />
                                                                <button onClick={() => dispatch(incrementCount(product.id))} className={`${(product.count ?? 0) === 100000 && s.disable} ${s.cart__item__increase}`}>+</button>
                                                            </div>
                                                            <p className={s.cart__item__price}>{product.totalPriceOfProduct} грн</p>
                                                            <div className={s.cart__item__more} onClick={(e) => showButtonDelete(product.id, e)}>
                                                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                                                <button className={`${deleteItemId === product.id && s.cart__item__delete__show} ${s.cart__item__delete}`} onClick={() => dispatch(deleteCartProduct(product.id))}>
                                                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zM9 4v2h6V4H9z"></path></g></svg>
                                                                    <span>Видалити</span>
                                                                </button>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className={s.cart__checkout__total}>
                                        <p>Разом:</p>
                                        <span>{totalPrice} грн</span>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                    :
                    <div className={s.no__items}>
                        <p>Кошик порожній</p>
                        <LinkButton to={ROUTES.home} className={s.no__items__button}>На головну</LinkButton>
                    </div>
            }
        </div>
    )
}