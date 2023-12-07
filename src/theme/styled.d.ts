import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    gaps: {
      tiny: string;
      small: string;
      medium: string;
      big: string;
    };

    text: {
      size: {
        medium: string;
        small: string;
      };
      primary: {
        color: string;
      };
      weight: {
        bold: '500';
      };
    };

    messages: {
      error: {
        backgroundColor: string;
      };
      warn: {
        backgroundColor: string;
      };
      info: {
        backgroundColor: string;
      };
    };

    buttons: {
      primary: {
        background: string;
        text: string;
      };
      secondary: {
        background: string;
        text: string;
      };
      height: {
        medium: string;
      };
    };

    border: {
      primary: {
        color: string;
      };
      secondary: {
        color: string;
      };
      radius: string;
      width: string;
    };

    background: {
      primary: string;
      secondary: string;
    };
  }
}
