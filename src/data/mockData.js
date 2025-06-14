// Mock data for the application
export const mockIssues = [
  {
    id: 1,
    title: "Illegal Dumping in Central Park",
    description:
      "Large amounts of construction waste dumped near the lake area. This is affecting local wildlife and water quality.",
    category: "Illegal Dumping",
    severity: "High",
    status: "New",
    location: { lat: 40.7829, lng: -73.9654 },
    address: "Central Park, New York, NY",
    reportedBy: "John Doe",
    reportedAt: "2024-01-15T10:30:00Z",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Water Contamination in Hudson River",
    description:
      "Unusual discoloration and odor detected in the water. Possible chemical contamination from nearby industrial facility.",
    category: "Water Contamination",
    severity: "Critical",
    status: "In Progress",
    location: { lat: 40.7589, lng: -73.9851 },
    address: "Hudson River, Manhattan, NY",
    reportedBy: "Jane Smith",
    reportedAt: "2024-01-14T14:20:00Z",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Air Pollution from Factory",
    description:
      "Heavy smoke and chemical odors coming from the manufacturing plant. Affecting nearby residential areas.",
    category: "Air Pollution",
    severity: "High",
    status: "New",
    location: { lat: 40.7505, lng: -73.9934 },
    address: "Industrial District, Brooklyn, NY",
    reportedBy: "Mike Johnson",
    reportedAt: "2024-01-13T09:15:00Z",
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Deforestation in Prospect Park",
    description:
      "Unauthorized tree cutting observed in the protected area. Several mature trees have been removed without permits.",
    category: "Deforestation",
    severity: "Medium",
    status: "Resolved",
    location: { lat: 40.6602, lng: -73.969 },
    address: "Prospect Park, Brooklyn, NY",
    reportedBy: "Sarah Wilson",
    reportedAt: "2024-01-12T16:45:00Z",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    title: "Plastic Waste on Beach",
    description:
      "Large accumulation of plastic bottles and bags washed up on the shore. Marine life is being affected.",
    category: "Waste Management",
    severity: "Medium",
    status: "New",
    location: { lat: 40.5795, lng: -73.9707 },
    address: "Coney Island Beach, Brooklyn, NY",
    reportedBy: "Alex Chen",
    reportedAt: "2024-01-11T11:30:00Z",
    image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400&h=300&fit=crop",
  },
]

export const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    reportsCount: 15,
    points: 750,
    badges: ["First Reporter", "Water Guardian", "Community Hero"],
    joinedAt: "2023-06-15",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    reportsCount: 23,
    points: 1150,
    badges: ["Top Contributor", "Air Quality Advocate", "Eco Warrior"],
    joinedAt: "2023-05-20",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    reportsCount: 18,
    points: 900,
    badges: ["Pollution Fighter", "Community Hero"],
    joinedAt: "2023-07-10",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    reportsCount: 12,
    points: 600,
    badges: ["Tree Protector", "First Reporter"],
    joinedAt: "2023-08-05",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Alex Chen",
    email: "alex@example.com",
    reportsCount: 9,
    points: 450,
    badges: ["Ocean Defender"],
    joinedAt: "2023-09-12",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
]

export const mockNews = [
  {
    id: 1,
    title: "New York City Announces Major Air Quality Improvement Initiative",
    summary:
      "The city plans to invest $500M in clean air technologies and stricter emissions standards for vehicles and industrial facilities.",
    source: "Environmental Times",
    publishedAt: "2024-01-15T08:00:00Z",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=250&fit=crop",
    url: "#",
  },
  {
    id: 2,
    title: "Community-Led Cleanup Removes 2 Tons of Waste from Local Waterways",
    summary:
      "Volunteers from across the city participated in the largest waterway cleanup event, removing plastic waste and debris from rivers and streams.",
    source: "Green City News",
    publishedAt: "2024-01-14T12:30:00Z",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
    url: "#",
  },
  {
    id: 3,
    title: "Urban Forest Expansion Project Plants 10,000 New Trees",
    summary:
      "The city's ambitious reforestation program reaches a major milestone with the planting of its 10,000th tree this year.",
    source: "Urban Environment Daily",
    publishedAt: "2024-01-13T15:45:00Z",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
    url: "#",
  },
  {
    id: 4,
    title: "Renewable Energy Adoption Reaches Record High in Metropolitan Area",
    summary:
      "Solar and wind energy now account for 35% of the region's total energy consumption, surpassing previous projections.",
    source: "Clean Energy Report",
    publishedAt: "2024-01-12T10:15:00Z",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=250&fit=crop",
    url: "#",
  },
  {
    id: 5,
    title: "New Recycling Program Reduces Landfill Waste by 40%",
    summary:
      "The innovative waste sorting and recycling initiative has significantly reduced the amount of waste sent to landfills.",
    source: "Waste Management Weekly",
    publishedAt: "2024-01-11T14:20:00Z",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=250&fit=crop",
    url: "#",
  },
  {
    id: 6,
    title: "Electric Vehicle Charging Network Expands to 500 Stations",
    summary:
      "The city's commitment to sustainable transportation continues with the installation of 100 new EV charging stations this month.",
    source: "Transport & Environment",
    publishedAt: "2024-01-10T09:30:00Z",
    image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=250&fit=crop",
    url: "#",
  },
]

export const categories = [
  "All Categories",
  "Air Pollution",
  "Water Contamination",
  "Illegal Dumping",
  "Deforestation",
  "Waste Management",
  "Noise Pollution",
  "Soil Contamination",
]

export const severityLevels = ["All Severities", "Low", "Medium", "High", "Critical"]

export const statusOptions = ["New", "In Progress", "Resolved", "Invalid"]
