export const metadata = { 
  title: 'FAST Relay Competition',
  description: 'Team-based coding relay'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body style={{ 
        fontFamily: 'system-ui, -apple-system, sans-serif', 
        margin: 0,
        padding: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        overflowY: 'auto'
      }}>
        {children}
      </body>
    </html>
  );
}