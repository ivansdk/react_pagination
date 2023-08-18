import cn from "classnames";

type Props = {
  total: string[];
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => any;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pages = Math.ceil(total.length / perPage);

  // Згенерувати сторінки на основі pages
  let pageArr = [];
  for (let i = 0; i < pages; i++) {
    pageArr.push(i + 1);
  }

  return (
    <ul className="pagination">
      <li
        className={cn("page-item", {
          disabled: currentPage === 1,
        })}
        onClick={(e) => {
          if (
            e.target instanceof HTMLElement &&
            !e.target.classList.contains("disabled")
          ) {
            onPageChange(currentPage - 1);
          }
        }}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
        >
          «
        </a>
      </li>
      {pageArr.map((page) => (
        <li
          className={cn("page-item", {
            active: page === currentPage,
          })}
          onClick={() => {
            if (currentPage !== page) {
              onPageChange(page);
            }
          }}
        >
          <a data-cy="pageLink" className="page-link" href={`#${page}`}>
            {page}
          </a>
        </li>
      ))}
      <li
        className={cn("page-item", {
          disabled: currentPage === pages,
        })}
        onClick={(e) => {
          if (
            e.target instanceof HTMLElement &&
            !e.target.classList.contains("disabled")
          ) {
            onPageChange(currentPage + 1);
          }
        }}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
        >
          »
        </a>
      </li>
    </ul>
  );
};
