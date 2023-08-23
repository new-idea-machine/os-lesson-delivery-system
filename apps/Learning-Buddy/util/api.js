import Constants from 'expo-constants';

const ip = Constants.expoConfig.extra.IP;

export const getMultipleChoice = async (numQuestions, text) => {
  const reqQuestion = `Ask me ${numQuestions} questions, multiple choice with four different potential answers, based only on this information: 
    ${text}. Indicate which is the correct response, and Return your response in a JSON object, with the following format: {"questions": [{"prompt": "", "options": {"Correct": "", "Incorrect": ["", "", ""]}},...]}`;
  let source = { id: 1, question: reqQuestion };
  source = JSON.stringify(source);

  try {
    const response = await fetch(`http://${ip}:8000/questions/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // mode: 'no-cors',
      body: source
    });
    const json = await response.json();
    const questions = json.response.choices[0].text;

    console.log(
      '🪵 ---------------------------------------------------------------------🪵'
    );
    console.log(
      '🪵 ~ file: NewQuizScreen.jsx:77 ~ getQuestions ~ questions:',
      questions
    );
    console.log(
      '🪵 ---------------------------------------------------------------------🪵'
    );

    return questions;
  } catch (error) {
    console.error(error);
  }
};
