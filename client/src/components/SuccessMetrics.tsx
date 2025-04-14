import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Users,
  TrendingUp,
  Award,
  Star,
  Target,
  ShoppingBag,
  Clock,
  ArrowUpRight,
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Layers
} from "lucide-react";
import { scrollToElement } from "@/lib/utils";

// Success stories data
const successStories = [
  {
    id: 1,
    name: "Priya M.",
    location: "Mumbai",
    category: "Fashion & Accessories",
    monthlyRevenue: 180000,
    monthlyProfit: 72000,
    growth: 35,
    monthsActive: 8,
    productsListed: 112,
    ordersPerMonth: 95,
    conversionRate: 4.8,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "I started dropshipping as a side hustle while working full-time. Within 3 months, I was making more from BaapDrop than my day job!"
  },
  {
    id: 2,
    name: "Rahul S.",
    location: "Delhi",
    category: "Electronics",
    monthlyRevenue: 350000,
    monthlyProfit: 105000,
    growth: 28,
    monthsActive: 14,
    productsListed: 87,
    ordersPerMonth: 120,
    conversionRate: 3.9,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "The platform simplified everything. I focus on marketing while they handle logistics. My electronics store grew 300% in the first year."
  },
  {
    id: 3,
    name: "Aisha K.",
    location: "Bangalore",
    category: "Home Decor",
    monthlyRevenue: 220000,
    monthlyProfit: 99000,
    growth: 42,
    monthsActive: 10,
    productsListed: 145,
    ordersPerMonth: 110,
    conversionRate: 5.2,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    quote: "I never thought I could run a successful online business with zero inventory. Home decor has amazing margins and customers love the quality."
  },
  {
    id: 4,
    name: "Vikram P.",
    location: "Hyderabad",
    category: "Beauty & Personal Care",
    monthlyRevenue: 275000,
    monthlyProfit: 123750,
    growth: 38,
    monthsActive: 12,
    productsListed: 92,
    ordersPerMonth: 150,
    conversionRate: 4.5,
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    quote: "The beauty market is booming, and with BaapDrop's white-labeled packaging, my customers think it's all my brand. The repeat orders are incredible."
  },
  {
    id: 5,
    name: "Neha G.",
    location: "Chennai",
    category: "Kids & Toys",
    monthlyRevenue: 195000,
    monthlyProfit: 78000,
    growth: 32,
    monthsActive: 9,
    productsListed: 128,
    ordersPerMonth: 85,
    conversionRate: 4.1,
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    quote: "As a mother of two, I know what parents look for. This platform let me build a kids' store that generates passive income while I care for my family."
  },
];

// Industry average data
const industryAverages = {
  monthlyProfit: 45000,
  growth: 22,
  monthsToBreakeven: 4.5,
  conversionRate: 2.8,
  customerRetention: 35,
  productsListed: 65,
  ordersPerMonth: 60,
};

// Top categories by profit margin
const categoryProfitMargins = [
  { name: "Beauty & Personal Care", margin: 45 },
  { name: "Home Decor", margin: 50 },
  { name: "Fashion & Accessories", margin: 40 },
  { name: "Electronics", margin: 30 },
  { name: "Kids & Toys", margin: 42 },
  { name: "Health & Wellness", margin: 48 },
  { name: "Kitchen & Dining", margin: 38 },
];

// Growth timeline data (months active vs profit growth)
const growthTimelineData = [
  { month: 1, averageProfit: 15000, topPerformerProfit: 22000 },
  { month: 2, averageProfit: 28000, topPerformerProfit: 45000 },
  { month: 3, averageProfit: 42000, topPerformerProfit: 68000 },
  { month: 6, averageProfit: 55000, topPerformerProfit: 95000 },
  { month: 9, averageProfit: 72000, topPerformerProfit: 120000 },
  { month: 12, averageProfit: 85000, topPerformerProfit: 150000 },
];

