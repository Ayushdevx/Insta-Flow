import { NextResponse } from 'next/server';
import { supabase } from '@/lib/auth';

export async function GET() {
  const { data: stats, error } = await supabase
    .from('automation_stats')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(7);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(stats);
}