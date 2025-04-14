import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";
import { insertLeadSchema } from "@shared/schema";
import { z } from "zod";
import {
  PhoneCall,
  Send,
  CheckCircle,
  Upload,
  Download,
  ArrowRight,
  ShoppingBag,
  Package,
  TrendingUp,
} from "lucide-react";

const formSchema = insertLeadSchema.extend({
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function JoinForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      businessType: "",
      terms: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/leads", data);
      toast({
        title: "Registration Successful!",
        description:
          "Thank you for joining BaapDrop! We'll contact you shortly.",
        variant: "default",
      });
      form.reset();
      setSuccessfulSubmission(true);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description:
          error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Benefits data
  const benefits = [
    {
      icon: <Package className="h-6 w-6" />,
      title: "10,000+ Products",
      description: "Access our huge catalog of trending products",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "30-50% Margins",
      description: "Earn high profits on every sale",
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "Zero Investment",
      description: "Start with no upfront costs or inventory",
    },
  ];

  return (
    <section
      id="join-now"
      className="py-24 bg-gradient-to-br from-primary to-primary-800 text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <div className="inline-block mb-3">
              <span className="bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                Join 1000+ Successful Resellers
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Start Your Dropshipping Business Today
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Begin your reselling journey with BaapDrop and build a profitable
              business with zero investment and high profit margins.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white/20 shadow-xl">
                <h3 className="text-2xl font-bold mb-6">Why Join BaapDrop?</h3>

                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
                    >
                      <div className="bg-white/30 p-3 rounded-lg text-white">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">
                          {benefit.title}
                        </h4>
                        <p className="text-white/90 font-medium">
                          {benefit.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 space-y-6">
                  <h4 className="text-xl font-semibold flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-400" />
                    After Joining, You'll Get:
                  </h4>

                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <span>Access to our mobile app & reseller dashboard</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <span>Product catalog with high-quality images</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <span>Marketing materials & reseller guides</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <span>24/7 support via WhatsApp</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <div className="flex items-center gap-4">
                    <a
                      href="https://wa.me/yourphonenumber"
                      className="whatsapp-btn py-2 px-4 rounded-lg shadow-md"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path
                          d="M12.03 4.97c-4.445 0-8.03 3.584-8.03 8.031s3.586 8.03 8.03 8.03c4.445 0 8.027-3.582 8.027-8.03 0-4.447-3.582-8.03-8.027-8.03zm0-3.032c6.076 0 11.06 4.985 11.06 11.063 0 6.078-4.985 11.06-11.06 11.06-6.077 0-11.062-4.982-11.062-11.06 0-6.078 4.985-11.063 11.062-11.063z"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                      Chat on WhatsApp
                    </a>
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary bg-white hover:text-white"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Catalog
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {successfulSubmission ? (
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                  <div className="p-8 text-center">
                    <div className="w-20 h-20 bg-green-100 flex items-center justify-center rounded-full mx-auto mb-6">
                      <CheckCircle className="h-10 w-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Registration Successful!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for joining BaapDrop! Our team will contact you
                      shortly with your account details.
                    </p>
                    <div className="flex flex-col gap-4">
                      <a
                        href="https://wa.me/yourphonenumber"
                        className="whatsapp-btn py-3 px-4 rounded-lg shadow-md"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                          <path
                            d="M12.03 4.97c-4.445 0-8.03 3.584-8.03 8.031s3.586 8.03 8.03 8.03c4.445 0 8.027-3.582 8.027-8.03 0-4.447-3.582-8.03-8.027-8.03zm0-3.032c6.076 0 11.06 4.985 11.06 11.063 0 6.078-4.985 11.06-11.06 11.06-6.077 0-11.062-4.982-11.062-11.06 0-6.078 4.985-11.063 11.062-11.063z"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          />
                        </svg>
                        Contact on WhatsApp
                      </a>
                      <Button onClick={() => setSuccessfulSubmission(false)}>
                        Register Another Account
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                  <div className="bg-primary-600 p-6 text-white">
                    <h3 className="text-2xl font-bold">Become a Reseller</h3>
                    <p className="text-white/80">
                      Fill out the form below to get started
                    </p>
                  </div>

                  <Tabs defaultValue="form" className="w-full p-6">
                    <TabsList className="grid w-full grid-cols-2 mb-6 bg-white border border-background">
                      <TabsTrigger value="form" className="text-sm">
                        Registration Form
                      </TabsTrigger>
                      <TabsTrigger value="contact" className="text-sm">
                        Quick Contact
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="form" className="space-y-6">
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>First Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter your first name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Last Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter your last name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter your email address"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>WhatsApp Number</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter your WhatsApp number"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="businessType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Type</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl className="bg-white text-black">
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select your business type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="new">
                                      New Business
                                    </SelectItem>
                                    <SelectItem value="existing">
                                      Existing Business
                                    </SelectItem>
                                    <SelectItem value="individual">
                                      Individual Seller
                                    </SelectItem>
                                    <SelectItem value="student">
                                      Student
                                    </SelectItem>
                                    <SelectItem value="homemaker">
                                      Homemaker
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="terms"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    id="terms"
                                    className="mt-1"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel
                                    htmlFor="terms"
                                    className="ml-2 text-sm text-gray-700"
                                  >
                                    I agree to the{" "}
                                    <a
                                      href="#"
                                      className="text-primary hover:underline"
                                    >
                                      Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a
                                      href="#"
                                      className="text-primary hover:underline"
                                    >
                                      Privacy Policy
                                    </a>
                                  </FormLabel>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />

                          <Button
                            type="submit"
                            className="w-full primary-gradient animated-btn shadow-lg font-medium py-6 text-lg"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <span className="flex items-center">
                                <svg
                                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Processing...
                              </span>
                            ) : (
                              <span className="flex items-center justify-center">
                                Start Your Dropshipping Business
                                <ArrowRight className="ml-2 h-5 w-5" />
                              </span>
                            )}
                          </Button>

                          <div className="text-center text-sm text-gray-500 mt-4">
                            <p>
                              You'll receive login details on your WhatsApp &
                              Email
                            </p>
                          </div>
                        </form>
                      </Form>
                    </TabsContent>

                    <TabsContent value="contact" className="space-y-8">
                      <div className="text-center space-y-4">
                        <h4 className="text-lg font-semibold text-gray-800">
                          Contact us directly
                        </h4>
                        <p className="text-gray-600">
                          Get in touch with our team for immediate assistance
                        </p>
                      </div>

                      <div className="space-y-4">
                        <a
                          href="https://wa.me/yourphonenumber"
                          className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300 w-full"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                            <path
                              d="M12.03 4.97c-4.445 0-8.03 3.584-8.03 8.031s3.586 8.03 8.03 8.03c4.445 0 8.027-3.582 8.027-8.03 0-4.447-3.582-8.03-8.027-8.03zm0-3.032c6.076 0 11.06 4.985 11.06 11.063 0 6.078-4.985 11.06-11.06 11.06-6.077 0-11.062-4.982-11.062-11.06 0-6.078 4.985-11.063 11.062-11.063z"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            />
                          </svg>
                          Chat on WhatsApp
                        </a>

                        <a
                          href="tel:+919876543210"
                          className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300 w-full"
                        >
                          <PhoneCall className="h-5 w-5 mr-2" />
                          Call Us Now
                        </a>

                        <a
                          href="mailto:support@baapdrop.com"
                          className="flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300 w-full"
                        >
                          <Send className="h-5 w-5 mr-2" />
                          Email Us
                        </a>
                      </div>

                      <div className="border-t border-gray-200 pt-6 text-center">
                        <p className="text-sm text-gray-600 mb-2">
                          Download our product catalog
                        </p>
                        <Button
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary/10 bg-white"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Catalog
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