// KPI comparison data
const kpiComparisonData = [
  {
    subject: "Profit Margin",
    industry: 22,
    platform: 38,
    fullMark: 50,
  },
  {
    subject: "Growth Rate",
    industry: 20,
    platform: 35,
    fullMark: 50,
  },
  {
    subject: "Conversion",
    industry: 2.8,
    platform: 4.5,
    fullMark: 10,
  },
  {
    subject: "Product Range",
    industry: 65,
    platform: 110,
    fullMark: 150,
  },
  {
    subject: "Customer Retention",
    industry: 35,
    platform: 60,
    fullMark: 100,
  },
  {
    subject: "Time to Profit",
    industry: 4.5,
    platform: 2,
    fullMark: 6,
  },
];

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR',
    maximumFractionDigits: 0 
  }).format(amount);
};

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color || entry.stroke || entry.fill }}>
            {entry.name}: {entry.value.toString().includes(".") 
              ? entry.value.toFixed(1) 
              : entry.name.toLowerCase().includes("profit") || entry.name.toLowerCase().includes("revenue")
                ? formatCurrency(entry.value)
                : entry.value
            }
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Success metric card component
const MetricCard = ({ icon, title, value, description, bgColor, textColor }: any) => (
  <Card className={`${bgColor} ${textColor} h-full`}>
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <CardTitle className="text-lg font-medium flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <p className={`text-sm opacity-80`}>{description}</p>
    </CardContent>
  </Card>
);

