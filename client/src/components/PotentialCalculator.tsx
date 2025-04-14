import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import { ArrowUpRight, Download, TrendingUp, Calculator, DollarSign, Package, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { scrollToElement } from "@/lib/utils";

// Define product categories for the calculator
const productCategories = [
  { id: "fashion", name: "Fashion & Apparel", avgMargin: 40, salesVolume: "High" },
  { id: "electronics", name: "Electronics & Gadgets", avgMargin: 30, salesVolume: "Medium" },
  { id: "beauty", name: "Beauty & Personal Care", avgMargin: 45, salesVolume: "High" },
  { id: "homeDecor", name: "Home Decor", avgMargin: 50, salesVolume: "Medium" },
  { id: "kitchen", name: "Kitchen & Dining", avgMargin: 35, salesVolume: "Medium" },
  { id: "toys", name: "Toys & Games", avgMargin: 40, salesVolume: "Low" },
  { id: "fitness", name: "Fitness & Sports", avgMargin: 35, salesVolume: "Medium" },
  { id: "jewelry", name: "Jewelry & Accessories", avgMargin: 55, salesVolume: "Medium" },
];

export default function PotentialCalculator() {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("fashion");
  const [numProducts, setNumProducts] = useState(30);
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [monthlyOrders, setMonthlyOrders] = useState(50);
  const [avgOrderValue, setAvgOrderValue] = useState(1200);
  const [projectionData, setProjectionData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);
  const [monthlyRevenueData, setMonthlyRevenueData] = useState<any[]>([]);
  const [timeInvestmentData, setTimeInvestmentData] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState("optimistic"); // optimistic, moderate, conservative
  
  // Get selected category info
  const getSelectedCategoryInfo = () => {
    return productCategories.find(cat => cat.id === selectedCategory) || productCategories[0];
  };
  
  // Calculate margins based on category
  const calculateMargin = () => {
    const category = getSelectedCategoryInfo();
    return category.avgMargin / 100;
  };
  
  // Calculate potential earnings
  const calculateEarnings = () => {
    const margin = calculateMargin();
    const monthlyRevenue = monthlyOrders * avgOrderValue;
    const monthlyProfit = monthlyRevenue * margin;
    const annualProfit = monthlyProfit * 12;
    
    return {
      monthlyRevenue,
      monthlyProfit,
      annualProfit,
      margin
    };
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0 
    }).format(amount);
  };
  
  // Generate projection data (12 months)
  useEffect(() => {
    const { monthlyRevenue, monthlyProfit, margin } = calculateEarnings();
    
    // Define growth rate based on view mode
    const growthRates = {
      conservative: 0.05, // 5% monthly growth
      moderate: 0.10,     // 10% monthly growth
      optimistic: 0.15    // 15% monthly growth
    };
    
    const growth = growthRates[viewMode as keyof typeof growthRates];
    
    // Generate 12-month projection
    const projectionData = [];
    let currentRevenue = monthlyRevenue;
    let currentProfit = monthlyProfit;
    let currentOrders = monthlyOrders;
    
    for (let month = 1; month <= 12; month++) {
      projectionData.push({
        month,
        revenue: Math.round(currentRevenue),
        profit: Math.round(currentProfit),
        orders: Math.round(currentOrders)
      });
      
      // Apply growth rate for next month
      currentRevenue = currentRevenue * (1 + growth);
      currentProfit = currentProfit * (1 + growth);
      currentOrders = currentOrders * (1 + growth);
    }
    
    setProjectionData(projectionData);
    
    // Generate pie chart data
    const pieData = [
      { name: "Your Profit", value: margin * 100, fill: "#4f46e5" },
      { name: "Platform Cost", value: 100 - (margin * 100), fill: "#e5e7eb" }
    ];
    setPieData(pieData);
    
    // Generate monthly revenue data
    const revenueData = [
      { name: "Month 1", profit: projectionData[0].profit, revenue: projectionData[0].revenue - projectionData[0].profit },
      { name: "Month 3", profit: projectionData[2].profit, revenue: projectionData[2].revenue - projectionData[2].profit },
      { name: "Month 6", profit: projectionData[5].profit, revenue: projectionData[5].revenue - projectionData[5].profit },
      { name: "Month 12", profit: projectionData[11].profit, revenue: projectionData[11].revenue - projectionData[11].profit }
    ];
    setMonthlyRevenueData(revenueData);
    
    // Generate time investment data
    const hourlyRate = (monthlyProfit / (hoursPerWeek * 4)); // Monthly profit divided by monthly hours
    const timeData = [
      { name: "Week 1", hours: hoursPerWeek, earnings: Math.round(hourlyRate * hoursPerWeek) },
      { name: "Week 2", hours: hoursPerWeek, earnings: Math.round(hourlyRate * hoursPerWeek) },
      { name: "Week 3", hours: hoursPerWeek, earnings: Math.round(hourlyRate * hoursPerWeek) },
      { name: "Week 4", hours: hoursPerWeek, earnings: Math.round(hourlyRate * hoursPerWeek) }
    ];
    setTimeInvestmentData(timeData);
  }, [selectedCategory, numProducts, hoursPerWeek, monthlyOrders, avgOrderValue, viewMode]);
  
  const downloadReport = () => {
    // In a real implementation, we would generate a PDF report
    toast({
      title: "Report Downloaded",
      description: "Your personalized business potential report has been downloaded.",
    });
  };
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  const earnings = calculateEarnings();
  const categoryInfo = getSelectedCategoryInfo();
  
  return (
    <section id="calculator" className="py-24 bg-gradient-to-br from-white to-gray-100">
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
              Calculate Your Potential
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Business Potential Calculator</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            See how much you could earn as a dropshipping reseller with our personalized calculator.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Inputs */}
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
                  <Calculator className="mr-2 h-5 w-5 text-primary" />
                  Customize Your Plan
                </CardTitle>
                <CardDescription>
                  Adjust the parameters to see your earning potential
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-700">Product Category</h4>
                  <select 
                    className="w-full rounded-md border border-gray-300 p-2"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {productCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name} (Avg. Margin: {category.avgMargin}%)
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-sm text-gray-700">Monthly Orders</h4>
                    <span className="text-sm text-primary font-semibold">{monthlyOrders} orders</span>
                  </div>
                  <Slider 
                    defaultValue={[50]} 
                    max={300}
                    min={10}
                    step={5}
                    onValueChange={(val) => setMonthlyOrders(val[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>10 orders</span>
                    <span>300 orders</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-sm text-gray-700">Average Order Value</h4>
                    <span className="text-sm text-primary font-semibold">₹{avgOrderValue}</span>
                  </div>
                  <Slider 
                    defaultValue={[1200]} 
                    max={5000}
                    min={500}
                    step={100}
                    onValueChange={(val) => setAvgOrderValue(val[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹500</span>
                    <span>₹5,000</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-sm text-gray-700">Time Investment</h4>
                    <span className="text-sm text-primary font-semibold">{hoursPerWeek} hours/week</span>
                  </div>
                  <Slider 
                    defaultValue={[15]} 
                    max={50}
                    min={5}
                    step={1}
                    onValueChange={(val) => setHoursPerWeek(val[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>5 hrs/week</span>
                    <span>50 hrs/week</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-700">Growth Projection</h4>
                  <div className="flex space-x-2">
                    <Button 
                      variant={viewMode === "conservative" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("conservative")}
                      className="flex-1"
                    >
                      Conservative
                    </Button>
                    <Button 
                      variant={viewMode === "moderate" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("moderate")}
                      className="flex-1"
                    >
                      Moderate
                    </Button>
                    <Button 
                      variant={viewMode === "optimistic" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("optimistic")}
                      className="flex-1"
                    >
                      Optimistic
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" onClick={downloadReport}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
                <Button onClick={() => scrollToElement("join-now")}>
                  Start Now
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
          
          {/* Results and Charts */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="earnings" className="h-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
                <TabsTrigger value="growth">Growth Projections</TabsTrigger>
                <TabsTrigger value="time">Time Investment</TabsTrigger>
              </TabsList>
              
              <TabsContent value="earnings" className="h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Card className="bg-primary text-white">
                    <CardHeader>
                      <CardTitle className="text-lg">Monthly Potential</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-2">{formatCurrency(earnings.monthlyProfit)}</div>
                      <p className="text-white/80 text-sm">From {formatCurrency(earnings.monthlyRevenue)} in sales</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-green-600 text-white">
                    <CardHeader>
                      <CardTitle className="text-lg">Annual Potential</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-2">{formatCurrency(earnings.annualProfit)}</div>
                      <p className="text-white/80 text-sm">With {categoryInfo.name.toLowerCase()} products</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm">Profit Margin</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex justify-center">
                      <div className="h-[120px] w-[120px] sm:h-[150px] sm:w-[150px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={30}
                              outerRadius={50}
                              paddingAngle={2}
                              dataKey="value"
                              label={({ value }) => `${value}%`}
                              labelStyle={{ fontSize: '12px' }}
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 justify-center">
                      <p className="text-xs sm:text-sm text-gray-500 text-center">
                        <span className="font-medium text-primary">{categoryInfo.avgMargin}%</span> margin on your sales
                      </p>
                    </CardFooter>
                  </Card>
                  
                  <Card className="md:col-span-2">
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm">Revenue Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="h-[180px] sm:h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart 
                            data={monthlyRevenueData}
                            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis 
                              tickFormatter={(value) => `₹${(value/1000)}k`} 
                              tick={{ fontSize: 12 }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: '12px' }} />
                            <Bar dataKey="profit" name="Your Profit" stackId="a" fill="#4f46e5" />
                            <Bar dataKey="revenue" name="Platform Cost" stackId="a" fill="#e5e7eb" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-primary" /> 
                      12-Month Profit Projection
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="h-[180px] sm:h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart 
                          data={projectionData}
                          margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="month" 
                            tick={{ fontSize: 12 }}
                          />
                          <YAxis 
                            tickFormatter={(value) => `₹${(value/1000)}k`} 
                            tick={{ fontSize: 12 }} 
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Area 
                            type="monotone" 
                            dataKey="profit" 
                            name="Monthly Profit"
                            stroke="#4f46e5" 
                            fill="url(#colorProfit)" 
                          />
                          <defs>
                            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-center mt-4">
                      <p className="text-xs sm:text-sm text-gray-500">
                        Showing <span className="font-medium text-primary capitalize">{viewMode}</span> growth projection ({viewMode === 'conservative' ? '5%' : viewMode === 'moderate' ? '10%' : '15%'} monthly growth)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="growth" className="h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Monthly Orders Growth</CardTitle>
                      <CardDescription className="text-xs">Projected order volume growth over 12 months</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="h-[250px] sm:h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart 
                            data={projectionData} 
                            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Legend wrapperStyle={{ fontSize: '12px' }} />
                            <Line 
                              type="monotone" 
                              dataKey="orders" 
                              name="Monthly Orders"
                              stroke="#f59e0b" 
                              activeDot={{ r: 6 }} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Revenue Growth</CardTitle>
                      <CardDescription className="text-xs">Projected revenue growth over 12 months</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="h-[250px] sm:h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart 
                            data={projectionData}
                            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis tickFormatter={(value) => `₹${(value/1000)}k`} tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Legend wrapperStyle={{ fontSize: '12px' }} />
                            <Line 
                              type="monotone" 
                              dataKey="revenue" 
                              name="Monthly Revenue"
                              stroke="#10b981" 
                              activeDot={{ r: 6 }} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Detailed Monthly Projections</CardTitle>
                    <CardDescription>Complete breakdown of your business growth</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full table-auto">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 font-medium text-gray-600">Month</th>
                            <th className="text-right py-2 font-medium text-gray-600">Orders</th>
                            <th className="text-right py-2 font-medium text-gray-600">Revenue</th>
                            <th className="text-right py-2 font-medium text-primary">Profit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projectionData.map((data) => (
                            <tr key={data.month} className="border-b border-gray-100">
                              <td className="py-2">Month {data.month}</td>
                              <td className="text-right py-2">{Math.round(data.orders)}</td>
                              <td className="text-right py-2">{formatCurrency(data.revenue)}</td>
                              <td className="text-right py-2 font-medium text-primary">{formatCurrency(data.profit)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="time" className="h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Time vs. Earnings</CardTitle>
                      <CardDescription className="text-xs">See how your time investment translates to earnings</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="h-[250px] sm:h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart 
                            data={timeInvestmentData}
                            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis 
                              yAxisId="left" 
                              orientation="left" 
                              stroke="#4f46e5" 
                              tick={{ fontSize: 12 }}
                            />
                            <YAxis 
                              yAxisId="right" 
                              orientation="right" 
                              stroke="#10b981" 
                              tickFormatter={(value) => `₹${(value/1000)}k`} 
                              tick={{ fontSize: 12 }}
                            />
                            <Tooltip />
                            <Legend wrapperStyle={{ fontSize: '12px' }} />
                            <Bar yAxisId="left" dataKey="hours" name="Hours Invested" fill="#4f46e5" />
                            <Bar yAxisId="right" dataKey="earnings" name="Weekly Earnings" fill="#10b981" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-indigo-50 to-violet-50">
                    <CardHeader>
                      <CardTitle>Time Efficiency</CardTitle>
                      <CardDescription>Your earnings per hour invested</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="p-6 text-center">
                        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 text-primary mb-4">
                          <div>
                            <Clock className="h-10 w-10 mx-auto mb-1" />
                            <div className="text-2xl font-bold">
                              {formatCurrency(earnings.monthlyProfit / (hoursPerWeek * 4))}
                            </div>
                            <div className="text-xs">per hour</div>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2">Your Time Value</h3>
                        <p className="text-gray-600 mb-6">
                          Based on your selections, your time is worth {formatCurrency(earnings.monthlyProfit / (hoursPerWeek * 4))} per hour
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 text-left">
                          <div className="border border-primary/20 rounded-lg p-4 bg-primary/5">
                            <h4 className="font-medium text-primary mb-1">Weekly</h4>
                            <p className="text-2xl font-bold">{formatCurrency(earnings.monthlyProfit / 4)}</p>
                            <p className="text-sm text-gray-600">{hoursPerWeek} hours invested</p>
                          </div>
                          <div className="border border-primary/20 rounded-lg p-4 bg-primary/5">
                            <h4 className="font-medium text-primary mb-1">Monthly</h4>
                            <p className="text-2xl font-bold">{formatCurrency(earnings.monthlyProfit)}</p>
                            <p className="text-sm text-gray-600">{hoursPerWeek * 4} hours invested</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Time Investment Breakdown</CardTitle>
                    <CardDescription>How to allocate your {hoursPerWeek} hours per week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                          <Package className="h-4 w-4 mr-2 text-orange-500" />
                          Product Management
                        </h4>
                        <p className="text-gray-600 text-sm">
                          <span className="text-lg font-bold text-orange-500">{Math.round(hoursPerWeek * 0.3)}</span> hours/week
                        </p>
                        <p className="text-gray-600 text-sm mt-2">
                          Product selection, research, and catalog management
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                          <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                          Marketing & Sales
                        </h4>
                        <p className="text-gray-600 text-sm">
                          <span className="text-lg font-bold text-green-500">{Math.round(hoursPerWeek * 0.4)}</span> hours/week
                        </p>
                        <p className="text-gray-600 text-sm mt-2">
                          Social media, customer acquisition, and promotions
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                          Order Processing
                        </h4>
                        <p className="text-gray-600 text-sm">
                          <span className="text-lg font-bold text-blue-500">{Math.round(hoursPerWeek * 0.3)}</span> hours/week
                        </p>
                        <p className="text-gray-600 text-sm mt-2">
                          Order management, customer support, and tracking
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Ready to turn these projections into reality? Join BaapDrop today and start your dropshipping journey.
          </p>
          <Button 
            size="lg"
            onClick={() => scrollToElement("join-now")}
            className="primary-gradient animated-btn font-medium text-lg px-8 py-6 shadow-lg"
          >
            Start Your Business Now
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}