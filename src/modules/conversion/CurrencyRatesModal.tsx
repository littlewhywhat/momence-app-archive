import React, {useCallback} from 'react';
import {CurrencyRatesList} from './CurrencyRatesList';
import {Modal} from '../../components';
import {CurrencyRate} from '../../types';

export const CurrencyRatesSelectModal: React.FC<{
  visible: boolean;
  toggleModal: () => void;
  currencyRates: CurrencyRate[];
  onSelect: (rate: CurrencyRate) => void;
}> = ({visible, currencyRates, onSelect, toggleModal}) => {
  const handleSelect = useCallback(
    (currencyRate: CurrencyRate) => {
      onSelect(currencyRate);
      toggleModal();
    },
    [onSelect, toggleModal],
  );

  return (
    <Modal visible={visible} close={toggleModal}>
      <CurrencyRatesList
        currencyRates={currencyRates}
        onSelect={handleSelect}
      />
    </Modal>
  );
};
