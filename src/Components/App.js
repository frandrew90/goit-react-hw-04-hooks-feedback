import React, { Component } from 'react';
import FeedbackOptions from './feedbackOptions/FeedbackOptions';
import Notification from './notification/Notification';

import Section from './section/Section';
import Statistics from './statistics/Statistics';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  addFeedback = e => {
    const { name } = e.target;

    this.setState(prev => ({ [name]: prev[name] + 1 }));
  };

  countTotalFeedback = () => {
    const { bad, good, neutral } = this.state;
    const total = bad + good + neutral;
    return total;
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;

    const positivePercentage = good
      ? (good * 100) / this.countTotalFeedback()
      : 0;

    return Number(positivePercentage).toFixed();
  };

  render() {
    const totalFeedback = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();
    const options = Object.keys(this.state);
    // console.log(positivePercentage);

    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions addFeedback={this.addFeedback} options={options} />
        </Section>
        <Section title="Statistics">
          {totalFeedback !== 0 ? (
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={totalFeedback}
              positivePercentage={positivePercentage}
            />
          ) : (
            <Notification message="No feedback given" />
          )}
        </Section>
      </>
    );
  }
}

export default App;
