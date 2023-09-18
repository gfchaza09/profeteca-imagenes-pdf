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

    // Si no se reconoce la estructura, simplemente retorna el código original
    return match;
  });

  return htmlCode;
};
