'use client'
import { useState, useEffect } from 'react';

export default function WizardPortal() {
  const [page, setPage] = useState('start'); // start, checkpoint, problem, complete
  const [team, setTeam] = useState(null);
  const [selectedStep, setSelectedStep] = useState(1);
  const [baton, setBaton] = useState('');
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [particles, setParticles] = useState([]);

  const TOTAL_STEPS = 5; // Changed from 4 to 5

  useEffect(() => {
    const token = sessionStorage.getItem('teamToken');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    fetch('/api/team/me', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(r => r.json())
      .then(data => {
        if (data.ok) {
          setTeam(data.team);
          setSelectedStep(data.team.current_step);
        } else {
          window.location.href = '/login';
        }
      });

    // Create magical particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4
    }));
    setParticles(newParticles);
  }, []);

  const submitBaton = async () => {
    setLoading(true);
    setError('');
    const token = sessionStorage.getItem('teamToken');

    try {
      const res = await fetch('/api/baton/validate', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ step: selectedStep, baton: baton.trim() })
      });

      const data = await res.json();

      if (data.ok) {
        setProblem(data.problem);
        // Refresh team
        fetch('/api/team/me', {
          headers: { 'Authorization': 'Bearer ' + token }
        })
          .then(r => r.json())
          .then(d => {
            if (d.ok) {
              setTeam(d.team);
              setSelectedStep(d.team.current_step);
              // Check if all steps complete
              if (d.team.current_step > TOTAL_STEPS) {
                setPage('complete');
              } else {
                setPage('problem');
              }
            }
          });
      } else {
        setError(data.error || 'Invalid mystical code');
      }
    } catch (err) {
      setError('Connection to the ethereal plane failed');
    } finally {
      setLoading(false);
    }
  };

  if (!team) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/main.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.3,
          filter: 'brightness(0.8) contrast(1.2)'
        }} />

        {/* Dark Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(10, 14, 39, 0.7)'
        }} />

        <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <div style={{
            width: 60,
            height: 60,
            border: '4px solid rgba(147, 51, 234, 0.3)',
            borderTop: '4px solid #9333ea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <p style={{ fontSize: '2rem', opacity: 0.8 }}>Connecting to the Arcane...</p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      height: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: '1rem',
      margin: 0
    }}>
      {/* Background Image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(/main.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.3,
        filter: 'brightness(0.8) contrast(1.2)'
      }} />

      {/* Dark Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(10, 14, 39, 0.7)'
      }} />

      {/* Magical Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: '4px',
            height: '4px',
            background: 'radial-gradient(circle, rgba(147,51,234,0.8) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            pointerEvents: 'none'
          }}
        />
      ))}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-30px) scale(1.5); opacity: 1; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(147,51,234,0.5); }
          50% { box-shadow: 0 0 40px rgba(147,51,234,0.8), 0 0 60px rgba(236,72,153,0.6); }
        }
        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .wizard-button {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .wizard-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(147,51,234,0.4);
        }
        .wizard-button::before {
          content: '';
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          transition: 'left 0.5s',
        }
        .wizard-button:hover::before {
          left: '100%',
        }
      `}</style>

      <div style={{
        maxWidth: '100%',
        width: '100%',
        margin: '0',
        position: 'relative',
        zIndex: 1,
        padding: '0 1rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* START PAGE */}
        {page === 'start' && (
          <div style={{
            textAlign: 'center',
            animation: 'fadeIn 0.8s ease-out',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* Check if all complete */}
            {team.current_step > TOTAL_STEPS ? (
              <>
                <h1 style={{
                  fontSize: '3.5rem',
                  background: 'linear-gradient(90deg, #9333ea, #ec4899, #9333ea)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1rem',
                  marginTop: '0',
                  animation: 'shimmer 3s linear infinite',
                  fontWeight: 'bold'
                }}>
                  Congratulations, {team.name}
                </h1>
                <p style={{
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.8)',
                  marginBottom: '2rem',
                  maxWidth: '1000px',
                  margin: '0 auto 2rem',
                  lineHeight: '1.6'
                }}>
                  You have conquered the Whispering Realms by decoding all five mystical ciphers!
                </p>
                <button
                  onClick={() => setPage('complete')}
                  className="wizard-button"
                  style={{
                    padding: '1.5rem 3rem',
                    fontSize: '2.5rem',
                    background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                    boxShadow: '0 5px 20px rgba(147,51,234,0.6)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '35px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    letterSpacing: '2px',
                    animation: 'glow 2s ease-in-out infinite'
                  }}
                >
                  View Final Location!
                </button>
              </>
            ) : (
              <>
                <h1 style={{
                  fontSize: '3.5rem',
                  background: 'linear-gradient(90deg, #9333ea, #ec4899, #9333ea)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1rem',
                  marginTop: '0',
                  animation: 'shimmer 3s linear infinite',
                  fontWeight: 'bold'
                }}>
                  Welcome, {team.name}
                </h1>

                <p style={{
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.8)',
                  marginBottom: '2rem',
                  maxWidth: '1000px',
                  margin: '0 auto 2rem',
                  lineHeight: '1.6'
                }}>
                  You have entered the Whispering Realms. Five Keys to Salvation await, each guarded by ancient cipher spells.
                </p>

                {/* Centered Checkpoint Div with Begin Quest Button */}
                <div style={{
                  maxWidth: '950px',
                  width: '100%',
                  padding: '3rem',
                  background: 'rgba(0,0,0,0.55)',
                  border: '5px solid rgba(147,51,234,0.7)',
                  borderRadius: '25px',
                  boxShadow: `
                    0 20px 60px rgba(0,0,0,0.8),
                    0 0 40px rgba(147,51,234,0.45),
                    inset 0 1px 15px rgba(255,255,255,0.12)
                  `,
                  position: 'relative',
                  zIndex: 10,
                  backdropFilter: 'blur(10px)',
                  animation: 'glow 3s ease-in-out infinite',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '2rem'
                }}>
                  <h2 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '2.5rem' }}>Current Checkpoint</h2>
                  <div style={{
                    fontSize: '2.25rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '2.5rem'
                  }}>
                    Step {team.current_step} of {TOTAL_STEPS}
                  </div>

                  <button
                    onClick={() => setPage('checkpoint')}
                    className="wizard-button"
                    style={{
                      padding: '1rem 2.5rem',
                      fontSize: '2rem',
                      background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                      boxShadow: '0 5px 20px rgba(147,51,234,0.6)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '35px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      letterSpacing: '2px',
                    }}
                  >
                    🔮 Begin Your Quest
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* CHECKPOINT PAGE */}
        {page === 'checkpoint' && (
          <div style={{
            position: 'relative',
            width: '90%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.8s ease-out',
            padding: '1rem',
            boxSizing: 'border-box',
          }}>
            {/* Back Button fixed top-left */}
            <button
              onClick={() => setPage('start')}
              style={{
                position: 'fixed',
                top: '2rem',
                left: '2rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '1rem 1rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '1rem',
                zIndex: 20
              }}
            >
              ← Back to Portal
            </button>

            {/* Main Content */}
            <div style={{
              width: '100%',
              maxWidth: '1800px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              margin: '3rem 3rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '4rem', color: '#fff', marginBottom: '0.5rem' }}>
                  Enter the Mystic Baton
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: '1.6' }}>
                  Your teammate has discovered the key. Present it to unlock the next chamber.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {[1, 2, 3, 4, 5].map(step => (
                  <button
                    key={step}
                    onClick={() => setSelectedStep(step)}
                    disabled={step > team.current_step}
                    style={{
                      flex: '1 1 1px',
                      minWidth: '150px',
                      padding: '1.25rem',
                      background: selectedStep === step
                        ? 'linear-gradient(135deg, #9333ea, #ec4899)'
                        : step <= team.current_step
                          ? 'rgba(147,51,234,0.2)'
                          : 'rgba(100,100,100,0.2)',
                      border: selectedStep === step
                        ? '3px solid #fbbf24'
                        : '2px solid rgba(147,51,234,0.3)',
                      borderRadius: '15px',
                      color: step > team.current_step ? '#666' : '#fff',
                      cursor: step <= team.current_step ? 'pointer' : 'not-allowed',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      transition: 'all 0.3s',
                    }}
                  >
                    {step === 1 && 'The Room of Requirement'}
                    {step === 2 && 'The Forbidden Forest'}
                    {step === 3 && 'The Astronomy Tower'}
                    {step === 4 && 'The Chamber of Secrets'}
                    {step === 5 && 'The Great Hall'}
                    <div style={{ fontSize: '0.85rem', marginTop: '0.375rem', opacity: 0.8 }}>
                      {step <= team.current_step ? 'Available' : 'Locked'}
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ width: '100%' }}>
                <label style={{
                  display: 'block',
                  color: '#fbbf24',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem'
                }}>
                  🔐 Baton Code
                </label>
                <input
                  type="text"
                  value={baton}
                  onChange={(e) => setBaton(e.target.value)}
                  placeholder="Enter the mystical code..."
                  style={{
                    width: '97%',
                    padding: '1rem',
                    fontSize: '1rem',
                    background: 'rgba(0,0,0,0.5)',
                    border: '2px solid rgba(147,51,234,0.5)',
                    borderRadius: '15px',
                    color: '#fff',
                    fontFamily: 'monospace',
                    letterSpacing: '3px',
                    textAlign: 'center',
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && submitBaton()}
                />
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', marginTop: '0.5rem' }}>
                  💡 Hint: All shifts wrap around: Letters: % 26 (alphabet size), Numbers: % 10 (digits 0-9)
                </p>
              </div>

              {error && (
                <div style={{
                  background: 'rgba(239,68,68,0.2)',
                  border: '2px solid rgba(239,68,68,0.5)',
                  borderRadius: '15px',
                  padding: '0.75rem',
                  color: '#fca5a5',
                  textAlign: 'center',
                  fontSize: '1rem',
                  width: '100%'
                }}>
                  ⚠️ {error}
                </div>
              )}

              <button
                onClick={submitBaton}
                disabled={loading || !baton.trim()}
                className="wizard-button"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1rem',
                  background: loading || !baton.trim()
                    ? 'rgba(100,100,100,0.5)'
                    : 'linear-gradient(135deg, #9333ea, #ec4899)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  cursor: loading || !baton.trim() ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {loading ? '🔄 Channeling Magic...' : '✨ Unlock Chamber'}
              </button>
            </div>
          </div>
        )}

        {/* PROBLEM PAGE */}
        {page === 'problem' && problem && (
          <div style={{
            position: 'relative',
            width: '100%',
            minHeight: '110vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem 1rem 1rem 1rem',
            overflowY: 'auto',
            animation: 'fadeIn 0.8s ease-out'
          }}>
            {/* Back Button fixed top-left */}
            <button
              onClick={() => {
                setPage('start');
                setProblem(null);
                setBaton('');
                setError('');
              }}
              style={{
                position: 'fixed',
                top: '3rem',
                left: '5rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '0.75rem 1.25rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '1rem',
                zIndex: 20,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            >
              ← Return to Portal
            </button>

            {/* Unified Main Card */}
            <div style={{
              width: '100%',
              background: 'linear-gradient(135deg, rgba(147,51,234,0.25), rgba(236,72,153,0.25))',
              border: '3px solid rgba(251,191,36,0.6)',
              borderRadius: '15px',
              padding: '2rem',
              boxShadow: '0 10px 40px rgba(147,51,234,0.4), 0 0 30px rgba(236,72,153,0.3)',
              animation: 'glow 3s ease-in-out infinite',
              backdropFilter: 'blur(10px)',
              margin: '1rem 1rem',
              position: 'relative'
            }}>
              {/* Header Section */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{
                  fontSize: '3rem',
                  background: 'linear-gradient(90deg, #10b981, #059669)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  margin: '0.5rem'
                }}>
                  The Seal is Broken!
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', maxWidth: '900px', margin: '0 auto' }}>
                  The mystical barrier has fallen. Your challenge awaits below.
                </p>
              </div>

              {/* Divider */}
              <div style={{
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.5), transparent)',
                margin: '0.5rem 0'
              }} />

              {/* Problem Title */}
              <h3 style={{
                fontSize: '2rem',
                color: '#fbbf24',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                justifyContent: 'center'
              }}>
                {problem.title}
              </h3>

              {/* Problem Content */}
              <div style={{
                background: 'rgba(0,0,0,0.6)',
                borderRadius: '10px',
                padding: '1rem',
                color: '#fff',
                fontSize: '1rem',
                lineHeight: '1.1',
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace',
                border: '2px solid rgba(147,51,234,0.4)',
                marginBottom: '0.5rem',
                boxShadow: 'inset 0 1px 10px rgba(0,0,0,0.5)'
              }}>
                {problem.content}
              </div>

              {/* Instructions and Motivation Combined */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginTop: '0.5rem'
              }}>
                {/* Instructions */}
                <div style={{
                  background: 'rgba(251,191,36,0.15)',
                  border: '1px solid rgba(251,191,36,0.4)',
                  borderRadius: '10px',
                  padding: '0.5rem',
                  width: '100%'
                }}>
                  <h4 style={{ color: '#fbbf24', marginBottom: '0.25rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    📝 Your Quest
                  </h4>
                  <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', color: 'rgba(255,255,255,0.85)', lineHeight: '2', paddingLeft: '0.75rem', fontSize: '0.85rem', listStyle: 'none' }}>
                    <li>✦ Write your code in any language</li>
                    <li>✦ Decode the cipher to reveal the baton</li>
                    <li>✦ Pass the baton to your teammate</li>
                    <li>✦ They'll unlock the next chamber</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COMPLETE PAGE - ALL CHALLENGES DONE! */}
        {page === 'complete' && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1729 100%)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {/* Background Image - CLEAR VERSION */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url(/main.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }} />

            {/* Lighter Overlay for better text readability */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(27, 29, 41, 0.4)'
            }} />

            {/* Victory Title */}
            <div style={{
              position: 'relative',
              zIndex: 5,
              textAlign: 'center',
              marginBottom: '8rem',
              lineHeight: 0.9,
              width: '70%'
            }}>
              <h1 style={{
                fontSize: '4rem',
                color: '#c8e4ff',
                textShadow: `
                0 0 5px #9ec9ff,
                0 0 12px rgba(120,175,255,0.6),
                0 0 25px rgba(80,140,255,0.4)
              `,
                fontFamily: 'serif',
                fontWeight: 'bold',
                fontStyle: 'italic',
                marginBottom: '2rem',
              }}>
                CONGRATULATIONS!
              </h1>

              <h1 style={{
                fontSize: '5rem',
                color: '#c8e4ff',
                textShadow: `
                0 0 5px #9ec9ff,
                0 0 12px rgba(120,175,255,0.6),
                0 0 25px rgba(80,140,255,0.4)
              `,
                fontFamily: 'serif',
                fontWeight: 'bold',
                fontStyle: 'italic',
                margin: 0
              }}>
                The Final Whisper Fades!
              </h1>

              <div style={{
                fontSize: '2.5rem',
                color: '#fcfcfbff',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                marginTop: '10rem',
                wordSpacing: '0.5rem',
                textAlign: 'center'
              }}>
                You have conquered all five mystical realms! The Guardian of the Empowerfest awaits your arrival!
                Be the first team to reach the Multipurpose Block to claim ultimate victory in this mystical race against time!
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}