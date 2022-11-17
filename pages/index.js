import React from 'react';
import config from '../config.json';
import styled from 'styled-components';
import Menu from '../src/components/Menu';
import { StyledTimeline } from '../src/components/Timeline';

function HomePage() {
  // Árvore de componentes
  // HomePage
  // Menu
  // Search
  // O modelo de renderização do React é chamado de Top-Down
  // Ou seja, ele não faz com que o filho atualize o pai sobre os estados
  // ex: se um estado do Search mudar ele não avisa os nós acima
  // Logo, as informações em comum devem estar em cima

  // const valorDoFiltro = 'Frost';

  const [valorDoFiltro, setvalorDoFiltro] = React.useState('');

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          // backgroundColor: "red",
        }}>
        {/* Prop Drilling: perfurando a aplicação passando as propriedades pra baixo */}
        <Menu
          valorDoFiltro={valorDoFiltro}
          setvalorDoFiltro={setvalorDoFiltro}
        />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={config.playlists} />
      </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
  }
`;

const StyledBanner = styled.div`
  /* background-image: url(${config.bg}); */
  /* ${({ bg, ...props }) => console.log(bg, props)} */
  background-image: url(${({ bg }) => bg});
  height: 230px;
`;
function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function Timeline({ searchValue, ...props }) {
  const playlistNames = Object.keys(props.playlists);
  //console.log(playlistNames);
  // Statement
  // Retorno por expressão

  // O map você converte de uma coisa para outra coisa. Da lista de nomes eu consigo converter para componentes react
  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = props.playlists[playlistName];
        // Sempre que a gente faz um map é importante que o React saiba que esse elemento é único, para permitir que
        // ele trabalhe melhor internamente e otimizar as renderizações da página. Ao invés dele renderizar o bloco inteiro
        // ele apenas renderiza o que muda
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized);
                })
                .map((video) => {
                  return (
                    <a key={video.url} href={video.url}>
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                    </a>
                  );
                })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}
