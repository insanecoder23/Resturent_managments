require("dotenv").config();

const connectDB = require("./Config/Dbconnect");
const Products = require("./Model/MenuItems");

const products = [
  {
    name: "Biryani",
    description:
      "Fragrant basmati rice cooked with aromatic spices and tender chicken.",
    category: "Rice",
    price: 250,
    availability: true,
    image:
      "https://images.unsplash.com/photo-1676436293945-a613dde9c3b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGJpcnlhbml8ZW58MHx8MHx8fDA%3D",
  },

  {
    name: "Butter Chicken",
    description:
      "Tender chicken cooked in a rich, creamy and buttery tomato gravy.",
    category: "Chicken",
    price: 320,
    availability: true,
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
  },

  {
    name: "Chicken Tikka",
    description:
      "Juicy pieces of marinated chicken grilled with Indian spices.",
    category: "Chicken",
    price: 280,
    availability: true,
    image:
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
  },

  {
    name: "Paneer Tikka",
    description:
      "Grilled Indian cottage cheese marinated with spices and yogurt.",
    category: "Paneer",
    price: 220,
    availability: true,
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
  },

  {
    name: "Palak Paneer",
    description:
      "Soft paneer cooked in a creamy spinach and Indian spice gravy.",
    category: "Paneer",
    price: 200,
    availability: true,
    image:
      "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    name: "Chole Bhature",
    description:
      "Spicy chickpea curry served with fluffy deep-fried bhatura.",
    category: "North Indian",
    price: 160,
    availability: true,
    image:
      "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80",
  },

  {
    name: "Masala Dosa",
    description:
      "Crispy dosa filled with delicious spiced potato masala.",
    category: "South Indian",
    price: 140,
    availability: true,
    image:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
  },

  {
    name: "Idli Sambar",
    description:
      "Soft steamed idlis served with flavorful sambar and chutney.",
    category: "South Indian",
    price: 100,
    availability: true,
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
  },

  {
    name: "Pav Bhaji",
    description:
      "Spiced mashed vegetables served with buttery toasted pav.",
    category: "Street Food",
    price: 130,
    availability: true,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
  },

  {
    name: "Samosa",
    description:
      "Crispy pastry filled with spicy potatoes and peas.",
    category: "Snacks",
    price: 60,
    availability: true,
    image:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80",
  },

  {
    name: "Aloo Paratha",
    description:
      "Indian flatbread stuffed with spicy mashed potatoes.",
    category: "North Indian",
    price: 120,
    availability: true,
    image:
      "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80",
  },

  {
    name: "Naan",
    description:
      "Soft and delicious Indian flatbread cooked in a traditional tandoor.",
    category: "Bread",
    price: 70,
    availability: true,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
  },

  {
    name: "Tandoori Chicken",
    description:
      "Chicken marinated in yogurt and spices, roasted in a tandoor.",
    category: "Chicken",
    price: 300,
    availability: true,
    image:
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
  },

  {
    name: "Rajma Chawal",
    description:
      "Red kidney bean curry served with steamed basmati rice.",
    category: "Rice",
    price: 150,
    availability: true,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
  },

  {
    name: "Dal Makhani",
    description:
      "Creamy black lentils slow-cooked with butter and Indian spices.",
    category: "Dal",
    price: 180,
    availability: true,
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
  },

  {
    name: "Kadhai Paneer",
    description:
      "Paneer cooked with capsicum, onion and aromatic kadai spices.",
    category: "Paneer",
    price: 230,
    availability: true,
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
  },

  {
    name: "Matar Paneer",
    description:
      "Paneer and green peas cooked in a rich tomato-based gravy.",
    category: "Paneer",
    price: 210,
    availability: true,
    image:
      "https://media.istockphoto.com/id/1325271813/photo/green-peas-or-matar-paneer-curry.webp?a=1&b=1&s=612x612&w=0&k=20&c=Fx02N2Izysj2E_6oeT9lDJagwup-yW6c06gnhYeCaJw=",
  },

  {
    name: "Fish Curry",
    description:
      "Tender fish cooked in a flavorful Indian spiced curry.",
    category: "Seafood",
    price: 280,
    availability: true,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
  },

  {
    name: "Chicken Curry",
    description:
      "Tender chicken cooked in a traditional onion and tomato gravy.",
    category: "Chicken",
    price: 260,
    availability: true,
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
  },

  {
    name: "Momos",
    description:
      "Steamed dumplings filled with flavorful vegetables and spices.",
    category: "Snacks",
    price: 120,
    availability: true,
    image:
      "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=800&q=80",
  },

  {
    name: "Gulab Jamun",
    description:
      "Soft milk-solid dumplings soaked in sweet sugar syrup.",
    category: "Dessert",
    price: 100,
    availability: true,
    image:
      "https://images.unsplash.com/photo-1601303516534-2c1b1c6c1d3a?auto=format&fit=crop&w=800&q=80",
  },

  {
    name: "Rasgulla",
    description:
      "Soft and spongy Bengali sweets soaked in light sugar syrup.",
    category: "Dessert",
    price: 90,
    availability: true,
    image:
      "https://media.istockphoto.com/id/668147754/photo/gulab-jamun.webp?a=1&b=1&s=612x612&w=0&k=20&c=_plWK0nqVneGKy0BsOIkh7_WkF_7aesBxJ7V331eWpw=",
  },

  {
    name: "Jalebi",
    description:
      "Crispy spiral-shaped sweet soaked in delicious sugar syrup.",
    category: "Dessert",
    price: 80,
    availability: true,
    image:
      "https://images.unsplash.com/photo-1778448806503-f01d2971ccfe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGphbGViaXxlbnwwfHwwfHx8MA%3D%3D",
  },

  {
    name: "Lassi",
    description:
      "Refreshing traditional yogurt drink with a creamy texture.",
    category: "Beverage",
    price: 80,
    availability: true,
    image:
      "https://media.istockphoto.com/id/2214375556/photo/lassi-in-clay-cup-topped-with-dry-fruits.webp?a=1&b=1&s=612x612&w=0&k=20&c=OsxAg9ZKpsQI-lc4bcmujNQb6kQCPVUun4e_aHeEUMY=",
  },
];

const seedProducts = async () => {
  try {
    await connectDB();

    const result = await Products.insertMany(products);

    console.log(`${result.length} products inserted successfully`);

    process.exit(0);
  } catch (error) {
    console.log("Error:", error);
    process.exit(1);
  }
};

seedProducts();