import React from 'react';
import styled from 'styled-components/native';
import {Text as TextComponent} from './Text';
import {TextProps} from 'react-native';

export const ListRow: React.FC<{
  values: (string | number)[];
  textStyle?: TextProps['style'];
}> = ({values, textStyle}) => (
  <CurrencyRateContainer>
    {values.map((value, i) => (
      <Text style={textStyle} key={i}>
        {value}
      </Text>
    ))}
  </CurrencyRateContainer>
);

const Text = styled(TextComponent)`
  flex: 1;
  text-align: center;
  padding: ${({theme}) => theme.gaps.tiny};
`;

const CurrencyRateContainer = styled.View`
  flex-direction: row;
  align-items: space-between;

  border-bottom-width: ${({theme}) => theme.border.width};
  border-bottom-color: ${({theme}) => theme.border.secondary.color};
`;
