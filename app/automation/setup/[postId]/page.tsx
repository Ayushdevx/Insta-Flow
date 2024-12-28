'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { GeminiAI } from '@/lib/gemini';
import { Loader2, Wand2 } from 'lucide-react';

const gemini = new GeminiAI('AIzaSyCFbL4_XIFwYNiUGUDDGbskUegHZzmmNFU');

export default function AutomationSetupPage() {
  const { postId } = useParams();
  const [keyword, setKeyword] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateResponse = async () => {
    try {
      setLoading(true);
      const aiResponse = await gemini.generateResponse(
        `Generate a friendly Instagram DM response for users who comment "${keyword}" on my post.`
      );
      setResponse(aiResponse);
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAutomation = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/automation/rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id: postId,
          trigger_keyword: keyword,
          response_message: response
        })
      });

      if (!response.ok) throw new Error('Failed to save automation');
      
      // Show success message and redirect
    } catch (error) {
      console.error('Error saving automation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Set Up Post Automation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="keyword">Trigger Keyword</Label>
            <Input
              id="keyword"
              placeholder="Enter the keyword that will trigger the automation"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="response">Automated Response</Label>
            <div className="flex gap-2 mb-2">
              <Button
                variant="outline"
                onClick={handleGenerateResponse}
                disabled={!keyword || loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate AI Response
              </Button>
            </div>
            <Textarea
              id="response"
              placeholder="Enter the message that will be sent automatically"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              rows={4}
            />
          </div>

          <Button
            className="w-full"
            onClick={handleSaveAutomation}
            disabled={!keyword || !response || loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Save Automation'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}