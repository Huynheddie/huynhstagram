const timeSince = (rawDate) => {
  const date = new Date(rawDate);
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} years`;
  }
  if (interval === 1) {
    return `${interval} year`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months`;
  }
  if (interval === 1) {
    return `${interval} month`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days`;
  }
  if (interval === 1) {
    return `${interval} day`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours`;
  }
  if (interval === 1) {
    return `${interval} hour`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes`;
  }
  if (interval === 1) {
    return `${interval} minute`;
  }
  return `${Math.floor(seconds)} seconds`;
};

const timeSinceCondensed = (rawDate) => {
  const date = new Date(rawDate);
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval}y`;
  }
  if (interval === 1) {
    return `${interval}y`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval}mm`;
  }
  if (interval === 1) {
    return `${interval}mm`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval}d`;
  }
  if (interval === 1) {
    return `${interval}d`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval}h`;
  }
  if (interval === 1) {
    return `${interval}h`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval}m`;
  }
  if (interval === 1) {
    return `${interval}m`;
  }
  return `${Math.floor(seconds)}s`;
};

export default { timeSince, timeSinceCondensed };
