import { useState } from "react"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import { MapPin, Camera, Send } from "lucide-react"
import L from "leaflet"

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng)
    },
  })

  return position === null ? null : <Marker position={position} />
}

const ReportIssuePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    severity: "",
  })
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [position, setPosition] = useState({ lat: 40.7829, lng: -73.9654 }) // Default to NYC
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    "Air Pollution",
    "Water Contamination",
    "Illegal Dumping",
    "Deforestation",
    "Waste Management",
    "Noise Pollution",
    "Soil Contamination",
  ]

  const severityLevels = ["Low", "Medium", "High", "Critical"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error getting location:", error)
          alert("Unable to get your location. Please click on the map to select a location.")
        },
      )
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      alert("Issue reported successfully! Thank you for helping protect our environment.")
      setIsSubmitting(false)
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        severity: "",
      })
      setSelectedImage(null)
      setImagePreview(null)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary-600 text-white px-6 py-4">
            <h1 className="text-2xl font-bold">Report Environmental Issue</h1>
            <p className="text-primary-100 mt-1">Help us protect the environment by reporting issues in your area</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Issue Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Brief description of the issue"
              />
            </div>

            {/* Category and Severity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-2">
                  Severity Level *
                </label>
                <select
                  id="severity"
                  name="severity"
                  required
                  value={formData.severity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select severity</option>
                  {severityLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Provide detailed information about the environmental issue..."
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                {imagePreview ? (
                  <div className="text-center">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="mx-auto h-48 w-auto rounded-lg shadow-md mb-4"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedImage(null)
                        setImagePreview(null)
                      }}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="image-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image-upload"
                          name="image-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Location Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Location *</label>
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-primary-600 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  Use Current Location
                </button>
              </div>
              <div className="h-64 rounded-lg overflow-hidden border border-gray-300">
                <MapContainer center={[position.lat, position.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationMarker position={position} setPosition={setPosition} />
                </MapContainer>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Click on the map to select the exact location of the issue, or use the "Use Current Location" button.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Report
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ReportIssuePage
