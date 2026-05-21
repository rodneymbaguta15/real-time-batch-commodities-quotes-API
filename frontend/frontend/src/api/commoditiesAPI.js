const BASE = '/quote';     // Base URL for the API


async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }
  return res.json();
} 


//get a specific commodityQuote
export const commodityQuote = (symbol) => get(`/${symbol}`);

//get a list of all tracked commodities
export const commodityQuotes = () => get('/list');