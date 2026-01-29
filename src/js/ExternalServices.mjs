const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json(); // Tenta ler o corpo da resposta
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor() {}

  // Este método é essencial para a lista de produtos!
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  // NOVO MÉTODO: Aqui você coloca o link "checkout"
  async checkout(order) {
    const options = {
      method: "POST", // Mandatório para enviar dados
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };
    
    // O fetch enviará para http://wdd330-backend.onrender.com/checkout
    return await fetch(baseURL + "checkout", options).then(convertToJson);
  }
}