import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);

  if (!course) return <p>No course data available</p>;

  return (
    <Link to={'/course/' + course._id}
    onClick={()=>scroll(0,0)}
    className="border border-gray-500/50 rounded-lg overflow-hidden shadow hover:shadow-lg transition  p-1">
      <img
        src={course.courseThumbnail}
        alt="thumbnail"
        className="w-full"
      />
      <div className="p-3 text-left">
        <h3 className="text-base font-semibold">{course.courseTitle}</h3>
        <p className="text-gray-500">AcademiX</p>
      </div>
      <div className="flex items-center space-x-2">
        <p className="ml-3 font-medium">{calculateRating(course)}</p>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <img key={i} src={i< Math.floor(calculateRating(course)) ? assets.star : assets.star_blank } alt="star" className="w-3 h-3" />
          ))}
        </div>
        <p className="text-gray-500">{course.courseRatings.length}</p>
      </div>
      <p className=" text-base text-gray-900 font-semibold">
        {currency}
        {(course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)}
      </p>
    </Link>
  );
};

export default CourseCard;

