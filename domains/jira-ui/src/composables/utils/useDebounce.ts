/* eslint-disable-next-line */
export default function debounce(callback: any, timeout: number = 300): () => void {
  let timer: number | undefined;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timer);
      callback(...args);
    };

    clearTimeout(timer);
    timer = setTimeout(later, timeout);
  };
}
