import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import {pt} from "date-fns/locale";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PageTitle } from "../components/Typography";
import { moeda } from "./../utils/masks";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "../components/Modal";
import api from "../services/api";
import {
  CheckIcon,
  ExclamationIcon,
  LikeUpIcon,
  LikeDownIcon,
  LooadingIcon,
  ReceiveMoney,
  ChevronRight,
  TrashIcon,
  PlusIcon
} from "./../icons/index";

function Home() {
  const [errors, setErrors] = useState([]);
  const [mes, setMes] = useState(format(new Date(), "MM"));
  const [ano, setAno] = useState(format(new Date(), "yyyy"));
  const [mesAnoSelecionadoText, setMesAnoSelecionadoText] = useState("")
  const [loading, setLoading] = useState(false);
  const [modalLancamentoOpen, setModalLancamentoOpen] = useState(false);
  const [lancamentos, setLancamentos] = useState([]);

  const [categoriasDespesa, setCategoriasDespesa] = useState([]);
  const [categoriasReceita, setCategoriasReceita] = useState([]);
  const [categoriasLancamento, setCategoriasLancamento] = useState([]);

  const [balanco, setBalanco] = useState({});

  const [valorLancamento, setValorLancamento] = useState("");
  const [descricaoLancamento, setDescricaoLancamento] = useState("");
  const [categoriaLancamento, setCategoriaLancamento] = useState({});
  const [tipoLancamento, setTipoLancamento] = useState("DESPESA");
  const [dataLancamento, setDataLancamento] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [situacaoLancamento, setSituacaoLancamento] = useState("PENDENTE");
  
  useEffect(() => {
    setMesAnoSelecionadoText(format(new Date(parseISO(`${ano}-${mes}`)), "MMMM 'de' yyyy",{locale: pt}))
  }, [ano, mes])

  useEffect(() => {
    api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("@controle-financeiro/token"); 
  });

  useEffect(() => {
    async function loadCategorias() {
      try {
        const response = await api.get("/v1/categorias");
        if (response.status === 200) {
          const { data } = response;
          let dataCategoriasReceita = data?.data.filter(
            (categoria) => categoria.tipo_categoria === "RECEITA"
          );

          let dataCategoriasDespesa = data?.data.filter(
            (categoria) => categoria.tipo_categoria === "DESPESA"
          );

          dataCategoriasReceita = dataCategoriasReceita.map(
            (categoria, index) => {
              return { value: categoria.id, label: categoria.descricao };
            }
          );

          dataCategoriasDespesa = dataCategoriasDespesa.map(
            (categoria, index) => {
              return {
                value: categoria.id,
                label: categoria.descricao,
              };
            }
          );
          //console.log(dataCategoriasReceita);
          setCategoriasDespesa(dataCategoriasDespesa);
          setCategoriasReceita(dataCategoriasReceita);
        }
      } catch (error) {
      }
    }
    loadCategorias();
  }, []);

  useEffect(() => {
    const loadLancamentos = async () => {
      try {
        const response = await api.get(
          `/v1/lancamentos?ano=${ano}&mes=${mes}&sort=-data_lancamento&situacao=PENDENTE,RESOLVIDO`
        );
        if (response.status === 200) {
          const { data } = response;
          const dataModificada = data?.data.map((lancamento, index) => {
            let valorMod = moeda(lancamento.valor);
            if (lancamento.tipo_lancamento === "DESPESA") {
              valorMod = `-${valorMod}`;
            } else if (lancamento.tipo_lancamento === "RECEITA") {
              valorMod = `+${valorMod}`;
            }

            let parseDataLancamento = parseISO(lancamento.data_lancamento);
            let dataLancamentoMod = format(
              new Date(parseDataLancamento),
              "dd/MM/yyyy"
            );

            lancamento.situacao_mod = lancamento.situacao.toLowerCase();
            lancamento.data_lancamento_mod = dataLancamentoMod;
            lancamento.valor_mod = valorMod;
            return lancamento;
          });
          setBalanco({
            ...data.balanco,
            ...{
              total_receita_mod: moeda(data.balanco.total_receita),
              total_despesa_mod: moeda(data.balanco.total_despesa),
              total_saldo_mod: moeda(data.balanco.total_saldo),
              total_receita_previsto_mod: moeda(data.balanco.total_receita_previsto),
              total_despesa_previsto_mod: moeda(data.balanco.total_despesa_previsto),
              total_saldo_previsto_mod: moeda(data.balanco.total_saldo_previsto),
            },
          })
          const teste = {
            paginacao: { ...data.paginacao },
            data: [...dataModificada],
          };
          setLancamentos(teste);
        }
      } catch (error) {
        setLancamentos([]);
        if (error?.response.status === 404) {
          setBalanco({
              total_receita: "0,00",
              total_despesa: "0,00",
              total_saldo: "0,00",
              total_receita_previsto: "0,00",
              total_despesa_previsto: "0,00",
              total_saldo_previsto: "0,00",
              total_receita_mod: "0,00",
              total_despesa_mod: "0,00",
              total_saldo_mod: "0,00",
              total_receita_previsto_mod: "0,00",
              total_despesa_previsto_mod: "0,00",
              total_saldo_previsto_mod: "0,00",
          })
        }
      }
    };
    loadLancamentos();
  }, [ano, mes]);

  function abrirModal() {
    resetFormLancamento();
    setModalLancamentoOpen(true);
  }

  function fecharModal() {
    setModalLancamentoOpen(false);
  }

  const loadLancamentos = async () => {
    try {
      const response = await api.get(
        `/v1/lancamentos?ano=${ano}&mes=${mes}&sort=-id&situacao=PENDENTE,RESOLVIDO`
      );
      if (response.status === 200) {
        const { data } = response;
        const dataModificada = data?.data.map((lancamento, index) => {
          let valorMod = moeda(lancamento.valor);
          if (lancamento.tipo_lancamento === "DESPESA") {
            valorMod = `-${valorMod}`;
          } else if (lancamento.tipo_lancamento === "RECEITA") {
            valorMod = `+${valorMod}`;
          }

          let parseDataLancamento = parseISO(lancamento.data_lancamento);
          let dataLancamentoMod = format(
            new Date(parseDataLancamento),
            "dd/MM/yyyy"
          );

          lancamento.situacao_mod = lancamento.situacao.toLowerCase();
          lancamento.data_lancamento_mod = dataLancamentoMod;
          lancamento.valor_mod = valorMod;
          return lancamento;
        });
        
        setBalanco({
          ...data.balanco,
          ...{
            total_receita_mod: moeda(data.balanco.total_receita),
            total_despesa_mod: moeda(data.balanco.total_despesa),
            total_saldo_mod: moeda(data.balanco.total_saldo),
            total_receita_previsto_mod: moeda(data.balanco.total_receita_previsto),
            total_despesa_previsto_mod: moeda(data.balanco.total_despesa_previsto),
            total_saldo_previsto_mod: moeda(data.balanco.total_saldo_previsto),
          },
        })
        //console.log(dataBalancoMod);
        //console.log(dataModificada)
        const teste = {
          paginacao: { ...data.paginacao },
          data: [...dataModificada],
        };
        setLancamentos(teste);
      }
    } catch (error) {
      setLancamentos([]);
      if (error?.response.status === 404) {
        setBalanco({
            total_receita: "0,00",
            total_despesa: "0,00",
            total_saldo: "0,00",
            total_receita_previsto: "0,00",
            total_despesa_previsto: "0,00",
            total_saldo_previsto: "0,00",
            total_receita_mod: "0,00",
            total_despesa_mod: "0,00",
            total_saldo_mod: "0,00",
            total_receita_previsto_mod: "0,00",
            total_despesa_previsto_mod: "0,00",
            total_saldo_previsto_mod: "0,00",
        })
      }
    }
  };

  function StatusLancamento({ situacao }) {
    let classeColor = "bg-red-400 text-red-50";
    let situacaoLowerCase = situacao.toLowerCase();
    if (situacao === "RESOLVIDO") {
      classeColor = "bg-green-400 text-green-50";
    }
    return (
      <span className={`${classeColor} rounded-md px-2 pb-1`}>
        {situacaoLowerCase}
      </span>
    );
  }

  function DescricaoValor({ tipoLancamento, situacao }) {
    let descricao = "";
    if (tipoLancamento === "RECEITA" && situacao == "RESOLVIDO") {
      descricao = "recebido"
    } else if (tipoLancamento === "RECEITA" && situacao === "PENDENTE") {
      descricao = "não recebido"
    } else if (tipoLancamento === "DESPESA" && situacao === "RESOLVIDO") {
      descricao = "pago"
    } else if (tipoLancamento === "DESPESA" && situacao === "PENDENTE") {
      descricao = "não pago"
    }
    return <span className="font-medium block">{descricao}</span>
  }

  function ValorLancamento({ tipoLancamento, children }) {
    let classeColor = "text-red-400";
    if (tipoLancamento === "RECEITA") {
      classeColor = "text-green-400"
    }
    return <span className={classeColor}>{children}</span>
  }

  async function handleFormLancamentoSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/v1/lancamentos", {
        valor: String(valorLancamento.replace(".", "").replace(",", ".") * 100),
        descricao: descricaoLancamento,
        categoria_id: categoriaLancamento.value,
        tipo_lancamento: tipoLancamento,
        data_lancamento: dataLancamento,
        situacao: situacaoLancamento,
      });

      if (response.status === 201) {
        setTimeout(() => {
          toast.success("Lançamento criado com sucesso!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
          });

          fecharModal();
          loadLancamentos();
          resetFormLancamento();
          setLoading(false);
        }, 500);
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
        setLoading(false);
      }, 400);
    }
  }

  function resetFormLancamento() {
    setDescricaoLancamento("");
    setCategoriaLancamento({});
    setTipoLancamento("DESPESA");
    loadOptionsCategorias("DESPESA");
    setSituacaoLancamento("PENDENTE");
    setDataLancamento(format(new Date(), "yyyy-MM-dd"));
    setValorLancamento("");
    setErrors([]);
  }

  const hanbleKeyUpMaskMoeda = (e) => {
    let value = moeda(e.currentTarget.value);
    setValorLancamento(value);
    e.currentTarget.value = value;
    return e;
  };

  function loadOptionsCategorias(tipoLancamento) {
    if (tipoLancamento === "DESPESA") {
      setCategoriasLancamento(categoriasDespesa);
      setCategoriaLancamento(categoriasDespesa[0] ?? {});
    } else if (tipoLancamento === "RECEITA") {
      setCategoriasLancamento(categoriasReceita);
      setCategoriaLancamento(categoriasReceita[0] ?? {});
    }
  }

  async function marcarComoResolvido(lancamentoId) {
    const response = await api.put(`/v1/lancamentos/${lancamentoId}/marcar-como-resolvido`);
    if (response.status === 200) {
      loadLancamentos();
    }
  }

  async function canceladoLancamento(lancamentoId) {
    const response = await api.delete(`/v1/lancamentos/${lancamentoId}`);
    if (response.status === 200) {
      loadLancamentos();
    }
  }

  async function marcarComoPendente(lancamentoId) {
    const response = await api.put(`/v1/lancamentos/${lancamentoId}/marcar-como-pendente`);
    if (response.status === 200) {
      loadLancamentos();
    }
  }

  function SituacaoLancamentoOpcao({tipoLancamento, situacao, lancamentoId}) {
    let tituloBotao = "";
    let iconeLike = false;
    if (tipoLancamento === "RECEITA" && situacao == "RESOLVIDO") {
      tituloBotao = "Marcar como não-recebido"
      iconeLike = true
    } else if (tipoLancamento === "RECEITA" && situacao === "PENDENTE") {
      tituloBotao = "Marcar como recebido"
    } else if (tipoLancamento === "DESPESA" && situacao === "RESOLVIDO") {
      tituloBotao = "Marcar como não-pago"
      iconeLike = true
    } else if (tipoLancamento === "DESPESA" && situacao === "PENDENTE") {
      tituloBotao = "Marcar como pago"
    }

    return (
      <button
        className="p-1 rounded-lg focus:outline-none"
        title={tituloBotao}
      >
        {!iconeLike && <LikeDownIcon onClick={() => marcarComoResolvido(lancamentoId)} className="w-5 h-6 text-red-500" />}
        {iconeLike && <LikeUpIcon onClick={() => marcarComoPendente(lancamentoId)} className="w-5 h-6 text-green-500" />}
      </button>
    )
  }

  function promixoMesAno() {
    let mesFormatNumber = Number(mes);
    let anoFormatNumber = Number(ano);

    if (mesFormatNumber >= 12) {
      setMes("01")
      setAno(String(anoFormatNumber + 1))
    } else {
      setMes(String(mesFormatNumber + 1).padStart(2, '0'))
    }
  }

  function anteriorMesAno() {
    let mesFormatNumber = Number(mes);
    let anoFormatNumber = Number(ano);

    if (mesFormatNumber <= 1) {
      setMes("12")
      setAno(String(anoFormatNumber - 1))
    } else {
      setMes(String(mesFormatNumber - 1).padStart(2, '0'))
    }
  }

  function SelecionaData() {
    return (
      <div className="flex">
        <nav aria-label="Table navigation">
          <ul className="inline-flex items-center">
            <li>
              <button
                className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 hover:bg-gray-100 font-medium p-2 rounded-md text-gray-700 dark:text-gray-400 focus:outline-none border border-transparent"
                //disabled={currentOffset <= 0 ? "disabled" : ""}
                type="button"
                aria-label="Previous"
                onClick={anteriorMesAno}
              >
                <svg
                  className="h-7 w-8"
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
            <li className="text-center min-w-40 text-lg font-semibold text-gray-600">
              <span className="ml-1">{mesAnoSelecionadoText}</span>
            </li>
            <li>
              <button
                className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium p-2 rounded-md text-gray-700 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:shadow-outline-gray dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
                type="button"
                //disabled={currentPage >= totalPage ? "disabled" : ""}
                aria-label="Next"
                onClick={promixoMesAno}
              >
                <svg
                  className="h-7 w-8"
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
    );  
}

  return (
    <>
      <PageTitle>Lançamentos</PageTitle>
      <div className="">
        <div className="w-full mb-6">
          <SelecionaData />
        </div>
        <div className="overflow-auto grid grid-cols-1 gap-6 mb-5 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
            <div className="p-4 flex items-center">
              <div className="p-3 rounded-full text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500 mr-4">
                <ReceiveMoney className="w-5 h-5" />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Receita
                </p>
                <p className="text-md font-semibold text-gray-700 dark:text-gray-200">
                  R$ {balanco?.total_receita_mod}
                </p>
              </div>
              <div className="flex-1 justify-center items-center flex">
                <span><ChevronRight/> </span>
              </div>
              <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Previsto
                </p>
                <p className="text-md font-semibold text-gray-700 dark:text-gray-200">
                  R$ {balanco?.total_receita_previsto_mod}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
            <div className="p-4 flex items-center">
              <div className="p-3 rounded-full text-red-500 dark:text-red-100 bg-red-100 dark:bg-red-500 mr-4">
                <ExclamationIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Despesas
                </p>
                <p className="text-md font-semibold text-gray-700 dark:text-gray-200">
                  R$ {balanco?.total_despesa_mod}
                </p>
              </div>
              <div className="flex-1 justify-center items-center flex">
                <span><ChevronRight/> </span>
              </div>
              <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Previsto
                </p>
                <p className="text-md font-semibold text-gray-700 dark:text-gray-200">
                  R$ {balanco?.total_despesa_previsto_mod}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
            <div className="p-4 flex items-center">
              <div className="p-3 rounded-full text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-blue-500 mr-4">
                <CheckIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Saldo
                </p>
                <p className="text-md font-semibold text-gray-700 dark:text-gray-200">
                  R$ {balanco?.total_saldo_mod}
                </p>
              </div>
              <div className="flex-1 justify-center items-center flex">
                <span><ChevronRight/> </span>
              </div>
              <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Previsto
                </p>
                <p className="text-md font-semibold text-gray-700 dark:text-gray-200">
                  R$ {balanco?.total_saldo_previsto_mod}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-auto lg:overflow-visible ">
          <table
            style={{ borderSpacing: "0 8px" }}
            className="overflow-auto w-full table text-gray-400 border-separate space-y-6 text-sm table-default"
          >
            <thead className="bg-white text-gray-600">
              <tr
                style={{ borderRadius: "20px" }}
                className="border-gray-900 border-1"
              >
                <th className="p-3">Categoria</th>
                <th className="p-3 text-left border-gray-900 border-1">
                  Descrição
                </th>
                <th className="p-3 text-left border-gray-900 border-1">Data</th>
                <th className="p-3 text-left">Valor</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {lancamentos.data?.map((lancamento, index) => {
                return (
                  <tr key={String(index)} className="bg-white">
                    <td className="p-3">
                      <div className="flex align-items-center">
                        <div className="ml-3">
                          <div className="text-gray-500">
                            {lancamento.categoria.descricao}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">{lancamento.descricao}</td>
                    <td className="p-3">{lancamento.data_lancamento_mod}</td>
                    <td className="p-3 font-bold">
                      
                      <ValorLancamento tipoLancamento={lancamento.tipo_lancamento}>{lancamento.valor_mod}</ValorLancamento>
                      <DescricaoValor tipoLancamento={lancamento.tipo_lancamento} situacao={lancamento.situacao}/>
                    </td>
                    <td className="p-3">
                      <StatusLancamento situacao={lancamento.situacao} />
                    </td>
                    <td className="p-3 flex items-center">
                      <SituacaoLancamentoOpcao lancamentoId={lancamento.id} tipoLancamento={lancamento.tipo_lancamento} situacao={lancamento.situacao}/>
                      <button onClick={() => canceladoLancamento(lancamento.id)} className="p-1 rounded-lg focus:outline-none"><TrashIcon className="w-6 h-6 text-red-500"/></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      <button
          onClick={abrirModal}
          className="absolute right-2 bottom-2 flex items-center justify-center p-4 text-white transition-colors duration-200 transform bg-purple-600 rounded-full dark:bg-gray-800 hover:bg-purple-700 dark:hover:bg-gray-700 focus:outline-none focus:bg-purple-500 dark:focus:bg-gray-700"
        >
        <PlusIcon className="w-6 h-6 text-white" />
      </button>
      <Modal isOpen={modalLancamentoOpen} onClose={fecharModal}>
        <ModalHeader>Novo lancamento</ModalHeader>
        <form className="mt-4" onSubmit={handleFormLancamentoSubmit}>
          <ModalBody>
            {errors.length > 0 && (
              <div className="w-full bg-red-500 px-4 py-2 mb-3 rounded-md text-white dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600">
                {errors.map((item, index) => (
                  <span key={index} className="block text-sm">
                    * {item}.
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center mb-4">
              <label
                htmlFor="tipo-despesa"
                className="flex items-center rounded-lg mr-2 w-1/2 px-4 py-3 bg-gray-300 hover:border-red-400 hover:border-2 cursor-pointer"
              >
                <input
                  id="tipo-despesa"
                  name="tipo_lancamento"
                  onChange={(e) => {
                    setTipoLancamento(e.target.value);
                    loadOptionsCategorias(e.target.value);
                  }}
                  type="radio"
                  value="DESPESA"
                  checked={tipoLancamento === "DESPESA"}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <span
                  htmlFor="tipo-despesa"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Despesa
                </span>
              </label>
              <label
                htmlFor="tipo-receita"
                className="flex items-center rounded-lg w-1/2 px-4 py-3 bg-gray-300 cursor-pointer"
              >
                <input
                  id="tipo-receita"
                  name="tipo_lancamento"
                  onChange={(e) => {
                    setTipoLancamento(e.target.value);
                    loadOptionsCategorias(e.target.value);
                  }}
                  type="radio"
                  checked={tipoLancamento === "RECEITA"}
                  value="RECEITA"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <span
                  htmlFor="tipo-receita"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Receita
                </span>
              </label>
            </div>
            <label className="block text-sm text-gray-700 dark:text-gray-400">
              <span className="text-gray-700 font-semibold dark:text-gray-200">
                Valor:
              </span>
              <input
                className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
                type="text"
                value={valorLancamento}
                onKeyUp={(e) => hanbleKeyUpMaskMoeda(e)}
                onChange={(e) => setValorLancamento(e.target.value)}
                placeholder="0,00"
                inputMode="numeric"
              />
            </label>
            <label className="block text-sm text-gray-700 dark:text-gray-400 mt-4">
              <span className="text-gray-700 font-semibold dark:text-gray-200">
                Descrição:
              </span>
              <input
                className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
                type="text"
                autocomplete="off"
                value={descricaoLancamento}
                onChange={(e) => setDescricaoLancamento(e.target.value)}
                placeholder=""
              />
            </label>
            <label className="block text-sm text-gray-700 dark:text-gray-400 mt-4">
              <span className="text-gray-700 font-semibold dark:text-gray-200">
                Categoria:
              </span>
              <Select
                className="mt-1"
                //defaultValue={{value: '19', label: "Salário"}}
                value={categoriaLancamento}
                isClearable
                onChange={setCategoriaLancamento}
                options={categoriasLancamento}
                placeholder="Selecione"
              />
            </label>
            <label className="block text-sm text-gray-700 dark:text-gray-400 mt-4">
              <span className="text-gray-700 font-semibold dark:text-gray-200">
                Data lançamento:
              </span>
              <input
                className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
                type="date"
                value={dataLancamento}
                onChange={(e) => setDataLancamento(e.target.value)}
                placeholder=""
              />
            </label>
            <div className="mt-4 space-y-4">
              <label
                className="text-gray-700 font-semibold dark:text-gray-200 block"
                htmlFor="ativo"
              >
                Situação:
              </label>

              <div className="flex items-center">
                <input
                  id="situacao-pendente"
                  name="situacao"
                  onChange={(e) => setSituacaoLancamento(e.target.value)}
                  type="radio"
                  checked={situacaoLancamento === "PENDENTE" ? true : false}
                  value="PENDENTE"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 cursor-pointer"
                />
                <label
                  htmlFor="situacao-pendente"
                  className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Pendente
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="situacao-resolvido"
                  name="situacao"
                  type="radio"
                  onChange={(e) => setSituacaoLancamento(e.target.value)}
                  checked={situacaoLancamento === "RESOLVIDO" ? true : false}
                  value="RESOLVIDO"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 cursor-pointer"
                />
                <label
                  htmlFor="situacao-resolvido"
                  className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Resolvido
                </label>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="block w-full sm:inline-flex">
              <button
                className={`${
                  loading ? "opacity-80 pointer-events-none" : ""
                } align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-3 rounded-lg text-white bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:shadow-outline-purple w-full`}
                type="submit"
              >
                {loading && <LooadingIcon className="animate-spin w-5 h-5" />}
                {!loading && "Criar"}
              </button>
            </div>
            <div className="block w-full sm:inline-flex">
              <button
                onClick={() => setModalLancamentoOpen(false)}
                className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium px-5 py-3 rounded-lg text-gray-600 border-gray-300 border dark:text-gray-400 focus:outline-none active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:shadow-outline-gray w-full"
                type="button"
              >
                Cancelar
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Home;
