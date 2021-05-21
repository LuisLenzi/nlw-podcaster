import styles from './styles.module.scss';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

export function Header() {
  const currentDate = format(new Date(), `EEEE, dd MMMM`, {
    locale: ptBR,
  });

  return (
    <header className={styles.header}>
      <div className={styles.logoHeader}>
        <div className={styles.logoContent}>
          <img src="/assets/icons/logo.svg" alt="Uniscast" />
          <h2>Uniscast</h2>
        </div>
        <div className={styles.headerMessage}>
          <p>O melhor para você ouvir, sempre</p>
        </div>
      </div>
      <p className={styles.currentDate}>{currentDate}</p>
    </header>
  );
}