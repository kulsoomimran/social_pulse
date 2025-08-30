import User from "../models/User";

export const updateUserPoints = async (userId: string, points: number) => {
    const user = await User.findById(userId);
    if (!user) return;

    user.points += points;

    if (user.points >= 200 && !user.badges.includes("Poll Master")) {
        user.badges.push("Poll Master");
    } else if (user.points >= 100 && !user.badges.includes("Gold Contributor")) {
        user.badges.push("Gold Contributor");
    } else if (user.points >= 50 && !user.badges.includes("Silver Contributor")) {
        user.badges.push("Silver Contributor");
    } else if (user.points >= 10 && !user.badges.includes("Bronze Contributor")) {
        user.badges.push("Bronze Contributor");
    }

    await user.save();
    return user;
};
