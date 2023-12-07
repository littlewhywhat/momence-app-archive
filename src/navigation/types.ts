import type {
  StackScreenProps,
  StackNavigationProp,
} from '@react-navigation/stack';

export type RootStackParamList = {
  Main: undefined;
  NotFound: undefined;
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type MainScreenProps = RootStackScreenProps<keyof RootStackParamList>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
