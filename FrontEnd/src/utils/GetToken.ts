export default function GetToken() {
  const getToken = localStorage.getItem("UserAcess");
  
  return getToken ? JSON.parse(getToken!).AccessToken :  ''
 
}
