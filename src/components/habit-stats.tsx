import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { fetchHabits, Habit } from "../store/habit-slice";
import { LinearProgress, Paper, Typography } from "@mui/material";

const HabitStats: React.FC = () => {
  const { habits, isLoading } = useSelector((state: RootState) => state.habits);
  const getCompletedToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return habits.filter((habit) => habit.completeDates.includes(today)).length;
  };
  const getLongestStreak = () => {
    const getStreak = (habit: Habit) => {
      let streak = 0;
      const currentDate = new Date();

      while (true) {
        const dateString = currentDate.toISOString().split("T")[0];
        if (habit.completeDates.includes(dateString)) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }

      return streak;
    };

    return Math.max(...habits.map(getStreak), 0);
  };
  useEffect(() => {
    dispatch(fetchHabits());
  }, []);
  const dispatch = useDispatch<AppDispatch>();
  if (isLoading) {
    return <LinearProgress />;
  }
  return (
    <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Habit Statistics
      </Typography>
      <Typography variant="body1">Total Habits:{habits.length}</Typography>
      <Typography variant="body1">
        Completed Today:{getCompletedToday()}
      </Typography>
      <Typography variant="body1">
        Longest streak:{getLongestStreak()}
      </Typography>
    </Paper>
  );
};

export default HabitStats;
