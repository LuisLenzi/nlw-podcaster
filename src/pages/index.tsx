import { GetStaticProps } from 'next';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import api from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';
import styles from './home.module.scss';

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
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
  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>
        <ul>
          {
            latestEpisodes.map(episode => {
              return (
                <li key={episode.id}>
                  <Image
                    width={200}
                    height={200}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                    className={styles.image}
                  />
                  <div className={styles.episodeDetails}>
                    <a href="">{episode.title}</a>
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
                </li>
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
                <li key={episode.id}>
                  <Image
                    width={75}
                    height={75}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                    className={styles.image}
                  />
                  <div className={styles.episodeDetails}>
                    <a href="">{episode.title}</a>
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
                </li>
              )
            })
          }
        </ul>
      </section>
    </div>
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
      description: episode.description,
      url: episode.file.url,
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
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