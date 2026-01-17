import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../utils/axios';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to fetch user content - if this succeeds, user is authenticated
        // If it fails with 401/403, user is not authenticated
        await axios.get('/content/get-content');
        setIsAuthenticated(true);
      } catch (error: any) {
        // If unauthorized or forbidden, user is not authenticated
        if (error.response?.status === 401 || error.response?.status === 403) {
          setIsAuthenticated(false);
        } else {
          // For other errors, assume not authenticated to be safe
          setIsAuthenticated(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    // Show loading state while checking authentication
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signup" replace />;
  }

  return <>{children}</>;
}

