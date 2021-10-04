import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LooadingIcon } from "./../icons";
import api from "./../services/api";

import ImageDark from "./../assets/img/create-account-office-dark.jpeg";

function CriaConta() {
  let history = useHistory();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState([]);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setErrors([])
    setLoading(true);
    try {
      const response = await api.post("/v1/usuarios", {
        nome,
        email,
        cpf,
      });

      if (response.status === 201) {
        setTimeout(() => {
          toast.success("Conta criada com sucesso!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            onClose: () => history.push("/login"),
          });
          resetForm();
          setLoading(false);
        }, 400);
      }
    } catch (error) {
      setTimeout(() => {
        const { response } = error;
        if (response) {
          if (response && response.status === 400) {
            const { data } = response;
            if (data.codigo && data.codigo === "validacao") {
              const { campos } = data;
              const errors = campos.map((a, b) => {
                return a.mensagem;
              });
              setErrors(errors);
              window.scrollTo(0, 0);
            }
          } else {
            setErrors(["Falha ao tentar realizar sua requisição"]);
          }
        } else {
          setErrors(["Falha ao tentar realizar sua requisição"]);
        }
        setLoading(false)
      }, 400);
    }
  }

  const resetForm = () => {
    setNome("");
    setEmail("");
    setCpf("");
  };
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="block object-cover w-full h-full"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Criar conta
              </h1>
              {errors.length > 0 && (
                <div className="w-full bg-red-500 px-4 py-2 mb-3 rounded-md text-white dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600">
                  {errors.map((item, index) => (
                    <span key={index} className="block text-sm">
                      * {item}.
                    </span>
                  ))}
                </div>
              )}
              <form onSubmit={handleFormSubmit}>
                <label className="block text-sm text-gray-700 dark:text-gray-400">
                  <span>Nome</span>
                  <input
                    className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
                    type="text"
                    value={nome}
                    required
                    autocomplete="new-password"
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="john"
                  />
                </label>
                <label className="block text-sm text-gray-700 dark:text-gray-400 mt-4">
                  <span>Email</span>
                  <input
                    className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
                    type="email"
                    value={email}
                    required
                    autocomplete="new-password"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@doe.com"
                  />
                </label>
                <label className="block text-sm text-gray-700 dark:text-gray-400 mt-4">
                  <span>CPF</span>
                  <input
                    className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
                    type="text"
                    value={cpf}
                    required
                    autocomplete="new-password"
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="123.456.789-00"
                  />
                </label>

                <label className="block text-sm text-gray-700 dark:text-gray-400 inline-flex items-center mt-6">
                  <input
                    className="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700"
                    type="checkbox"
                  />
                  <span className="ml-2">
                    I agree to the{" "}
                    <span className="underline">privacy policy</span>
                  </span>
                </label>
                <button
                  className={`${
                    loading ? "opacity-80 pointer-events-none" : ""
                  } align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:shadow-outline-purple w-full mt-4`}
                  type="submit"
                  disabled={loading}
                >
                  {loading && <LooadingIcon className="animate-spin w-5 h-5" />}
                  {!loading && "Criar conta"}
                </button>
              </form>
              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  Você já possui uma conta? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CriaConta;
