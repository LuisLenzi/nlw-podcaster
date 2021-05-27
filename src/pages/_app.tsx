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
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function handlePlay(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setShowPlayer(true);
    setIsPlaying(true);
  }

  function playList(list, index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index)
    setShowPlayer(true);
    setIsPlaying(true);
  }

  function handleShowAndHidePlayer(state: boolean) {
    setShowPlayer(state);
  }

  function handleTogglePlay() {
    setIsPlaying(!isPlaying);
  }

  function handleToggleMobilePlay() {
    setIsPlaying(!isPlaying);
  }

  function handleToggleLoop() {
    setIsLooping(!isLooping);
  }

  function handleToggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function handlePlayOrPauseAudio(state: boolean) {
    setIsPlaying(state);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = (currentEpisodeIndex + 1) < episodeList.length;

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);

    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
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
        isLooping,
        isShuffling,
        hasNext,
        hasPrevious,
        handlePlay,
        handleShowAndHidePlayer,
        handleTogglePlay,
        handleToggleLoop,
        handleToggleShuffle,
        handlePlayOrPauseAudio,
        playList,
        playNext,
        playPrevious
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
