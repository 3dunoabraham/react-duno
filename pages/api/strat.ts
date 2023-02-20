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
        // console.log("Puuuuuuuuuuuuuuuuut body", body)
        const { data: strat, error } = await supabase
          .from<Strat>('strats')
          .update(body)
          .match({ key: body.key })
          .single()
        if (error) {
          throw error
        }
        res.status(200).json(strat)
        // res.status(200).json({})
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
