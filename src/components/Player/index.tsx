import styles from './styles.module.scss';

export function Player() {
  return (
    <div className={styles.player}>
      <header>
        <div className={styles.playing}>
          <img src="assets/icons/headphone-icon.svg" alt="Tocando agora" />
          <p>Tocando agora</p>
        </div>
      </header>
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
      <div className={styles.emptyPlayer}>
        <p>Selecione um podcast para ouvir</p>
      </div>
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
            <img src="assets/icons/shuffle-icon.svg" alt="Embaralhar" />
          </button>
          <button type="button">
            <img src="assets/icons/play-previous-icon.svg" alt="Tocar anterior" />
          </button>
          <button type="button" className={styles.playButton}>
            <img src="assets/icons/play-button-icon.svg" alt="Tocar" />
          </button>
          <button type="button">
            <img src="assets/icons/play-next-icon.svg" alt="Tocar próxima" />
          </button>
          <button type="button">
            <img src="assets/icons/repeat-icon.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
}