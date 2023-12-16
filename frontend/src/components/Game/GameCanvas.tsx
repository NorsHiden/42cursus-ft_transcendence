import { BallType, PlayerType } from '@globalTypes/game';
import { UserType } from '@globalTypes/user';
import { FC, useEffect, useRef } from 'react';

type CanvasProps = React.HTMLProps<HTMLCanvasElement> & {
  homePlayer: PlayerType;
  awayPlayer: PlayerType;
  ball: BallType;
  me: UserType;
};

export const GameCanvas: FC<CanvasProps> = ({ homePlayer, awayPlayer, ball, me, ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawPaddle = (context: CanvasRenderingContext2D, player: PlayerType) => {
    const { width, height } = context.canvas;
    const paddleWidth = (player.width / 100) * width;
    const paddleHeight = (player.height / 100) * height;
    const paddleX = (player.x / 100) * width;
    const paddleY = (player.y / 100) * height;
    const radius = paddleWidth / 2;
    const r = paddleX + paddleWidth;
    const b = paddleY + paddleHeight;

    context.fillStyle = player.display_name === me?.display_name ? '#FE5821' : '#FFFFFF';
    context.beginPath();
    context.moveTo(paddleX + radius, paddleY);
    context.lineTo(r - radius, paddleY);
    context.quadraticCurveTo(r, paddleY, r, paddleY + radius);
    context.lineTo(r, paddleY + paddleHeight - radius);
    context.quadraticCurveTo(r, b, r - radius, b);
    context.lineTo(paddleX + radius, b);
    context.quadraticCurveTo(paddleX, b, paddleX, b - radius);
    context.lineTo(paddleX, paddleY + radius);
    context.quadraticCurveTo(paddleX, paddleY, paddleX + radius, paddleY);
    context.fill();
  };

  const drawBall = (context: CanvasRenderingContext2D, ball: BallType) => {
    const { width, height } = context.canvas;
    const ballRadius = (ball.radius / 100) * height;
    const ballX = (ball.x / 100) * width;
    const ballY = (ball.y / 100) * height;

    context.fillStyle = '#FFFFFF';
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    context.fill();
  };

  useEffect(() => {
    if (!homePlayer || !awayPlayer || !ball) return;

    const context = canvasRef.current!.getContext('2d');

    if (context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      drawPaddle(context, homePlayer);
      if (!ball.is_hidden) drawBall(context, ball);
      drawPaddle(context, awayPlayer);
    }
  }, [homePlayer, awayPlayer, ball]);

  return <canvas ref={canvasRef} {...props} />;
};
