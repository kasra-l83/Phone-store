import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CART_FILE_PATH = path.join(process.cwd(), "data", "cart.json");

if (!fs.existsSync(CART_FILE_PATH)) {
  fs.mkdirSync(path.dirname(CART_FILE_PATH), { recursive: true });
  fs.writeFileSync(CART_FILE_PATH, JSON.stringify({ carts: [] }, null, 2));
}

const readCartFile = () => {
  try {
    const data = fs.readFileSync(CART_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading the cart file:", error);
    return { carts: [] };
  }
};

const writeCartFile = (data: any) => {
  try {
    fs.writeFileSync(CART_FILE_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to the cart file:", error);
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const data = readCartFile();
  const userCart = data.carts.find((cart: any) => cart.userId === userId);

  return NextResponse.json(userCart ? userCart : { userId, products: [] });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, product } = body;

  if (!userId || !product) {
    return NextResponse.json({ error: "userId and product are required" }, { status: 400 });
  }

  const data = readCartFile();
  let userCart = data.carts.find((cart: any) => cart.userId === userId);

  if (userCart) {
    const existingProduct = userCart.products.find((p: any) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      userCart.products.push(product);
    }
  } else {
    data.carts.push({ userId, products: [product] });
  }

  writeCartFile(data);
  return NextResponse.json({ message: "Product added successfully" });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { userId, productId, quantity } = body;

  if (!userId || !productId || typeof quantity !== "number") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const data = readCartFile();
  const userCart = data.carts.find((cart: any) => cart.userId === userId);

  if (!userCart) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 });
  }

  const product = userCart.products.find((p: any) => p.id === productId);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  product.quantity = quantity;
  writeCartFile(data);
  return NextResponse.json({ message: "Product updated successfully" });
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const { userId, productId } = body;

  if (!userId || !productId) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const data = readCartFile();
  const userCart = data.carts.find((cart: any) => cart.userId === userId);

  if (!userCart) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 });
  }

  userCart.products = userCart.products.filter((p: any) => p.id !== productId);
  writeCartFile(data);
  return NextResponse.json({ message: "Product removed successfully" });
}