import './Main.scss';
import 'swiper/css';
import swipeimg from '../../img/coffeemaschine.webp';
import { Swiper, SwiperSlide } from 'swiper/react';
import { RedButton, RedLinkButton } from 'components/UI/Button';
import { Autoplay } from 'swiper/modules';


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
      <div className='main'>
          <div className="main__wrapper">
                <div className="mySwiper">
                  <Swiper
                      modules={[Autoplay]}
                      spaceBetween={0}
                      slidesPerView={1}
                      autoplay={{ delay: 3000 }}
                      speed={1000}
                      loop={true}
                    >
                    {slides.map(item => (
                        <SwiperSlide>
                            <div className='slide'>
                                  <img className='slide__img' src={item.image} />
                                  <div className='slide__block'>
                                      <h3 className='slide__title'>{item.title}</h3>
                                      <h2 className='slide__action'>{item.action}</h2>
                                      <h3 className='slide__sale'>{item.sale}</h3>
                                      <RedButton className="slide__button">{item.buttonText}</RedButton>
                                  </div>
                            </div>
                        </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              <div className='small__actions'>
                    <div className='small__action action'>
                        <h2 className='action__title'>SIEMENS TE651319RW</h2>
                        <p className='action__sale'>-50%</p>
                        <p className='action__text'>Встигни купити дешевше!</p>
                        <div className='action__image'>
                            <img src='https://www.visitdubai.com/-/media/images/leisure/campaigns/dubai-presents/itineraries/nature/nature-header-2.jpg?&cw=256&ch=256'/>
                            <div className='action__prices'>
                                <div className="action__prices__old">33999</div>
                                <div className='action__prices__new'>16999</div>
                            </div>
                        </div>
                        <RedLinkButton href='#'>Купити</RedLinkButton>
                    </div>
                    <div className='small_action action'>
                    <h2 className='action__title'>PHILIPS EP0820/00</h2>
                        <p className='action__sale'>-25%</p>
                        <p className='action__text'>Встигни купити дешевше!</p>
                        <div className='action__image'>
                            <img src='https://content1.rozetka.com.ua/goods/images/big/297049203.jpg'/>
                            <div className='action__prices'>
                                <div className="action__prices__old">10000</div>
                                <div className='action__prices__new'>7500</div>
                            </div>
                        </div>
                        <RedLinkButton href='#'>Купити</RedLinkButton>
                    </div>
              </div>
          </div>
      </div>
  );
};