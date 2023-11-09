import { AxiosError, AxiosResponse } from "axios";
import { toast as reactHotToast } from "react-hot-toast";


/**
 * 주어진 문자열들 중 유효한 값들만을 이어서 하나의 문자열로 만듭니다.
 * DOM의 ClassName을 만들 때 사용합니다.
 * @param keepString 이어붙일 class가 없어도 빈 문자열로 반환할지 여부입니다.
 * @param classList 이어붙일 class가 담겨있는 문자열입니다.
 * @returns 만들어진 ClassName 문자열입니다.
 */
export function BuildClass(...classList: Array<string | undefined | null | true | false>): string | undefined {
	let keep = false;
	if (classList[0] === true) keep = true;

	const list = classList.filter(x => x);
	if (list.length > 0) return list.join(" ");
	if (keep) return "";
	return undefined;
}

/**  `초` -> `분:초` 로 변환하는 함수 */
export const secondsToMs = (d: number) => {
	const m = Math.floor(d % 3600 / 60);
	const s = Math.floor(d % 3600 % 60);

	const mDisplay = m;
	const sDisplay = s < 10 ? `0${s}` : s;
	return `${mDisplay}:${sDisplay}`;
};

export enum ToastState {
	Success = 1,
	Error = 2,
}
/** 토스트 메세지를 띄웁니다 */
export const toast = (message: string) => reactHotToast(message, {
	style: {
		borderRadius: "10px",
		background: "#212529",
		color: "#fff",
	},
});
let isFetch = false;

export const RequestGet = async<T>(api: (params: string) => Promise<AxiosResponse<T>>, params?: string) => {
	if (isFetch) return;
	isFetch = true;
	try {
		const { data, status } = await api(params || "");
		isFetch = false;
		if (status === 200) return data;
	} catch (err) {
		console.error(err);
		isFetch = false;
		if (err instanceof AxiosError) {
			const errorMessage = !!err?.response ? err?.response?.data?.message : err.message || "";
			toast(errorMessage);
		}
	}
};

/** Date형식을 `YY년 MM월 DD일 (요일) 오전/오후 hh:mm` 로 변환합니다 */
export const FormatDate = (date: Date | string) => {
	if (!(date instanceof Date)) date = new Date(date);
	// 연, 월, 일, 시, 분 추출
	const year = date.getFullYear().toString().slice(-2);
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");
	let hour = date.getHours().toString().padStart(2, "0");
	const minute = date.getMinutes().toString().padStart(2, "0");
	const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];

	// 오전/오후 구분
	const amOrPm = +hour < 12 ? "오전" : "오후";

	// 시간 12시간 표시 형식으로 변환
	if (+hour > 12) {
		hour = (+hour - 12).toString().padStart(2, "0");
	}
	return `${year}년 ${month}월 ${day}일 (${dayOfWeek}) ${amOrPm} ${hour}:${minute}`;
};

/** 클립보드 복사 */
export const copyToClipboard = (text: string) => {
	if (navigator.clipboard) {
		navigator.clipboard.writeText(text)
			.then(() => {
				toast("복사되었습니다.");
			})
			.catch((err) => {
				toast("클립보드 복사 오류:");
			});
	} else {
		toast("브라우저에서 Clipboard API를 지원하지 않습니다.");
	}
};

/** 숫자만 */
export const FormatNumber = (val: string | number) => {
	if (typeof val === "string") return val.replace(/[^0-9]/g, "");
	return val.toString().replace(/[^0-9]/g, "");
};