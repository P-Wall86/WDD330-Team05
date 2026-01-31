const baseURL = "https://wdd330-backend.onrender.com/";

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor() {}

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  // Nova função para buscar em todas as categorias e filtrar por nome
  async searchProducts(query) {
    const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];
    const allProducts = await Promise.all(
      categories.map((cat) => this.getData(cat))
    );
    
    // Une todos os produtos de todas as categorias em um único array
    const flatProducts = allProducts.flat();
    
    // Filtra os produtos pelo nome ou marca (case insensitive)
    return flatProducts.filter(product => 
      product.Name.toLowerCase().includes(query.toLowerCase()) ||
      product.Brand.Name.toLowerCase().includes(query.toLowerCase())
    );
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}