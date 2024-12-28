import { supabase } from './auth';

const INSTAGRAM_API_BASE = 'https://graph.instagram.com/v12.0';

export async function loginWithInstagram() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'instagram',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      scopes: 'instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_messages'
    }
  });
  
  return { data, error };
}

export async function fetchUserPosts(accessToken: string) {
  const response = await fetch(`${INSTAGRAM_API_BASE}/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`);
  const data = await response.json();
  return data.data;
}

export async function fetchPostComments(postId: string, accessToken: string) {
  const response = await fetch(`${INSTAGRAM_API_BASE}/${postId}/comments?access_token=${accessToken}`);
  const data = await response.json();
  return data.data;
}