import React from 'react';

export const ColorModeContext = React.createContext({
  mode: '',
  setMode: () => {
    alert('Você precisa me configurar primeiro');
  },
  setMode: () => {
    toggleMode('Você precisa me configurar primeiro');
  },
});

// Você provê pra aplic ação e o contexto guarda, quem tiver acesso ao contexto tem acesso ao que está guardado
const ColorModeProvider = (props) => {
  const [mode, setMode] = React.useState(props.initialMode);

  function toggleMode() {
    mode == 'dark' ? setMode('light') : setMode('dark');
  }

  // Entender o porque de estar sendo ignorado
  return (
    <ColorModeContext.Provider value={{ mode: mode, toggleMode: toggleMode }}>
      {props.children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
