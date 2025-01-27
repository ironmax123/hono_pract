import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ message: 'Hono MSG' })
})

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
  maxAge: 600,
}))
export default app