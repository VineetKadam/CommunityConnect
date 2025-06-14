import { Link } from "react-router-dom"
import { MapPin, Users, AlertTriangle, TrendingUp, ArrowRight } from "lucide-react"
import { mockNews, mockIssues } from "../data/mockData"

const HomePage = () => {
  const stats = [
    { label: "Issues Reported", value: "1,247", icon: AlertTriangle, color: "text-red-600" },
    { label: "Active Users", value: "3,892", icon: Users, color: "text-blue-600" },
    { label: "Issues Resolved", value: "856", icon: TrendingUp, color: "text-green-600" },
    { label: "Cities Covered", value: "45", icon: MapPin, color: "text-purple-600" },
  ]

  const recentIssues = mockIssues.slice(0, 3)
  const latestNews = mockNews.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Protecting Our Environment
              <span className="block text-primary-200">Together</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Report environmental issues in your community and help create a cleaner, healthier world for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/report"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-flex items-center justify-center"
              >
                Report an Issue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/map"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                View Issues Map
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              EcoWatch empowers communities to identify, report, and track environmental issues in real-time. By
              connecting citizens with local authorities and environmental organizations, we create a collaborative
              platform for environmental protection and sustainable development.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md text-center">
                <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Issues */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Recent Issues</h2>
            <Link to="/map" className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center">
              View All Issues
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentIssues.map((issue) => (
              <div key={issue.id} className="bg-white rounded-lg shadow-md overflow-hidden border">
                <img src={issue.image || "/placeholder.svg"} alt={issue.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        issue.severity === "Critical"
                          ? "bg-red-100 text-red-800"
                          : issue.severity === "High"
                            ? "bg-orange-100 text-orange-800"
                            : issue.severity === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                      }`}
                    >
                      {issue.severity}
                    </span>
                    <span className="text-sm text-gray-500">{issue.category}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{issue.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{issue.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{issue.address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Environmental News */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Latest Environmental News</h2>
            <Link to="/news" className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center">
              View All News
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm text-primary-600 font-semibold mb-2">{article.source}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{article.summary}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
                    <a href={article.url} className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                      Read More
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Join thousands of environmental advocates who are already making their communities cleaner and safer.
          </p>
          <Link
            to="/report"
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-flex items-center"
          >
            Report Your First Issue
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
