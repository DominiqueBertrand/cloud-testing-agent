export const resolvePromisesSeq = async tasks => {
  const results: Array<any> = [];
  for (const task of tasks) {
    results.push(await task);
  }

  return results;
};
