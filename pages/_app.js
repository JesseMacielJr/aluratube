import React from 'react';
import { ThemeProvider } from 'styled-components';
import { CSSReset } from '../src/components/CSSReset';
import ColorModeProvider, {
  ColorModeContext,
} from '../src/components/Menu/components/ColorMode';

const theme = {
  light: {
    backgroundBase: '#f9f9f9',
    backgroundLevel1: '#ffffff',
    backgroundLevel2: '#f0f0f0',
    borderBase: '#e5e5e5',
    textColorBase: '#222222',
  },
  dark: {
    backgroundBase: '#181818',
    backgroundLevel1: '#202020',
    backgroundLevel2: '#313131',
    borderBase: '#383838',
    textColorBase: '#FFFFFF',
  },
};

function ProviderWrapper(props) {
  return (
    <ColorModeProvider initialMode={'dark'}>{props.children}</ColorModeProvider>
  );
}

// _app.js -> Definições globais do NextJS; arquivo de configuração da aplicação
// providers -> define coisas que são globais da aplicação (ex: guardar cache de URLS que já bateu ou dados que já salvou)
// ThemeProvider -> Prover o tema para a app toda
// ColorModeProvider -> Prover o state de light ou dark para todo mundo
function MyApp({ Component, pageProps }) {
  // console.log('_app.js');
  const contexto = React.useContext(ColorModeContext);
  // console.log(contexto);
  return (
    <ThemeProvider theme={theme[contexto.mode]}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default function _App(props) {
  // Foi preciso forçar essa ordem (Provider Wrapper > MyApp) para poder usar o initialMode
  // O Provider pode ser usado em: internacionalização, Colormode, tema, formulário, dados de comportamento do usuário
  // ex: saber se o usuário está em modo fullscreen do vídeo ou não, etc...
  return (
    <ProviderWrapper>
      <MyApp {...props} />
    </ProviderWrapper>
  );
}
