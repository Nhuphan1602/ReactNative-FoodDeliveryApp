import React from 'react';
import {render} from '@testing-library/react-native';
import SplashScreen from './SplashScreen';
import { colors, images } from '../constants';

describe('SplashScreen', () => {
  it('renders the splash screen image', () => {
    const {getByTestId} = render(<SplashScreen />);
    const splashImage = getByTestId('splashImage');

    expect(splashImage).toBeTruthy();
  });

  it('applies the correct container styles', () => {
    const {getByTestId} = render(<SplashScreen />);
    const container = getByTestId('splashContainer');

    expect(container).toBeTruthy();
    expect(container.props.style).toEqual({
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.SECONDARY_RED,
    });
  });

  it('applies the correct image styles', () => {
    const {getByTestId} = render(<SplashScreen />);
    const splashImage = getByTestId('splashImage');

    expect(splashImage).toBeTruthy();
    expect(splashImage.props.source).toEqual(images.WELCOME);
    expect(splashImage.props.resizeMode).toBe('contain');
  });
});
