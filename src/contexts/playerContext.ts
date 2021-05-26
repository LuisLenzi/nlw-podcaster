import { createContext } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

type PlayerContextProps = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  showPlayer: boolean;
  isPlaying: boolean;
  handlePlay: (episode: Episode) => void;
  handleShowAndHidePlayer: () => void;
  handleTogglePlay: () => void;
}

export const PlayerContext = createContext({} as PlayerContextProps);