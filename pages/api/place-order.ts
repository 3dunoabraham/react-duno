import { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';
import crypto from 'crypto';

type LimitOrderParams = {
  side: string,
  symbol: string,
  quantity: number,
  price: number,
  recvWindow?: number,
  timestamp?: number
}

export function getCryptoPriceDecimals(symbol: string): number {
  const lookupTable: { [key: string]: number } = {
    'BTC': 5,
    'ETH': 5,
    'BNB': 4,
    'USDT': 4,
    'ADA': 4,
    'DOGE': 8,
    'XRP': 4,
    'DOT': 4,
    'UNI': 4,
    'SOL': 4
  };
  return lookupTable[symbol] || 2;
}

function makeLimitOrder({ side, symbol, quantity, price, recvWindow = 5000, timestamp = Date.now() }, apiKey: string, apiSecret: string, callback: Function) {
  const options: https.RequestOptions = {
    hostname: 'api.binance.com',
    port: 443,
    path: '/api/v3/order',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-MBX-APIKEY': apiKey
    }
  };
  let _price = price.toFixed(getCryptoPriceDecimals(symbol))
  console.log(price,"->",_price)
  console.log("quantity",quantity)
  const params = `symbol=${symbol}&side=${side}&type=LIMIT&timeInForce=GTC&quantity=${quantity}&price=${_price}&recvWindow=${recvWindow}&timestamp=${timestamp}`;
  const signature = crypto.createHmac('sha256', apiSecret).update(params).digest('hex');
  const data = `${params}&signature=${signature}`;

  const req = https.request(options, (res) => {
    let result = '';

    res.on('data', (data) => {
      result += data;
    });

    res.on('end', () => {
      callback(JSON.parse(result));
    });
  });

  req.on('error', (err) => {
    callback(err);
  });

  req.write(data);
  req.end();
}

const env_BINANCE_PUBLIC = process.env.BINANCE_PUBLIC
const env_BINANCE_SECRET = process.env.BINANCE_SECRET

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set your Binance API key and secret here
//   const apiKey = 'YOUR_API_KEY';
//   const apiSecret = 'YOUR_API_SECRET';
  
    const apiKey = env_BINANCE_PUBLIC
    const apiSecret = env_BINANCE_SECRET

  // Retrieve the parameters from the request body
  const { side, symbol, quantity:_quantity, price:_price } = req.body;
  console.log("req body", { side, symbol, quantity:_quantity, price:_price })
  const { quantity, price } = adjustOrderParams(req.body);
  // Call the makeLimitOrder function with the retrieved parameters
  console.log("makelimitorder", { side, symbol, quantity, price })
  makeLimitOrder(
    { side, symbol, quantity, price },
    apiKey,
    apiSecret,
    (result: any) => {
      res.status(200).json(result);
    }
  );
}

  function adjustOrderParams({ side, symbol, quantity, price }: LimitOrderParams): { quantity: number; price: number } {
    const lookupTable: { [key: string]: number } = {
      BTC: 5,
      ETH: 5,
      BNB: 4,
      USDT: 4,
      ADA: 4,
      DOGE: 8,
      XRP: 4,
      DOT: 4,
      UNI: 4,
      SOL: 4,
    };
  
    const decimalPlaces = lookupTable[symbol] || 2;
    const adjustedQuantity = parseQuantity(symbol.toUpperCase(),quantity);
    const adjustedPrice = Number(price.toFixed(decimalPlaces));
  
    return { quantity: adjustedQuantity, price: adjustedPrice };
  }
  
export function parseQuantity(symbol: string, quantity: number): number {
    console.log("parseQuantity", symbol, quantity)
    const lookupTable: { [key: string]: number } = {
      'BTCUSDT': 5,
      'ETHUSDT': 4,
      'BNBUSDT': 4,
      'USDTUSDT': 4,
      'ADAUSDT': 4,
      'DOGEUSDT': 8,
      'XRPUSDT': 4,
      'DOTUSDT': 4,
      'UNIUSDT': 4,
      'SOLUSDT': 4
    };
    const decimalPlaces = lookupTable[symbol] || 2;
    return Number(quantity.toFixed(decimalPlaces));
  }

