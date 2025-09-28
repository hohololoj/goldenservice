import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import { FetchGet } from "@/utils/utils";
import { API } from "@/constants/constants";
import Header from "@/components/blocks/Header/Header";
import Footer from "@/components/blocks/Footer/Footer";

const SFProDisplay = localFont({
	src: [
		{path: "../../public/fonts/SF-Pro-Display-Light.otf", weight: "300", style: "normal"},
		{path: "../../public/fonts/SF-Pro-Display-Regular.otf", weight: "400", style: "normal"},
		{path: "../../public/fonts/SF-Pro-Display-Medium.otf", weight: "500", style: "normal"},
		{path: "../../public/fonts/SF-Pro-Display-Semibold.otf", weight: "600", style: "normal"},
		{path: "../../public/fonts/SF-Pro-Display-Bold.otf", weight: "700", style: "normal"}
	],
	variable: "--sf-pro-display"
})

export const metadata: Metadata = {
	title: "Golden Service",
	description: "Продажа дверных замков",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	const categories = await FetchGet(`${API}/categories`).then(res => res.json());

	return (
		<html lang="ru">
			<body className={`${SFProDisplay.variable} antialiased`}>
				<Header categories={categories}/>
				{children}
				<Footer/>
			</body>
		</html>
	);
}
