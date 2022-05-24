import React from 'react';
import useJwtCookie from '../useContext/useJwtCookie';

function ProtectedRoute({ children }: any) {
  const user = useJwtCookie();

  return user?.jwt && user.username ? children : <div>not authenticated</div>;
}

export default ProtectedRoute;
