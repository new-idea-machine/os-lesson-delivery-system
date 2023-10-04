import React, { useState, useContext } from 'react';
import { listAllQuizes } from '../util/quizAPI'; 
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../providers/AuthProvider';
import { View, Text } from 'react-native';

function MyContentData() {
  const [quizzes, setQuizzes] = useState([]);

  const auth = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        if (!auth.session) {
          return; 
        }

        const data = await listAllQuizes(auth.session);
        console.log("Fetched DATA",data);
        if (data) {
          setQuizzes(data);
        }
      }

      fetchData();
    }, [auth.session]) 
  );


  return (
      <View>
        {quizzes.map((quiz) => (
          <Text key={quiz.id}>{quiz.quiz_name}</Text>
        ))}
      </View>

  );
}

export default MyContentData;
