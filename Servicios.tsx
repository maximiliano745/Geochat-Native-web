import axios from "axios";

//const API_URL = "http://localhost:10000/"
const API_URL = "https://geochat-efn9.onrender.com/"

class Servicios {

  async mail(email: string, name: string, message: string, otro: string) {
    try {
      const response = await axios.post(API_URL + "api/v2/users/api/user/mail", {
        email,
        name,
        message,
        otro
      });
      console.log(response);
      //localStorage.setItem('user', JSON.stringify(response));
      return response.data;
    } catch (error) {
      // Manejar el error aquí, por ejemplo, mostrar un mensaje de error al usuario.
      console.error("Error al enviar el correo:", error);
      throw error; // Puedes optar por lanzar el error nuevamente para que se maneje en otro lugar si es necesario.
    }
  }


  async login(email: string, password: string) {
    try {
      const response = await axios.post(API_URL + "api/v2/users/login", {
        email,
        password
      });
      console.log("Respuesta del AuthService:", response.data);
      //alert(response.data)
      return response.data;
    } catch (error) {
      console.error("Error en la solicitud de inicio de sesión:", error);
      throw error; // Puedes lanzar el error nuevamente para que se maneje en el lugar donde se llama a esta función.
    }
  }

  logout() {
    localStorage.removeItem("user");
  }


  async register(username: string, email: string, password: string) {
    try {
      const response = await axios.post(API_URL + "api/v2/users/register", {
        username,
        email,
        password
      });
      return response.data;
    } catch (error) {
      console.error("Error al registrar al usuario:", error);
    }
  }


  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  }

}
export default new Servicios();