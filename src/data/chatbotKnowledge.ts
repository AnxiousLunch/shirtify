interface KnowledgeEntry {
  keywords: string[];
  responses: string[];
  category: string;
}

export const chatbotKnowledge: KnowledgeEntry[] = [
  // --- Pricing ---
  {
    category: "pricing",
    keywords: ["price", "cost", "expensive", "cheap", "affordable", "budget", "how much", "pricing"],
    responses: [
      "Our products are priced competitively, with shirts ranging from $20-$50 depending on style and customization. Caps start at $15, and jackets start at $40.",
      "We offer affordable options across all categories: shirts, caps, jackets, and more. Shirts start at $20, caps at $15, and jackets at $40.",
      "Our pricing is based on product type and design complexity. Shirts start at $20, caps at $15, and jackets at $40.",
      "Looking for budget-friendly options? We have products starting from just $15!"
    ]
  },
  // --- Sizing ---
  {
    category: "sizing",
    keywords: ["size", "sizing", "fit", "measurement", "small", "medium", "large", "xs", "xl", "xxl"],
    responses: [
      "We offer sizes from XS to XXL for shirts, caps, and jackets. Check the size guide on each product page.",
      "Our shirts, jackets, and caps come in a variety of sizes. Please refer to our detailed size chart for the perfect fit.",
      "To ensure a great fit, we recommend reviewing the measurements in our size guide for each product type.",
      "Our products are true to size, but always double-check the size guide for accuracy!"
    ]
  },
  // --- Shipping ---
  {
    category: "shipping",
    keywords: ["shipping", "delivery", "ship", "when will i get", "how long", "tracking", "express", "standard"],
    responses: [
      "We offer standard shipping (3-5 days) and express shipping (1-2 days).",
      "Orders usually ship within 1-2 business days. You’ll receive a tracking number via email once shipped.",
      "Track your order using the tracking ID provided in your shipping confirmation email.",
      "We ship to all major locations. International shipping may take 7-14 business days."
    ]
  },
  // --- Returns ---
  {
    category: "returns",
    keywords: ["return", "refund", "exchange", "policy", "send back", "wrong size", "don't like"],
    responses: [
      "We have a 30-day return policy. Items must be unworn and in their original packaging.",
      "Exchanges and returns are easy! Contact our support team within 30 days of delivery.",
      "If you received the wrong size, we offer free exchanges within 30 days.",
      "Unhappy with your purchase? We’re here to help you return or exchange your product hassle-free."
    ]
  },
  // --- Materials ---
  {
    category: "materials",
    keywords: ["material", "fabric", "cotton", "quality", "feel", "texture", "soft", "comfortable"],
    responses: [
      "Our shirts and jackets are made from 100% premium cotton and high-quality blends for comfort and durability.",
      "We use soft, breathable, and long-lasting fabrics for all our products, including shirts, caps, and jackets.",
      "Premium cotton, smooth textures, and excellent quality — that’s what our products are made of!",
      "Every Shirtify product is designed with comfort and quality in mind using top-grade materials."
    ]
  },
  // --- Customization ---
  {
    category: "customization",
    keywords: ["custom", "design", "personalize", "logo", "text", "image", "create", "own design"],
    responses: [
      "You can customize your shirts, caps, and jackets with your own text, images, or logos using our design tool!",
      "Try our design tool to personalize your favorite shirt, cap, or jacket with text, images, or custom graphics.",
      "We offer extensive customization for all products. Make your look truly yours with Shirtify Genie!",
      "Express yourself! Customize shirts, caps, and jackets your way using our simple design tool."
    ]
  },
  // --- Care ---
  {
    category: "care",
    keywords: ["wash", "care", "maintain", "clean", "laundry", "dry", "iron"],
    responses: [
      "Machine wash in cold water and tumble dry on low. Avoid bleach for lasting quality.",
      "For best results, wash with similar colors, use cold water, and iron on medium heat if necessary.",
      "Our products are low-maintenance. Machine wash cold and tumble dry on low for best care.",
      "To keep your Shirtify items fresh, avoid high heat and always follow the care label instructions."
    ]
  },
  // --- Product Availability ---
  {
    category: "product_availability",
    keywords: ["in stock", "available", "do you have", "is it available", "restock", "out of stock"],
    responses: [
      "You can check product availability directly on the product page. If something is out of stock, we restock regularly!",
      "Yes, many of our popular items like shirts, caps, and jackets are readily available. Check the product page for live updates.",
      "If your desired item is out of stock, feel free to sign up for restock notifications.",
      "Looking for a specific size or color? I can help you check if it's currently available!"
    ]
  },
  // --- Offers and Discounts ---
  {
    category: "offers",
    keywords: ["discount", "offer", "sale", "coupon", "promo", "deal", "promotion"],
    responses: [
      "We offer seasonal sales and exclusive discounts! Check our homepage for the latest deals.",
      "Looking for discounts? Subscribe to our newsletter to get exclusive coupons and offers.",
      "Our current promotions are displayed on our main page. Grab them while they last!",
      "We occasionally provide promo codes for loyal customers. Stay tuned for upcoming deals!"
    ]
  },
  // --- Greetings with a Catchy Introduction ---
  {
    category: "greeting",
    keywords: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening"],
    responses: [
      "✨ Hello! I’m Shirtify Genie, your magical shopping assistant. I can help you find the perfect shirts, caps, jackets, and more! ✨\nHow can I make your shopping experience easier today?",
      "Hi there! I'm Shirtify Genie, your personal shopping buddy 🧞. Whether it's sizing, pricing, customization, or tracking orders — I'm here for you!",
      "Welcome to Shirtify! I’m your Genie for all things fashion 🧢👕🧥. Ask me anything about our products, prices, sizes, or shipping.",
      "Hey! I’m Shirtify Genie — ready to grant your fashion wishes! How can I help you today?"
    ]
  }
];

// Fallback for out-of-scope questions
export const defaultResponse = "I’m Shirtify Genie, here to help with anything related to Shirtify’s products like shirts, caps, jackets, sizing, pricing, shipping, returns, and customization. Please note, I can only assist with Shirtify-related topics. Feel free to ask me anything about our platform! 😊";
