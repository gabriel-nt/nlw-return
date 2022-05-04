import { CloseButton } from '../../CloseButton';
import { FeedbackType, feedbackTypes } from '..';

interface FeedbackTypeStepProps {
  onFeedbackTypeChanged: (type: FeedbackType) => void;
}

export const FeedbackTypeStep = ({
  onFeedbackTypeChanged,
}: FeedbackTypeStepProps) => (
  <>
    <header>
      <span className="text-xl leading-6">Deixe seu feedback</span>
      <CloseButton />
    </header>

    <div className="flex py-8 gap-2 w-full">
      {Object.entries(feedbackTypes).map(([key, value]) => (
        <button
          key={key}
          className="bg-zinc-800 rounded-xl py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
          type="button"
          onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
        >
          <span>{value.title}</span>
          <img src={value.image.source} alt={value.image.alt} />
        </button>
      ))}
    </div>
  </>
);
