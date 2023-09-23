const TESTING = true;

function deleteAuthToken() {
    window.localStorage.removeItem("courser-auth");
  }
  
  const getUserAuthToken = () => {
    return window.localStorage.getItem('courser-auth') || '';
  }

const constants = {
  url: TESTING ? "http://localhost:8000" : "https://uiowa-courser-production.up.railway.app",
};




export { constants, getUserAuthToken, deleteAuthToken };