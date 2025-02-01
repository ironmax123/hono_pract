import { createClient } from '@supabase/supabase-js';

export async function fetchUserNames(
  SUPABASE_URL: string,
  SUPABASE_API_KEY: string
) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

  try {
    const { data, error } = await supabase.from('users').select('names');
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return data.map((user) => user.names);
  } catch (error) {
    console.error('Error fetching user names:', error);
    return 'エラーが発生しました';
  }
}

export async function addUser(
  SUPABASE_URL: string,
  SUPABASE_API_KEY: string,
  name: String
) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

  try {
    const { data, error } = await supabase
      .from('users')
      .insert({ names: name });

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

export async function deleteUser(
  SUPABASE_URL: string,
  SUPABASE_API_KEY: string,
  name: String
) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

  try {
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('names', name);

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

export async function updateUser(
  SUPABASE_URL: string,
  SUPABASE_API_KEY: string,
  name: String,
  newName: String
) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

  try {
    const { data, error } = await supabase
      .from('users')
      .update({ names: newName })
      .eq('names', name);

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
