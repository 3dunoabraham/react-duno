import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

export interface Strat {
  id: number
  mode: number
  state: number
  buy: number
  sell: number
  floor: number
  ceil: number
  min: number
  max: number
  minMaxAvg: number
  minMedian: number
  maxMedian: number
  token: string
  timeframe: string
  key: string
}


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req
  // res.status(200).json({})
  // return
  console.log("method", method)
  switch (method) {
    case 'GET':
      try {
        const { data: strats, error } = await supabase
          .from<Strat>('strats')
          .select('*')
        if (error) {
          throw error
        }
        res.status(200).json(strats)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to get strats' })
      }
      break

    case 'POST':
      try {
        const { data: strat, error } = await supabase
          .from<Strat>('strats')
          .insert(body)
          .single()
        if (error) {
          throw error
        }
        res.status(201).json(strat)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to create strat' })
      }
      break

      case 'PUT':
        try {
          const { key, ...fieldsToUpdate } = body
          const { data: existingStrat, error: selectError } = await supabase
            .from<Strat>('strats')
            .select('*')
            .match({ key })
            .single()
          // if (selectError) {
          //   throw selectError
          // }
          console.log("selectError")
          if (existingStrat) {
            const { data: updatedStrat, error: updateError } = await supabase
              .from<Strat>('strats')
              .update(fieldsToUpdate)
              .match({ key })
              .single()
            if (updateError) {
              throw updateError
            }
            res.status(200).json(updatedStrat)
          } else {
              console.log("insert new strat updating", { ...fieldsToUpdate, key })
              const { data: newStrat, error: insertError } = await supabase
              .from<Strat>('strats')
              .insert({ ...fieldsToUpdate, key, token: key.split("USDT")[0].toLowerCase(), timeframe: key.split("USDT")[1].toLowerCase() })
              .single()
            if (insertError) {
              console.log("insertError", insertError)
              throw insertError
            }
            res.status(201).json(newStrat)
          }
        } catch (error) {
          console.error(error)
          res.status(500).json({ message: 'Failed to update strat' })
        }
        break
      

    case 'DELETE':
      try {
        const { data: strat, error } = await supabase
          .from<Strat>('strats')
          .delete()
          .match({ key: body.key })
          .single()
        if (error) {
          throw error
        }
        res.status(200).json(strat)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to delete strat' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
