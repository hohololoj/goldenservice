import { useRef, useState } from "react";

import IconButton from "@/components/ui/IconButton/IconButton";
import iconReply from './icon-reply.svg';
import iconComment from './icon-comment.svg';
import { Rating } from "@mui/material";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import { Review } from "@/types/types.reviews";
import { ClientValidation, parseDate } from "@/utils/utils";
import { NotificationSystem } from "../Notifications/Notifications";
import { BFF } from "@/constants/constants";

interface Props {
	review: Review,
	onComment: Function
}

export default function SingleReview(props: Props) {

	const [commentsShown, setCommentsShown] = useState(false);
	const [commentFormShown, setCommentFormShown] = useState(false);

	const inputsRef = useRef<{name: HTMLInputElement | null, comment: HTMLTextAreaElement | null}>({name: null, comment: null})

	function declineComment(num: number){

		function inRange(num: number, min: number, max: number){
			return num >= min && num <= max;
		}

		if(inRange(num, 5, 20)){return 'комментариев'}

		const remainder = num%10;

		if(inRange(remainder, 5, 9) || remainder === 0){return 'комментариев'}
		if(inRange(remainder, 2, 4)){return 'комментария'}
		if(remainder === 1){return 'комментарий'}
	}

	async function processComment(){

		function returnError(errorText: string){
			NotificationSystem.showError(errorText)
		}

		const author = inputsRef.current.name!.value;
		if(!ClientValidation.isRussianText(author)){returnError('Имя может содержать только русские буквы'); return}
		if(!ClientValidation.isInLengthRange(author, 3, 32)){returnError('Имя не может быть короче 3 символов и длиннее 32 символов'); return}

		const text = inputsRef.current.comment!.value;
		if(!ClientValidation.isInLengthRange(text, 10, 512)){returnError('Комментарий не может быть короче 10 символов и длиннее 512 символов'); return}

		const comment = {author, text};
		const rid = props.review._id;

		const res = await fetch(`/api/proxy/reviews/${rid}/comments`, {
			method: 'POST',
			body: JSON.stringify(comment)
		}).then((res) => res.json());
		
		if(!res.status){
			NotificationSystem.showError(`Что то пошло не так: ${res.message}`);
		}
		NotificationSystem.showSuccess('Комментарий добавлен');
		props.onComment();
	}

	return (
		<div className="w-full h-auto flex flex-col gap-1">

			{/* Блок отзыва */}
			<div className="w-full h-auto px-6 py-4 flex flex-col gap-6">

				{/* Шапка отзыва */}
				<div className="w-full grid grid-cols-[min-content_1fr_max-content] 1100:grid-cols-[max-content_1fr_max-content] grid-flow-col">
					{/* Имя пользователя */}
					<p className="text-lg font-medium leading-7 w-fit 1100:w-[190px]">{props.review.author}</p>
					{/* Дата */}
					<div className="w-full flex justify-center items-center">
						<p className="text-xs font-light text-gray">{parseDate(props.review.timestamp)}</p>
					</div>
					{/* Оценка */}
					<div className="w-fit flex items-center">
						<Rating name="rating" defaultValue={props.review.rate} precision={0.5} readOnly />
					</div>
				</div>

				{/* Тело отзыва */}
				<p className="w-full h-fit mt-2 text-sm font-normal leading-6">{props.review.text}</p>

				{/* Функциональный блок отзыва */}
				<div className="flex gap-5">
					<IconButton onClick={() => {setCommentFormShown(prev => !prev)}} src={iconReply} width={20} height={20} alt="icon-reply" className="text-sm font-normal leading-[26px] text-gray">Ответить</IconButton>
					<IconButton onClick={() => {setCommentsShown(prev => !prev)}} src={iconComment} width={20} height={20} alt="icon-comment" className="text-sm font-normal leading-[26px] text-gray">{`${props.review.comments.length} ${declineComment(props.review.comments.length)}`}</IconButton>
				</div>

			</div>

			{/* Контейнер комментариев */}
			<div className="w-full flex-col gap-2" style={{display: commentsShown ? 'flex' : 'none'}}>

				{props.review.comments.map((comment) => {
					return(
						<div key={comment._id} className="w-full h-auto px-6 py-4 ml-6 flex flex-col gap-6 border-l-1 border-light-gray">
							<div className="w-full grid grid-cols-[max-content_1fr_max-content] grid-flow-col ">
								<p className="text-lg font-medium leading-7 w-fit">{comment.author}</p>
								<div className="w-full flex justify-center items-center">
									<p className="text-xs font-light text-gray">{parseDate(comment.timestamp)}</p>
								</div>
							</div>
							<p className="w-full h-fit mt-2 text-sm font-normal leading-6">
								{comment.text}
							</p>
						</div>
					)
				})}

			</div>

			{/* Блок добавления комментария */}
			<div className="w-full h-auto px-6 py-4 ml-6 flex-col gap-6 border-l-1 border-light-gray" style={{display: commentFormShown ? 'flex' : 'none'}}>

				<Input ref={(el) => {inputsRef.current.name = el}} className="w-[270px]! text-sm h-fit!" placeholder="Ваше имя" />

				<textarea ref={(el) => {inputsRef.current.comment = el}} className="h-[140px] text-sm font-normal leading-6 placeholder:text-text-disable py-3 px-4 outline-none border-1 border-light-gray resize-none" placeholder="Ваш комментарий"></textarea>

				<Button onClick={processComment}>Отправить</Button>

			</div>

		</div>
	)
}