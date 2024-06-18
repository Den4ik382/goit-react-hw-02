import { useEffect, useState } from "react";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";

export default function App() {
  const loadFeedBack = () => {
    const savedFeedback = localStorage.getItem("feedback");
    return savedFeedback
      ? JSON.parse(savedFeedback)
      : { good: 0, bad: 0, neutral: 0 };
  };

  const [count, setCount] = useState(loadFeedBack);
  useEffect(() => {
    window.localStorage.setItem("feedback", JSON.stringify(count));
  });
  const totalFeedback = count.good + count.neutral + count.bad;
  const resetFeedback = () => {
    setCount({ good: 0, neutral: 0, bad: 0 });
  };
  const updateFeedback = (feedbackType) => {
    setCount(() => ({
      ...count,
      [feedbackType]: count[feedbackType] + 1,
    }));
  };

  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback count={count} totalFeedback={totalFeedback} />
      ) : (
        <Notification />
      )}
    </>
  );
}
