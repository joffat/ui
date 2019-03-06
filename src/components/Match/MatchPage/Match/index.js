import React from 'react';
import classNames from 'classnames';
import { Grid, Progress } from 'semantic-ui-react';

import './index.css';

export default (props) => {
    const { match, totalGames } = props;
    const stats = match.stats;
    const colorA = stats.wins[0] > stats.wins[1] ? 'green' : null;
    const colorB = stats.wins[1] > stats.wins[0] ? 'green' : null;

    let progress = null;
    let winnerProgress = null;
    let gridStyle = null;

    if (props.displayProgress) {
        gridStyle = {
            borderBottom: '1px solid #efefef',
        };
        progress = (
            <div className='progress-wrapper'>
                <Progress
                    value={ match.stats.gamesCompleted }
                    total={ totalGames }
                    attached='top'
                />
            </div>
        );
        // Display the progress towards winning by any of the two players
        // this is a bar that begins in the center (tie), and moves towards
        // the winner's side. If it hits the end, that player wins
        // Winning just implies winning more games than the other player, so
        // initially that's winning 50 games
        const winMax = Math.max(stats.wins[0], stats.wins[1]);
        const winnerBarMax = (totalGames - match.stats.gamesCompleted) / 2;
        const winBarLength = winMax * 100 / winnerBarMax; // %

        winnerProgress = (
            <div className='progress-winner'>
                <div></div>
            </div>
        );
    }
    
    return (
        <div className={ classNames('match', { 'small': props.small }) }>
            { progress }
            <Grid columns={ 2 } textAlign='center' verticalAlign='middle' style={ gridStyle }>
                <Grid.Column color={ colorA }>
                    <h2>{ match.players[0].token }</h2>
                    <h3>{ stats.wins[0] }</h3>
                </Grid.Column>
                <Grid.Column color={ colorB }>
                    <h2>{ match.players[1].token }</h2>
                    <h3>{ stats.wins[1] }</h3>
                </Grid.Column>
            </Grid>
        </div>
    );
};