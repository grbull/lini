// TODO: Create placeholder
const placeHolder = '/placeholder_episode.png';

export function imageEpisode(url: string | null): string {
  if (url) {
    return process.env.IMAGE_PROXY_URL + url;
  }
  return placeHolder;
}
