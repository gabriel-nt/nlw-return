import { Text, View, Image, TouchableOpacity } from 'react-native';

import { Copyright } from '../Copyright';
import successImg from '../../assets/success.png';

import { styles } from './styles';

interface SuccessProps {
  onSentAnotherFeedback: () => void;
}

export const Success = ({ onSentAnotherFeedback }: SuccessProps) => (
  <View style={styles.container}>
    <Image source={successImg} style={styles.image} />

    <Text style={styles.title}>Agradecemos o feedback</Text>

    <TouchableOpacity style={styles.button} onPress={onSentAnotherFeedback}>
      <Text style={styles.buttonTitle}>Quero enviar outro</Text>
    </TouchableOpacity>

    <Copyright />
  </View>
);
