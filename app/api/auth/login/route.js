import { supabaseService } from '../../../../lib/supabaseClient';
import { sign } from '../../../../lib/auth';

export async function POST(req) {
  try {
    const { code } = await req.json();
    
    const { data, error } = await supabaseService
      .from('teams')
      .select('*')
      .eq('code', code.trim().toUpperCase())
      .limit(1)
      .single();

    if (error || !data) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Invalid team code' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const token = sign({ teamId: data.id, teamName: data.name });
    
    return new Response(
      JSON.stringify({
        ok: true,
        token,
        team: {
          id: data.id,
          name: data.name,
          currentStep: data.current_step
        }
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