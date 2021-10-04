import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./../../services/api";
import Pagination from "./../Pagination";

export default function Products() {
  useEffect(() => {
    api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("@controle-financeiro/token");
  });

  const [products, setProducts] = useState([]);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [limit] = useState(5);

  useEffect(() => {
    async function loadCategorias() {
      const response = await api.get(
        `/v1/categorias?offset=${currentOffset}&limit=${limit}&sort=-id`
      );
      console.log(response);
      setProducts(response.data);
    }

    loadCategorias();
  }, [limit, currentOffset]);
  function handleNextPage() {
    setCurrentOffset(currentOffset + limit);
  }
  function handlePreviousPage() {
    setCurrentOffset(currentOffset - limit);
  }
  return (
    <div className="w-full overflow-hidden mb-8">
      <div className="w-full overflow-x-auto">
        
        <table
          style={{ borderSpacing: "0 15px" }}
          className="w-full table text-gray-400 border-separate space-y-6 text-sm table-default"
        >
          <thead className="bg-white text-gray-600">
            <tr
              style={{ borderRadius: "20px" }}
              className="border-gray-900 border-1"
            >
              <th className="p-3">Descrição</th>
              <th className="p-3 text-left border-gray-900 border-1">
                Status
              </th>
              <th className="p-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
          {products.data?.map((product, index) => {
              return (
                <tr key={`${index}`} className="">
                  <td className="p-3">
                    <div className="flex align-items-center">
                      <div className="ml-3">
                        <div className="text-gray-500">{product.descricao}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex align-items-center">
                      <div className="ml-3">
                        <div className="text-gray-500">{product.ativo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 ">
                  <div className="flex items-center space-x-4">
                      <Link
                        className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:shadow-outline-gray dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
                        type="button"
                        to={`categorias/${product.id}/editar`}
                        aria-label="Edit"
                      >
                        <svg
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          className="w-5 h-5"
                          aria-hidden="true"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                        </svg>
                      </Link>
                      <button
                        className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:shadow-outline-gray dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
                        type="button"
                        aria-label="Delete"
                      >
                        <svg
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          className="w-5 h-5"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            
          </tbody>
        </table>
      </div>
      <Pagination
        totalCount={products?.paginacao?.total_count ?? 0}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        currentOffset={currentOffset}
        limit={limit}
      />
    </div>
  );
}
