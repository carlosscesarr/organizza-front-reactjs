import React from "react";

// import { Container } from './styles';

function Pagination({
  totalCount,
  currentOffset,
  limit,
  handleNextPage,
  handlePreviousPage,
}) {
  let totalPage = Math.ceil(totalCount / limit);
  let currentPage = currentOffset / limit + 1;
  return (
    <div className="px-4 py-3 bg-gray-50 text-gray-500 dark:text-gray-400 dark:bg-gray-800">
      <div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600 dark:text-gray-400">
        <span className="flex items-center font-semibold tracking-wide uppercase">
          Mostrando {currentOffset + 1}-{currentOffset + limit} de {totalCount}
        </span>
        <div className="flex mt-2 sm:mt-auto sm:justify-end">
          <nav aria-label="Table navigation">
            <ul className="inline-flex items-center">
              <li>
                <button
                  className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 hover:bg-gray-100 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent"
                  disabled={currentOffset <= 0 ? "disabled" : ""}
                  type="button"
                  aria-label="Previous"
                  onClick={handlePreviousPage}
                >
                  <svg
                    className="h-5 w-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
              <li>
                <input
                  className="border-gray-400 border rounded w-10 h-7 px-2  text-center focus:outline-none"
                  value={currentPage}
                  type="text"
                  onChange={() => {}}
                  name="page"
                  id="page"
                />
                <span className="ml-1">de {totalPage}</span>
              </li>
              <li>
                <button
                  className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:shadow-outline-gray dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
                  type="button"
                  disabled={currentPage >= totalPage ? "disabled" : ""}
                  aria-label="Next"
                  onClick={handleNextPage}
                >
                  <svg
                    className="h-5 w-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
