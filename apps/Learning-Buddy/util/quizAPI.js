import Constants from 'expo-constants';

const ip = Constants.expoConfig.extra.IP;

//placeholder fetch functions for quiz files
export const listAllQuizes = async (session) => {
  try {
    const response = await fetch(`http://${ip}:8000/quiz/all`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${session.access_token}` }
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const listQuizById = async (id, session) => {
  try {
    const response = await fetch(`http://${ip}:8000/quiz/${id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${session.access_token}` }
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createFile = async (quizData, session) => {
  let source = JSON.stringify(quizData);
  try {
    const response = await fetch(`http://${ip}:8000/quiz/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`
      },
      body: source
    });
    const data = await response.json();
    console.log('data: ', data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateFile = async (id, quizData, session) => {
  let source = JSON.stringify(quizData);
  try {
    const response = await fetch(`http://${ip}:8000/quiz/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`
      },
      body: source
    });
    const data = await response.json();
    console.log('data: ', data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteFile = async (id, session) => {
  try {
    const response = await fetch(`http://${ip}:8000/quiz/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    });
    const data = await response.json();
    console.log('data: ', data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
