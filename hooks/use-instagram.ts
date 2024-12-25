import { useState, useEffect } from 'react';
import { InstagramClient } from '@/lib/instagram';

export function useInstagram(accessToken: string) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const client = new InstagramClient(accessToken);
        const media = await client.getMediaItems();
        setPosts(media);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchPosts();
    }
  }, [accessToken]);

  return { posts, loading, error };
}