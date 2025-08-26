import React from 'react';
import {View, Text, Button} from 'react-native';
import {commonStyles} from '../styles/common';

const Error = ({message, onRetry}) => {
  return (
    <View style={commonStyles.errorContainer}>
      <Text style={{color: 'red', marginBottom: 10}}>{message}</Text>
      {onRetry && <Button title="Retry" onPress={onRetry} />}
    </View>
  );
};

export default Error;
