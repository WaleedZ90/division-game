import { Attempt } from 'models';
import React, { useContext } from 'react';
import GlobalContext from 'store/context/store.context';
import classNames from 'classnames';
import './styles.scss';

import PersonSharpIcon from '@material-ui/icons/PersonSharp';
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';

type Props = {
	attempt: Attempt;
	isLastElement?: boolean;
};

export const PlayerAttempt: React.FC<Props> = ({ attempt, isLastElement = false }) => {
	const { currentGame } = useContext(GlobalContext);
	const isPlayerOne = attempt.user.id === currentGame?.playerOne.id;

	return (
		<article
			ref={(el) => {
				if (el && isLastElement) el.scrollIntoView();
			}}
			className={classNames('player-attempt', isPlayerOne && 'player-one', !isPlayerOne && 'player-two')}
		>
			<div className="player-attempt-header">
				<figure>
					{isPlayerOne && <PersonSharpIcon />}
					{!isPlayerOne && <PersonOutlineSharpIcon />}
					<figcaption>{isPlayerOne ? currentGame?.playerOne.username : currentGame?.playerTwo.username}</figcaption>
				</figure>
				<p className="player-input">{attempt.number}</p>
			</div>
			<div className="player-attempt-calculations">
				<p>{attempt.text}</p>
				<p>{attempt.newValue}</p>
			</div>
		</article>
	);
};
