import ghLogo from "./img/github-logo.png";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { nanoid } from "nanoid";
// import useGeoLocation from "@custom-react-hooks/use-geo-location";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	IDType,
	UserFullSchema,
	UserFullType,
	UserInputSchema,
	UserInputType,
} from "./schema/schema.ts";

export default function App() {
	const { data, isPending, error } = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			try {
				const res = await axios.get(
					"https://jsonplaceholder.typicode.com/users"
				);
				const data: UserFullType[] = res.data;

				console.log("Type check start...");
				for (const user of data) {
					UserFullSchema.parse(user);
				}
				console.log(data);
				console.log("Type check successful!");
				return res.data;
			} catch (err) {
				if (err instanceof Error) console.error(err.stack);
			}
		},
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<UserInputType>({
		resolver: zodResolver(UserInputSchema),
	});

	// const { coordinates } = useGeoLocation();

	const [submitSuccessful, setSubmitSuccessful] = useState(false);

	const onSubmit: SubmitHandler<UserInputType> = (data) => {
		const newId: IDType = nanoid();

		if (1 === 1) {
			// if (coordinates)
			const finalData: UserFullType = {
				...data,
				id: newId,
				address: {
					...data.address,
					geo: {
						lat: "0",
						lng: "0",
						// lat: String(coordinates.latitude),
						// lng: String(coordinates.longitude),
					},
				},
			};

			console.log("Imaginary POST request", finalData);
			setSubmitSuccessful(true);
			reset();
			setTimeout(() => {
				setSubmitSuccessful(false);
			}, 2000);
		}
	};

	if (isPending) {
		return (
			<div className="text-center w-dvw h-dvh bg-neutral-900 text-2xl text-white pt-10">
				<p className="animate-fade">Fetching data...</p>
			</div>
		);
	}

	if (error) {
		console.log("error fetching data", data);
		return (
			<div className="p-6 w-dvw h-dvh bg-neutral-900">
				<h1 className="text-2xl font-medium mt-5 mb-3 animate-fade">
					Error fetching data:
				</h1>
				{JSON.stringify(error)}
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center min-h-screen font-sans tracking-tight bg-neutral-900 text-white">
			<div className="animate-fade">
				<h1 className="text-2xl text-center font-medium mt-5 mb-3">
					react-hook-form <span className="text-red-500">w/</span>{" "}
					zod!
				</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="my-3">
						<div className="text-lg">
							<label htmlFor="name">Full Name*</label>
						</div>
						<input
							className="bg-neutral-800 py-2 px-3 rounded-md w-64 md:w-96 lg:w-[40rem] text-xl"
							id="name"
							autoComplete="off"
							placeholder="John Doe"
							{...register("name")}
						/>
						<div className="text-sm italic text-red-700">
							<p>{errors.name?.message}</p>
						</div>
					</div>

					<div className="my-3">
						<div className="text-lg">
							<label htmlFor="username">Username*</label>
						</div>
						<input
							className="bg-neutral-800 py-2 px-3 rounded-md w-64 md:w-96 lg:w-[40rem] text-xl"
							id="username"
							autoComplete="off"
							placeholder="johndoe123"
							{...register("username")}
						/>
						<div className="text-sm italic text-red-700">
							<p>{errors.username?.message}</p>
						</div>
					</div>

					<div className="my-3">
						<div className="text-lg">
							<label htmlFor="email">Email Address*</label>
						</div>
						<input
							className="bg-neutral-800 py-2 px-3 rounded-md w-64 md:w-96 lg:w-[40rem] text-xl"
							id="email"
							autoComplete="off"
							placeholder="johndoe@example.com"
							{...register("email")}
						/>
						<div className="text-sm italic text-red-700">
							<p>{errors.email?.message}</p>
						</div>
					</div>

					<div className="my-3">
						<div className="text-lg">
							<label htmlFor="street">Street*</label>
						</div>
						<input
							className="bg-neutral-800 py-2 px-3 rounded-md w-64 md:w-96 lg:w-[40rem] text-xl"
							id="street"
							autoComplete="off"
							placeholder="123 Main Street"
							{...register("address.street")}
						/>
						<div className="text-sm italic text-red-700">
							<p>{errors.address?.street?.message}</p>
						</div>
					</div>

					<div className="my-3">
						<div className="text-lg">
							<label htmlFor="suite">Suite/Apt.</label>
						</div>
						<input
							className="bg-neutral-800 py-2 px-3 rounded-md w-64 md:w-96 lg:w-[40rem] text-xl"
							id="suite"
							autoComplete="off"
							placeholder="Apt 101"
							{...register("address.suite")}
						/>
						<div className="text-sm italic text-red-700">
							<p>{errors.address?.suite?.message}</p>
						</div>
					</div>

					<div className="my-3">
						<div className="text-lg">
							<label htmlFor="city">City*</label>
						</div>
						<input
							className="bg-neutral-800 py-2 px-3 rounded-md w-64 md:w-96 lg:w-[40rem] text-xl"
							id="city"
							autoComplete="off"
							placeholder="Anytown"
							{...register("address.city")}
						/>
						<div className="text-sm italic text-red-700">
							<p>{errors.address?.city?.message}</p>
						</div>
					</div>

					<div className="my-3">
						<div className="text-lg">
							<label htmlFor="zipcode">Zip Code*</label>
						</div>
						<input
							className="bg-neutral-800 py-2 px-3 rounded-md w-64 md:w-96 lg:w-[40rem] text-xl"
							id="zipcode"
							autoComplete="off"
							placeholder="12345"
							{...register("address.zipcode")}
						/>
						<div className="text-sm italic text-red-700">
							<p>{errors.address?.zipcode?.message}</p>
						</div>
					</div>

					<div className="my-3">
						<div className="text-lg">
							<label htmlFor="phone">Phone Number*</label>
						</div>
						<input
							className="bg-neutral-800 py-2 px-3 rounded-md w-64 md:w-96 lg:w-[40rem] text-xl"
							id="phone"
							autoComplete="off"
							placeholder="+1234567890"
							{...register("phone")}
						/>
						<div className="text-sm italic text-red-700">
							<p>{errors.phone?.message}</p>
						</div>
					</div>

					<div className="my-3">
						<div className="text-lg">
							<label htmlFor="website">Website*</label>
						</div>
						<input
							className="bg-neutral-800 py-2 px-3 rounded-md w-64 md:w-96 lg:w-[40rem] text-xl"
							id="website"
							autoComplete="off"
							placeholder="www.example.com"
							{...register("website")}
						/>
						<div className="text-sm italic text-red-700">
							<p>{errors.website?.message}</p>
						</div>
					</div>

					<div className="my-3">
						<div className="text-lg">
							<label htmlFor="companyName">Company Name*</label>
						</div>
						<input
							className="bg-neutral-800 py-2 px-3 rounded-md w-64 md:w-96 lg:w-[40rem] text-xl"
							id="companyName"
							autoComplete="off"
							placeholder="Example Company"
							{...register("company.name")}
						/>
						<div className="text-sm italic text-red-700">
							<p>{errors.company?.name?.message}</p>
						</div>
					</div>

					<div className="my-3">
						<div className="text-lg">
							<label htmlFor="companySlogan">
								Company Slogan
							</label>
						</div>
						<input
							className="bg-neutral-800 py-2 px-3 rounded-md w-64 md:w-96 lg:w-[40rem] text-xl"
							id="companySlogan"
							autoComplete="off"
							placeholder="Making the world better"
							{...register("company.catchPhrase")}
						/>
						<div className="text-sm italic text-red-700">
							<p>{errors.company?.catchPhrase?.message}</p>
						</div>
					</div>
					<button
						type="submit"
						className="text-2xl tracking-wide font-bold mt-8 py-3 w-64 md:w-96 lg:w-[40rem] rounded-lg bg-red-600 hover:bg-red-700 transition-all"
					>
						{submitSuccessful ? "Submitted!" : "Submit"}
					</button>
				</form>
				<div className="flex justify-center my-8">
					<a
						href="https://www.github.com/vempr/rhf-zod"
						target="_blank"
						className="hover:opacity-80 transition-opacity"
					>
						<img
							src={ghLogo}
							className="w-16 h-16"
						></img>
					</a>
				</div>
			</div>
		</div>
	);
}
