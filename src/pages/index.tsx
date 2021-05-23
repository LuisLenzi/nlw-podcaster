import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './home.module.scss';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import api from '../services/api';
import { Loading } from '../components/Loading';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationAsString: string;
  publishedAt: string;
}

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoading(false);
    }, 2500);
  }, [])

  return (
    <>
      <div className={styles.homepage}>
        <section className={styles.latestEpisodes}>
          <h2>Últimos lançamentos</h2>
          <ul>
            {
              latestEpisodes.map(episode => {
                return (
                  <Link href={`/podcasts/${episode.id}`} key={episode.id}>
                    <a>
                      <Image
                        width={100}
                        height={100}
                        src={episode.thumbnail}
                        alt={episode.title}
                        objectFit="cover"
                        className={styles.image}
                      />
                      <div className={styles.episodeDetails}>
                        <div>{episode.title}</div>
                        <div className={styles.textBox}>
                          <p>{episode.members}</p>
                          <div className={styles.textContent}>
                            <span>{episode.publishedAt}</span>
                            <span className="duration">{episode.durationAsString}</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.buttons}>
                        <button type="button">
                          <img src="assets/icons/play-button-icon.svg" alt="Startar episódio" />
                        </button>
                      </div>
                    </a>
                  </Link>
                )
              })
            }
          </ul>
        </section>
        <section className={styles.allEpisodes}>
          <h2>Todos os Podcasts</h2>
          <ul>
            {
              allEpisodes.map(episode => {
                return (
                  <Link href={`/podcasts/${episode.id}`} key={episode.id}>
                    <a>
                      <Image
                        width={75}
                        height={75}
                        src={episode.thumbnail}
                        alt={episode.title}
                        objectFit="cover"
                        className={styles.image}
                      />
                      <div className={styles.episodeDetails}>
                        <div>{episode.title}</div>
                        <div className={styles.textBox}>
                          <p>{episode.members}</p>
                          <div className={styles.textContent}>
                            <span>{episode.publishedAt}</span>
                            <span className="duration">{episode.durationAsString}</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.buttons}>
                        <button type="button">
                          <img src="assets/icons/play-button-icon.svg" alt="Startar episódio" />
                        </button>
                      </div>
                    </a>
                  </Link>
                )
              })
            }
          </ul>
        </section>
      </div>
      <Loading show={showLoading} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/api/server.json');

  const episodes = data.episodes.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      url: episode.url,
      duration: Number(episode.duration),
      durationAsString: convertDurationToTimeString(Number(episode.duration)),
      publishedAt: format(parseISO(episode.published_at), 'EEEE, dd MMMM', {
        locale: ptBR
      }),
    }
  })

  const latestEpisodes = episodes.slice(0, 3);
  const allEpisodes = episodes.slice(3, episodes.lenght);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  }
}