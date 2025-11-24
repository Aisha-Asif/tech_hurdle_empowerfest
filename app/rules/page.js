'use client'
import { useRouter } from 'next/navigation';

export default function RulesPage() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1729 100%)',
      color: 'white',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif"
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

      {/* Back Button - Top Left Corner */}
      <button
        onClick={() => router.push('/')}
        style={{
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem',
          background: 'rgba(255,255,255,0.08)',
          border: '2px solid rgba(255,255,255,0.2)',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '50px',
          cursor: 'pointer',
          fontSize: '0.95rem',
          fontWeight: '600',
          transition: 'all 0.3s',
          backdropFilter: 'blur(8px)',
          zIndex: 20
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
          e.currentTarget.style.borderColor = 'rgba(147,51,234,0.5)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
        }}
      >
        ← Back to Home
      </button>

      {/* Main Content Container */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: '5rem',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Title Section */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '2.5rem'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            background: 'linear-gradient(90deg, #9333ea, #ec4899, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: '800',
            margin: '0 0 0.75rem 0',
            textShadow: '0 0 40px rgba(147,51,234,0.7)',
            letterSpacing: '0.5px',
            lineHeight: '1.2'
          }}>
            Event Rules & Guidelines
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.85)',
            margin: '0',
            fontWeight: '400'
          }}>
            Master the ancient art of cipher-solving and baton passing
          </p>
        </div>

        {/* Scrollable Rules Container */}
        <div style={{
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(147,51,234,0.5)',
          borderRadius: '20px',
          padding: '2rem',
          maxHeight: '70vh',
          overflowY: 'auto',
          boxShadow: `
            0 25px 100px rgba(0,0,0,0.8),
            0 0 60px rgba(147,51,234,0.5),
            inset 0 1px 25px rgba(255,255,255,0.08)
          `
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Baton System */}
            <div style={{
              background: 'rgba(147,51,234,0.2)',
              border: '2px solid rgba(147,51,234,0.5)',
              borderRadius: '16px',
              padding: '1.75rem',
              backdropFilter: 'blur(12px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '2.5rem' }}>🔑</div>
                <h2 style={{ fontSize: '1.75rem', color: '#fbbf24', margin: 0, fontWeight: '700' }}>
                  The Baton System
                </h2>
              </div>
              
              <div style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.9)' }}>
                <p style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.75rem' }}>What is a Baton?</p>
                <p style={{ marginBottom: '1.25rem' }}>A baton is a mystical code that unlocks the next challenge. Each team member must pass their discovered baton to the next teammate.</p>
                
                <div style={{ 
                  background: 'rgba(0,0,0,0.35)', 
                  padding: '1.25rem',
                  borderRadius: '12px',
                  marginBottom: '1.25rem',
                  border: '1px solid rgba(147,51,234,0.35)'
                }}>
                  <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem', fontWeight: '700' }}>🎯 How it Works:</p>
                  <ol style={{ paddingLeft: '1.5rem', margin: 0, fontSize: '0.9rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}>Teammate 1 solves the cipher problem and discovers a baton code</li>
                    <li style={{ marginBottom: '0.5rem' }}>They pass the baton to Teammate 2</li>
                    <li style={{ marginBottom: '0.5rem' }}>Teammate 2 enters the baton in the portal to unlock their challenge</li>
                    <li>Continue until all 4 labs are completed</li>
                  </ol>
                </div>

                <div style={{
                  background: 'rgba(251,191,36,0.15)',
                  border: '1px solid rgba(251,191,36,0.35)',
                  padding: '1rem',
                  borderRadius: '10px'
                }}>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    ⚠️ Batons are case-sensitive and must be entered exactly as discovered.
                  </p>
                </div>
              </div>
            </div>

            {/* The Four Labs */}
            <div style={{
              background: 'rgba(236,72,153,0.2)',
              border: '2px solid rgba(236,72,153,0.5)',
              borderRadius: '16px',
              padding: '1.75rem',
              backdropFilter: 'blur(12px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '2.5rem' }}>🏰</div>
                <h2 style={{ fontSize: '1.75rem', color: '#ec4899', margin: 0, fontWeight: '700' }}>
                  The Four Keys to Salvation
                </h2>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem',
                marginTop: '1rem'
              }}>
                {[
                  { name: 'The Room of Requirement', desc: 'Master reverse-position cipher with case-sensitive shifting algorithms' },
                  { name: 'The Forbidden Forest', desc: 'Conquer Fibonacci cryptography with mathematical progression key generation' },
                  { name: 'The Astronomy Tower', desc: 'Decode Atbash mirror cipher with positional backward-shift transformations' },
                  { name: 'The Chamber of Secrets', desc: 'Solve advanced case-dependent cipher with positional arithmetic operations' }
                ].map((lab, index) => (
                  <div key={index} style={{
                    background: 'rgba(0,0,0,0.35)',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(236,72,153,0.35)',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{lab.emoji}</div>
                    <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.5rem', fontWeight: '600' }}>
                      {lab.name}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: '1.4' }}>
                      {lab.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Getting Started */}
            <div style={{
              background: 'rgba(16,185,129,0.2)',
              border: '2px solid rgba(16,185,129,0.45)',
              borderRadius: '16px',
              padding: '2rem',
              backdropFilter: 'blur(12px)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
              <h2 style={{ fontSize: '1.75rem', color: '#10b981', marginBottom: '1rem', fontWeight: '700' }}>
                Ready to Begin Your Quest?
              </h2>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.85)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Gather your team, enter the portal, and may the code be with you!
              </p>
              <button
                onClick={() => router.push('/login')}
                style={{
                  padding: '1rem 2.5rem',
                  background: 'linear-gradient(135deg, #10b981, #059669, #047857)',
                  border: 'none',
                  borderRadius: '50px',
                  color: 'white',
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(16,185,129,0.5)',
                  transition: 'all 0.3s',
                  textShadow: '0 1px 5px rgba(0,0,0,0.3)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(16,185,129,0.7)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(16,185,129,0.5)';
                }}
              >
                Enter Team Portal →
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #9333ea, #ec4899);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #ec4899, #f59e0b);
        }
        
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}