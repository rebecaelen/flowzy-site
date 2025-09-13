import { useState, useEffect } from 'react';

const useAutoSave = (initialCode, delay = 2000) => {
  const [code, setCode] = useState(initialCode);
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (code !== initialCode) {
        // Simula salvamento no localStorage
        localStorage.setItem('autoSave', code);
        setLastSaved(new Date());
        console.log('✅ Código salvo automaticamente');
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [code, delay, initialCode]);

  return [code, setCode, lastSaved];
};

export default useAutoSave;