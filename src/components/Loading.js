import React, {useEffect, useRef} from 'react';
import {View, Text, Animated, Easing, StyleSheet} from 'react-native';
import {commonStyles} from '../styles/common';

const Loading = ({message = 'Loading...'}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateRotation = () => {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    };

    animateRotation();

    return () => {
      rotateAnim.stopAnimation();
    };
  }, [rotateAnim]);

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={commonStyles.loadingContainer}>
      <Animated.View
        style={[
          styles.logoContainer,
          {transform: [{rotate: rotateInterpolation}]},
        ]}>
        {/* Outer rotating circle */}
        <View style={styles.outerCircle}>
          {/* Inner circle that stays in place */}
          <View style={styles.innerCircle}>
            <Text style={styles.logoText}>HYI</Text>
          </View>
        </View>
      </Animated.View>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#007AFF',
    borderTopColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  messageText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});

export default Loading;
