import React from 'react';
import styled from 'styled-components/native';
import {Text} from './Text';

type MessageType = 'error' | 'warn' | 'info';

export const Message: React.FC<{
  message: string;
  messageType?: MessageType;
}> = ({message, messageType = 'info'}) => (
  <MessageContainer $type={messageType}>
    <MessageText>{message}</MessageText>
  </MessageContainer>
);

const MessageContainer = styled.View.attrs<{$type: MessageType}>(props => ({
  $type: props.$type,
}))`
  background-color: ${({$type, theme}) =>
    theme.messages[$type].backgroundColor};
  margin-top: ${({theme}) => theme.gaps.medium};
  margin-right: ${({theme}) => theme.gaps.medium};
  margin-left: ${({theme}) => theme.gaps.medium};
  padding: ${({theme}) => theme.gaps.small};
  border-radius: ${({theme}) => theme.border.radius};
`;

const MessageText = styled(Text).attrs({
  size: 'small',
})`
  text-align: center;
`;
