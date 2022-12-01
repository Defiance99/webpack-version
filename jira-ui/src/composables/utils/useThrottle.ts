export default function throttle(callback: (value: unknown) => void, timeout: number): () => void {
  let timer: number | null = null;

  return function perfrom(): void {
    if (timer) return;

    timer = setTimeout((value: unknown) => {
      callback(value);

      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }, timeout);
  };
}
