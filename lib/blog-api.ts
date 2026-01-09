// Blog API functions
import { supabase } from './supabase';

export async function getBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function getBlogs(includeDrafts = false) {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (!includeDrafts) {
    query = query.eq('published', true);
  }

  const { data, error } = await query;
  return { data, error };
}

export async function createBlogPost(postData) {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([postData])
    .select()
    .single();
  return { data, error };
}

export async function createBlog(postData) {
  return createBlogPost(postData);
}

export async function getBlogBySlug(slug) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();
  return { data, error };
}

export async function updateBlog(id, postData, oldData) {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(postData)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
}

export async function deleteBlog(id) {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);
  return { error };
}

export async function toggleBlogPublish(id, published) {
  const { data, error } = await supabase
    .from('blog_posts')
    .update({ published })
    .eq('id', id)
    .select()
    .single();
  return { data, error };
}
