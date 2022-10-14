export const getMessages = window.app.getMessages;

export const getInitialData = async () => {
  await waitUntil(() => typeof window.app.initialData === 'object');

  return window.app.initialData;
}

// https://stackoverflow.com/a/64947598
const waitUntil = (condition) => {
  return new Promise((resolve) => {
    let interval = setInterval(() => {
      if (!condition()) {
        return
      }

      clearInterval(interval)
      resolve()
    }, 100)
  })
}
