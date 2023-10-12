import Constants from 'expo-constants';

const ip = Constants.expoConfig.extra.IP;

export const getUserById = async (session) => {
  try {
    console.log(session.user.id)
    const response = await fetch(`http://${ip}:8000/users/${session.user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`
      }
    });

    if (response.status == 200) {
      const user = await response.json();
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};