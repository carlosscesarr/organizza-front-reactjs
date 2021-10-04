const IF = ({ children, condicao }) => {
  if (condicao) {
    return children;
  }

  return null;
};

export default IF;
