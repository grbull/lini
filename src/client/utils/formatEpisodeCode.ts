export function formatEpisodeCode(season: number, episode: number): string {
  let s = season.toString(10);
  let e = episode.toString(10);
  if (season < 10) {
    s = `0${s}`;
  }
  if (episode < 10) {
    e = `0${e}`;
  }
  return `S${s}E${e}`;
}
