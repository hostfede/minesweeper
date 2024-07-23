export function getDifferenceInSeconds(startTime, endTime) {
  const diffMs = endTime - startTime;
  return diffMs / 1000;
}

export function formatSecMili(seconds, milis) {
  const formattedMilliseconds = milis.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedSeconds}:${formattedMilliseconds}`;
}
