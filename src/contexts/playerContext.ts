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
  isLooping: boolean;
  isShuffling: boolean;
  hasPrevious: boolean,
  hasNext: boolean;
  handlePlay: (episode: Episode) => void;
  handleShowAndHidePlayer: (state: boolean) => void;
  handleTogglePlay: () => void;
  handleToggleLoop: () => void;
  handleToggleShuffle: () => void;
  handlePlayOrPauseAudio: (state: boolean) => void;
  playList: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const PlayerContext = createContext({} as PlayerContextProps);