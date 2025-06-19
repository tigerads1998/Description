import React, { createContext, useContext, useState, useCallback } from 'react';

interface LoadingContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loadingTimer, setLoadingTimer] = useState<NodeJS.Timeout | null>(null);

  const handleSetLoading = useCallback((isLoading: boolean) => {
    if (loadingTimer) {
      clearTimeout(loadingTimer);
      setLoadingTimer(null);
    }

    if (isLoading) {
      setLoading(true);
    } else {
      // Add a small delay before hiding the loader to prevent flickering
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
      setLoadingTimer(timer);
    }
  }, [loadingTimer]);

  return (
    <LoadingContext.Provider value={{ loading, setLoading: handleSetLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}; 