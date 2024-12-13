import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface LoaderProps {
  text?: string;
}

/**
 * A component that renders a loading indicator with an optional text message.
 * By default the component will only render an activity indicator.
 * If the `text` property is provided, it will render a text component with the
 * given text message below the activity indicator.
 *
 * @example
 * <Loader /> // renders an activity indicator only
 * <Loader text="Loading..." /> // renders an activity indicator with the text "Loading..."
 *
 * @param {string} [text] - An optional text message to render below the activity indicator.
 *
 * @returns {React.ReactElement} A React component that renders a loading indicator with an optional text message.
 */
const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
  },
});

export default Loader;
