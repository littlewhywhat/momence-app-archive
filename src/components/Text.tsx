import React, {ComponentProps} from 'react';
import {Text as RNText} from 'react-native';
import styled from 'styled-components/native';

export const Text: React.FC<
  {size?: 'small' | 'medium'} & ComponentProps<typeof RNText>
> = ({size = 'small', children, ...props}) => (
  <StyledText $size={size} {...props}>
    {children}
  </StyledText>
);

const StyledText = styled.Text.attrs<{$size?: 'small' | 'medium'}>(
  ({$size}) => ({
    $size: $size || 'small',
  }),
)`
  font-size: ${props =>
    props.$size === 'small'
      ? props.theme.text.size.small
      : props.theme.text.size.medium};
  color: ${props => props.theme.text.primary.color};
`;
