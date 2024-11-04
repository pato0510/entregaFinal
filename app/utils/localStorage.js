export const saveUserInfo = (user) => {
    localStorage.setItem('userName', user.name);
    localStorage.setItem('userCategory', user.category);
  };
  
  export const getUserInfo = () => {
    return {
      name: localStorage.getItem('userName'),
      category: localStorage.getItem('userCategory'),
    };
  };
  