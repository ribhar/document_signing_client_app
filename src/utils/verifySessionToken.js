const isTokenValid = () => {
    const authToken = JSON.parse(localStorage.getItem('token'));
    const expiryTime = JSON.parse(localStorage.getItem('expiryTime'));
    const currentTime = new Date().getTime();
    
    const response = { isTokenValid: false, isSession: false }

    // // Scenario 1: If token was not available before
    // if (!authToken) {
    //     console.log(1)
    //     return response;
    // }
    // // Scenario 2: If token was previously available and active
    // else if(authToken && expiryTime && currentTime < expiryTime) {
    //     console.log(2)
    //   response.isSession = true;
    //   return response;
    // }
    // // Scenario 3: If token is available and not expired
    // else if (authToken && expiryTime && currentTime < expiryTime) {
    //     console.log(3)
    //   response.isTokenValid = true;
    //   return response;
    // }

    // Scenario 1: If token was previously available and active
    if (authToken && expiryTime && currentTime < expiryTime) {
        response.isTokenValid = true;
        return response;
    }
    // Scenario 2: If token was not available before
    else if (!authToken) {
        return response;
    }
    // Scenario 3: If token is available but has expired
    else if (authToken && expiryTime && currentTime >= expiryTime) {
        response.isSession = true;
          return response;
    }
    console.log(response,authToken, expiryTime, currentTime < expiryTime) 
    return response
};

const getAuthToken = () => {
    return JSON.parse(localStorage.getItem('token'));
};
  
const setToken = (token, expirationTime = 3600000) => {
    const currentTime = new Date().getTime();
    const expiryTime = currentTime + expirationTime;
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('expiryTime', JSON.stringify(expiryTime));
};

const clearToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryTime');
};

export { isTokenValid, setToken, clearToken, getAuthToken };

