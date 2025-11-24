'use client'
import { useState } from 'react';

export default function LoginPage() {
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function login(e) {
    e?.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ code: code.trim() })
      });

      const data = await res.json();

      if (data.ok) {
        sessionStorage.setItem('teamToken', data.token);
        sessionStorage.setItem('teamId', data.team.id);
        window.location.href = '/dashboard';
      } else {
        setMsg(data.error || 'Invalid team code');
      }
    } catch (err) {
      setMsg('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #0f1729 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
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
        opacity: 0.15,
        filter: 'brightness(0.6) contrast(1.2)'
      }} />

      <div style={{
        maxWidth: 550,
        width: '100%',
        padding: '3rem 2.5rem',
        background: 'rgba(20, 15, 35, 0.85)',
        backdropFilter: 'blur(30px)',
        border: '3px solid transparent',
        borderRadius: 40,
        backgroundImage: `
          linear-gradient(rgba(20, 15, 35, 0.85), rgba(20, 15, 35, 0.85)),
          linear-gradient(135deg, #9333ea, #ec4899, #f59e0b)
        `,
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        boxShadow: `
          0 20px 80px rgba(0,0,0,0.9),
          0 0 60px rgba(147,51,234,0.4),
          inset 0 1px 20px rgba(255,255,255,0.05)
        `,
        position: 'relative',
        zIndex: 10
      }}>

        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <div style={{
            fontSize: '4rem',
            filter: 'drop-shadow(0 0 30px rgba(147,51,234,0.9))',
            animation: 'float 3s ease-in-out infinite'
          }}>🔮</div>
          <h2 style={{
            fontSize: '3rem',
            background: 'linear-gradient(135deg, #ec4899, #d946ef)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '900',
            letterSpacing: '0px',
            lineHeight: '1'
          }}>
            Enter the<br />Whispering Realms
          </h2>
          <p style={{
            color: 'rgba(200,200,220,0.8)',
            fontSize: '1.2rem',
            fontWeight: '400'
          }}>
            Present your mystical team code
          </p>
        </div>

        <div>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="ENTER TEAM CODE..."
            style={{
              width: '100%',
              padding: '1.25rem 1.5rem',
              fontSize: '0.95rem',
              marginBottom: '1.5rem',
              background: 'rgba(0,0,0,0.6)',
              border: '2px solid rgba(147,51,234,0.6)',
              borderRadius: 50,
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'monospace',
              letterSpacing: '3px',
              textAlign: 'center',
              textTransform: 'uppercase',
              fontWeight: '400',
              boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.8)',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#a855f7';
              e.target.style.boxShadow = '0 0 25px rgba(168, 85, 247, 0.3), inset 0 2px 10px rgba(0,0,0,0.8)';
              e.target.style.color = 'white';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(147,51,234,0.6)';
              e.target.style.boxShadow = 'inset 0 2px 10px rgba(0,0,0,0.8)';
              e.target.style.color = 'rgba(255,255,255,0.5)';
            }}
          />
          <button
            onClick={login}
            disabled={loading}
            style={{
              width: '100%',
              padding: '1.5rem',
              background: loading
                ? 'rgba(100,100,100,0.5)'
                : 'linear-gradient(90deg, #ec4899 0%, #d946ef 50%, #f59e0b 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 50,
              fontSize: '1rem',
              fontWeight: '800',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: loading
                ? 'none'
                : '0 15px 50px rgba(236, 72, 153, 0.6)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px'
            }}
            onMouseOver={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-3px)')}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {loading ? '🔄 CHANNELING MAGIC...' : '✨ ENTER PORTAL ✨'}
          </button>
        </div>

        {msg && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(239,68,68,0.2)',
            color: '#fca5a5',
            borderRadius: 15,
            border: '1px solid rgba(239,68,68,0.5)',
            textAlign: 'center',
            fontSize: '0.95rem',
            fontWeight: '500'
          }}>
            ⚠️ {msg}
          </div>
        )}

        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <a
            href="/"
            style={{
              color: 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              padding: '0.5rem 1rem',
              borderRadius: '50px',
              display: 'inline-block'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            ← Back to Home
          </a>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        * {
          box-sizing: border-box;
        }
        
        input:focus {
          outline: none;
        }
        
        button:focus {
          outline: 2px solid #a855f7;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}