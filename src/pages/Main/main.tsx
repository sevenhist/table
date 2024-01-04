import s from './Main.module.scss';
import 'swiper/css';
import swipeimg from '../../img/coffeemaschine.webp';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { RedButton, RedLinkButton } from 'components/ui/Button';
import { Container } from 'components/ui/Container';


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
                            autoplay={{ delay: 3000 }}
                            speed={1000}
                            loop={true}
                        >
                            {slides.map(item => (
                                <SwiperSlide>
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