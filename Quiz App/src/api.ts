import { shuffleArray } from './utils';

export enum Difficulty {
	EASY = 'easy',
	MEDIUM = 'medium',
	HARD = 'HARD',
}

export type API_Response = {
	category: string;
	correct_answer: string;
	difficulty: string;
	incorrect_answers: string[];
	question: string;
	type: string;
};

export type Questions = API_Response & {
	options: string[];
};

export const fetchData = async (amount: number, difficulty: Difficulty) => {
	const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=9&difficulty=${difficulty}`;

	const data = await (await fetch(endpoint)).json();

	return data.results.map((item: API_Response) => ({
		...item,
		options: shuffleArray([...item.incorrect_answers, item.correct_answer]),
	}));
};
