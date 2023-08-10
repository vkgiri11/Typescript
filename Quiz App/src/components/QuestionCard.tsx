import { ButtonWrapper, Wrapper } from './QuestionCard.styles';
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
			<Wrapper>
				<p className="number">
					Question: {quesNum} / {totalQues}
				</p>
				<p dangerouslySetInnerHTML={{ __html: question }} />
				<div>
					{options.map((item, index) => (
						<ButtonWrapper
							key={index}
							$correct={userAnswer?.correctAns === item}
							$userClicked={userAnswer?.answer === item}>
							<button disabled={!!userAnswer} value={item} onClick={checkAnswer}>
								<span dangerouslySetInnerHTML={{ __html: item }} />
							</button>
						</ButtonWrapper>
					))}
				</div>
			</Wrapper>
		</>
	);
};
export default QuestionCard;
