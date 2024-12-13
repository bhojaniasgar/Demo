import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface LoaderProps {
  text?: string;
}

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