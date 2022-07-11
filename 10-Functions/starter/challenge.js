'use strict';

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0:     JavaScript', '1:    Python', '2:    Rust', '3:  C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),

  displayResult(type = 'array') {
    if (type === 'string') {
      const results = this.answers;
      console.log(`Poll results are: ${results}`);
    } else console.log(this.answers);
  },

  incrementAnswerAt(index) {
    this.answers[index]++;
  },

  checkValidAnsIndex(index) {
    return typeof index === 'number' && index < this.answers.length;
  },

  registerNewAnswer: function () {
    const ansIndex = Number(
      prompt(
        `What is your favourite programming language? 
${(this, this.options.join('\n'))}
(write number of option)`
      )
    );

    if (this.checkValidAnsIndex(ansIndex)) this.incrementAnswerAt(ansIndex);
    else {
      console.log('answer is not valid');
      return;
    }

    this.displayResult();
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResult.call({ answers: [5, 2, 3] }, 'string');
poll.displayResult.call({ answers: [1, 5, 3, 9, 6, 1] });
