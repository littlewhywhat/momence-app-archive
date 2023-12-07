import React, {useCallback, useState} from 'react';
import {Conversion, CurrencyCode} from '../../types';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text} from '../../components/Text';

interface ConversionViewProps {
  onAmountChange: (amount: number) => void;
  conversion: Conversion;
  onConversionCurrencyPress: () => void;
}

export const ConversionView: React.FC<ConversionViewProps> = ({
  conversion,
  onAmountChange,
  onConversionCurrencyPress,
}) => {
  const [textAmount, setTextAmount] = useState(String(conversion.czkAmount));

  const onCZKAmountChange = useCallback(
    (rawValue: string) => {
      // @todo write unit test
      // substitute , to . and prepend with 0 if starts with .
      const value = rawValue.replaceAll(',', '.').replace(/^\./, '0.');
      // check if value is convertable to number string with only 2 decimal places after .
      if (value.length && !value.match(/^\d+(?:\.\d{0,2})?$/)) {
        return;
      }
      // not allow adding/leaving more than one leading zeros
      const [integerPart] = value.split('.');
      if (integerPart.startsWith('0') && integerPart !== '0') {
        return;
      }
      setTextAmount(value);
      onAmountChange?.(Number(value));
    },
    [setTextAmount, onAmountChange],
  );

  return (
    <ConversionViewContainer>
      <RowContainer>
        <CZKCurrencyCodeView>
          <Text size="medium">{CurrencyCode.CZK}</Text>
        </CZKCurrencyCodeView>
        <CZKAmountInputContainer>
          <CZKAmountInput
            autoFocus
            maxLength={11}
            value={textAmount}
            placeholder="0.00"
            onChangeText={onCZKAmountChange}
          />
        </CZKAmountInputContainer>
      </RowContainer>
      <RowContainer>
        <ConversionCurrencyCodeView onPress={onConversionCurrencyPress}>
          <Text size="medium">{conversion.currencyRate.code}</Text>
          <ConversionCurrencyCodeIcon name="caret-down" />
        </ConversionCurrencyCodeView>
        <ConvertedAmountTextContainer>
          <ConvertedAmountText>{conversion.result}</ConvertedAmountText>
        </ConvertedAmountTextContainer>
      </RowContainer>
    </ConversionViewContainer>
  );
};

const ConversionViewContainer = styled.View`
  flex: 1;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const CZKCurrencyCodeView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  padding-top: ${({theme}) => theme.gaps.small};
  padding-bottom: ${({theme}) => theme.gaps.small};

  background-color: ${({theme}) => theme.buttons.secondary.background};

  border-top-left-radius: ${({theme}) => theme.border.radius};
  border-color: ${({theme}) => theme.border.primary.color};
  border-width: ${({theme}) => theme.border.width};
`;

const CZKAmountInputContainer = styled.View`
  flex: 2;
  justify-content: center;
  padding-right: ${({theme}) => theme.gaps.medium};

  background-color: ${({theme}) => theme.background.secondary};

  border-top-right-radius: ${({theme}) => theme.border.radius};
  border-color: ${({theme}) => theme.border.primary.color};
  border-top-width: ${({theme}) => theme.border.width};
  border-right-width: ${({theme}) => theme.border.width};
  border-bottom-width: ${({theme}) => theme.border.width};
`;

const CZKAmountInput = styled.TextInput.attrs({
  inputMode: 'decimal',
})`
  text-align: right;
  font-size: ${({theme}) => theme.text.size.medium};
  color: ${({theme}) => theme.text.primary.color};
`;

const ConversionCurrencyCodeIcon = styled(Icon)`
  margin-left: ${props => props.theme.gaps.tiny};
  align-self: center;
  color: ${props => props.theme.text.primary.color};
`;

const ConversionCurrencyCodeView = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  padding: ${({theme}) => theme.gaps.small} 0 ${({theme}) => theme.gaps.small} 0;

  background-color: ${({theme}) => theme.buttons.secondary.background};

  border-bottom-left-radius: ${({theme}) => theme.border.radius};
  border-color: ${({theme}) => theme.border.primary.color};
  border-width: ${({theme}) => theme.border.width};
  border-top-width: 0;
`;

const ConvertedAmountTextContainer = styled.View`
  flex: 2;
  padding-top: ${({theme}) => theme.gaps.small};
  padding-bottom: ${({theme}) => theme.gaps.small};
  padding-right: ${({theme}) => theme.gaps.medium};

  background-color: ${({theme}) => theme.background.secondary};

  border-bottom-right-radius: ${({theme}) => theme.border.radius};
  border-color: ${({theme}) => theme.border.primary.color};
  border-right-width: ${({theme}) => theme.border.width};
  border-bottom-width: ${({theme}) => theme.border.width};
  border-top-width: 0;
`;

const ConvertedAmountText = styled(Text).attrs({
  size: 'medium',
})`
  flex: 2;
  text-align: right;
`;
