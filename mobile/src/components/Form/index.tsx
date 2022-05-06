import { useState } from 'react';
import FileSystem from 'expo-file-system';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';

import { Button } from '../Button';
import { theme } from '../../theme';
import { api } from '../../libs/api';
import { FeedbackType } from '../Widget';
import { Screenshot } from '../Screenshot';
import { feedbackTypes } from '../../utils/feedbackTypes';

import { styles } from './styles';

interface FormProps {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export const Form = ({
  feedbackType,
  onFeedbackCanceled,
  onFeedbackSent,
}: FormProps) => {
  const [comment, setComment] = useState('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const handleScreenshot = () => {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    })
      .then(uri => setScreenshot(uri))
      .catch(error => console.log(error));
  };

  const handleScreenshotRemove = () => {
    setScreenshot(null);
  };

  const handleSendFeedback = async () => {
    if (isSendingFeedback) return;

    setIsSendingFeedback(true);
    const screenshotBase64 =
      screenshot &&
      (await FileSystem.readAsStringAsync(screenshot, {
        encoding: 'base64',
      }));

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
        comment,
      });

      onFeedbackSent();
      setIsSendingFeedback(false);
    } catch (error) {
      console.log(error);
      setIsSendingFeedback(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>

      <TextInput
        multiline
        value={comment}
        autoCorrect={false}
        style={styles.input}
        onChangeText={setComment}
        placeholderTextColor={theme.colors.text_secondary}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
      />

      <View style={styles.footer}>
        <Screenshot
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />
        <Button isLoading={isSendingFeedback} onPress={handleSendFeedback} />
      </View>
    </View>
  );
};
