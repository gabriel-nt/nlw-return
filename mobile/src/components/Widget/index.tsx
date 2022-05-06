import { useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { Text, TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { Form } from '../Form';
import { styles } from './styles';
import { theme } from '../../theme';
import { Success } from '../Success';
import { Options } from '../Options';
import { feedbackTypes } from '../../utils/feedbackTypes';

export type FeedbackType = keyof typeof feedbackTypes;

const Widget = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);

  const handleOpen = () => {
    bottomSheetRef.current?.expand();
  };

  const handleRestartFeedback = () => {
    setFeedbackType(null);
    setFeedbackSent(false);
  };

  const handleFeedbackSent = () => {
    setFeedbackSent(true);
  };

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots size={24} color={theme.colors.text_on_brand_color} />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSent ? (
          <Success onSentAnotherFeedback={handleRestartFeedback} />
        ) : (
          <>
            {feedbackType ? (
              <Form
                feedbackType={feedbackType}
                onFeedbackSent={handleFeedbackSent}
                onFeedbackCanceled={handleRestartFeedback}
              />
            ) : (
              <Options onFeedbackTypeChanged={setFeedbackType} />
            )}
          </>
        )}
      </BottomSheet>
    </>
  );
};

export default gestureHandlerRootHOC(Widget);
