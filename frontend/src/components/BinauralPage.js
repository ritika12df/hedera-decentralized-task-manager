import React, { useState, useRef } from 'react';
import './BinauralPage.css';

const BinauralPage = () => {
    const [selectedBeat, setSelectedBeat] = useState(null);
    const [userAccountId, setUserAccountId] = useState('');
    const [listeningTime, setListeningTime] = useState(0);
    const [rewardTokens, setRewardTokens] = useState(0);
    const audioRef = useRef(null);
    const timerRef = useRef(null);

    const binauralBeats = [
        { id: 1, name: 'Focus & Concentration', file: 'https://ritika12df.github.io/ritikaaudio/focus.mp3' },
        { id: 2, name: 'Relaxation & Stress Relief', file: 'https://ritika12df.github.io/ritikaaudio/relax.mp3' },
        { id: 3, name: 'Deep Sleep', file: 'https://ritika12df.github.io/ritikaaudio/sleep.mp3' },
        { id: 4, name: 'Creativity Boost', file: 'https://ritika12df.github.io/ritikaaudio/energize.mp3' },
    ];

    const handlePlayBeat = (beat) => {
        if (!userAccountId) {
            alert('Please enter your Hedera account ID to start.');
            return;
        }

        if (audioRef.current) {
            clearInterval(timerRef.current);
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        setSelectedBeat(beat);
        const newAudio = new Audio(beat.file);
        audioRef.current = newAudio;

        timerRef.current = setInterval(() => {
            setListeningTime((prevTime) => prevTime + 1);
        }, 1000);

        newAudio.play();
    };

    const handleStopBeat = async () => {
        if (audioRef.current) {
            clearInterval(timerRef.current);
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current = null;

            try {
                const response = await fetch('https://decentralized-task-manager-1.onrender.com/tasks', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        taskTitle: `Listened to ${selectedBeat.name}`,
                        userAccountId,
                        status: 'Completed',
                    }),
                });

                const data = await response.json();
                if (response.ok) {
                    setRewardTokens(rewardTokens + data.rewardAmount);
                    alert(`You've earned ${data.rewardAmount} HBAR for listening!`);
                } else {
                    console.error(data.error);
                    alert('Failed to fetch rewards.');
                }
            } catch (error) {
                console.error('Error rewarding user:', error);
            }

            setListeningTime(0);
        }
    };

    return (
        <div className="binaural-page">
            <h1>Hedera Binaural Beats</h1>
            <p>Listen to binaural beats and earn HBAR tokens for relaxation and focus!</p>

            <div className="hedera-input">
                <input
                    type="text"
                    value={userAccountId}
                    onChange={(e) => setUserAccountId(e.target.value)}
                    placeholder="Enter your Hedera Account ID"
                />
            </div>

            <ul className="binaural-list">
                {binauralBeats.map((beat) => (
                    <li key={beat.id} className="binaural-item">
                        <button onClick={() => handlePlayBeat(beat)}>
                            {beat.name}
                        </button>
                    </li>
                ))}
            </ul>

            {selectedBeat && (
                <div className="now-playing">
                    <p>Now Playing: {selectedBeat.name}</p>
                    <button onClick={handleStopBeat}>Stop</button>
                </div>
            )}

            <div className="rewards">
                <p>Total Rewards Earned: {rewardTokens} HBAR</p>
                <p>Current Session Listening Time: {Math.floor(listeningTime / 60)} min {listeningTime % 60} sec</p>
            </div>
        </div>
    );
};

export default BinauralPage;
