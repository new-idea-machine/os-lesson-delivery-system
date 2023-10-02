import Constants from 'expo-constants';

const ip = Constants.expoConfig.extra.IP;

//placeholder fetch functions for quiz files
export const listAllQuizes = async (session) => {
  try {
    const response = await fetch(`http://${ip}:8000/quiz/`, {
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

export const listQuizById = async (quizId, session) => {
  try {
    const response = await fetch(`http://${ip}:8000/quiz/${quizId}`, {
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

export const listFullQuizById = async (quizId, session) => {
  try {
    const response = await fetch(`http://${ip}:8000/quiz/fullquiz/${quizId}`, {
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

export const allQuestionsInQuiz = async (quizId, session) => {
  try {
    const response = await fetch(
      `http://${ip}:8000/quiz/allquestioninquiz/${quizId}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${session.access_token}` }
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const oneQuestionsById = async (questionId, session) => {
  try {
    const response = await fetch(
      `http://${ip}:8000/quiz/questionbyid/${questionId}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${session.access_token}` }
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// export const updateQuiz = async (quizId, quizData, session) => {
//   let source = JSON.stringify(quizData);
//   try {
//     const response = await fetch(`http://${ip}:8000/quiz/${quizId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${session.access_token}`
//       },
//       body: source
//     });
//     const data = await response.json();
//     console.log('data: ', data);
//     return data;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

export const deleteQuiz = async (quizId, session) => {
  try {
    const response = await fetch(`http://${ip}:8000/quiz/${quizId}`, {
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

export const deleteQuestion = async (questionId, session) => {
  try {
    const response = await fetch(
      `http://${ip}:8000/quiz/questionbyid/${questionId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      }
    );
    const data = await response.json();
    console.log('data: ', data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
