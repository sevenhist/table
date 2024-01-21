import s from './Main.module.scss';
import 'swiper/css';
import swipeimg from '../../img/coffeemaschine.webp';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { LinkButton, RedButton, RedLinkButton } from 'components/ui/Button';
import { Container } from 'components/ui/Container';
import { ROUTES } from 'app/routes';


export const Main = () => {
    const slides = [
        {
            image: swipeimg,
            title: 'Кофемашина',
            action: 'Акція -35%',
            sale: 'Встигни купити дешевше',
            buttonText: 'Дізнатись детальніше'
        },
        {
            image: swipeimg,
            title: 'Кофемашина 1',
            action: 'Акція -55%',
            sale: 'Встигни купити дешевше',
            buttonText: 'Дізнатись детальніше'
        },
        {
            image: swipeimg,
            title: 'Кофемашина 2',
            action: 'Акція -75%',
            sale: 'Встигни купити дешевше',
            buttonText: 'Дізнатись детальніше'
        }
    ]

    return (
        <Container>
            <div className={s.main}>
                <div className={s.main__wrapper}>
                    <div className={s.mySwiper}>
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={-10}
                            slidesPerView={1}
                            // autoplay={{ delay: 3000 }}
                            
                            speed={1000}
                            loop={true}
                            className={s.swiper}
                        >
                            {slides.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className={s.slide}>
                                        <img className={s.slide__img} src={item.image} />
                                        <div className={s.slide__block}>
                                            <h3 className={s.slide__title}>{item.title}</h3>
                                            <h2 className={s.slide__action}>{item.action}</h2>
                                            <h3 className={s.slide__sale}>{item.sale}</h3>
                                            <RedButton className={s.slide__button}>{item.buttonText}</RedButton>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className={s.catalog__button__container}>
                        <LinkButton to={ROUTES.catalog} variables="fitContent" className={s.button__catalog}>
                            <svg className={s.menu__catalog__icon} viewBox="0 0 24 24" fill="currentColor" id="icon-catalog"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m17 2.75735-4.2427 4.24264 4.2427 4.24261 4.2426-4.24261zm-5.6569 2.82843c-.7811.78104-.7811 2.04738 0 2.82842l4.2426 4.2427c.7811.781 2.0475.781 2.8285 0l4.2426-4.2427c.781-.78104.781-2.04738 0-2.82842l-4.2426-4.24264c-.781-.781048-2.0474-.781048-2.8285 0z"></path><path d="m7 4h-4c-.55228 0-1 .44772-1 1v4c0 .5523.44772 1 1 1h4c.55228 0 1-.4477 1-1v-4c0-.55228-.44772-1-1-1zm-4-2c-1.65685 0-3 1.34315-3 3v4c0 1.6569 1.34315 3 3 3h4c1.65685 0 3-1.3431 3-3v-4c0-1.65685-1.34315-3-3-3z"></path><path d="m7 16h-4c-.55228 0-1 .4477-1 1v4c0 .5523.44772 1 1 1h4c.55228 0 1-.4477 1-1v-4c0-.5523-.44772-1-1-1zm-4-2c-1.65685 0-3 1.3431-3 3v4c0 1.6569 1.34315 3 3 3h4c1.65685 0 3-1.3431 3-3v-4c0-1.6569-1.34315-3-3-3z"></path><path d="m19 16h-4c-.5523 0-1 .4477-1 1v4c0 .5523.4477 1 1 1h4c.5523 0 1-.4477 1-1v-4c0-.5523-.4477-1-1-1zm-4-2c-1.6569 0-3 1.3431-3 3v4c0 1.6569 1.3431 3 3 3h4c1.6569 0 3-1.3431 3-3v-4c0-1.6569-1.3431-3-3-3z"></path></g></svg>
                            <span>Каталог товарів</span>
                        </LinkButton>
                    </div>
                    <div className={s.small__actions}>
                        <div className={`${s.small__action} ${s.action}`}>
                            <h2 className={s.action__title}>SIEMENS TE651319RW</h2>
                            <p className={s.action__sale}>-50%</p>
                            <p className={s.action__text}>Встигни купити дешевше!</p>
                            <div className={s.action__image}>
                                <img src='https://www.visitdubai.com/-/media/images/leisure/campaigns/dubai-presents/itineraries/nature/nature-header-2.jpg?&cw=256&ch=256' />
                                <div className={s.action__prices}>
                                    <div className={s.action__prices__old}>33999</div>
                                    <div className={s.action__prices__new}>16999</div>
                                </div>
                            </div>
                            <RedLinkButton href='#'>Купити</RedLinkButton>
                        </div>
                        <div className={`${s.small_action} ${s.action}`}>
                            <h2 className={s.action__title}>PHILIPS EP0820/00</h2>
                            <p className={s.action__sale}>-25%</p>
                            <p className={s.action__text}>Встигни купити дешевше!</p>
                            <div className={s.action__image}>
                                <img src='https://content1.rozetka.com.ua/goods/images/big/297049203.jpg' />
                                <div className={s.action__prices}>
                                    <div className={s.action__prices__old}>10000</div>
                                    <div className={s.action__prices__new}>7500</div>
                                </div>
                            </div>
                            <RedLinkButton href='#'>Купити</RedLinkButton>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};