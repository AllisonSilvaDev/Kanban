module.exports = {
  testEnvironment: "jsdom",  // Usando jsdom para o ambiente de teste
  moduleNameMapper: {
    "^react-router-dom$": require.resolve("react-router-dom"),  // Mapeando corretamente o react-router-dom
  },
};
