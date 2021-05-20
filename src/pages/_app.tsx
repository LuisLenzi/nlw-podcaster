import Head from 'next/head';
import { Header } from '../components/Header';
import { Player } from '../components/Player';
import styles from '../styles/app.module.scss';
import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Uniscast 🎙️</title>
      </Head>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </>
  )
}

export default MyApp
