import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import JwtCookieProvider from '../providers/JwtCookieProvider';

export default function MyCoins() {
  return (
    <JwtCookieProvider>
      <ProtectedRoute>
        <div>MyCoins</div>
      </ProtectedRoute>
    </JwtCookieProvider>
  );
}
