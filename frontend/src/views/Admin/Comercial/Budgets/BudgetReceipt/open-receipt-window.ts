const WIDTH = 920;
const HEIGHT = 900;

export function openReceiptWindow(url: string): void {
  const left = Math.round((window.screen.availWidth - WIDTH) / 2);
  const top = Math.round((window.screen.availHeight - HEIGHT) / 2);

  window.open(
    url,
    `orcamento-recibo-${Date.now()}`,
    `popup=yes,width=${WIDTH},height=${HEIGHT},left=${left},top=${top},scrollbars=yes,resizable=yes`,
  );
}
