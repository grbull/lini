// TODO: Create placeholder
const placeHolder =
  'https://static.tvmaze.com/uploads/images/original_untouched/23/59145.jpg';

export function imageEpisode(url?: string): string {
  if (url) {
    return process.env.IMAGE_PROXY_URL + url;
  }
  return placeHolder;
}
