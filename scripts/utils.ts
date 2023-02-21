import https from 'https';
import crypto from 'crypto';

// export function parseQuantity(symbol: string, quantity: number): number {
//     const lookupTable: { [key: string]: number } = {
//       'BTC': 5,
//       'ETH': 5,
//       'BNB': 4,
//       'USDT': 4,
//       'ADA': 4,
//       'DOGE': 8,
//       'XRP': 4,
//       'DOT': 4,
//       'UNI': 4,
//       'SOL': 4
//     };
//     const decimalPlaces = lookupTable[symbol] || 2;
//     return Number(quantity.toFixed(decimalPlaces));
//   }
  
export type LimitOrderParams = {
  side: string,
  symbol: string,
  quantity: number,
  price: number,
  recvWindow?: number,
  timestamp?: number
}

export function parseQuantity(symbol: string, quantity: number): number {
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
  const decimalPlaces = lookupTable[symbol] || 2;
  return Number(quantity.toFixed(decimalPlaces));
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

export function makeLimitOrder({ side, symbol, quantity, price, recvWindow = 5000, timestamp = Date.now() }, apiKey: string, apiSecret: string, callback: Function) {
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

  const params = `symbol=${symbol}&side=${side}&type=LIMIT&timeInForce=GTC&quantity=${quantity}&price=${price.toFixed(getCryptoPriceDecimals(symbol))}&recvWindow=${recvWindow}&timestamp=${timestamp}`;
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

export function adjustOrderParams({ side, symbol, quantity, price }) {
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
  const adjustedQuantity = Number(quantity.toFixed(decimalPlaces));
  const adjustedPrice = Number(price.toFixed(decimalPlaces));

  return { quantity: adjustedQuantity, price: adjustedPrice };
}