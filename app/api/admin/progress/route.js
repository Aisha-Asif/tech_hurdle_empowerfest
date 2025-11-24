import { supabaseService } from '../../../../lib/supabaseClient';

export async function GET() {
  try {
    const { data: teams, error } = await supabaseService
      .from('teams')
      .select('*')
      .order('current_step', { ascending: false });

    if (error) {
      return new Response(
        JSON.stringify({ ok: false, error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get progress logs
    const { data: logs } = await supabaseService
      .from('progress_logs')
      .select('*')
      .order('created_at', { ascending: false });

    return new Response(
      JSON.stringify({ 
        ok: true, 
        teams: teams || [],
        logs: logs || [] 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}