import {useCallback, useState} from 'react';

export const useModal = () => {
  const [visible, setVisible] = useState(false);
  const toggleModal = useCallback(() => {
    setVisible(prev => !prev);
  }, []);

  return {
    visible,
    toggleModal,
  };
};
