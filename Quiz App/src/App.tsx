import { useState } from 'react';

import { Difficulty, fetchData, Questions } from './api';
import QuestionCard from './components/QuestionCard';

export type AnswerObject = {
	question: string;
	userAns: string;
	isCorrect: boolean;
	correctAns: string;
};

const TOTAL_QUES = 10;

const App = () => {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<Questions[]>([]);
	const [quesNum, setQuesNum] = useState(0);
	const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);

	const startTrivia = async () => {
		setLoading(true);
		setGameOver(false);

		try {
			const data = await fetchData(TOTAL_QUES, Difficulty.EASY);

			setQuestions(data);
			setScore(0);
			setUserAnswers([]);
			setQuesNum(0);
		} catch (error) {
			console.log(`Error Occured =====> ${error}`);
		}

		setLoading(false);
	};

	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (gameOver) return;

		const answer = (e.target as HTMLButtonElement).value;

		const isCorrect = answer === questions[quesNum].correct_answer;

		if (isCorrect) setScore((p) => p + 1);

		const answerData: AnswerObject = {
			question: questions[quesNum].question,
			userAns: answer,
			isCorrect,
			correctAns: questions[quesNum].correct_answer,
		};

		setUserAnswers((prev) => [...prev, answerData]);
	};

	const nextQuestion = () => {
		if (quesNum + 1 === TOTAL_QUES) setGameOver(true);
		else setQuesNum((p) => p + 1);
	};

	return (
		<>
			<div>
				<h1>React Quiz App</h1>
				{!!(gameOver || userAnswers.length === TOTAL_QUES) && (
					<button className="start" onClick={startTrivia}>
						Start
					</button>
				)}
				{!gameOver && <p className="score">Score: {score}</p>}
				{loading && <p>Loading Questions......</p>}
				{!loading && !gameOver && (
					<QuestionCard
						quesNum={quesNum + 1}
						totalQues={TOTAL_QUES}
						question={questions[quesNum].question}
						options={questions[quesNum].options}
						userAnswer={userAnswers[quesNum] || undefined}
						checkAnswer={checkAnswer}
					/>
				)}
				{!!(
					!gameOver &&
					!loading &&
					userAnswers.length === quesNum + 1 &&
					quesNum !== TOTAL_QUES - 1
				) && (
					<button className="next" onClick={nextQuestion}>
						Next
					</button>
				)}
			</div>
		</>
	);
};

export default App;
