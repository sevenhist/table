import s from "./Table.module.scss"
import profileImage from "../../img/profile.png"
import settingImage from "../../img/settings.svg"
import search from "../../img/searchsecond.svg"
import menu from "../../img/menu.svg"
import blocks from "../../img/blocks.svg"
import tableLogo from "../../img/tablelogo.svg"
import analythicks from "../../img/analythicks.svg"
import calendarLogo from "../../img/calendarlogo.svg"
import messengerLogo from "../../img/messengerLogo.svg"
import cryptoLogo from "../../img/crypto.svg"
import supportLogo from "../../img/supportLogo.svg"
import outLogo from "../../img/outLogo.svg"
import deleteLogo from "../../img/delete.svg"
import { useEffect, useState } from "react"
import useOutsideClick from "hooks/useClickOutside"
import focusRedIcon from "../../img/focusIcon.svg"
import activeFocusIcon from "../../img/activeFocusIcon.svg"
import normalFocusIcon from "../../img/normalFocusIcon.svg"
import { Card } from "./Card"
import onIconFocus from "../../img/iconOnFocus.svg"
import correctLogo from "../../img/correctLogo.svg"
import deletingLogo from "../../img/deleteLogo.svg"
import { User, selectTableUsers, updateUserList } from "features/user/tableSlice"
import { CreateUserModal } from "./CreateUserModal"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { DeleteUserModal } from "./DeleteUserModal"
import { EditUserModal } from "./EditUserModal"

interface NavLink {
    logo: string,
    text: string,
    menuLogo: string,
    activeItem: boolean
}

