import Constants from 'expo-constants';

const ip = Constants.expoConfig.extra.IP;

export const extractText = async (formData, session) => {
  try {
    const response = await fetch(`http://${ip}:8000/file/extract`, {
      method: 'POST',
      body: formData,
      headers: { Authorization: `Bearer ${session.access_token}` }
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
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
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const listFileById = async (id, session) => {
  try {
    const response = await fetch(`http://${ip}:8000/file/${id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${session.access_token}` }
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createFile = async (name, text, session) => {
  let source = { name, text };
  source = JSON.stringify(source);
  try {
    const response = await fetch(`http://${ip}:8000/file/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`
      },
      body: source
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateFile = async (id, name, text, session) => {
  let source = { name, text };
  source = JSON.stringify(source);
  try {
    const response = await fetch(`http://${ip}:8000/file/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`
      },
      body: source
    });
    if (response.status == 200) {
      const data = await response.json();

      return data;
    } else return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteFile = async (id, session) => {
  try {
    const response = await fetch(`http://${ip}:8000/file/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
