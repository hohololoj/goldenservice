'use client'

import { useEffect, useRef, useState } from "react"

import { BFF } from "@/constants/constants";
import { Review } from "@/types/types.reviews";
import { NotificationSystem } from "../Notifications/Notifications";
import { ClientValidation } from "@/utils/utils";

import { Rating } from "@mui/material";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import SingleReview from "./SingleReview";

import iconReload from './icon-reload.svg';
import IconButton from "@/components/ui/IconButton/IconButton";


interface Props{
	pid: string,
	className?: string
}
interface ReviewInputsRef{
	rate: number | null,
	name: HTMLInputElement | HTMLTextAreaElement |null,
	email: HTMLInputElement | HTMLTextAreaElement |null,
	comment: HTMLInputElement | HTMLTextAreaElement |null
}
export default function ReviewsTab(props: Props){
	const [reviews, setReviews] = useState<Review[]>([]);

	const reviewFormInputs = useRef<ReviewInputsRef>({rate: null, name: null, email: null, comment: null});

	async function updateReviews(newReviews: Review[]){
		setReviews((prev) => {
			return [...prev, ...newReviews]
		})
	}

	async function loadReviews(): Promise<Review[]>{
		return fetch(`/api/proxy/reviews?pid=${props.pid}`).then((res) => res.json()) as unknown as Review[]
	}

	async function resetReviews(){
		setReviews([]);
		initReviews();
	}

	async function initReviews(){
		const reviews = await loadReviews();
		updateReviews(reviews)
	}
	useEffect(() => {
		initReviews()
	}, [])

	async function processReview(){

		function returnError(errorText: string){
			NotificationSystem.showError(errorText)
		}

		const rating = reviewFormInputs.current.rate;
		if(!ClientValidation.isValidRating(rating)){returnError('Введите оценку товару'); return}

		const name = reviewFormInputs.current.name?.value.trim();
		if(!name){returnError('Введите ваше имя'); return}
		if(!ClientValidation.isRussianText(name)){returnError('Имя может содержать только русские буквы'); return}
		if(!ClientValidation.isInLengthRange(name, 3, 32)){returnError('Имя не может быть короче 3 символов и длиннее 32 символов')}

		const email = reviewFormInputs.current.email?.value;
		if(!email){NotificationSystem.showError('Введите ваш email'); return}
		if(!ClientValidation.isValidEmail(email)){returnError('Введенный вами email не валиден'); return}

		const comment = reviewFormInputs.current.comment?.value;
		if(!comment){returnError('Комментарий не может быть пустым'); return}
		if(!ClientValidation.isInLengthRange(comment, 20, 1024)){returnError('Комментарий не может быть короче 20 символов и длиннее 1024 символов'); return}

		const review = {rate: rating, author: name, email, text: comment, pid: props.pid};

		const res = await fetch(`/api/proxy/reviews`, {
			method: 'POST',
			body: JSON.stringify(review),
		}).then((res) => {
			return res.json()
		})

		if(res.status){
			NotificationSystem.showSuccess('Отзыв оставлен');
			resetReviews();
		}
		else{NotificationSystem.showError(`Что-то пошло не так при добавлении отзыва: ${res.message}`); return;}
	}

	async function loadNewReviews(){
		const lastId = reviews.at(-1)?._id;
		if(lastId === undefined){return}
		const additionalReviews = await fetch(`/api/proxy/reviews?pid=${props.pid}&lastId=${lastId}`).then((res) => res.json()) as unknown as Review[];
		if(Array.isArray(additionalReviews)){
			updateReviews(additionalReviews)
		}
	}

	return(
		<div className={`w-full h-auto grid grid-cols-1 750:grid-cols-[1fr_350px] 1100:grid-cols-[1fr_400px] gap-x-2 1100:gap-x-[30px]${props.className ? (' '+props.className) : ''}`}>

			{/* Блок отзывов */}
			<div className="w-full flex flex-col gap-4">

				{reviews.map((review) => {
					return(
						<SingleReview onComment={resetReviews} key={review._id} review={review}/>
					)
				})}

				{(reviews.length%3 === 0 && reviews.length !== 0)? 
					<div className="w-full flex items-center justify-center" onClick={loadNewReviews}>
						<IconButton src={iconReload} width={20} height={20} alt="icon-reload" className="text-sm 600:text-base">Показать еще</IconButton>
					</div>
				:
					''
				}
					
			</div>

			{/* Блок форма отзыва */}
			<div className="w-full h-auto flex flex-col gap-4 py-6 px-[21px]">
				
				{/* Оценка */}
				<div className="w-full h-fit flex flex-col gap-2">
					<p className="text-sm font-medium">Ваша оценка</p>
					<div className="max-w-[124px]">
						<Rating onChange={(event: React.SyntheticEvent, val: number | null) => {reviewFormInputs.current.rate = val}} precision={0.5}/>
					</div>
				</div>

				{/* Имя */}
				<div className="w-full h-fit flex flex-col gap-2">
					<p className="text-sm font-medium">Ваше имя</p>
					<Input ref={(el) => {reviewFormInputs.current.name = el}} className="text-sm font-normal leading-6 placeholder:text-text-disable py-3! px-4!" placeholder="Введите Ваше имя"/>
				</div>
				{/* Email */}
				<div className="w-full h-fit flex flex-col gap-2">
					<p className="text-sm font-medium">Ваш Email</p>
					<Input ref={(el) => {reviewFormInputs.current.email = el}} className="text-sm font-normal leading-6 placeholder:text-text-disable py-3! px-4!" placeholder="Введите Ваш Email"/>
				</div>
				{/* Комментарий */}
				<div className="w-full h-fit flex flex-col gap-2">
					<p className="text-sm font-medium">Ваш комментарий</p>
					<textarea ref={(el) => {reviewFormInputs.current.comment = el}} className="h-[140px] text-sm font-normal leading-6 placeholder:text-text-disable py-3 px-4 outline-none border-1 border-light-gray resize-none" placeholder="Введите ваш комментарий"></textarea>
				</div>

				<Button onClick={processReview} className="w-full py-4!">Оставить отзыв</Button>

			</div>

		</div>
	)
}