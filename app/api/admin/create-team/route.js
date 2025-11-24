import { supabaseService } from '../../../../lib/supabaseClient';
import { nanoid } from 'nanoid';

export async function POST(req) {
  try {
    const { name } = await req.json();
    const code = (name.split(/\s+/).map(x => x[0]).join('') || 'T') + '-' + nanoid(6).toUpperCase();
    
    const { data, error } = await supabaseService
      .from('teams')
      .insert([{ name, code, current_step: 1 }])
      .select()
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ ok: false, error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ ok: true, team: data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}