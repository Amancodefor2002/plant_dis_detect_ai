'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleNavigation = (path: string) => (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <main style={{ 
      height: '100vh', 
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: 'url("/images/bcg.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Overlay */}
      <div style={{ 
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        zIndex: 1
      }}></div>

      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '8vh'
      }}>
        {/* Title Section */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#f5e6d3', fontFamily: 'serif', marginBottom: '2vh' }}>
            <span style={{ 
              display: 'block',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              marginBottom: '0.5rem',
              opacity: 0,
              animation: 'titleAppear 3s ease-out 0.3s forwards'
            }}>Welcome to</span>
            <span style={{
              display: 'block',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              marginBottom: '0.5rem',
              opacity: 0,
              animation: 'titleAppear 3s ease-out 0.6s forwards'
            }}>the Plant</span>
            <span style={{
              display: 'block',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              opacity: 0,
              animation: 'titleAppear 3s ease-out 0.9s forwards'
            }}>World</span>
          </h1>
          {/* Tagline */}
          <p style={{
            color: 'rgba(245, 230, 211, 0.9)',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 1rem',
            opacity: 0,
            animation: 'titleAppear 3s ease-out 1.2s forwards'
          }}>
            <span style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: 300 }}>
              Discover the power of AI in plant disease detection. Upload, analyze, and protect your plants with just a click.
            </span>
          </p>
        </div>

        {/* Buttons Container */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '500px',
          padding: '0 1rem',
          gap: '1rem',
          marginTop: '4vh'
        }}>
          {/* Login Button */}
          <a 
            href="/login"
            onClick={handleNavigation('/login')}
            className="hover-grow"
            style={{
              opacity: 0,
              animation: 'titleAppear 3s ease-out 1.5s forwards',
              cursor: 'pointer',
              maxWidth: '200px'
            }}
          >
            <div className="button-container">
              <span className="button-text button-text-top">Grow With Us</span>
              <span className="button-text button-text-bottom">Login</span>
            </div>
          </a>

          {/* Signup Button */}
          <a 
            href="/signup"
            onClick={handleNavigation('/signup')}
            className="hover-grow"
            style={{
              opacity: 0,
              animation: 'titleAppear 3s ease-out 1.8s forwards',
              cursor: 'pointer',
              maxWidth: '200px'
            }}
          >
            <div className="button-container">
              <span className="button-text button-text-top">Plant Your Roots</span>
              <span className="button-text button-text-bottom">Sign Up</span>
            </div>
          </a>
        </div>
      </div>

      {/* Plant Illustration */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 20
      }}>
        <div style={{ position: 'relative' }}>
          {/* Main Plant */}
          <div className="animate-float" style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '300px',
            height: '200px'
          }}>
            <Image
              src="/images/plant-illustration.svg"
              alt="Plant Illustration"
              fill
              priority
              style={{ objectFit: 'contain', objectPosition: 'bottom' }}
            />
          </div>
          
          {/* Background Plants */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '4rem',
            backgroundColor: '#1B5E20'
          }} />
        </div>
      </div>
    </main>
  );
}
