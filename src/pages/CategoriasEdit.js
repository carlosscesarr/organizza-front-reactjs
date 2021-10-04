import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../services/api";
import { LooadingIcon } from "./../icons";
import { PageTitle } from "../components/Typography";

const CategoriasAdd = () => {
  const { id } = useParams();
  let history = useHistory();

  const [descricao, setDescricao] = useState("");
  const [ativo, setAtivo] = useState("");
  const [tipoCategoria, setTipoCategoria] = useState("");

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("@controle-financeiro/token");
  });

  useEffect(() => {
    async function getCategoria(id) {
      try {
        const response = await api.get(`/v1/categorias/${id}`);
        const { data } = response;

        setAtivo(data.ativo ?? "");
        setDescricao(data.descricao ?? "");
        setTipoCategoria(data.tipo_categoria ?? "");
      } catch (error) {
        const { response } = error;
        if (response) {
          if (response.status === 404) {
            toast.error("Categoria não encontrada", {
              autoClose: 2000,
              hideProgressBar: true,
              onClose: () => history.push("/app/categorias"),
            });
          } else {
            setErrors(["Falha ao tentar realizar sua requisição"]);
          }
        } else {
          setErrors(["Falha ao tentar realizar sua requisição"]);
        }
      }
    }
    getCategoria(id);
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    function showToasSuccess() {
      toast.success("Categoria salva com sucesso", {
        autoClose: 2400,
        hideProgressBar: true,
      });
    }

    //setLoading(true);
    const errorsForm = handleValidation();
    if (errorsForm.length > 0) {
      window.scrollTo(0, 0);
      setErrors(errorsForm);
      setLoading(false);
      return;
    }

    try {
      const response = await api.put(`/v1/categorias/${id}`, {
        descricao,
        ativo,
        tipo_categoria: tipoCategoria
      });

      if (response.status === 200) {
        setErrors([]);
        showToasSuccess();
      }
    } catch (error) {
      const { response } = error;
      if (response) {
        if (response.status === 400) {
          const { data } = response;
          if (data.codigo && data.codigo === "validacao") {
            const { campos } = data;
            const errors = campos.map((a, b) => {
              return a.mensagem;
            });
            setErrors(errors);
            window.scrollTo(0, 0);
          }
        } else if (response.status === 404) {
          toast.error("Categoria não encontrada", {
            autoClose: 2400,
            hideProgressBar: true,
          });
        } else {
          setErrors(["Falha ao tentar realizar sua requisição"]);
        }
      } else {
        setErrors(["Falha ao tentar realizar sua requisição"]);
      }
    }

    setLoading(false);
  };

  const handleValidation = () => {
    const errorsForm = [];
    // Require username to have a value on submit

    if (descricao.length === 0) {
      errorsForm.push("O campo 'Descrição' deve ser preenchido");
    }
    if (ativo.length === 0) {
      errorsForm.push("O campo 'Ativo' deve ser preenchido");
    }
    if (tipoCategoria.length === 0) {
      errorsForm.push("O campo 'Tipo' deve ser preenchido");
    }

    // If those conditions are met, then return error messaging
    return errorsForm;
  };

  return (
    <>
      <PageTitle>Edição de categorias</PageTitle>

      <section className="max-w-4xl p-6 bg-white rounded-md shadow-md dark:bg-gray-800">
        {errors.length > 0 && (
          <div className="w-full bg-red-500 px-4 py-2 rounded-md text-white dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600">
            {errors.map((item, index) => (
              <span key={index} className="block">
                * {item}.
              </span>
            ))}
          </div>
        )}
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 font-semibold dark:text-gray-200"
                htmlFor="descricao"
              >
                Descrição
              </label>
              <input
                id="descricao"
                name="descricao"
                onChange={(e) => setDescricao(e.target.value)}
                value={descricao}
                autocomplete="off"
                placeholder="Digite aqui o descricao da categoria"
                type="text"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-purple-400 dark:focus:border-gray-500 focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-1 sm:grid-cols-2">
            <div className="mt-4 space-y-4">
              <label
                className="text-gray-700 font-semibold dark:text-gray-200 block"
                htmlFor="ativo"
              >
                Tipo
              </label>
              <div className="flex items-center">
                <input
                  id="tipo-despesa"
                  name="tipo_categoria"
                  type="radio"
                  onChange={(e) => setTipoCategoria(e.target.value)}
                  value="DESPESA"
                  checked={tipoCategoria === "DESPESA"}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 cursor-pointer"
                />
                <label
                  htmlFor="tipo-despesa"
                  className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Despesa
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="tipo-receita"
                  name="tipo_categoria"
                  onChange={(e) => setTipoCategoria(e.target.value)}
                  type="radio"
                  value="RECEITA"
                  checked={tipoCategoria === "RECEITA"}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 cursor-pointer"
                />
                <label
                  htmlFor="tipo-receita"
                  className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Receita
                </label>
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <label
                className="text-gray-700 font-semibold dark:text-gray-200 block"
                htmlFor="ativo"
              >
                Ativo?
              </label>
              <div className="flex items-center">
                <input
                  id="ativo-sim"
                  name="ativo"
                  type="radio"
                  onChange={(e) => setAtivo(e.target.value)}
                  value="S"
                  checked={ativo === "S"}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 cursor-pointer"
                />
                <label
                  htmlFor="ativo-sim"
                  className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Sim
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="ativo-nao"
                  name="ativo"
                  onChange={(e) => setAtivo(e.target.value)}
                  type="radio"
                  value="N"
                  checked={ativo === "N"}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 cursor-pointer"
                />
                <label
                  htmlFor="ativo-nao"
                  className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Não
                </label>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Link
              to="/app/categorias"
              className="text-sm px-5 py-1.5 leading-5 mr-2 text-white transition-colors duration-200 transform bg-gray-600 rounded-md hover:bg-gray-500 focus:outline-none focus:bg-gray-500"
            >
              Voltar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "opacity-70 pointer-events-none" : ""
              } px-5 text-center text-sm py-1.5 leading-5 text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600`}
            >
              {loading && <LooadingIcon className="animate-spin w-5 h-5" />}
              {!loading && "Salvar"}
            </button>
          </div>
        </form>
      </section>
      <ToastContainer />
    </>
  );
};

export default CategoriasAdd;
