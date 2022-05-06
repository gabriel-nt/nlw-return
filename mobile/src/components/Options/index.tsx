import { Text, View } from 'react-native';

import { styles } from './styles';
import { Copyright } from '../Copyright';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Option } from '../Option';
import { FeedbackType } from '../Widget';

interface OptionsProps {
  onFeedbackTypeChanged: (feedbaackType: FeedbackType) => void;
}

export const Options = ({ onFeedbackTypeChanged }: OptionsProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>Deixe seu feedback</Text>
    <View style={styles.options}>
      {Object.entries(feedbackTypes).map(([key, value]) => (
        <Option
          key={key}
          title={value.title}
          image={value.image}
          onPress={() => onFeedbackTypeChanged(key as FeedbackType)}
        />
      ))}
    </View>
    <Copyright />
  </View>
);
