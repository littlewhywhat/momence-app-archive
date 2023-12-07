import React, {useMemo, useState} from 'react';
import {CurrencyRate} from '../../types';
import styled from 'styled-components/native';
import {CurrencyRateView} from './CurrencyRateView';
import {FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text} from '../../components/Text';
import {ListRow} from '../../components/ListRow';

export const CurrencyRatesList: React.FC<{
  currencyRates: CurrencyRate[];
  onSelect: (currencyRate: CurrencyRate) => void;
}> = ({currencyRates, onSelect}) => {
  const [searchText, setSearchText] = useState('');

  const filteredCurrencyRates = useMemo(
    () =>
      currencyRates.filter(
        ({code}) =>
          !searchText.length || code.indexOf(searchText.toUpperCase()) >= 0,
      ),
    [searchText, currencyRates],
  );

  return (
    <>
      <SearchContainer>
        <SearchIcon name="search" />
        <SearchInput value={searchText} onChangeText={setSearchText} />
      </SearchContainer>
      {filteredCurrencyRates.length ? (
        <CurrencyRatesFlatList
          keyboardShouldPersistTaps="always"
          maxToRenderPerBatch={15}
          data={filteredCurrencyRates}
          ListHeaderComponent={Header}
          renderItem={({item: currencyRate}) => (
            <CurrencyRateView
              key={currencyRate.code}
              currencyRate={currencyRate}
              onPress={onSelect}
            />
          )}
        />
      ) : (
        <EmptyResultContainer>
          <Text>No currency found</Text>
        </EmptyResultContainer>
      )}
    </>
  );
};

const Header = () => <HeaderListRow values={['Code', 'Rate', 'Amount']} />;

const HeaderListRow = styled(ListRow).attrs(({theme}) => ({
  textStyle: {
    fontWeight: theme.text.weight.bold,
  },
}))``;

const CurrencyRatesFlatList = styled(FlatList<CurrencyRate>).attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})(({theme}) => ({
  flex: 1,
  marginTop: theme.smallGap,
}));

const SearchInput = styled.TextInput`
  flex: 1;
  font-size: ${({theme}) => theme.text.size.medium};
  padding: 0;
  margin: 0;
  color: ${({theme}) => theme.text.primary.color};
  background-color: ${({theme}) => theme.background.secondary};
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;

  border-radius: ${({theme}) => theme.border.radius};

  margin-right: ${({theme}) => theme.gaps.small};
  margin-left: ${({theme}) => theme.gaps.small};
  margin-bottom: ${({theme}) => theme.gaps.small};

  padding-right: ${({theme}) => theme.gaps.medium};
  padding-left: ${({theme}) => theme.gaps.medium};
  padding-top: ${({theme}) => theme.gaps.small};
  padding-bottom: ${({theme}) => theme.gaps.small};

  background-color: ${({theme}) => theme.background.secondary};
`;

const SearchIcon = styled(Icon)`
  font-size: ${({theme}) => theme.text.size.small};
  margin-right: ${({theme}) => theme.gaps.tiny};
  color: ${({theme}) => theme.text.primary.color};
`;

const EmptyResultContainer = styled.View`
  flex: 1;
  padding-top: ${({theme}) => theme.gaps.small};
`;
