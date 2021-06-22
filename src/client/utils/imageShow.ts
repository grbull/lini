// TODO: Create placeholder
const placeHolder = '/placeholder_show.png';

export function imageShow(url?: string): string {
  if (url) {
    return process.env.IMAGE_PROXY_URL + url;
  }
  return placeHolder;
}
