import { useContext, useEffect, useRef, useState } from 'react';
import { PlayerContext } from '../../../contexts/playerContext';
import styles from './styles.module.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { convertDurationToTimeString } from '../../../utils/convertDurationToTimeString';

export function MobilePlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    hasPrevious,
    hasNext,
    handleTogglePlay,
    handleToggleLoop,
    handleToggleShuffle,
    handlePlayOrPauseAudio,
    playNext,
    playPrevious
  } = useContext(PlayerContext);
  const episode = episodeList[currentEpisodeIndex];

  useEffect(() => {
    if (!audioRef.current) {
      return;
    };
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying])

  function setupProgressListener() {
    audioRef.current.currentTime = 0;
    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    })
  }

  return (
    <>
      {/*       {
        !isPlaying  && (
          <audio
            src={episode.url}
            ref={audioRef}
            loop={isLooping}
            onPlay={() => handlePlayOrPauseAudio(true)}
            onPause={() => handlePlayOrPauseAudio(false)}
            onLoadedMetadata={setupProgressListener}
            autoPlay
          />
        )
      } */}
      <div className={episode ? styles.player : styles.emptyPlayer}>
        <footer className={styles.empty}>
          <div className={styles.progress}>
            <span>{convertDurationToTimeString(progress)}</span>
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: 'var(--black-solid)' }}
                handleStyle={{ border: '3px solid var(--black-solid)' }}
              />
            ) : (
              < div className={styles.slider}>
                <div className={styles.emptySlider} />
              </div>
            )}
            <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
          </div>
          <div className={styles.buttons}>
            <button
              type="button"
              disabled={!episode}
              onClick={handleToggleShuffle}
              className={isShuffling ? styles.isActive : ''}
            >
              <img src="/assets/icons/shuffle-icon.svg" alt="Embaralhar" />
            </button>
            <button type="button" disabled={!episode || !hasPrevious} onClick={playPrevious}>
              <img src="/assets/icons/play-previous-icon.svg" alt="Trocar para anterior" />
            </button>
            <button type="button" className={styles.playButton} onClick={handleTogglePlay} disabled={!episode}>
              {!isPlaying
                ? <img src="/assets/icons/play-button-icon.svg" alt="Startar" />
                : <img src="/assets/icons/pause-icon.svg" alt="Pausar" />
              }
            </button>
            <button type="button" disabled={!episode || !hasNext} onClick={playNext}>
              <img src="/assets/icons/play-next-icon.svg" alt="Trocar para próxima" />
            </button>
            <button
              type="button"
              disabled={!episode}
              onClick={handleToggleLoop}
              className={isLooping ? styles.isActive : ''}
            >
              <img src="/assets/icons/repeat-icon.svg" alt="Repetir" />
            </button>
          </div>
        </footer>
      </div>
    </>
  )
}