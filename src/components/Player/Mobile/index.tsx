import { useContext } from 'react';
import { PlayerContext } from '../../../contexts/playerContext';
import styles from './styles.module.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export function MobilePlayer() {
  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    handleTogglePlay
  } = useContext(PlayerContext);
  const episode = episodeList[currentEpisodeIndex];

  return (
    <div className={episode ? styles.player : styles.emptyPlayer} >
      <footer className={styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>
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
          <span>00:00</span>
        </div>
        <div className={styles.buttons}>
          <button type="button">
            <img src="/assets/icons/shuffle-icon.svg" alt="Embaralhar" />
          </button>
          <button type="button">
            <img src="/assets/icons/play-previous-icon.svg" alt="Trocar para anterior" />
          </button>
          <button type="button" className={styles.playButton} onClick={handleTogglePlay}>
            {!isPlaying
              ? <img src="/assets/icons/play-button-icon.svg" alt="Startar" />
              : <img src="/assets/icons/pause-icon.svg" alt="Pausar" />
            }
          </button>
          <button type="button">
            <img src="/assets/icons/play-next-icon.svg" alt="Trocar para próxima" />
          </button>
          <button type="button">
            <img src="/assets/icons/repeat-icon.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  )
}