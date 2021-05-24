import styles from './styles.module.scss';

export function MobilePlayer() {
  return (
    <div className={styles.player} >
      <footer className={styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles.emptySlider} />
          </div>
          <span>00:00</span>
        </div>
        <div className={styles.buttons}>
          <button type="button">
            <img src="/assets/icons/shuffle-icon.svg" alt="Embaralhar" />
          </button>
          <button type="button">
            <img src="/assets/icons/play-previous-icon.svg" alt="Trocar para anterior" />
          </button>
          <button type="button" className={styles.playButton}>
            <img src="/assets/icons/play-button-icon.svg" alt="Startar" />
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