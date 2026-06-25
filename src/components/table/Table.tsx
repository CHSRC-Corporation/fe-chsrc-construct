import {
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';
import './table.scss';

/* Tabela com a mesma estrutura/composição do componente Table do Shadcn
   (Table / TableHeader / TableBody / TableRow / TableHead / TableCell),
   porém estilizada com o design system SCSS do projeto. */

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function Table({
  className,
  ...props
}: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="ui-table-wrap">
      <table className={cx('ui-table', className)} {...props} />
    </div>
  );
}

export function TableHeader(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className="ui-table__header" {...props} />;
}

export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className="ui-table__body" {...props} />;
}

export function TableRow({
  className,
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cx('ui-table__row', className)} {...props} />;
}

export function TableHead({
  className,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={cx('ui-table__head', className)} {...props} />;
}

export function TableCell({
  className,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cx('ui-table__cell', className)} {...props} />;
}
