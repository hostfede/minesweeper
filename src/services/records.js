function updateLocalStorage(records) {
  window.localStorage.setItem('records', JSON.stringify(records));
}

export function addRecord(record) {
  const records = JSON.parse(window.localStorage.getItem('records')) || [];
  records.push(record);
  updateLocalStorage(records);
}

const GAME_DIFFICULTY = {
  EASY: 1,
  NORMAL: 2,
  HARD: 3,
  CUSTOM: 4,
};

export function getRecords(order = 'timeSpend') {
  const records = JSON.parse(window.localStorage.getItem('records')) || [];

  if (records.length === 0) return [];

  if (order === 'difficulty') {
    return records.sort((a, b) => {
      return GAME_DIFFICULTY[a[order]] - GAME_DIFFICULTY[b[order]];
    });
  }

  return records.sort((a, b) => {
    if (a[order] < b[order]) return -1;
    if (a[order] > b[order]) return 1;
    return 0;
  });
}
