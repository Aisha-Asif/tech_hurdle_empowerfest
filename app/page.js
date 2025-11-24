'use client'
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1729 100%)',
      position: 'relative',
      overflow: 'hidden',
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

      Lighter Overlay for better text readability
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(27, 29, 41, 0.4)'
      }} />

      {/* Tech Hurdle Title */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        textAlign: 'center',
        marginBottom: '15rem',
        lineHeight: 0.9      // reduces space between the two <h1> lines
      }}>
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
          TECH
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
          HURDLE
        </h1>
      </div>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        textAlign: 'center',
        maxWidth: '1000px',
        padding: '1rem'
      }}>
        {/* Description */}
        <p style={{
          fontSize: '1rem',
          color: 'rgba(255,255,255,0.9)',
          marginBottom: '2rem',
          lineHeight: '1.6',
          fontWeight: '400',
        }}>
          Dive into the new generation of coding challenges!
        </p>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {/* Continue Button */}
          <button
            onClick={() => router.push('/login')}
            style={{
              padding: '1rem 1rem',
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 12px 50px rgba(59,130,246,0.45)',
              transition: 'all 0.3s ease',
              letterSpacing: '1px',
              minWidth: '230px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.07)';
              e.currentTarget.style.boxShadow = '0 18px 60px rgba(59,130,246,0.7)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 12px 50px rgba(59,130,246,0.45)';
            }}
          >
            Continue
          </button>

          {/* Rules Button */}
          <button
            onClick={() => router.push('/rules')}
            style={{
              padding: '1rem 1rem',
              background: 'rgba(255,255,255,0.12)',
              border: '2px solid rgba(255,255,255,0.25)',
              borderRadius: '50px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              letterSpacing: '1px',
              minWidth: '230px',
              backdropFilter: 'blur(10px)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.18)';
              e.currentTarget.style.borderColor = 'rgba(147,51,234,0.5)';
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.07)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
          >
            Event Rules
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        /* Smooth scaling for all interactive elements */
        * {
          box-sizing: border-box;
        }
        
        button {
          font-family: inherit;
        }
        
        button:focus {
          outline: 2px solid #9333ea;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}