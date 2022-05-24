import React from 'react';
import useJwtCookie from '../useContext/useJwtCookie';

function ProtectedRoute({ children }: any) {
  const jwt = useJwtCookie();

  return jwt ? children : <div>not authenticated</div>;
}

export default ProtectedRoute;
