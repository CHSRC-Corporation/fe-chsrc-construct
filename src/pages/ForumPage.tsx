import { KeyboardEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaChevronLeft,
  FaChevronRight,
  FaRegCommentDots,
} from 'react-icons/fa';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/table/Table';
import { posts } from '../data/forum';
import { formatDate } from '../utils/formatDate';
import './forum.scss';

const PAGE_SIZE = 6;

export function ForumPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(posts.length / PAGE_SIZE);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return posts.slice(start, start + PAGE_SIZE);
  }, [page]);

  const goTo = (id: string) => navigate(`/forum/${id}`);

  const handleRowKey = (
    event: KeyboardEvent<HTMLTableRowElement>,
    id: string
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      goTo(id);
    }
  };

  const rangeStart = (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, posts.length);

  return (
    <section className="forum">
      <header className="forum__header">
        <div>
          <span className="forum__badge">
            <FaRegCommentDots aria-hidden="true" />
            Comunidade
          </span>
          <h2 className="forum__title">Fórum</h2>
          <p className="forum__subtitle">
            Tire dúvidas, troque experiências e ajude outros estudantes de
            engenharia civil.
          </p>
        </div>
        <button type="button" className="forum__new">
          Novo tópico
        </button>
      </header>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tópico</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead className="forum__col-center">Respostas</TableHead>
            <TableHead>Atividade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageItems.map((post) => (
            <TableRow
              key={post.id}
              className="ui-table__row--clickable"
              role="link"
              tabIndex={0}
              onClick={() => goTo(post.id)}
              onKeyDown={(event) => handleRowKey(event, post.id)}
            >
              <TableCell>
                <span className="forum__topic-title">{post.title}</span>
                <span className="forum__topic-tag">{post.category}</span>
              </TableCell>
              <TableCell className="forum__author">{post.author}</TableCell>
              <TableCell className="forum__col-center">
                {post.comments.length}
              </TableCell>
              <TableCell className="forum__date">
                {formatDate(post.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="forum__pagination">
        <span className="forum__pagination-info">
          {rangeStart}–{rangeEnd} de {posts.length} tópicos
        </span>
        <div className="forum__pagination-controls">
          <button
            type="button"
            className="forum__page-btn"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Página anterior"
          >
            <FaChevronLeft size={12} />
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                className={`forum__page-btn ${
                  pageNumber === page ? 'forum__page-btn--active' : ''
                }`}
                onClick={() => setPage(pageNumber)}
                aria-current={pageNumber === page ? 'page' : undefined}
              >
                {pageNumber}
              </button>
            )
          )}
          <button
            type="button"
            className="forum__page-btn"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Próxima página"
          >
            <FaChevronRight size={12} />
          </button>
        </div>
      </div>
    </section>
  );
}
