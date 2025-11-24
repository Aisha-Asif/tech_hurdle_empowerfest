import { supabaseService } from '../../../../lib/supabaseClient';

export async function POST(req) {
  try {
    const { step, title, expected_baton, content, instructions, next_lab } = await req.json();
    
    const { data, error } = await supabaseService
      .from('problems')
      .upsert([{ 
        step, 
        title, 
        expected_baton, 
        content, 
        instructions, 
        next_lab 
      }])
      .select()
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ ok: false, error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ ok: true, problem: data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}