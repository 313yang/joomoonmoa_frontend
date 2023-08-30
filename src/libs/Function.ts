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