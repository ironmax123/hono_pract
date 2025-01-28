import { createClient } from '@supabase/supabase-js';
import { Hono } from 'hono'
import { cors } from 'hono/cors'
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
  console.log(datas);
  return c.json({ name: datas });
})

export default app

async function fetchUsers() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
  try {
    const { data, error } = await supabase
      .from('users')
      .select('names')
    if (error) {
      throw error;
    }
    if (data) {
      setUsers(data.map(user => user.names)) // useStateにデータを保存する
      return data.map(user => user.names);
    }
    return [];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}