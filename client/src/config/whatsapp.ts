// WhatsApp chat widget configuration
export const whatsappConfig = {
  // Phone number with country code, no spaces or special characters
  phoneNumber: "9198765XXXXX", // Replace with your actual WhatsApp business number
  
  // Default message that will be pre-filled for users
  defaultMessage: "Hello! I'm interested in becoming a reseller. Can you provide more information?",
  
  // Position of the widget on the screen
  position: "right" as "left" | "right",
  
  // Delay in milliseconds before showing the chat widget
  delay: 3000,
  
  // Business hours (for future implementation)
  businessHours: {
    monday: { start: "09:00", end: "18:00" },
    tuesday: { start: "09:00", end: "18:00" },
    wednesday: { start: "09:00", end: "18:00" },
    thursday: { start: "09:00", end: "18:00" },
    friday: { start: "09:00", end: "18:00" },
    saturday: { start: "10:00", end: "16:00" },
    sunday: { start: "10:00", end: "14:00" },
  },
  
  // Support team information
  supportTeam: {
    name: "BaapDrop Support",
    avatar: "",  // URL to avatar image
    responseTime: "Usually responds within 1 hour",
  }
};