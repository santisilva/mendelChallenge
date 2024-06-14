import React, {useRef, useEffect} from 'react';
import {Animated, StyleSheet, Easing, View, Dimensions} from 'react-native';
import {createAnimatableComponent} from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;
const defaultHeight = 60;
const gradientColors = ['#BEBEBE', '#9E9E9E', '#9E9E9E', '#BEBEBE'];
const animationDuration = 1000;

const AnimatedLg = createAnimatableComponent(LinearGradient);

const Skeleton = ({height = defaultHeight}: {height?: number}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: animationDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    };
    startAnimation();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenWidth, screenWidth],
  });

  return (
    <View style={[styles.skeleton, {height}]}>
      <AnimatedLg
        colors={gradientColors}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[styles.animatedGradient, {transform: [{translateX}]}]}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  skeleton: {
    marginTop: 10,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#BEBEBE',
  },
  animatedGradient: {
    flex: 1,
    width: '100%',
  },
});

export default Skeleton;
