import React, {PropsWithChildren} from 'react';
import {Modal as RNModal} from 'react-native';
import styled from 'styled-components/native';

export const Modal: React.FC<
  PropsWithChildren<{visible: boolean; close: () => void}>
> = ({visible, close, children}) => (
  <RNModal animationType="fade" visible={visible} transparent>
    <ModalContainer>
      <ModalSpace onPress={close} />
      <ModalView>
        {children}
        <CancelButton onPress={close}>
          <CancelText>Cancel</CancelText>
        </CancelButton>
      </ModalView>
    </ModalContainer>
  </RNModal>
);

const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalSpace = styled.Pressable`
  flex: 1;
`;

const ModalView = styled.View`
  flex: 4;
  background-color: ${({theme}) => theme.background.primary};
  border-radius: ${({theme}) => theme.border.radius}
    ${({theme}) => theme.border.radius} 0 0;
  padding: ${({theme}) => theme.gaps.medium};
`;

const CancelButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin: ${({theme}) => theme.gaps.medium} 0 ${({theme}) => theme.gaps.small} 0;
  height: ${({theme}) => theme.buttons.height.medium};
  background-color: ${({theme}) => theme.buttons.primary.background};
  border-radius: ${({theme}) => theme.border.radius};
`;

const CancelText = styled.Text`
  font-size: ${({theme}) => theme.text.size.medium};
  color: ${({theme}) => theme.buttons.primary.text};
`;
