import { AnswerObject } from '../App';

type Props = {
	question: string;
	options: string[];
	checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;
	userAnswer: AnswerObject | undefined;
	quesNum: number;
	totalQues: number;
};

const QuestionCard: React.FC<Props> = ({
	question,
	options,
	checkAnswer,
	userAnswer,
	quesNum,
	totalQues,
}) => {
	return (
		<>
			<div>
				<p className="number">
					Question: {quesNum} / {totalQues}
				</p>
				<p dangerouslySetInnerHTML={{ __html: question }} />
				<div>
					{options.map((item, index) => (
						<div key={index}>
							<button disabled={!!userAnswer} value={item} onClick={checkAnswer}>
								<span dangerouslySetInnerHTML={{ __html: item }} />
							</button>
						</div>
					))}
				</div>
			</div>
		</>
	);
};
export default QuestionCard;
