import { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Filter, X, AlertTriangle, MapPin, User } from "lucide-react"
import { mockIssues, categories, severityLevels } from "../data/mockData"
import L from "leaflet"

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

// Custom marker icons for different severity levels
const createCustomIcon = (severity) => {
  const color =
    severity === "Critical"
      ? "#dc2626"
      : severity === "High"
        ? "#ea580c"
        : severity === "Medium"
          ? "#ca8a04"
          : "#16a34a"

  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    className: "custom-marker",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  })
}

const IssuesMapPage = () => {
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [filters, setFilters] = useState({
    category: "All Categories",
    severity: "All Severities",
    dateRange: "all",
  })
  const [showFilters, setShowFilters] = useState(false)

  // Filter issues based on selected filters
  const filteredIssues = mockIssues.filter((issue) => {
    const categoryMatch = filters.category === "All Categories" || issue.category === filters.category
    const severityMatch = filters.severity === "All Severities" || issue.severity === filters.severity

    let dateMatch = true
    if (filters.dateRange !== "all") {
      const issueDate = new Date(issue.reportedAt)
      const now = new Date()
      const daysAgo = filters.dateRange === "week" ? 7 : filters.dateRange === "month" ? 30 : 365
      const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
      dateMatch = issueDate >= cutoffDate
    }

    return categoryMatch && severityMatch && dateMatch
  })

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const clearFilters = () => {
    setFilters({
      category: "All Categories",
      severity: "All Severities",
      dateRange: "all",
    })
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Environmental Issues Map</h1>
          <p className="text-gray-600">
            Showing {filteredIssues.length} of {mockIssues.length} reported issues
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </button>
      </div>

      <div className="flex-1 flex">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="w-80 bg-white border-r shadow-sm p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="p-1 hover:bg-gray-100 rounded-md">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Severity Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
                <select
                  value={filters.severity}
                  onChange={(e) => handleFilterChange("severity", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {severityLevels.map((severity) => (
                    <option key={severity} value={severity}>
                      {severity}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange("dateRange", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Time</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="year">Last Year</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Clear All Filters
              </button>
            </div>

            {/* Legend */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Severity Legend</h3>
              <div className="space-y-2">
                {["Critical", "High", "Medium", "Low"].map((severity) => (
                  <div key={severity} className="flex items-center">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm mr-2"
                      style={{
                        backgroundColor:
                          severity === "Critical"
                            ? "#dc2626"
                            : severity === "High"
                              ? "#ea580c"
                              : severity === "Medium"
                                ? "#ca8a04"
                                : "#16a34a",
                      }}
                    ></div>
                    <span className="text-sm text-gray-600">{severity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Map Container */}
        <div className="flex-1 relative">
          <MapContainer center={[40.7829, -73.9654]} zoom={11} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredIssues.map((issue) => (
              <Marker
                key={issue.id}
                position={[issue.location.lat, issue.location.lng]}
                icon={createCustomIcon(issue.severity)}
                eventHandlers={{
                  click: () => setSelectedIssue(issue),
                }}
              >
                <Popup>
                  <div className="w-64">
                    <img
                      src={issue.image || "/placeholder.svg"}
                      alt={issue.title}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />
                    <h3 className="font-semibold text-gray-900 mb-2">{issue.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{issue.description.substring(0, 100)}...</p>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div className="flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        <span>
                          {issue.severity} - {issue.category}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{issue.address}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        <span>Reported by {issue.reportedBy}</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Issue Details Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[1000]">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">{selectedIssue.title}</h2>
                <button onClick={() => setSelectedIssue(null)} className="p-2 hover:bg-gray-100 rounded-md">
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <img
                src={selectedIssue.image || "/placeholder.svg"}
                alt={selectedIssue.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Category</span>
                  <p className="text-gray-900">{selectedIssue.category}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Severity</span>
                  <p
                    className={`font-semibold ${
                      selectedIssue.severity === "Critical"
                        ? "text-red-600"
                        : selectedIssue.severity === "High"
                          ? "text-orange-600"
                          : selectedIssue.severity === "Medium"
                            ? "text-yellow-600"
                            : "text-green-600"
                    }`}
                  >
                    {selectedIssue.severity}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Status</span>
                  <p
                    className={`font-semibold ${
                      selectedIssue.status === "Resolved"
                        ? "text-green-600"
                        : selectedIssue.status === "In Progress"
                          ? "text-blue-600"
                          : "text-gray-600"
                    }`}
                  >
                    {selectedIssue.status}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Reported By</span>
                  <p className="text-gray-900">{selectedIssue.reportedBy}</p>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-sm font-medium text-gray-500">Description</span>
                <p className="text-gray-900 mt-1">{selectedIssue.description}</p>
              </div>

              <div className="mb-4">
                <span className="text-sm font-medium text-gray-500">Location</span>
                <p className="text-gray-900 mt-1">{selectedIssue.address}</p>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-500">Reported On</span>
                <p className="text-gray-900 mt-1">
                  {new Date(selectedIssue.reportedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default IssuesMapPage
