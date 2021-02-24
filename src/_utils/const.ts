export const API_URL = "https://api.deno.land";
export const HEADERS = new Headers([
  ["User-Agent", `Denin (https://deno.land/x/denin) (${Deno.build.os})`],
  ["Accepts", "application/json"],
]);
