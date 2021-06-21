// TODO: Create placeholder
const placeHolder =
  'https://lini.s1acker.com/uploads/images/medium_portrait/185/464747.jpg';

export function imageShow(url?: string): string {
  if (url) {
    return process.env.IMAGE_PROXY_URL + url;
  }
  return placeHolder;
}
