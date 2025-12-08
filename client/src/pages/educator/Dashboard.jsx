import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets, dummyDashboardData } from '../../assets/assets'
import Loading from '../../components/student/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'

const Dashboard = () => {

  const {currency, backendUrl, isEducator, getToken } = useContext(AppContext)
  const [ dashboardData, setDashboardData] = useState(null)

  const fetchDashboardData = async () => {
    try {
      const token = await getToken()
      const {data} = await axios.get(backendUrl + '/api/educator/dashboard',
        {headers: {Authorization: `Bearer ${token}`}}
      )
      if(data.success){
        setDashboardData(data.dashboardData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect (() => {
    if(isEducator){
    fetchDashboardData()
    }
    
  }, [isEducator])

  return dashboardData ? (
  <div className="min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0">
    <div className="space-y-6 w-full">
      {/* Top stats cards */}
      <div className="grid w-full gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  {/* Total Enrollments */}
  <div className="flex items-center gap-4 rounded-xl border h-32 px-6
                  bg-white/80 shadow-md shadow-slate-900/5
                  border-slate-200 dark:border-slate-700 dark:bg-slate-900/80">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500/10">
      <img src={assets.patients_icon} alt="enrollments_icon" className="w-8 h-8" />
    </div>
    <div>
      <p className="text-3xl font-bold text-slate-800 dark:text-slate-50">
        {dashboardData.enrolledStudentsData.length}
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Total Enrollments
      </p>
    </div>
  </div>

  {/* Total Courses */}
  <div className="flex items-center gap-4 rounded-xl border h-32 px-6
                  bg-white/80 shadow-md shadow-slate-900/5
                  border-slate-200 dark:border-slate-700 dark:bg-slate-900/80">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
      <img src={assets.appointments_icon} alt="courses_icon" className="w-8 h-8" />
    </div>
    <div>
      <p className="text-3xl font-bold text-slate-800 dark:text-slate-50">
        {dashboardData.totalCourses}
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Total Courses
      </p>
    </div>
  </div>

  {/* Total Earnings */}
  <div className="flex items-center gap-4 rounded-xl border h-32 px-6
                  bg-white/80 shadow-md shadow-slate-900/5
                  border-slate-200 dark:border-slate-700 dark:bg-slate-900/80">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10">
      <img src={assets.earning_icon} alt="earning_icon" className="w-8 h-8" />
    </div>
    <div>
      <p className="text-3xl font-bold text-slate-800 dark:text-slate-50">
        {dashboardData.totalEarnings}
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Total Earnings
      </p>
    </div>
  </div>
</div>


      {/* Latest Enrollments table (unchanged) */}
      <div className="w-full">
        <h2 className="pb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
          Latest Enrollments
        </h2>

        <div
          className="
            flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-xl
            border bg-white/90 border-slate-200
            dark:bg-slate-900/80 dark:border-slate-700 shadow-md shadow-slate-900/10
          "
        >
          <table className="table-fixed md:table-auto w-full overflow-hidden">
            <thead
              className="
                text-slate-900 dark:text-slate-100 text-sm text-left
                border-b border-slate-200 dark:border-slate-700
                bg-slate-50/80 dark:bg-slate-900/90
              "
            >
              <tr>
                <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">
                  #
                </th>
                <th className="px-4 py-3 font-semibold">Student Name</th>
                <th className="px-4 py-3 font-semibold">Course Title</th>
              </tr>
            </thead>

            <tbody className="text-sm text-slate-600 dark:text-slate-300">
              {dashboardData.enrolledStudentsData.map((item, index) => (
                <tr
                  key={index}
                  className="
                    border-b border-slate-200 dark:border-slate-800
                    hover:bg-slate-50/80 dark:hover:bg-slate-800/70
                    transition-colors
                  "
                >
                  <td className="px-4 py-3 text-center hidden sm:table-cell text-slate-500 dark:text-slate-400">
                    {index + 1}
                  </td>

                  <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                    <img
                      src={item.student.imageUrl}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <span className="truncate">{item.student.name}</span>
                  </td>

                  <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                </tr>
              ))}

              {dashboardData.enrolledStudentsData.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-6 text-center text-slate-500 dark:text-slate-400"
                  >
                    No enrollments yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
) : (
  <Loading />
);

}

export default Dashboard;
