import { supabaseService } from '../../../../lib/supabaseClient';
import { verify } from '../../../../lib/auth';

export async function POST(req) {
  try {
    const auth = req.headers.get('authorization') || '';
    const token = auth.replace('Bearer ', '');
    const payload = verify(token);

    if (!payload) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { step, baton } = await req.json();

    // Get team
    const { data: team, error: teamError } = await supabaseService
      .from('teams')
      .select('*')
      .eq('id', payload.teamId)
      .single();

    if (teamError || !team) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Team not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if team is at correct step
    if (team.current_step !== step) {
      return new Response(
        JSON.stringify({ ok: false, error: `Your team is currently at step ${team.current_step}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get problem
    const { data: problem } = await supabaseService
      .from('problems')
      .select('*')
      .eq('step', step)
      .single();

    if (!problem) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Problem not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Normalize baton for comparison (remove spaces, lowercase)
    const normalize = (s) => (s || '').toString().toLowerCase().replace(/[^0-9a-z]/g, '');
    const providedBaton = normalize(baton);
    const expectedBaton = normalize(problem.expected_baton);

    // Log attempt
    await supabaseService.from('progress_logs').insert([{
      team_id: team.id,
      step,
      baton_provided: baton,
      success: providedBaton === expectedBaton
    }]);

    if (providedBaton !== expectedBaton) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Invalid baton. Check your answer and try again.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Baton correct - advance team
    await supabaseService
      .from('teams')
      .update({ current_step: team.current_step + 1 })
      .eq('id', team.id);

    return new Response(
      JSON.stringify({
        ok: true,
        problem: {
          title: problem.title,
          content: problem.content,
          instructions: problem.instructions
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Baton validation error:', err);
    return new Response(
      JSON.stringify({ ok: false, error: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}