export default function SuccessMetrics() {
  const [selectedStory, setSelectedStory] = useState(successStories[0]);
  const [chartView, setChartView] = useState<"bar" | "pie" | "radar">("bar");
  
  // Calculate average metrics
  const calculateAverages = () => {
    const totalProfit = successStories.reduce((sum, story) => sum + story.monthlyProfit, 0);
    const avgProfit = totalProfit / successStories.length;
    
    const totalGrowth = successStories.reduce((sum, story) => sum + story.growth, 0);
    const avgGrowth = totalGrowth / successStories.length;
    
    const totalOrders = successStories.reduce((sum, story) => sum + story.ordersPerMonth, 0);
    const avgOrders = totalOrders / successStories.length;
    
    const totalConversion = successStories.reduce((sum, story) => sum + story.conversionRate, 0);
    const avgConversion = totalConversion / successStories.length;
    
    return { avgProfit, avgGrowth, avgOrders, avgConversion };
  };
  
  const averages = calculateAverages();
  
  const COLORS = ['#E40145', '#10b981', '#f59e0b', '#f43f5e', '#ec4899', '#ef4444'];
  
  const renderCategoryChart = () => {
    switch(chartView) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart 
              data={categoryProfitMargins}
              margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis 
                tickFormatter={(value) => `${value}%`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="margin" 
                name="Profit Margin" 
                fill="#E40145"
                label={{ position: 'top', formatter: (value: number) => `${value}%`, fontSize: 12 }}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={categoryProfitMargins}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={130}
                fill="#8884d8"
                dataKey="margin"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {categoryProfitMargins.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      case "radar":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart cx="50%" cy="50%" outerRadius={130} data={kpiComparisonData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
              <Radar
                name="Industry Average"
                dataKey="industry"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.2}
              />
              <Radar
                name="BaapDrop Platform"
                dataKey="platform"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.5}
              />
              <Legend />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };
  
  return (
    <section id="success-metrics" className="py-24 bg-gradient-to-br from-white to-red-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block mb-3">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
              Success Stories
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Reseller Success Metrics</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Real performance data from our top resellers. See what's possible when you partner with us.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Success Stories
                </CardTitle>
                <CardDescription>
                  Meet our top-performing resellers
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {successStories.map((story) => (
                    <div 
                      key={story.id}
                      className={`flex items-center p-4 cursor-pointer transition-colors hover:bg-gray-50 ${selectedStory.id === story.id ? 'bg-primary/5 border-l-4 border-primary' : ''}`}
                      onClick={() => setSelectedStory(story)}
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                        <img src={story.avatar} alt={story.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">{story.name}</p>
                        <p className="text-sm text-gray-500 truncate">{story.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">{formatCurrency(story.monthlyProfit)}</p>
                        <p className="text-xs text-gray-500">monthly</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 bg-gray-50">
                <p className="text-xs text-gray-500 italic">
                  *Based on verified seller data from the last 12 months
                </p>
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="profile" className="h-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="profile">Seller Profile</TabsTrigger>
                <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
                <TabsTrigger value="growth">Growth Timeline</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card className="bg-white">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                            <img src={selectedStory.avatar} alt={selectedStory.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <CardTitle className="mb-1">{selectedStory.name}</CardTitle>
                            <CardDescription>{selectedStory.location}</CardDescription>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-sm font-medium text-gray-500">Active for</span>
                          <span className="text-lg font-bold text-primary">{selectedStory.monthsActive} months</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-100 italic text-gray-700">
                        "{selectedStory.quote}"
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="font-medium text-gray-800 mb-3">Business Details</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Category:</span>
                            <span className="font-medium text-gray-800">{selectedStory.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Products Listed:</span>
                            <span className="font-medium text-gray-800">{selectedStory.productsListed}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Monthly Orders:</span>
                            <span className="font-medium text-gray-800">{selectedStory.ordersPerMonth}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Conversion Rate:</span>
                            <span className="font-medium text-gray-800">{selectedStory.conversionRate}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <MetricCard 
                      icon={<TrendingUp className="h-5 w-5" />}
                      title="Monthly Revenue" 
                      value={formatCurrency(selectedStory.monthlyRevenue)}
                      description="Total sales generated each month"
                      bgColor="bg-primary"
                      textColor="text-white"
                    />
                    
                    <MetricCard 
                      icon={<Award className="h-5 w-5" />}
                      title="Monthly Profit" 
                      value={formatCurrency(selectedStory.monthlyProfit)}
                      description="Net profit after platform fees"
                      bgColor="bg-green-600"
                      textColor="text-white"
                    />
                    
                    <MetricCard 
                      icon={<Target className="h-5 w-5" />}
                      title="Growth Rate" 
                      value={`${selectedStory.growth}%`}
                      description="Month-over-month business growth"
                      bgColor="bg-orange-500"
                      textColor="text-white"
                    />
                  </div>
                </div>
                
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Performance vs. Industry Average</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button
                          variant={chartView === "bar" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setChartView("bar")}
                          className="h-8 w-8 p-0"
                        >
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={chartView === "pie" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setChartView("pie")}
                          className="h-8 w-8 p-0"
                        >
                          <PieChartIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={chartView === "radar" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setChartView("radar")}
                          className="h-8 w-8 p-0"
                        >
                          <Activity className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {renderCategoryChart()}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="metrics" className="h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Top Categories by Profit Margin</CardTitle>
                      <CardDescription>Highest performing product categories</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart 
                            data={categoryProfitMargins}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                            <YAxis 
                              type="category" 
                              dataKey="name" 
                              tick={{ fontSize: 12 }}
                              width={100}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="margin" name="Profit Margin" fill="#E40145" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Seller vs. Industry Average</CardTitle>
                      <CardDescription>How our sellers outperform industry standards</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius={130} data={kpiComparisonData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
                            <Radar
                              name="Industry Average"
                              dataKey="industry"
                              stroke="#8884d8"
                              fill="#8884d8"
                              fillOpacity={0.2}
                            />
                            <Radar
                              name="BaapDrop Platform"
                              dataKey="platform"
                              stroke="#4f46e5"
                              fill="#4f46e5"
                              fillOpacity={0.5}
                            />
                            <Legend />
                            <Tooltip content={<CustomTooltip />} />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <MetricCard 
                    icon={<TrendingUp className="h-5 w-5" />}
                    title="Avg. Monthly Profit" 
                    value={formatCurrency(averages.avgProfit)}
                    description={`vs. industry: ${formatCurrency(industryAverages.monthlyProfit)}`}
                    bgColor="bg-white"
                    textColor="text-gray-800"
                  />
                  
                  <MetricCard 
                    icon={<Star className="h-5 w-5" />}
                    title="Avg. Growth Rate" 
                    value={`${averages.avgGrowth.toFixed(1)}%`}
                    description={`vs. industry: ${industryAverages.growth}%`}
                    bgColor="bg-white"
                    textColor="text-gray-800"
                  />
                  
                  <MetricCard 
                    icon={<ShoppingBag className="h-5 w-5" />}
                    title="Avg. Orders/Month" 
                    value={averages.avgOrders.toFixed(0)}
                    description={`vs. industry: ${industryAverages.ordersPerMonth}`}
                    bgColor="bg-white"
                    textColor="text-gray-800"
                  />
                  
                  <MetricCard 
                    icon={<Target className="h-5 w-5" />}
                    title="Avg. Conversion" 
                    value={`${averages.avgConversion.toFixed(1)}%`}
                    description={`vs. industry: ${industryAverages.conversionRate}%`}
                    bgColor="bg-white"
                    textColor="text-gray-800"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="growth" className="h-full">
                <Card>
                  <CardHeader>
                    <CardTitle>Growth Timeline</CardTitle>
                    <CardDescription>Profit growth over time (months)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart 
                          data={growthTimelineData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="month" 
                            label={{ 
                              value: 'Months After Starting', 
                              position: 'insideBottomRight',
                              offset: -15
                            }}
                          />
                          <YAxis 
                            tickFormatter={(value) => `₹${(value/1000)}k`}
                            label={{ 
                              value: 'Monthly Profit', 
                              angle: -90, 
                              position: 'insideLeft',
                            }}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend verticalAlign="top" height={36} />
                          <Line 
                            type="monotone" 
                            dataKey="averageProfit" 
                            name="Average Seller" 
                            stroke="#8884d8" 
                            strokeWidth={2}
                            dot={true}
                            activeDot={{ r: 8 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="topPerformerProfit" 
                            name="Top Performer" 
                            stroke="#4f46e5" 
                            strokeWidth={2}
                            dot={true}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-primary" />
                        Time to Breakeven
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4">
                        <div className="flex items-center justify-center mb-4">
                          <div className="relative h-32 w-32 rounded-full flex items-center justify-center bg-white shadow-md">
                            <div className="text-4xl font-bold text-primary">2</div>
                            <div className="text-sm text-primary">months</div>
                          </div>
                        </div>
                        <p className="text-gray-600">Our average seller reaches breakeven in just <span className="font-semibold text-primary">2 months</span> compared to the industry average of 4.5 months</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-100">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                        First Year Growth
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4">
                        <div className="flex items-center justify-center mb-4">
                          <div className="relative h-32 w-32 rounded-full flex items-center justify-center bg-white shadow-md">
                            <div className="text-4xl font-bold text-green-600">320</div>
                            <div className="text-sm text-green-600">%</div>
                          </div>
                        </div>
                        <p className="text-gray-600">Top sellers achieve an average <span className="font-semibold text-green-600">320% growth</span> in their first year of operations</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-indigo-50 to-cyan-50 border-indigo-100">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Layers className="mr-2 h-5 w-5 text-primary" />
                        Scaling Potential
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4">
                        <div className="flex items-center justify-center mb-4">
                          <div className="relative h-32 w-32 rounded-full flex items-center justify-center bg-white shadow-md">
                            <div className="text-4xl font-bold text-orange-500">10</div>
                            <div className="text-sm text-orange-500">X</div>
                          </div>
                        </div>
                        <p className="text-gray-600">Our platform allows for <span className="font-semibold text-orange-500">10X scaling</span> without additional infrastructure investment</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Ready to join these successful resellers? Get started today and build your own success story.
          </p>
          <Button 
            size="lg"
            onClick={() => scrollToElement("join-now")}
            className="primary-gradient animated-btn font-medium text-lg px-8 py-6 shadow-lg"
          >
            Become a Reseller Now
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}