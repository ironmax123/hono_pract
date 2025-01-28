import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { supabase } from "./db_connect";
import { useState } from 'hono/jsx';

const app = new Hono()
const [users, setUsers] = useState([""])

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
  maxAge: 600,
}))

app.get('/', (c) => {
  return c.json({ message: 'HELLO WORLD' ,FROM:'from Hono on Cloudflare Workers!'})
})
app.get('/msg', (c) => {
  return c.json({ message: 'Hono!' ,FROM:'Cloudflare'})
})
app.get('/db', async (c) => {
  const datas = await fetchUsers();
  return c.json({ name: datas });
})

export default app

async function fetchUsers() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('name')
    if (error) {
      throw error;
    }
    if (data) {
      setUsers(data.map(user => user.name)) // useStateにデータを保存する
      return data.map(user => user.name);
    }
    return [];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}