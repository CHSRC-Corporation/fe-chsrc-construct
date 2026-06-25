import { FormEvent, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaRegCommentDots } from 'react-icons/fa';
import { Button } from '../components/button/button';
import { findPost, type Comment } from '../data/forum';
import { formatDate, formatDateTime } from '../utils/formatDate';
import './post.scss';

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

// Cores determinísticas para os avatares a partir do nome.
const AVATAR_COLORS = ['#1f5fb0', '#143d72', '#2c6cb5', '#d4860c', '#1f9d6b'];
function avatarColor(name: string): string {
  const sum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

export function PostPage() {
  const { id } = useParams();
  const post = findPost(id);

  const [comments, setComments] = useState<Comment[]>(post?.comments ?? []);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  if (!post) {
    return <Navigate to="/forum" replace />;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!text.trim()) {
      setError('Escreva um comentário antes de enviar.');
      return;
    }

    setSending(true);
    // TODO(back-end): enviar o comentário para a API, ex.:
    // await fetch(`${import.meta.env.VITE_API_URL}/posts/${post.id}/comments`, {...})
    const newComment: Comment = {
      id: `local-${Date.now()}`,
      author: 'Você',
      createdAt: new Date().toISOString(),
      body: text.trim(),
    };
    setComments((prev) => [...prev, newComment]);
    setText('');
    setError('');
    setSending(false);
  };

  return (
    <section className="post">
      <Link to="/forum" className="post__back">
        <FaArrowLeft size={13} />
        Voltar para o fórum
      </Link>

      <article className="post__article">
        <span className="post__tag">{post.category}</span>
        <h2 className="post__title">{post.title}</h2>
        <div className="post__meta">
          <span
            className="post__avatar"
            style={{ background: avatarColor(post.author) }}
            aria-hidden="true"
          >
            {initials(post.author)}
          </span>
          <span className="post__meta-text">
            <strong>{post.author}</strong>
            <span>{formatDate(post.createdAt)}</span>
          </span>
        </div>
        <div className="post__body">
          {post.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      <section className="post__comments">
        <h3 className="post__comments-title">
          <FaRegCommentDots aria-hidden="true" />
          Comentários ({comments.length})
        </h3>

        <ul className="post__comment-list">
          {comments.map((comment) => (
            <li key={comment.id} className="post__comment">
              <span
                className="post__avatar"
                style={{ background: avatarColor(comment.author) }}
                aria-hidden="true"
              >
                {initials(comment.author)}
              </span>
              <div className="post__comment-content">
                <div className="post__comment-head">
                  <strong>{comment.author}</strong>
                  <span>{formatDateTime(comment.createdAt)}</span>
                </div>
                <p>{comment.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <form className="post__form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="comment" className="post__form-label">
            Deixe seu comentário
          </label>
          <textarea
            id="comment"
            className={`post__textarea ${error ? 'post__textarea--error' : ''}`}
            placeholder="Compartilhe sua resposta ou experiência..."
            rows={4}
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              if (error) setError('');
            }}
            aria-invalid={error ? true : undefined}
          />
          {error ? (
            <span className="post__form-error" role="alert">
              {error}
            </span>
          ) : null}
          <div className="post__form-actions">
            <Button type="submit" label="Enviar comentário" loading={sending} />
          </div>
        </form>
      </section>
    </section>
  );
}
