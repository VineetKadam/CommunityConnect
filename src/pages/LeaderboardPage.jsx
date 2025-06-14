import { useState } from "react"
import { Trophy, Medal, Award, Star, TrendingUp, Calendar, Users } from "lucide-react"
import { mockUsers } from "../data/mockData"

const LeaderboardPage = () => {
  const [timeframe, setTimeframe] = useState("all-time")

  // Sort users by points (descending)
  const sortedUsers = [...mockUsers].sort((a, b) => b.points - a.points)

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case "Top Contributor":
      case "Eco Warrior":
        return <Trophy className="h-4 w-4" />
      case "Water Guardian":
      case "Air Quality Advocate":
        return <Award className="h-4 w-4" />
      case "Community Hero":
        return <Users className="h-4 w-4" />
      default:
        return <Medal className="h-4 w-4" />
    }
  }

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Top Contributor":
        return "bg-yellow-100 text-yellow-800"
      case "Eco Warrior":
        return "bg-green-100 text-green-800"
      case "Water Guardian":
        return "bg-blue-100 text-blue-800"
      case "Air Quality Advocate":
        return "bg-purple-100 text-purple-800"
      case "Community Hero":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-500">#{rank}</span>
    }
  }

  const stats = [
    { label: "Total Contributors", value: "3,892", icon: Users, color: "text-blue-600" },
    { label: "Issues Reported", value: "1,247", icon: TrendingUp, color: "text-green-600" },
    { label: "Active This Month", value: "456", icon: Calendar, color: "text-purple-600" },
    { label: "Top Score", value: "1,150", icon: Star, color: "text-yellow-600" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Environmental Champions Leaderboard</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Recognizing our community heroes who are making a difference in environmental protection
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md text-center">
              <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Timeframe Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">Rankings</h2>
            <div className="flex items-center space-x-2">
              <label htmlFor="timeframe" className="text-sm font-medium text-gray-700">
                Timeframe:
              </label>
              <select
                id="timeframe"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all-time">All Time</option>
                <option value="this-year">This Year</option>
                <option value="this-month">This Month</option>
                <option value="this-week">This Week</option>
              </select>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Top Contributors</h3>
          <div className="flex flex-col md:flex-row items-end justify-center space-y-4 md:space-y-0 md:space-x-8">
            {/* Second Place */}
            {sortedUsers[1] && (
              <div className="text-center order-1 md:order-1">
                <div className="bg-gray-100 rounded-lg p-6 mb-4 h-32 flex flex-col justify-end">
                  <img
                    src={sortedUsers[1].avatar || "/placeholder.svg"}
                    alt={sortedUsers[1].name}
                    className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-gray-300"
                  />
                  <Medal className="h-6 w-6 text-gray-400 mx-auto" />
                </div>
                <h4 className="font-semibold text-gray-900">{sortedUsers[1].name}</h4>
                <p className="text-sm text-gray-600">{sortedUsers[1].points} points</p>
                <p className="text-xs text-gray-500">{sortedUsers[1].reportsCount} reports</p>
              </div>
            )}

            {/* First Place */}
            {sortedUsers[0] && (
              <div className="text-center order-2 md:order-2">
                <div className="bg-yellow-50 rounded-lg p-6 mb-4 h-40 flex flex-col justify-end border-2 border-yellow-200">
                  <img
                    src={sortedUsers[0].avatar || "/placeholder.svg"}
                    alt={sortedUsers[0].name}
                    className="w-20 h-20 rounded-full mx-auto mb-2 border-4 border-yellow-400"
                  />
                  <Trophy className="h-8 w-8 text-yellow-500 mx-auto" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg">{sortedUsers[0].name}</h4>
                <p className="text-primary-600 font-semibold">{sortedUsers[0].points} points</p>
                <p className="text-sm text-gray-500">{sortedUsers[0].reportsCount} reports</p>
              </div>
            )}

            {/* Third Place */}
            {sortedUsers[2] && (
              <div className="text-center order-3 md:order-3">
                <div className="bg-amber-50 rounded-lg p-6 mb-4 h-28 flex flex-col justify-end">
                  <img
                    src={sortedUsers[2].avatar || "/placeholder.svg"}
                    alt={sortedUsers[2].name}
                    className="w-14 h-14 rounded-full mx-auto mb-2 border-4 border-amber-400"
                  />
                  <Award className="h-5 w-5 text-amber-600 mx-auto" />
                </div>
                <h4 className="font-semibold text-gray-900">{sortedUsers[2].name}</h4>
                <p className="text-sm text-gray-600">{sortedUsers[2].points} points</p>
                <p className="text-xs text-gray-500">{sortedUsers[2].reportsCount} reports</p>
              </div>
            )}
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Complete Rankings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contributor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reports
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Badges
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedUsers.map((user, index) => (
                  <tr key={user.id} className={index < 3 ? "bg-yellow-50" : "hover:bg-gray-50"}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">{getRankIcon(index + 1)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{user.points}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.reportsCount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {user.badges.slice(0, 2).map((badge, badgeIndex) => (
                          <span
                            key={badgeIndex}
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(badge)}`}
                          >
                            {getBadgeIcon(badge)}
                            <span className="ml-1">{badge}</span>
                          </span>
                        ))}
                        {user.badges.length > 2 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            +{user.badges.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.joinedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Achievement System Info */}
        <div className="mt-8 bg-gradient-to-r from-primary-50 to-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Earn Points & Badges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-gray-900 mb-2">Report Issues</h4>
              <p className="text-sm text-gray-600">Earn 50 points for each verified environmental issue you report</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-gray-900 mb-2">Quality Reports</h4>
              <p className="text-sm text-gray-600">
                Bonus points for detailed reports with photos and accurate locations
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-gray-900 mb-2">Community Impact</h4>
              <p className="text-sm text-gray-600">Special badges for contributing to resolved environmental issues</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardPage
