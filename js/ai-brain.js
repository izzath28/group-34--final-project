/**
 * SportSphere Smart Semantic Brain (SSB)
 * No API Keys required. 100% Reliable for University Projects.
 */
const SSB = {
    // 1. Core Knowledge System
    knowledge: {
        tips: [
            "Always warm up for 10 minutes to avoid muscle strain.",
            "Hydration is key! Drink at least 500ml of water before your game.",
            "Footwork is the foundation of badminton and tennis.",
            "For futsal, focus on quick short passes rather than long balls."
        ],
        about: "SportSphere is Sri Lanka's largest sports venue network with over 51+ registered arenas.",
        policies: "Bookings can be cancelled up to 24 hours before the match for a full refund."
    },

    // 2. Intelligence Engine
    process: function(query) {
        const text = query.toLowerCase();
        const centers = (typeof CENTERS !== 'undefined') ? CENTERS : [];
        const customCenters = JSON.parse(localStorage.getItem('ss_custom_centers_v4') || "[]");
        const allData = [...centers, ...customCenters];

        // --- INTENT: SEARCH BY CITY ---
        const cities = ["colombo", "kandy", "galle", "jaffna", "negombo", "matara", "kurunegala", "gampaha", "piliyandala"];
        const foundCity = cities.find(c => text.includes(c));

        // --- INTENT: SEARCH BY SPORT ---
        const sports = ["badminton", "cricket", "futsal", "football", "tennis", "basketball", "swimming", "rugby"];
        const foundSport = sports.find(s => text.includes(s));

        // Response Logic
        if (text.includes("hi") || text.includes("hello") || text.includes("hey") || text.includes("ආයුබෝවන්")) {
            return "Hello! I'm your SportSphere Assistant. I know everything about our 50+ venues. What sport are you looking for today?";
        }

        if (foundCity && foundSport) {
            const matches = allData.filter(v => v.city.toLowerCase() === foundCity && v.sports.some(s => s.toLowerCase().includes(foundSport)));
            if (matches.length > 0) return `I found ${matches.length} spots for ${foundSport} in ${foundCity}. The top one is ${matches[0].name}. Would you like to see the slots?`;
            return `I couldn't find any ${foundSport} places strictly in ${foundCity}, but I can show you other nearby areas!`;
        }

        if (foundCity) {
            const matches = allData.filter(v => v.city.toLowerCase() === foundCity);
            return `In ${foundCity}, we have ${matches.length} great venues like ${matches.slice(0,2).map(m=>m.name).join(' and ')}.`;
        }

        if (foundSport) {
            const matches = allData.filter(v => v.sports.some(s => s.toLowerCase().includes(foundSport)));
            return `If you want to play ${foundSport}, I recommend ${matches[0].name} or ${matches[1].name}. They are very popular!`;
        }

        if (text.includes("price") || text.includes("cost") || text.includes("cheap") || text.includes("මිල")) {
            const cheap = [...allData].sort((a,b) => a.price - b.price)[0];
            return `Our prices start from Rs. 800. The most affordable spot right now is ${cheap.name} in ${cheap.city}.`;
        }

        if (text.includes("tip") || text.includes("advice") || text.includes("help")) {
            return "Pro Tip: " + this.knowledge.tips[Math.floor(Math.random() * this.knowledge.tips.length)];
        }

        if (text.includes("who") || text.includes("you") || text.includes("what")) {
            return this.knowledge.about;
        }

        // Default Fallback (Smart Guess)
        return "That sounds interesting! I can help you find venues, check prices, or give sports tips. For example, try asking 'Any cricket in Colombo?'";
    }
};
