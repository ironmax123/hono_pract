import { createClient } from '@supabase/supabase-js';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { useState } from 'hono/jsx';
import { fetchUserNames, addUser, deleteUser, updateUser } from './crud';

const app = new Hono();
const [users, setUsers] = useState(['']);

app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
    maxAge: 600,
  })
);

app.get('/', (c) => {
  return c.json({
    message: 'HELLO WORLD',
    FROM: 'from Hono on Cloudflare Workers!',
  });
});
app.get('/msg', (c) => {
  return c.json({ message: 'Hono!', FROM: 'Cloudflare' });
});
app.get('/db/read', async (c) => {
  const SUPABASE_URL = (c.env as { SUPABASE_URL: string }).SUPABASE_URL;
  const SUPABASE_API_KEY = (c.env as { SUPABASE_API_KEY: string })
    .SUPABASE_API_KEY;
  const datas = await fetchUserNames(SUPABASE_URL, SUPABASE_API_KEY);

  return c.json({ users: datas });
});

app.get('/db', async (c) => {
  return c.json({ users: [] });
});
app.post('/db/addUser', async (c) => {
  const SUPABASE_URL = (c.env as { SUPABASE_URL: string }).SUPABASE_URL;
  const SUPABASE_API_KEY = (c.env as { SUPABASE_API_KEY: string })
    .SUPABASE_API_KEY;
  const { name } = await c.req.json();
  const result = await addUser(SUPABASE_URL, SUPABASE_API_KEY, name);
  return c.json({ result: result });
});

app.post('/db/deleteUser', async (c) => {
  const SUPABASE_URL = (c.env as { SUPABASE_URL: string }).SUPABASE_URL;
  const SUPABASE_API_KEY = (c.env as { SUPABASE_API_KEY: string })
    .SUPABASE_API_KEY;
  const { name } = await c.req.json();
  const result = await deleteUser(SUPABASE_URL, SUPABASE_API_KEY, name);
  return c.json({ result: result });
});

app.post('/db/updateUser', async (c) => {
  const SUPABASE_URL = (c.env as { SUPABASE_URL: string }).SUPABASE_URL;
  const SUPABASE_API_KEY = (c.env as { SUPABASE_API_KEY: string })
    .SUPABASE_API_KEY;
  const { name } = await c.req.json();
  const { newName } = await c.req.json();
  const result = await updateUser(
    SUPABASE_URL,
    SUPABASE_API_KEY,
    name,
    newName
  );
  return c.json({ result: result });
});
export default app;
