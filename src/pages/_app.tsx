import Head from 'next/head';
import { useState } from 'react';
import { Header } from '../components/Header';
import { Player } from '../components/Player';
import { MobilePlayer } from '../components/Player/Mobile';
import { PlayerContext } from '../contexts/playerContext';
import styles from '../styles/app.module.scss';
import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  function handlePlay(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setShowPlayer(true);
    setIsPlaying(true);
  }

  function handleShowAndHidePlayer() {
    showPlayer ? setShowPlayer(false) : setShowPlayer(true);
  }

  function handleTogglePlay() {
    setIsPlaying(!isPlaying);
  }

  return (
    <>
      <Head>
        <title>Uniscast 🎙️</title>
      </Head>
      <PlayerContext.Provider value={{
        episodeList,
        currentEpisodeIndex,
        showPlayer,
        isPlaying,
        handlePlay,
        handleShowAndHidePlayer,
        handleTogglePlay
      }}>
        <div className={styles.wrapper}>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>
          <Player />
          <MobilePlayer />
        </div>
      </PlayerContext.Provider>
    </>
  )
}

export default MyApp
