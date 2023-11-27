export const Serialize = (form) => {
    
  const formData = new FormData(form);
  const objeto_nuevo = {};
  //Recorremos todo el conjunto de elementos que contiene el form, entre ellos name y value.
  for (let [name, value] of formData) {
    //Le asignamos el value al input name, rellenando así el objeto.
    objeto_nuevo[name] = value;
  }

  return objeto_nuevo;
};
