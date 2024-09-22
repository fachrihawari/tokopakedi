import { CartItemSchema, cartsCollection } from "@/lib/db/cart_collection";
import { productsCollection } from "@/lib/db/product_collection";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { z } from "zod";

const CartItemDto = z.object({
	quantity: z.number()
})
const CartParamsDto = z.object({
	productId: z.string()
})

type NextRouteParams = {
	params: {
		productId: string
	}
}

export async function POST(req: NextRequest, { params }: NextRouteParams) {
	try {
		const { productId } = CartParamsDto.parse(params)
		const userId = String(req.headers.get("x-user-id"))
		const rawBody = await req.json();
		const { quantity } = CartItemDto.parse(rawBody)

		const product = await productsCollection.findOne({ _id: new ObjectId(productId) });
		if (!product) {
			return NextResponse.json({ errors: ["Product not found"] }, { status: 404 });
		}

		const cartItem = CartItemSchema.parse({
			productId: new ObjectId(product._id),
			name: product.name,
			price: product.price,
			thumbnail: product.thumbnail,
			quantity: quantity,
		});

		await cartsCollection.updateOne(
			{ userId: new ObjectId(userId) },
			{ $push: { items: cartItem } },
			{ upsert: true }
		);

		return NextResponse.json({ message: "Product added to cart successfully" });
	} catch (error) {
		return NextResponse.json({ errors: ["An unexpected error occurred"] }, { status: 500 });
	}
}

export async function PUT(req: NextRequest, { params }: NextRouteParams) {
	try {
		const { productId } = CartParamsDto.parse(params)
		const userId = String(req.headers.get("x-user-id"));
		const rawBody = await req.json();
		const { quantity } = CartItemDto.parse(rawBody)

		await cartsCollection.updateOne(
			{
				userId: new ObjectId(userId),
				"items.productId": new ObjectId(productId)
			},
			{
				$set: {
					"items.$.quantity": quantity
				}
			}
		);

		return NextResponse.json({ message: "Product qty updated in cart successfully" });
	} catch (error) {
		return NextResponse.json({ errors: ["An unexpected error occurred"] }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: NextRouteParams) {
	try {
		const userId = String(req.headers.get("x-user-id"));

		const { productId } = CartParamsDto.parse(params)

		await cartsCollection.updateOne(
			{ userId: new ObjectId(userId) },
			{ $pull: { items: { productId: new ObjectId(productId) } } }
		);

		return NextResponse.json({ message: "Product removed from cart successfully" });
	} catch (error) {
		return NextResponse.json({ errors: ["An unexpected error occurred"] }, { status: 500 });
	}
}