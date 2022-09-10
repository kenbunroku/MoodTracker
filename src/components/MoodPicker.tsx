import React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { theme } from '../theme';
import { MoodOptionType } from '../types';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

const moodOptions: MoodOptionType[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

type MoodPickerProps = {
  handleSelectedMood: (mood: MoodOptionType) => void;
};

const imageSrc = require('../assets/butterflies.png');

export const MoodPicker: React.FC<MoodPickerProps> = ({
  handleSelectedMood,
}) => {
  const [selectedMood, setSelectedMood] = React.useState<MoodOptionType>();
  const [hasSelected, setHasSelected] = React.useState(false);

  const buttonStyle = useAnimatedStyle(
    () => ({
      opacity: selectedMood ? withTiming(1) : withTiming(0.5),
      transform: [{ scale: selectedMood ? withTiming(1) : 0.8 }],
    }),
    [selectedMood],
  );

  const handleSelect = React.useCallback(() => {
    if (selectedMood) {
      handleSelectedMood(selectedMood);
      setSelectedMood(undefined);
      setHasSelected(true);
    }
  }, [handleSelectedMood, selectedMood]);

  if (hasSelected) {
    return (
      <View style={styles.container}>
        <Image source={imageSrc} style={styles.image} />
        <Pressable style={styles.button} onPress={() => setHasSelected(false)}>
          <Text style={styles.buttonText}>Choose another!</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How are you right now?</Text>
      <View style={styles.moodOptions}>
        {moodOptions.map(option => (
          <View key={option.emoji}>
            <Pressable
              onPress={() => setSelectedMood(option)}
              key={option.emoji}
              style={[
                styles.moodItem,
                option.emoji === selectedMood?.emoji
                  ? styles.selectedMoodItem
                  : undefined,
              ]}>
              <Text key={option.emoji}>{option.emoji}</Text>
            </Pressable>
            <Text style={styles.descriptionText}>
              {selectedMood?.emoji === option.emoji ? option.description : ' '}
            </Text>
          </View>
        ))}
      </View>
      <ReanimatedPressable
        style={[styles.button, buttonStyle]}
        onPress={handleSelect}>
        <Text style={styles.buttonText}>Choose</Text>
      </ReanimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  moodItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: theme.colorPurple,
    borderColor: theme.colorWhite,
  },
  descriptionText: {
    color: theme.colorPurple,
    fontFamily: theme.fontFamilyBold,
    fontSize: 10,
    textAlign: 'center',
  },
  container: {
    height: 250,
    borderWidth: 2,
    borderColor: theme.colorPurple,
    borderRadius: 10,
    margin: 10,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
    color: theme.colorWhite,
    fontFamily: theme.fontFamilyBold,
  },
  button: {
    backgroundColor: theme.colorPurple,
    width: 150,
    alignSelf: 'center',
    borderRadius: 20,
    padding: 10,
  },
  buttonText: {
    color: theme.colorWhite,
    fontFamily: theme.fontFamilyBold,
    textAlign: 'center',
  },
  image: {
    alignSelf: 'center',
  },
});
