import { NextResponse } from 'next/server';
import { supabase } from '@/lib/auth';
import { getSession } from '@/lib/session';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: rules, error } = await supabase
    .from('automation_rules')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(rules);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { post_id, trigger_keyword, response_message } = body;

  const { data, error } = await supabase
    .from('automation_rules')
    .insert([
      {
        user_id: session.user.id,
        post_id,
        trigger_keyword,
        response_message,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}