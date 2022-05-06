import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  isLoading: boolean;
}

export const Button = ({ isLoading, ...rest }: ButtonProps) => (
  <TouchableOpacity style={styles.button} {...rest}>
    {isLoading ? (
      <ActivityIndicator color={theme.colors.text_on_brand_color} />
    ) : (
      <Text style={styles.title}>Enviar Feedback</Text>
    )}
  </TouchableOpacity>
);
