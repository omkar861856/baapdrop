import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BarChart2,
  TrendingUp,
  Package,
  ShoppingBag,
  Star,
  Activity,
  DollarSign,
  ArrowUpRight,
  Award
} from "lucide-react";

// Sample product statistics
const productStats = {
  totalProducts: 2500,
  newThisWeek: 85,
  trendingProducts: 120,
  averageMargin: 45,
  topCategories: [
    { name: "Electronics", count: 850, percent: 34 },
    { name: "Fashion", count: 725, percent: 29 },
    { name: "Home & Living", count: 550, percent: 22 },
    { name: "Beauty", count: 375, percent: 15 }
  ],
  marginRanges: [
    { range: "10-20%", count: 325, percent: 13 },
    { range: "21-30%", count: 525, percent: 21 },
    { range: "31-40%", count: 725, percent: 29 },
    { range: "41-50%", count: 600, percent: 24 },
    { range: "51%+", count: 325, percent: 13 }
  ],
  priceRanges: [
    { range: "₹0-₹500", count: 625, percent: 25 },
    { range: "₹501-₹1000", count: 750, percent: 30 },
    { range: "₹1001-₹1500", count: 625, percent: 25 },
    { range: "₹1501+", count: 500, percent: 20 }
  ]
};

export default function ProductStats() {
  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Package className="h-5 w-5 mr-2 text-primary" />
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <span className="text-3xl font-bold">{productStats.totalProducts.toLocaleString()}</span>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                +{productStats.newThisWeek} This Week
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              Trending Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <span className="text-3xl font-bold">{productStats.trendingProducts}</span>
              <span className="text-sm text-gray-500">
                Updated Today
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <DollarSign className="h-5 w-5 mr-2 text-primary" />
              Average Margin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <span className="text-3xl font-bold">{productStats.averageMargin}%</span>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                High Profit
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Award className="h-5 w-5 mr-2 text-primary" />
              Top Sellers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Smart Watches</span>
                <Badge variant="outline">95% Success</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Wireless Earbuds</span>
                <Badge variant="outline">92% Success</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              Product Categories
            </CardTitle>
            <CardDescription>
              Distribution across major categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productStats.topCategories.map((category, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-gray-500">{category.count} products</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={category.percent} className="h-2" />
                    <span className="text-xs font-medium w-9 text-right">{category.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              Profit Margin Ranges
            </CardTitle>
            <CardDescription>
              Products by profit margin percentage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productStats.marginRanges.map((range, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{range.range}</span>
                    <span className="text-gray-500">{range.count} products</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={range.percent} className="h-2" />
                    <span className="text-xs font-medium w-9 text-right">{range.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              Price Ranges (Wholesale)
            </CardTitle>
            <CardDescription>
              Products by wholesale price range
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productStats.priceRanges.map((range, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{range.range}</span>
                    <span className="text-gray-500">{range.count} products</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={range.percent} className="h-2" />
                    <span className="text-xs font-medium w-9 text-right">{range.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}