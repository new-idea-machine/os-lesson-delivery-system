import Constants from 'expo-constants';

const ip = Constants.expoConfig.extra.IP;

export const extractText = async (formData, session) => {
  try {
    const response = await fetch(`http://${ip}:8000/file/extract`, {
      method: 'POST',
      body: formData,
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

export const listAllFiles = async (session) => {
  try {
    const response = await fetch(`http://${ip}:8000/file/all`, {
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
