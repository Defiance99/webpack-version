export default function useAttachContent(attach: HTMLElement | string): HTMLElement | null {
  if (typeof attach === 'string') {
    return document.querySelector(attach);
  }

  return attach;
}
