import { useState, useCallback } from 'react';

export function usePopupMessage(timeout = 4000) {
  const [message, setMessage] = useState(null);

  const showMessage = useCallback((text) => {
    setMessage(text);
    if (timeout > 0) {
      setTimeout(() => {
        setMessage(null);
      }, timeout);
    }
  }, [timeout]);

  const hideMessage = useCallback(() => {
    setMessage(null);
  }, []);

  return {
    message,
    showMessage,
    hideMessage,
  };
}
