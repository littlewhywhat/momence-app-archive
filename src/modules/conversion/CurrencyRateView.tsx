import React, {ComponentProps, useCallback} from 'react';
import {Pressable} from 'react-native';
import {CurrencyRate} from '../../types';
import {ListRow} from '../../components/ListRow';

interface CurrencyRateViewProps {
  currencyRate: CurrencyRate;
  onPress: (rate: CurrencyRate) => void;
}

export const CurrencyRateView: React.FC<
  CurrencyRateViewProps & Omit<ComponentProps<typeof Pressable>, 'onPress'>
> = ({onPress, currencyRate, ...props}) => {
  const handlePress = useCallback(
    () => onPress(currencyRate),
    [onPress, currencyRate],
  );

  const {code, rateToCzk, amount} = currencyRate;

  return (
    <Pressable onPress={handlePress} {...props}>
      <ListRow values={[code, rateToCzk, amount]} />
    </Pressable>
  );
};
