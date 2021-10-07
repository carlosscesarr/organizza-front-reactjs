import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./../../services/api";
import Pagination from "./../Pagination";
import { PlusIcon, SearchIcon } from "../../icons";

export default function CategoriasTable() {
  useEffect(() => {
    api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("@controle-financeiro/token");
  });

  const [categorias, setCategorias] = useState([]);
  const [searchDescricao, setSearchDescricao] = useState("");
  const [currentOffset, setCurrentOffset] = useState(0);
  const [limit] = useState(20);

  useEffect(() => {
    async function loadCategorias() {
      let response = await api.get(
        `/v1/categorias?offset=${currentOffset}&limit=${limit}&sort=-id`
      );

      const categoriasModificado = response.data.data.map((categoria) => {
        if (categoria.ativo === "S") {
          categoria.ativo_formatado = "ativo";
        } else {
          categoria.ativo_formatado = "inativo";
        }
        return categoria;
      });
      response.data.data = categoriasModificado;
      setCategorias(response.data);
    }

    loadCategorias();
  }, [limit, currentOffset]);

  function handleNextPage() {
    setCurrentOffset(currentOffset + limit);
  }

  function handlePreviousPage() {
    setCurrentOffset(currentOffset - limit);
  }

  function StatusCategoria({ status }) {
    let classeBgCor = "bg-green-400";
    let statusNome = "ativo";

    if (status === "N") {
      statusNome = "inativo";
      classeBgCor = "bg-red-400";
    }

    return (
      <span className={`${classeBgCor} text-gray-50 rounded-md px-2`}>
        {statusNome}
      </span>
    );
  }

  function TipoCategoria({ tipo }) {
    let classeBgCor = "bg-green-400";
    let statusNome = "receita";

    if (tipo === "DESPESA") {
      statusNome = "despesa";
      classeBgCor = "bg-red-400";
    }

    return (
      <span className={`${classeBgCor} text-gray-50 rounded-md px-2`}>
        {statusNome}
      </span>
    );
  }

  return (
    <div className="">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center lg:w-1/3 md:w-1/2">
          <input
            type="search"
            value={searchDescricao}
            onChange={e => setSearchDescricao(e.target.value)}
            className="w-full px-3 py-2 mr-2 rounded-lg focus:border-purple-400 focus:ring focus:ring-purple-300 focus:outline-none shadow text-gray-600 font-medium"
            placeholder="Descrição..."
          />
          <button onClick={() => {}} className="bg-gray-300 p-1.5 rounded-lg outline-none focus:outline-none">
            <SearchIcon className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        <div className="flex">
          <Link
            to="categorias/add"
            className="flex items-center justify-center px-2 py-1.5 text-white transition-colors duration-200 transform bg-purple-600 rounded-md dark:bg-gray-800 hover:bg-purple-700 dark:hover:bg-gray-700 focus:outline-none focus:bg-purple-500 dark:focus:bg-gray-700"
          >
            <PlusIcon className="w-5 h-5 mr-1 text-white" />
            adicionar
          </Link>
        </div>
      </div>
      <div className="overflow-auto lg:overflow-visible ">
        <table
          style={{ borderSpacing: "0 8px" }}
          className="w-full table text-gray-400 border-separate space-y-6 text-sm table-default"
        >
          <thead className="bg-white text-gray-600">
            <tr
              style={{ borderRadius: "20px" }}
              className="border-gray-900 border-1"
            >
              <th className="p-3">Descrição</th>
              <th className="p-3 text-left border-gray-900 border-1">Tipo</th>
              <th className="p-3 text-left border-gray-900 border-1">Status</th>
              <th className="p-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {categorias.data?.map((categoria, index) => {
              return (
                <tr key={`${categoria.id}`} className="bg-white">
                  <td className="p-3">
                    <div className="flex align-items-center">
                      <div className="ml-3">
                        <div className="text-gray-500 font-bold">
                          {categoria.descricao}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <TipoCategoria tipo={categoria.tipo_categoria} />
                  </td>
                  <td className="p-3">
                    <StatusCategoria status={categoria.ativo} />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-4">
                      <Link
                        className="p-1 align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none text-gray-500 dark:text-gray-400 border border-transparent active:bg-transparent hover:bg-gray-100 focus:shadow-outline-gray dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
                        to={`categorias/${categoria.id}/editar`}
                        aria-label="Editar"
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
                        className="p-1 align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none text-gray-500 dark:text-gray-400 border border-transparent active:bg-transparent hover:bg-gray-100 focus:shadow-outline-gray dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
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
        <Pagination
          totalCount={categorias?.paginacao?.total_count ?? 0}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          currentOffset={currentOffset}
          limit={limit}
        />
      </div>
    </div>
  );
}
