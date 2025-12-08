import { clerkClient, getAuth } from "@clerk/express";

export const protectEducator = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await clerkClient.users.getUser(userId);

    if (user.publicMetadata.role !== "educator") {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    req.educatorId = userId;

    next();
  } catch (error) {
    console.error("protectEducator error:", error);
    return res
      .status(500)
      .json({ message: error.message || "Something went wrong in auth" });
  }
};
