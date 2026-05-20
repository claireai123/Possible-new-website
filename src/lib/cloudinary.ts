export function cloudinaryCrop(url: string | undefined, ratio: string): string | undefined {
  if (!url) return url;
  if (!/res\.cloudinary\.com\/[^/]+\/image\/upload\//.test(url)) return url;
  if (/\/upload\/[^/]*\bc_(fill|crop|pad|thumb)\b/.test(url)) return url;
  const m = ratio.match(/aspect-\[(\d+)\/(\d+)\]/);
  if (!m) return url;
  const transform = `c_fill,g_auto,ar_${m[1]}:${m[2]},q_auto,f_auto`;
  return url.replace("/image/upload/", `/image/upload/${transform}/`);
}
