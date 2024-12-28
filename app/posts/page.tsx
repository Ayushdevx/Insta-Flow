'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fetchUserPosts } from '@/lib/instagram-auth';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/auth';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadPosts() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/auth/login');
          return;
        }

        const userPosts = await fetchUserPosts(session.provider_token);
        setPosts(userPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [router]);

  const handleSelectPost = (postId: string) => {
    router.push(`/automation/setup/${postId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Select a Post for Automation</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <Card key={post.id} className="overflow-hidden">
            {post.media_url && (
              <img 
                src={post.media_url} 
                alt={post.caption || 'Instagram post'} 
                className="w-full h-48 object-cover"
              />
            )}
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {post.caption || 'No caption'}
              </p>
              <Button 
                className="w-full"
                onClick={() => handleSelectPost(post.id)}
              >
                Set Up Automation
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}