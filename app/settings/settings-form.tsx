'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save, Bell, Shield, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/auth';
import { useToast } from '@/components/ui/use-toast';

export default function SettingsForm() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    notifications_enabled: true,
    auto_responses: true,
    ai_suggestions: true,
    email: '',
    instagram_handle: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    loadUserProfile();
  }, []);

  async function loadUserProfile() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
        
        if (data) {
          setProfile(data);
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile settings',
        variant: 'destructive'
      });
    }
  }

  const saveSettings = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      await supabase
        .from('user_profiles')
        .upsert({
          user_id: session.user.id,
          ...profile
        });

      toast({
        title: 'Success',
        description: 'Settings saved successfully'
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram Handle</Label>
                <Input
                  id="instagram"
                  value={profile.instagram_handle}
                  onChange={(e) => setProfile({ ...profile, instagram_handle: e.target.value })}
                  placeholder="@username"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifications</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive notifications about your automation activity
                  </div>
                </div>
                <Switch
                  checked={profile.notifications_enabled}
                  onCheckedChange={(checked) => 
                    setProfile({ ...profile, notifications_enabled: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automated Responses</Label>
                  <div className="text-sm text-muted-foreground">
                    Enable automatic responses to comments
                  </div>
                </div>
                <Switch
                  checked={profile.auto_responses}
                  onCheckedChange={(checked) => 
                    setProfile({ ...profile, auto_responses: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>AI Suggestions</Label>
                  <div className="text-sm text-muted-foreground">
                    Get AI-powered suggestions for responses
                  </div>
                </div>
                <Switch
                  checked={profile.ai_suggestions}
                  onCheckedChange={(checked) => 
                    setProfile({ ...profile, ai_suggestions: checked })
                  }
                />
              </div>
            </div>

            <Button
              className="w-full"
              onClick={saveSettings}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Settings
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}