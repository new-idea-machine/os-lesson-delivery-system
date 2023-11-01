import Constants from 'expo-constants';

const ip = Constants.expoConfig.extra.IP;

export const getUserById = async (session) => {
  try {
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

export const updateAccount = async (userInfo, session) => {
  if (!userInfo['Phone Number'].match(/^[0-9]+$/) || !userInfo['Email'].match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    return null
  }

  const user = {
    id: session.user.id,
    fullname: userInfo['Full Name'],
    email: userInfo['Email'],
    phonenumber: userInfo['Phone Number']
  }

  try {
    const response = await fetch(`http://${ip}:8000/users/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};