import { useState } from "react"
import { Search, Calendar, ExternalLink, Filter, Clock } from "lucide-react"
import { mockNews } from "../data/mockData"

const EcoNewsPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSource, setSelectedSource] = useState("All Sources")

  // Get unique sources for filter
  const sources = ["All Sources", ...new Set(mockNews.map((article) => article.source))]

  // Filter news based on search and source
  const filteredNews = mockNews.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSource = selectedSource === "All Sources" || article.source === selectedSource
    return matchesSearch && matchesSource
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`

    const diffInWeeks = Math.floor(diffInDays / 7)
    return `${diffInWeeks}w ago`
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Environmental News</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest environmental news, initiatives, and breakthroughs from around the world
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search news articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Source Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {sources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {article.source}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {getTimeAgo(article.publishedAt)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>

                <h2 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{article.title}</h2>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.summary}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">{article.source}</span>
                  <a
                    href={article.url}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
                  >
                    Read More
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filter criteria.</p>
          </div>
        )}

        {/* Load More Button (Static) */}
        {filteredNews.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
              Load More Articles
            </button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-green-600 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Informed</h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest environmental news and updates directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-primary-600 px-6 py-2 rounded-md font-semibold hover:bg-primary-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EcoNewsPage
