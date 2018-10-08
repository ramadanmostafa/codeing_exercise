export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    }
};

export const updateAnswersRank = (question) => {
    question.answers.map((answer, index) => {
      answer.rank = index + 1;
    });
    return question
};