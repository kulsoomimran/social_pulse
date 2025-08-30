import User from "../models/User";

export const updateUserStreak = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) return;

  const today = new Date();
  const lastActive = user.lastActive ? new Date(user.lastActive) : null;

  if (!lastActive) {
    // first time activity
    user.streak = 1;
  } else {
    const diffInDays =
      Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 1) {
      // consecutive day → increase streak
      user.streak += 1;
    } else if (diffInDays > 1) {
      // broke streak → reset
      user.streak = 1;
    }
    // if diffInDays === 0 → same day, streak stays same
  }

  user.lastActive = today;

  // OPTIONAL: award extra points or badges for streak milestones
  if (user.streak === 7 && !user.badges.includes("1 Week Streak")) {
    user.badges.push("1 Week Streak");
    user.points += 20; // bonus points
  }
  if (user.streak === 30 && !user.badges.includes("1 Month Streak")) {
    user.badges.push("1 Month Streak");
    user.points += 100;
  }

  await user.save();
  return user;
};
