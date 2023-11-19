export const PeticionesAyax = async (url, metodo, datos_guardar = {}, imagen = false) => {

    let opcion_metodo = {
      method: "GET",
    };
  
    switch (metodo) {
      case "GET":
        opcion_metodo.method = metodo;
        break;
  
      case "DELETE":
        opcion_metodo.method = metodo;
        break;
  
      case "POST":        
        if (imagen) {
          opcion_metodo = {
            method: metodo,
            body: datos_guardar
          };
          break;
  
        } else {
          opcion_metodo = {
            method: metodo,
            body: JSON.stringify(datos_guardar),
            headers: {
              "Content-Type": "application/json",
            },
          };
          break;
        }
        
      case "PUT":
        if (imagen) {
          opcion_metodo = {
            method: metodo,
            body: datos_guardar
          };
          break;
  
        } else {
          opcion_metodo = {
            method: metodo,
            body: JSON.stringify(datos_guardar),
            headers: {
              "Content-Type": "application/json",
            },
          };
          break;
        }
  
      default:
        "GET";
        opcion_metodo.method = metodo;
    }
  
    const peticion = await fetch(url, opcion_metodo, datos_guardar, imagen);
    const datos = await peticion.json();
  
    return {
      datos
    }
  }
  