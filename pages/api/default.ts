const fs = require('fs');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' })
      return
    }
    
    // const getexample = fs.readFile('./example.json');
    // console.log("getexample1",getexample);

    let now = Date.now()
    // console.log("writing asd", now, req.body)
    // fs.writeFileSync('./example.json', JSON.stringify({now}))


    // const getexample2 = await fs.readFile('./example.json');
    
    // console.log("getexample2",getexample2);

    return res.status(200).json({});
  
    // not needed in NextJS v12+
    // const body = JSON.parse(req.body)
  
    // the rest of your code
  }