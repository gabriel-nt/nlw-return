import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  ImageProps,
} from 'react-native';

import { styles } from './styles';

interface OptionProps extends TouchableOpacityProps {
  title: string;
  image: ImageProps;
}

export const Option = ({ title, image, ...rest }: OptionProps) => (
  <TouchableOpacity style={styles.container} {...rest}>
    <Image source={image} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);
