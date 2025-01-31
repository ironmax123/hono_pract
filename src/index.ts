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
  const SUPABASE_URL = (c.env as { SUPABASE_URL: string }).SUPABASE_URL;
  const SUPABASE_API_KEY = (c.env as { SUPABASE_API_KEY: string }).SUPABASE_API_KEY;
  const datas = await fetchUsers(SUPABASE_URL,SUPABASE_API_KEY);
  console.log(datas);
  
  return c.json({ users: datas});
})

export default app

async function fetchUsers(SUPABASE_URL: string, SUPABASE_API_KEY: string) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
    if (error) {
      throw error;
    }
    if (data) {
      return data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}