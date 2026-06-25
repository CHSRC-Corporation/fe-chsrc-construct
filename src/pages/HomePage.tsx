import { FaGraduationCap } from 'react-icons/fa';
import { Carousel } from '../components/carousel/Carousel';
import { CourseCard } from '../components/courseCard/CourseCard';
import { tracks } from '../data/courses';
import './home.scss';

export function HomePage() {
  return (
    <section className="home">
      <header className="home__hero">
        <span className="home__badge">
          <FaGraduationCap aria-hidden="true" />
          Trilhas de ensino
        </span>
        <h2 className="home__hero-title">
          Continue construindo seu conhecimento
        </h2>
        <p className="home__hero-text">
          Escolha uma aula e comece agora. Conteúdo 100% gratuito de engenharia
          civil, organizado em trilhas para você aprender no seu ritmo.
        </p>
      </header>

      <div className="home__tracks">
        {tracks.map((track) => (
          <div className="home__track" key={track.id}>
            <Carousel title={track.title} subtitle={track.subtitle}>
              {track.lessons.map((lesson, index) => (
                <CourseCard key={lesson.id} lesson={lesson} index={index} />
              ))}
            </Carousel>
          </div>
        ))}
      </div>
    </section>
  );
}
