export const translateEjsToHtml = (ejsCode: string, data: any) => {
  // Expresión regular para buscar variables EJS y condicionales
  const regex = /<%(.*?)%>/g;

  // Función de reemplazo para manejar variables y condicionales
  const htmlCode = ejsCode.replace(regex, (match, code) => {
    // Si es una variable EJS, evalúa y reemplaza
    if (code.startsWith('=')) {
      const variable = code.slice(1).trim();
      return data[variable] || '';
    }
    // Si es una estructura condicional 'if', evalúa la condición y muestra contenido si se cumple
    else if (code.startsWith('if')) {
      const condition = code.slice(2).trim();
      if (eval(condition)) {
        return ''; // Si se cumple la condición, no se muestra nada en el HTML
      }
      return ''; // Si no se cumple la condición, no se muestra nada en el HTML
    }
    // Si es una estructura condicional 'else if', evalúa la condición y muestra contenido si se cumple
    else if (code.startsWith('else if')) {
      const condition = code.slice(7).trim();
      if (eval(condition)) {
        return ''; // Si se cumple la condición, no se muestra nada en el HTML
      }
      return ''; // Si no se cumple la condición, no se muestra nada en el HTML
    }
    // Si es una estructura condicional 'else', muestra contenido
    else if (code.startsWith('else')) {
      return ''; // Siempre muestra contenido en un 'else'
    }
    // Agrega manejo para otros casos de condicionales según sea necesario
    // ...

    // Si no se reconoce la estructura, simplemente retorna el código original
    return match;
  });

  return htmlCode;
};
