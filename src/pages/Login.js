import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "./../services/api";
import { LooadingIcon } from "./../icons";
import FooterLogin from "../components/FooterLogin";

function Login() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState([]);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/v1/auth/login", {
        email,
        senha,
      });

      if (response.status === 200) {
        const { data } = response;
        resetForm();
        setLoading(false);
        localStorage.setItem("@controle-financeiro/token", data.acesso_token);
        history.push("/app");
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
          setErrors(["Email e/ou senha inválidos!"]);
        } else {
          setErrors(["Falha ao tentar realizar sua requisição"]);
        }
      } else {
        setErrors(["Falha ao tentar realizar sua requisição"]);
      }
      setLoading(false);
    }
  }

  const resetForm = () => {
    setEmail("");
    setSenha("");
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900 relative">
      <div className="flex-1 h-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <main className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full">
            <h1 className="mb-8 text-2xl text-center font-semibold text-gray-700 dark:text-gray-200">
              Organizza
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
                <span>Email</span>
                <input
                  className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
                  type="email"
                  name="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@exemplo.com"
                />
              </label>
              <label className="block text-sm text-gray-700 dark:text-gray-400 mt-4">
                <span>Senha</span>
                <input
                  className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
                  type="password"
                  name="senha"
                  value={senha}
                  required
                  autoComplete="off"
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="******"
                />
              </label>
              <button
                className={`${
                  loading ? "opacity-80 pointer-events-none" : ""
                } align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:shadow-outline-purple w-full mt-4`}
                type="submit"
              >
                {loading && <LooadingIcon className="animate-spin w-5 h-5" />}
                {!loading && "Entrar"}
              </button>
            </form>
            <hr className="my-8" />

            <p className="mt-4">
              <Link
                className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                to="/recuperar-senha"
              >
                Esqueceu sua senha?
              </Link>
            </p>
            <p className="mt-1">
              <Link
                className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                to="/criar-conta"
              >
                Criar conta
              </Link>
            </p>
          <FooterLogin />
          </div>
        </main>
      </div>
      
    </div>
  );
}

export default Login;
