export const moeda = (valor) => {
    let prefixoNegativo = valor[0] ?? "";
    let valorAux = valor.replace(/\D/g, "");
    valorAux = valorAux.replace(/(\d)(\d{2})$/, "$1,$2");
    valorAux = valorAux.replace(/(?=(\d{3})+(\D))\B/g, ".");
    if (prefixoNegativo === "-") {
        valorAux = `${prefixoNegativo}${valorAux}`;
    }
    return valorAux
}