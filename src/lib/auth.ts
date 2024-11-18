import { type APIContext } from 'astro';

// Interfaces for type safety
export interface User {
  id: string;
  username: string;
  role?: 'USER' | 'ADMIN';
}

export interface TokenVerification {
  isValid: boolean;
  user?: User;
}

export async function verifyToken(token: string | undefined): Promise<TokenVerification> {
  // Early return if no token
  if (!token) {
    return { isValid: false };
  }

  try {
    // Implement token verification with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch('YOUR_BACKEND_URL/verify-token', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        nonce: crypto.randomUUID(),
        timestamp: Date.now()
      })
    });

    clearTimeout(timeoutId);

    // Handle unsuccessful responses
    if (!response.ok) {
      console.warn(`Token verification failed: ${response.status}`);
      return { isValid: false };
    }

    // Parse and validate user data
    const userData = await response.json();
    return {
      isValid: true,
      user: {
        id: userData.id,
        username: userData.username,
        role: userData.role || 'USER'
      }
    };
  } catch (error) {
    // Detailed error logging
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('Token verification timed out');
    } else {
      console.error('Unexpected token verification error:', error);
    }
    return { isValid: false };
  }
}

// Secure cookie handling
export function setSecureCookie(context: APIContext, token: string) {
  context.cookies.set('token', token, {
    httpOnly: true,    // Prevent client-side access
    secure: true,      // Only send over HTTPS
    sameSite: 'strict', // Prevent CSRF
    path: '/',
    maxAge: 60 * 60 * 24 // 24 hours
  });
}

// Clear cookie on logout
export function clearSecureCookie(context: APIContext) {
  context.cookies.delete('token', {
    path: '/'
  });
}