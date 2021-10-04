import React, { useEffect, useState } from "react";
import { PageTitle } from "../components/Typography";
import Pagination from "./../components/Pagination";
import api from "../services/api";

export default function Vendas() {
  const [vendas, setVendas] = useState([]);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [limit] = useState(5);

  useEffect(() => {
    async function loadVendas() {
      try {
        const { data } = await api.get(
          `/vendas?offset=${currentOffset}&limit=${limit}&sort=-data_cadastro`
        );
        setVendas(data);
      } catch (error) {
      }
    }

    loadVendas();
  }, [limit, currentOffset]);

  function handleNextPage() {
    setCurrentOffset(currentOffset + limit);
  }
  function handlePreviousPage() {
    setCurrentOffset(currentOffset - limit);
  }

  function StatusPagamento({ statusPagamento }) {
    let statusText = "";
    let statusClass =
      "inline-flex px-2 text-xs font-medium leading-5 rounded-full dark:text-white dark:bg-purple-600 ";
    switch (statusPagamento) {
      case "ABERTA":
        statusText = "ABERTA";
        statusClass += "text-orange-700 bg-orange-100";
        break;

      case "PAGA":
        statusText = "PAGO";
        statusClass += "text-green-700 bg-green-100";
        break;

      case "CANCELADA":
        statusText = "CANCELADA";
        statusClass += "text-red-700 bg-red-100";
        break;

      default:
        statusText = statusPagamento;
        statusClass += "text-orange-700 bg-orange-100";
        break;
    }
    return <span className={statusClass}>{statusText}</span>;
  }
  return (
    <>
      <PageTitle>Vendas</PageTitle>
      <div className="w-full overflow-hidden rounded-lg shadow-xs mb-8">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <tr>
                <td className="px-4 py-3">#</td>
                <td className="px-4 py-3">Cliente</td>
                <td className="px-4 py-3">Data</td>
                <td className="px-4 py-3">Valor</td>
                <td className="px-4 py-3">Total Pag.</td>
                <td className="px-4 py-3">Status Pag</td>
                <td className="px-4 py-3">Forma de Pag.</td>
                <td className="px-4 py-3">Ações</td>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
              {vendas?.data?.map((item, index) => {
                let valorTotal = Number(item.valor_total).toLocaleString(
                  "pt-BR",
                  { style: "currency", currency: "BRL" }
                );
                let valorTotalPago = Number(
                  item.valor_total_pago
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                });

                let dataCadastro = new Date(item.data_cadastro);
                dataCadastro =
                  dataCadastro.getDate() +
                  "/" +
                  (dataCadastro.getMonth() + 1) +
                  "/" +
                  dataCadastro.getFullYear() +
                  " às " +
                  dataCadastro.getHours() +
                  ":" +
                  dataCadastro.getMinutes();

                return (
                  <tr key={`${index}`} className="">
                    <td className="px-4 py-3">
                      <span className="text-sm">{item.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm">{item.cliente.nome}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm">{dataCadastro}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm">{valorTotal}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm">{valorTotalPago}</span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusPagamento statusPagamento={item.situacao} />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm">
                        {item.forma_pagamento.nome}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-4">
                        <button
                          className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:shadow-outline-gray dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
                          type="button"
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
                        </button>
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
              {/*}
              <tr className="">
                <td className="px-4 py-3">
                  <span className="text-sm">1</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">$ 989.4</span>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-purple-700 bg-purple-100 dark:text-white dark:bg-purple-600">
                    primary
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">03/02/2020</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">03/02/2020</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">03/02/2020</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">03/02/2020</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-4">
                    <button
                      className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:shadow-outline-gray dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
                      type="button"
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
                    </button>
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
              <tr className="">
                <td className="px-4 py-3">
                  <span className="text-sm">1</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">$ 471.44</span>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-700 bg-red-100 dark:text-red-100 dark:bg-red-700">
                    danger
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">29/11/2019</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">29/11/2019</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">29/11/2019</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">29/11/2019</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-4">
                    <button
                      className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:shadow-outline-gray dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
                      type="button"
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
                    </button>
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
              <tr className="">
                <td className="px-4 py-3">
                  <span className="text-sm">1</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">$ 934.24</span>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100">
                    success
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">03/04/2020</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">03/04/2020</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">03/04/2020</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">03/04/2020</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-4">
                    <button
                      className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:shadow-outline-gray dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
                      type="button"
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
                    </button>
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
            */}
            </tbody>
          </table>
        </div>
        <Pagination
          totalCount={vendas?.paginacao?.total_count ?? 0}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          currentOffset={currentOffset}
          limit={limit}
        />
      </div>
    </>
  );
}
