export function isLink(link: string) {
  const checkHttp = ["h", "t", "t", "p", ":"];
  const checkHttps = ["h", "t", "t", "p", "s", ":"];
  const linkArr = link.split("");
  const http = [];
  const https = [];
  for (let i = 0; i < 5; i++) {
    if (linkArr[i] === checkHttp[i]) {
      http.push(linkArr[i]);
    }
  }
  for (let i = 0; i < 6; i++) {
    if (linkArr[i] === checkHttps[i]) {
      https.push(linkArr[i]);
    }
  }
  return http.length === 5 || https.length === 6;
}

export async function urlToBase64(url: string): Promise<string | ArrayBuffer | null> {
  if (!url) throw new Error("неверный url");
  const blob = await fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Ссылка не действительна");
      }
      return res.blob();
    })
    .catch((err) => {
      throw err;
    });

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onerror = reject;
    reader.onloadend = () => resolve(reader.result);
  });
}
