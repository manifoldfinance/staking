const BASE = `https://api.coingecko.com/api/v3`;

export async function getETHPrice(): Promise<number> {
  const COINGECKO_API = `${BASE}/simple/price?ids=ethereum&vs_currencies=USD`;

  type Data = {
    ethereum: {
      usd: number;
    };
  };

  try {
    const r = await fetch(COINGECKO_API);

    if (r.ok) {
      const data: Data = await r.json();

      return data.ethereum.usd;
    }

    throw new Error(`${r.status} ${r.statusText}`);
  } catch (error) {
    console.error(error);

    throw error;
  }
}
