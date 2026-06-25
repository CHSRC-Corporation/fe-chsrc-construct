import { ReactNode, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './carousel.scss';

type CarouselProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function Carousel({ title, subtitle, children }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * el.clientWidth * 0.85,
      behavior: 'smooth',
    });
  };

  return (
    <section className="carousel">
      <div className="carousel__head">
        <div>
          <h3 className="carousel__title">{title}</h3>
          {subtitle ? <p className="carousel__subtitle">{subtitle}</p> : null}
        </div>
        <div className="carousel__nav">
          <button
            type="button"
            className="carousel__arrow"
            aria-label="Voltar"
            onClick={() => scroll(-1)}
          >
            <FaChevronLeft size={14} />
          </button>
          <button
            type="button"
            className="carousel__arrow"
            aria-label="Avançar"
            onClick={() => scroll(1)}
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="carousel__track" ref={trackRef}>
        {children}
      </div>
    </section>
  );
}
