import { Link } from 'react-router-dom';
import { FaPlay, FaRegClock } from 'react-icons/fa';
import type { Lesson } from '../../data/courses';
import './courseCard.scss';

type CourseCardProps = {
  lesson: Lesson;
  /** Usado apenas para variar a cor do thumbnail. */
  index?: number;
};

export function CourseCard({ lesson, index = 0 }: CourseCardProps) {
  const variant = (index % 4) + 1;

  return (
    <Link to={`/aula/${lesson.id}`} className="course-card">
      <div className={`course-card__thumb course-card__thumb--${variant}`}>
        <span className="course-card__level">{lesson.level}</span>
        <span className="course-card__play" aria-hidden="true">
          <FaPlay size={16} />
        </span>
        <span className="course-card__duration">
          <FaRegClock size={12} />
          {lesson.duration}
        </span>
      </div>

      <div className="course-card__body">
        <h4 className="course-card__title">{lesson.title}</h4>
        <p className="course-card__desc">{lesson.description}</p>
      </div>
    </Link>
  );
}
