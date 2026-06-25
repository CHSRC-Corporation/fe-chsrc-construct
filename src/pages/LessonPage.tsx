import { Link, Navigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaRegClock, FaSignal } from 'react-icons/fa';
import { Carousel } from '../components/carousel/Carousel';
import { CourseCard } from '../components/courseCard/CourseCard';
import { findLesson } from '../data/courses';
import './lesson.scss';

export function LessonPage() {
  const { id } = useParams();
  const found = findLesson(id);

  if (!found) {
    return <Navigate to="/home" replace />;
  }

  const { lesson, track } = found;
  const others = track.lessons.filter((item) => item.id !== lesson.id);

  return (
    <section className="lesson">
      <Link to="/home" className="lesson__back">
        <FaArrowLeft size={13} />
        Voltar para as trilhas
      </Link>

      <div className="lesson__player">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${lesson.youtubeId}?rel=0`}
          title={lesson.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="lesson__info">
        <span className="lesson__track-tag">{track.title}</span>
        <h2 className="lesson__title">{lesson.title}</h2>
        <div className="lesson__meta">
          <span>
            <FaSignal size={12} /> {lesson.level}
          </span>
          <span>
            <FaRegClock size={12} /> {lesson.duration}
          </span>
        </div>
        <p className="lesson__desc">{lesson.description}</p>
      </div>

      {others.length > 0 ? (
        <div className="lesson__more">
          <Carousel title="Continue na trilha" subtitle={track.subtitle}>
            {others.map((item, index) => (
              <CourseCard key={item.id} lesson={item} index={index} />
            ))}
          </Carousel>
        </div>
      ) : null}
    </section>
  );
}
