import { clerkClient } from "@clerk/express";
import Course from "../models/course.js";
import cloudinary from "../utils/cloudinary.js";
import Purchase from "../models/purchase.js";
import User from "../models/user.js";

export const updateRoleToEducator = async (req, res) => {
  try {
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json("Unauthorized: login please");
    }

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    return res.json({ succes: true, message: "you can publish a course now" });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Something went wrong",
    });
  }
};

// add new course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;

    const educatorId = req.educatorId; // set by protectEducator

    if (!imageFile) {
      return res.status(400).json({ message: "Thumbnail not attached" });
    }

    const parsedCourseData = JSON.parse(courseData);
    parsedCourseData.educator = educatorId;

    const newCourse = await Course.create(parsedCourseData);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    newCourse.courseThumbnail = imageUpload.secure_url;
    await newCourse.save();

    res.status(200).json({ success: true, message: "course added" });
  } catch (error) {
    console.error("addCourse error:", error);
    res
      .status(500)
      .json({ error: error.message || "Something went wrong" });
  }
};

// get educator courses

export const getEducatorCourses = async(req, res) => {

  try {
    const educator = req.educatorId

  const courses = await Course.find({educator})

  res.json({succes: true, courses})
  } catch(error){
    res.json({success: false, message: error.message})
  }
  
}

//get educator dashboard

export const educatorDashboardData = async (req, res) => {
  try {
    const educatorId = req.educatorId; // set by protectEducator middleware

    if (!educatorId) {
      return res.status(401).json({
        success: false,
        message: "Educator not authenticated",
      });
    }

    // Find all courses created by this educator
    const courses = await Course.find({ educator: educatorId });

    const totalCourses = courses.length;

    const courseIds = courses.map((course) => course._id);

    // Calculate total earnings from completed purchases
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    });

    const totalEarnings = purchases.reduce(
      (sum, p) => sum + (p.amount || 0),
      0
    );

    // Collect unique enrolled students with their course titles
    const enrolledStudentsData = [];

    for (const course of courses) {
      if (!course.enrolledStudents || course.enrolledStudents.length === 0) {
        continue;
      }

      const students = await User.find(
        { _id: { $in: course.enrolledStudents } },
        "name imageUrl"
      );

      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }

    res.json({
      success: true,
      dashboardData: {
        totalEarnings,
        enrolledStudentsData,
        totalCourses,
      },
    });
  } catch (error) {
    console.error("educatorDashboardData error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//get enrolled students data with purchase data

export const getEnrolledStudentsData = async (req, res) => {
  try {
    const educatorId = req.educatorId;

    if (!educatorId) {
      return res.status(401).json({
        success: false,
        message: "Educator not authenticated",
      });
    }

    const courses = await Course.find({ educator: educatorId });
    const courseIds = courses.map((course) => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    })
      .populate("userId", "name imageUrl")
      .populate("courseId", "courseTitle");

    const enrolledStudents = purchases.map((purchase) => ({
      student: purchase.userId,
      courseTitle: purchase.courseId?.courseTitle,
      purchaseDate: purchase.createdAt,
    }));

    res.json({ success: true, enrolledStudents });
  } catch (error) {
    console.error("getEnrolledStudentsData error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
