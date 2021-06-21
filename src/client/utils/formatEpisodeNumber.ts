export function formatEpisodeNumber(number: number): string {
  if (number < 10) {
    return `0${number.toString(10)}`;
  }
  return number.toString();
}
