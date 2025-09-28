'use client'

import { Alert } from "@mui/material";
import { ReactNode } from "react";
import { createRoot, Root } from "react-dom/client";

export class NotificationSystem{
	private static container: Root | null = null;
	private static containerDiv: HTMLDivElement | null = null;

	private static placeContainer(inner: ReactNode){
		
		const div = document.createElement('div');
		div.classList.add("fixed", "bottom-0", "right-0", "w-dit", "h-fit", "max-w-50");

		document.body.appendChild(div);

		const root = createRoot(div);

		NotificationSystem.container = root;
		NotificationSystem.containerDiv = div;

		root.render(inner);
	}
	private static removeContainer(){
		NotificationSystem.container?.unmount();
		if(NotificationSystem.containerDiv && document.body.contains(NotificationSystem.containerDiv)){
			document.body.removeChild(NotificationSystem.containerDiv!);
		}
	}
	private static showNotification(inner: ReactNode){
		NotificationSystem.removeContainer();
		NotificationSystem.placeContainer(inner);
		setTimeout(() => {
			NotificationSystem.removeContainer();
		}, 5000);
	}
	static showError(text: string){
		NotificationSystem.showNotification(<Alert variant="filled" severity="error">{text}</Alert>)
	}
	static showSuccess(text: string){
		NotificationSystem.showNotification(<Alert variant="filled" severity="success">{text}</Alert>)
	}
	static showInfo(text: string){
		NotificationSystem.showNotification(<Alert variant="filled" severity="info">{text}</Alert>)
	}
	static showWarning(text: string){
		NotificationSystem.showNotification(<Alert variant="filled" severity="warning">{text}</Alert>)
	}
}