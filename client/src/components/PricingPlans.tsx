import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Bronze",
    description: "Essential dropshipping tools for beginners",
    price: "₹999",
    priceYearly: "₹9,990",
    billing: "monthly",
    currency: "₹",
    features: [
      "100 product listings",
      "Basic product research tools",
      "Email support",
      "Standard shipping rates",
      "7-day free trial"
    ],
    highlightedIndex: 2,
    badge: "",
    buttonText: "Start with Bronze",
    mostPopular: false,
    backgroundColor: "bg-amber-50",
    borderColor: "border-amber-200",
    iconColor: "text-amber-600"
  },
  {
    name: "Gold",
    description: "Advanced tools for growing businesses",
    price: "₹2,499",
    priceYearly: "₹24,990",
    billing: "monthly",
    currency: "₹",
    features: [
      "Unlimited product listings",
      "Advanced product research tools",
      "Priority email & chat support",
      "Discounted shipping rates",
      "Profit analytics dashboard",
      "Custom invoice branding",
      "14-day free trial"
    ],
    highlightedIndex: 4,
    badge: "Most Popular",
    buttonText: "Upgrade to Gold",
    mostPopular: true,
    backgroundColor: "bg-amber-100",
    borderColor: "border-amber-300",
    iconColor: "text-amber-600"
  },
  {
    name: "Diamond",
    description: "Premium solution for professional resellers",
    price: "₹4,999",
    priceYearly: "₹49,990",
    billing: "monthly",
    currency: "₹",
    features: [
      "Everything in Gold plan",
      "VIP dedicated account manager",
      "Exclusive product access",
      "Advanced API integration",
      "Premium shipping rates",
      "Sales trend predictions",
      "Marketing automation tools",
      "30-day free trial"
    ],
    highlightedIndex: 5,
    badge: "Best Value",
    buttonText: "Go Diamond",
    mostPopular: false,
    backgroundColor: "bg-blue-50",
    borderColor: "border-blue-200",
    iconColor: "text-blue-600"
  }
];

export default function PricingPlans() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-xl text-gray-600 mb-8">
            Select the perfect plan to boost your dropshipping business
          </p>
          
          <div className="inline-flex items-center p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                billingCycle === "monthly"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                billingCycle === "yearly"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              Yearly <span className="text-xs text-green-600 font-semibold ml-1">Save 17%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="flex"
            >
              <Card
                className={cn(
                  "flex flex-col border-2 w-full relative",
                  plan.mostPopular 
                    ? "border-primary shadow-lg shadow-primary/10" 
                    : plan.borderColor,
                  plan.backgroundColor
                )}
              >
                {plan.badge && (
                  <Badge
                    className={cn(
                      "absolute top-0 right-0 translate-x-1/4 -translate-y-1/2",
                      plan.mostPopular ? "bg-primary hover:bg-primary/90" : ""
                    )}
                  >
                    {plan.badge}
                  </Badge>
                )}
                <CardHeader className="pb-8 pt-6">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-sm mt-1.5">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">
                        {billingCycle === "monthly" ? plan.price : plan.priceYearly}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    </div>
                    {billingCycle === "yearly" && (
                      <p className="text-sm text-green-600 font-medium">
                        17% discount applied
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className={cn(
                          "flex items-center gap-2",
                          featureIndex === plan.highlightedIndex
                            ? "font-medium text-primary"
                            : ""
                        )}
                      >
                        <CheckIcon 
                          className={cn(
                            "h-4 w-4 flex-shrink-0", 
                            plan.mostPopular ? "text-primary" : plan.iconColor
                          )} 
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-4 mt-auto">
                  <Button 
                    className={cn(
                      "w-full",
                      plan.mostPopular 
                        ? "bg-primary hover:bg-primary/90 text-white" 
                        : "bg-white border border-gray-200 text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            All plans include a free trial. No credit card required until trial ends.
            <br />
            <a href="#" className="text-primary font-medium hover:underline">View full plan comparison</a>
          </p>
        </div>
      </div>
    </section>
  );
}