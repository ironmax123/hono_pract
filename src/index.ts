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
app.get('/db/read', async (c) => {
  const SUPABASE_URL = (c.env as { SUPABASE_URL: string }).SUPABASE_URL;
  const SUPABASE_API_KEY = (c.env as { SUPABASE_API_KEY: string }).SUPABASE_API_KEY;
  const datas = await fetchUserNames(SUPABASE_URL,SUPABASE_API_KEY);
  
  
  return c.json({ users: datas});
})

app.get('/db' ,async (c) => {
  return c.json({ users: []});
})
app.post('/db/addUser', async (c) => {
  const SUPABASE_URL = (c.env as { SUPABASE_URL: string }).SUPABASE_URL;
  const SUPABASE_API_KEY = (c.env as { SUPABASE_API_KEY: string }).SUPABASE_API_KEY;
  const { name } = await c.req.json();
  const result = await addUser(SUPABASE_URL, SUPABASE_API_KEY, name);
  return c.json({ result: result});
})

app.post('/db/deleteUser' ,async (c) => {
  const SUPABASE_URL = (c.env as { SUPABASE_URL: string }).SUPABASE_URL;
  const SUPABASE_API_KEY = (c.env as { SUPABASE_API_KEY: string }).SUPABASE_API_KEY;
  const { name } = await c.req.json();
  const result = await deleteUser(SUPABASE_URL, SUPABASE_API_KEY, name);
  return c.json({ result: result});
})
export default app


async function fetchUserNames(SUPABASE_URL: string, SUPABASE_API_KEY: string){
  const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
  
  try {
    const { data, error } = await supabase
      .from('users')
      .select('names');

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return data.map(user => user.names);
  } catch (error) {
    console.error('Error fetching user names:', error);
    return 'エラーが発生しました';
  }
}

async function addUser(SUPABASE_URL: string, SUPABASE_API_KEY: string,name:String){
  const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
  
  try {
    const { data, error } = await supabase
      .from('users')
      .insert({ names: name})

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return '成功しました';
  } catch (error) {
    console.error('Error fetching user names:', error);
    return [];
  }
}

async function deleteUser(SUPABASE_URL: string, SUPABASE_API_KEY: string,name:String){
  const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
  
  try {
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('names', name)

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return '成功しました';
  } catch (error) {
    console.error('Error fetching user names:', error);
    return [];
  }
}