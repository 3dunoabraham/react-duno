import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


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

export interface Todo {
  id: string
  task: string
  completed: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query: { id } } = req

  switch (method) {
    case 'GET':
      try {
        const { data: todos, error } = await supabase
          .from<Todo>('todos')
          .select('*')

        if (error) {
          throw new Error(error.message)
        }

        res.status(200).json(todos)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
      }
      break

    case 'POST':
      try {
        const { data: todo, error } = await supabase
          .from<Todo>('todos')
          .insert(body)

        if (error) {
          throw new Error(error.message)
        }

        res.status(201).json(todo)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
      }
      break

    case 'PUT':
      try {
        const { data: todo, error } = await supabase
          .from<Todo>('todos')
          .update(body)
          .match({ id })

        if (error) {
          throw new Error(error.message)
        }

        res.status(200).json(todo)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
      }
      break

    case 'DELETE':
      try {
        const { data: todo, error } = await supabase
          .from<Todo>('todos')
          .delete()
          .match({ id })

        if (error) {
          throw new Error(error.message)
        }

        res.status(200).json(todo)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
      }
      break

    default:
      res.status(405).json({ message: `Method ${method} Not Allowed` })
      break
  }
}