import Constants from 'expo-constants';

const ip = Constants.expoConfig.extra.IP;

export const getMultipleChoice = async (numQuestions, text, session) => {
  let source = { numQuestions, text };
  source = JSON.stringify(source);

  try {
    const response = await fetch(`http://${ip}:8000/genquestions/mc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`
      },
      // mode: 'no-cors',
      body: source
    });
    const json = await response.json();
    const questions = json.response.choices[0].text;

    return questions;
  } catch (error) {
    console.error(error);
  }
};

export const getTrueFalse = async (numQuestions, text, session) => {
  let source = { numQuestions, text };
  source = JSON.stringify(source);

  try {
    const response = await fetch(`http://${ip}:8000/genquestions/tf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`
      },
      // mode: 'no-cors',
      body: source
    });
    const json = await response.json();
    const questions = json.response.choices[0].text;

    return questions;
  } catch (error) {
    console.error(error);
  }
};

export const getMixed = async (numQuestions, text, session) => {
  let source = { numQuestions, text };
  source = JSON.stringify(source);

  try {
    const response = await fetch(`http://${ip}:8000/genquestions/mixed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`
      },
      // mode: 'no-cors',
      body: source
    });
    const json = await response.json();
    const questions = json.response.choices[0].text;

    return questions;
  } catch (error) {
    console.error(error);
  }
};
