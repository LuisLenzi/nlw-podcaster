import styles from './styles.module.scss';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useContext } from 'react';
import { PlayerContext } from '../../contexts/playerContext';
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export function Player() {
  const {
    episodeList,
    currentEpisodeIndex,
    showPlayer,
    isPlaying,
    handleShowAndHidePlayer,
    handleTogglePlay
  } = useContext(PlayerContext);
  const episode = episodeList[currentEpisodeIndex];

  return (
    <>
      {
        showPlayer ? (
          <div className={styles.player} >
            <header>
              <div className={styles.playing}>
                <img src="/assets/icons/headphone-icon.svg" alt="Tocando agora" />
                <p>Tocando agora</p>
              </div>
            </header>
            {
              episode ? (
                <>
                  <div className={styles.waves}>
                    <span className={styles.w1} />
                    <span className={styles.w2} />
                    <span className={styles.w3} />
                    <span className={styles.w4} />
                    <span className={styles.w5} />
                    <span className={styles.w6} />
                    <span className={styles.w7} />
                    <span className={styles.w8} />
                    <span className={styles.w9} />
                    <span className={styles.w10} />
                    <span className={styles.w11} />
                    <span className={styles.w12} />
                  </div>
                  <div className={styles.showedPlayer}>
                    <Image
                      width={600}
                      height={600}
                      src={episode.thumbnail}
                      objectFit="cover"
                    />
                    <h3>{episode.title}</h3>
                    <p>{episode.members}</p>
                  </div>
                </>
              ) : (
                <>
                  <img src="/assets/icons/sound-waves-icon.svg" alt="Tocando agora" />
                  <div className={styles.emptyPlayer}>
                    <p>Selecione um podcast para ouvir</p>
                  </div>
                </>
              )
            }

            {episode && (
              <audio
                src={episode.url}
                autoPlay
              />
            )}

            <footer className={!episode ? styles.empty : ''}>
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
              <button type="button" className={styles.hideButton} onClick={handleShowAndHidePlayer}>
                <FaAngleRight size={20} />
              </button>
              <div className={styles.buttons}>
                <button type="button" disabled={!episode}>
                  <img src="/assets/icons/shuffle-icon.svg" alt="Embaralhar" />
                </button>
                <button type="button" disabled={!episode}>
                  <img src="/assets/icons/play-previous-icon.svg" alt="Trocar para anterior" />
                </button>
                <button
                  type="button"
                  className={styles.playButton}
                  disabled={!episode}
                  onClick={handleTogglePlay}>
                  {!isPlaying
                    ? <img src="/assets/icons/play-button-icon.svg" alt="Startar" />
                    : <img src="/assets/icons/pause-icon.svg" alt="Pausar" />
                  }
                </button>
                <button type="button" disabled={!episode}>
                  <img src="/assets/icons/play-next-icon.svg" alt="Trocar para próxima" />
                </button>
                <button type="button" disabled={!episode}>
                  <img src="/assets/icons/repeat-icon.svg" alt="Repetir" />
                </button>
              </div>
            </footer>
          </div>
        ) : (
          <div className={styles.playerHidden}>
            <button type="button" className={styles.showButton} onClick={handleShowAndHidePlayer}>
              <FaAngleLeft size={20} />
            </button>
          </div>
        )
      }
    </>
  );
}