export const Table = () => {
    const navLinks: NavLink[] = [
        {
            logo: search,
            text: "Search",
            menuLogo: menu,
            activeItem: false
        },
        {
            logo: blocks,
            text: "Data Table",
            menuLogo: menu,
            activeItem: true
        },
        {
            logo: tableLogo,
            text: "Product",
            menuLogo: menu,
            activeItem: false
        },
        {
            logo: analythicks,
            text: "Analytics",
            menuLogo: menu,
            activeItem: false
        },
        {
            logo: calendarLogo,
            text: "Calender",
            menuLogo: menu,
            activeItem: false
        },
        {
            logo: messengerLogo,
            text: "Messanger",
            menuLogo: menu,
            activeItem: false
        },
        {
            logo: cryptoLogo,
            text: "Crypto",
            menuLogo: menu,
            activeItem: false
        }
    ]
    const cards: Card[] = [
        {
            title: "Total Budget",
            logo: focusRedIcon,
            price: "$85,125.00",
            activeCard: false
        },
        {
            title: "Monthly Budget",
            logo: activeFocusIcon,
            price: "$85,125.00",
            activeCard: true
        },
        {
            title: "Weekly Budget",
            logo: normalFocusIcon,
            price: "$85,125.00",
            activeCard: false
        },
        {
            title: "Todays Budger",
            logo: normalFocusIcon,
            price: "$85,125.00",
            activeCard: false
        }
    ]
    const dispatch = useAppDispatch()
    const users = useAppSelector(selectTableUsers)
    const [inputValue, setInputValue] = useState('')
    const [inputState, setInputState] = useState(false)
    const [activeCreateMenu, setActiveCreateMenu] = useState(false)
    const [activeUser, setActiveUser] = useState<User | null>(null)
    const [activeDeleteMenu, setActiveDeleteMenu] = useState(false)
    const [activeEditMenu, setActiveEditMenu] = useState(false)
    const [defaultArray, setDefaultArray] = useState(users)

    const changeInputState = () => {
        setInputState(true)
    }
    const outsideClick = () => {
        setInputState(false)
    }
    const closeCreateMenu = () => {
        setActiveCreateMenu(false)
    }
    const onSearchInput = (value: string) => {
        setInputValue(value)
        const filteredUsers = users.filter((user) => {
            return user.email.includes(value)
        })
        setDefaultArray(filteredUsers)
    }
    const onDeleteInput = () => {
        setInputValue('')
    }
    const onCreateButtonClick = () => {
        setActiveCreateMenu(true)
        setInputState(false)
    }
    const closeDeleteMenu = () => {
        setActiveDeleteMenu(false)
    }
    const onCLickDeleteButton = (user: User) => {
        setActiveDeleteMenu(true)
        setActiveUser(user)
    }
    const closeEditMenu = () => {
        setActiveEditMenu(false)
    }
    const onClickEditButton = (user: User) => {
        setActiveEditMenu(true)
        setActiveUser(user)
    }
    const onNameClick = () => {
        const filteredNamesArray = defaultArray.filter((user) => user.name);
        filteredNamesArray.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        setDefaultArray(filteredNamesArray)
    };
    const onEmailClick = () => {
        const filteredNamesArray = defaultArray.filter((user) => user.email);
        filteredNamesArray.sort((a, b) => {
            const nameA = a.email.toLowerCase();
            const nameB = b.email.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        setDefaultArray(filteredNamesArray)
    };
    const onStatusClick = () => {
        const filteredNamesArray = defaultArray.filter((user) => user.status);
        filteredNamesArray.sort((a, b) => {
            const nameA = a.status.toLowerCase();
            const nameB = b.status.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        setDefaultArray(filteredNamesArray)
    };
    const onRoleClick = () => {
        const filteredNamesArray = defaultArray.filter((user) => user.role);
        filteredNamesArray.sort((a, b) => {
            const nameA = a.role.toLowerCase();
            const nameB = b.role.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        setDefaultArray(filteredNamesArray)
    };
    
    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        if (storedUsers.length) {
            dispatch(updateUserList(storedUsers));
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
        setDefaultArray(users)
    }, [users]);
    const ref = useOutsideClick({ callback: outsideClick })
    return (
        <div className={s.table__container}>
            <div className={s.table__wrapper}>
                <div className={`${s.table__menu} ${s.menu}`}>
                    <div className={s.menu__profile}>
                        <div className={s.menu__text__and__logo}>
                            <img src={profileImage} className={s.menu__image} />
                            <div className={s.menu__text}>
                                <p>Welcome back,</p>
                                <h2>Drax</h2>
                            </div>
                        </div>
                        <div className={s.menu__settings__container}>
                            <img src={settingImage} className={s.menu__setting} />
                        </div>
                    </div>
                    <div className={s.navbar}>
                        <div className={s.navlinks}>
                            {
                                navLinks.map((item) => {
                                    return (
                                        <div className={`${item.activeItem === true ? s.navlinks__navlink__active : ''} ${s.navlinks__navlink}`}>
                                            <div className={s.navlinks__text_and_logo}>
                                                <img className={s.navlinks__logo} src={item.logo} />
                                                <p>{item.text}</p>
                                            </div>
                                            <div className={s.navlinks__menu__container}>
                                                <img className={s.navlinks__menu_logo} src={item.menuLogo} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={s.navlinks__under}>
                            <div className={s.navlinks__link}>
                                <div className={s.navlinks__text_and_logo}>
                                    <img className={s.navlinks__logo} src={supportLogo} />
                                    <p>Support</p>
                                </div>
                            </div>
                            <div className={s.navlinks__link}>
                                <div className={s.navlinks__text_and_logo}>
                                    <img className={s.navlinks__logo} src={outLogo} />
                                    <p>Sign Out</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.table__content}>
                    <div className={s.header}>
                        <h1>Data Table</h1>
                        <div ref={ref} className={s.header__input_and_button}>
                            <div className={`${inputState ? s.header__search__active : ''} ${s.header__search}`}>
                                <button className={s.header__search__icon}>
                                    <img src={search} />
                                </button>
                                <input type="text" onClick={changeInputState} className={s.header__search__input} placeholder="Пошук" value={inputValue} onChange={(e) => { onSearchInput(e.target.value) }} />
                                {
                                    inputValue.length > 0 ?
                                        <button onClick={onDeleteInput} className={s.header__delete__icon}>
                                            <img src={deleteLogo} />
                                        </button>
                                        :
                                        ''
                                }
                            </div>
                            <button className={s.header__button} onClick={onCreateButtonClick}>Add Employee</button>
                        </div>
                    </div>
                    <div className={s.main}>
                        <div className={s.main__text_and_blocks}>
                            <div className={s.main__text}>
                                <h2>Employee</h2>
                                <p>18 results found</p>
                            </div>
                            <div className={s.main__blocks}>
                                {
                                    cards.map((card) => {
                                        return (
                                            <Card title={card.title} price={card.price} logo={card.logo} activeCard={card.activeCard} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={s.table__info}>
                            <div className={s.table__titles}>
                                <button onClick={onNameClick} className={`${s.table__title} ${s.table__title_first}`}>
                                    <p>Name</p>
                                    <img src={onIconFocus} />
                                </button>
                                <button onClick={onEmailClick} className={`${s.table__title} ${s.table__title_second}`}>
                                    <p>Email</p>
                                    <img src={onIconFocus} />
                                </button>
                                <button onClick={onStatusClick} className={`${s.table__title} ${s.table__title_third}`}>
                                    <p>Status</p>
                                    <img src={onIconFocus} />
                                </button>
                                <button onClick={onRoleClick} className={`${s.table__title} ${s.table__title_fourty}`}>
                                    <p>Role</p>
                                    <img src={onIconFocus} />
                                </button>
                            </div>
                            <div className={s.table__users}>
                                {
                                    defaultArray.map((userInfo) => {
                                        return (
                                            <div className={s.table__userInfo}>
                                                <div className={s.table__user}>
                                                    <div className={s.table__avatar}>
                                                        {userInfo.name.charAt(0)}
                                                    </div>
                                                    <p className={s.table__userName}>{userInfo.name}</p>
                                                </div>
                                                <div className={s.table__userEmail}>
                                                    <p>{userInfo.email}</p>
                                                </div>
                                                <div className={s.table__userStatus}>
                                                    <p>{userInfo.status}</p>
                                                </div>
                                                <div className={s.table__userRole_and_logos}>
                                                    <div className={s.table__userRole}>
                                                        <p>{userInfo.role}</p>
                                                    </div>
                                                    <div className={s.table__logos}>
                                                        <button onClick={() => onClickEditButton(userInfo)} className={s.table__corect}>
                                                            <img src={correctLogo} />
                                                        </button>
                                                        <button onClick={() => onCLickDeleteButton(userInfo)} className={s.table__delete}>
                                                            <img src={deletingLogo} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {
                    activeCreateMenu
                    ?
                    <CreateUserModal onCloseFunc={closeCreateMenu} />
                    : ''
                }
                {
                    activeUser && activeDeleteMenu 
                    ? 
                    <DeleteUserModal onCloseFunc={closeDeleteMenu} user={activeUser} />
                    : ''
                }
                {
                    activeUser && activeEditMenu
                    ?
                    <EditUserModal onCloseFunc={closeEditMenu} user={activeUser} />
                    : ''
                }
            </div>
        </div>
    )
}