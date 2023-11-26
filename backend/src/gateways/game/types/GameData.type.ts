export type GameData = {
  home: {
    x: number;
    y: number;
    width: number;
    height: number;
    display_name: string;
    avatar: string;
    is_ready: boolean;
  };
  away: {
    x: number;
    y: number;
    width: number;
    height: number;
    display_name: string;
    avatar: string;
    is_ready: boolean;
  };
  ball: {
    x: number;
    y: number;
    is_hidden: boolean;
    speed: {
      x: number;
      y: number;
    };
    radius: number;
  };
  score: { home: number; away: number };
  mode: string;
  will_reverse: boolean;
<<<<<<< HEAD
<<<<<<< HEAD
  ready_timer: number;
  is_finished: boolean;
=======
>>>>>>> d68e69d (game mechanics)
=======
  ready_timer: number;
  is_finished: boolean;
>>>>>>> 5281f6a (game mechanics)
};
