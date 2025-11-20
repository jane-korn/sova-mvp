// Content data extracted from Self Assessment Structure.xlsx
// Includes: advice, tools, books, quotes for generating actionable recommendations

var assessmentContentData = {
    "Governance": {
        "Discovery": {
            books: [],
            quotes: [],
            topTools: ["Australian Startup Setup Guide", "Shareholders Agreement Template", "Business Structure Guide"]
        },
        "Validation": {
            books: ["Intentional Integrity by Robert Chesnut"],
            quotes: [],
            topTools: ["Tax Compliance Checklist", "ASIC Registration Guide"]
        },
        "Efficiency": {
            books: [],
            quotes: [],
            topTools: ["Policy Template Library", "Decision Framework Tool"]
        },
        "Scale": {
            books: [],
            quotes: [],
            topTools: ["Board Pack Template", "Governance Dashboard"]
        }
    },
    "Purpose": {
        "Discovery": {
            books: [],
            quotes: [],
            topTools: ["Vision & Mission Canvas", "Values Worksheet"]
        },
        "Validation": {
            books: [],
            quotes: [],
            topTools: ["Purpose Alignment Scorecard"]
        },
        "Efficiency": {
            books: [],
            quotes: [],
            topTools: ["Culture Playbook Template"]
        },
        "Scale": {
            books: [],
            quotes: [],
            topTools: ["Culture Measurement Framework"]
        }
    },
    "Strategy": {
        "Discovery": {
            books: [],
            quotes: [],
            topTools: ["Lean Canvas", "Business Model Canvas"]
        },
        "Validation": {
            books: [],
            quotes: [],
            topTools: ["Customer Development Guide", "MVP Testing Framework"]
        },
        "Efficiency": {
            books: [],
            quotes: [],
            topTools: ["OKR Framework", "Strategic Planning Template"]
        },
        "Scale": {
            books: [],
            quotes: [],
            topTools: ["Growth Strategy Playbook", "Market Expansion Framework"]
        }
    },
    "Marketing": {
        "Discovery": {
            books: [],
            quotes: [],
            topTools: ["Customer Persona Template", "Value Proposition Canvas"]
        },
        "Validation": {
            books: [],
            quotes: [],
            topTools: ["Marketing Channel Testing Framework", "Landing Page Checklist"]
        },
        "Efficiency": {
            books: [],
            quotes: [],
            topTools: ["Marketing Automation Setup", "Content Calendar Template"]
        },
        "Scale": {
            books: [],
            quotes: [],
            topTools: ["Growth Marketing Playbook", "Marketing Analytics Dashboard"]
        }
    }
};

// Guide documents available
var guideDocuments = {
    setup: {
        title: "Australian Startup Setup Guide",
        url: "#", // Will link to downloadable guide
        description: "Complete checklist for ABN registration, business structure, bank accounts, and insurance"
    },
    tax: {
        title: "Australian Tax Checklist",
        url: "#",
        description: "BAS, PAYG, R&D tax incentives, and tax-minimization strategies for startups"
    },
    funding: {
        title: "Funding Opportunities 2025-2026",
        url: "#",
        description: "85+ grants, VCs, accelerators, and pitch competitions with deadlines and eligibility"
    },
    experts: {
        title: "Sova Experts Ecosystem",
        url: "#",
        description: "85+ programs, partners, and communities filtered by stage, location, and need"
    }
};

// Expert recommendations by element (from Experts tab)
// Location codes: NSW, VIC, QLD, SA, WA, TAS, NT, ACT, National
var expertRecommendations = {
    "Governance": [
        {
            name: "LaunchVic Office Hours",
            type: "Government Program",
            description: "Free 1-on-1 mentoring with experienced founders",
            stage: "All stages",
            cost: "Free",
            location: "VIC",
            url: "https://launchvic.org"
        },
        {
            name: "Business.gov.au Adviser Finder",
            type: "Government Program",
            description: "Free directory to connect with government-funded business advisers",
            stage: "All stages",
            cost: "Free",
            location: "National",
            url: "https://business.gov.au"
        },
        {
            name: "Lander & Rogers Startup Legal",
            type: "Legal Services",
            description: "Top-tier legal for incorporation, shareholder agreements, IP protection",
            stage: "Discovery-Validation",
            cost: "$1,500-$5,000 for founders agreement",
            location: "National",
            url: "#"
        }
    ],
    "Purpose": [
        {
            name: "Startmate Accelerator",
            type: "Accelerator",
            description: "$120K investment, 12-week intensive program for early-stage startups",
            stage: "Validation-Efficiency",
            cost: "Equity-based",
            location: "National",
            url: "https://startmate.com"
        },
        {
            name: "Stone & Chalk",
            type: "Startup Hub",
            description: "Australia's largest fintech and startup hub with co-working and accelerator programs",
            stage: "All stages",
            cost: "Membership-based",
            location: "NSW",
            url: "https://stoneandchalk.com.au"
        }
    ],
    "Strategy": [
        {
            name: "UNSW Founders 10x",
            type: "University Program",
            description: "$100K investment for UNSW-affiliated founders",
            stage: "Validation-Efficiency",
            cost: "Equity-based",
            location: "NSW",
            url: "https://unswfounders.com"
        },
        {
            name: "LaunchVic 30X30",
            type: "Government Program",
            description: "Victoria's premier scaleup mentoring program with global mentors",
            stage: "Efficiency-Scale",
            cost: "Free",
            location: "VIC",
            url: "https://launchvic.org"
        },
        {
            name: "River City Labs",
            type: "Accelerator",
            description: "Queensland's leading startup accelerator with $30K investment",
            stage: "Discovery-Validation",
            cost: "Equity-based",
            location: "QLD",
            url: "https://rivercitylabs.net"
        }
    ],
    "Marketing": [
        {
            name: "First Page Australia",
            type: "Growth Marketing",
            description: "Startup growth marketing specialists (SEO, SEM, paid ads)",
            stage: "Validation-Scale",
            cost: "$3,000+/month",
            location: "National",
            url: "#"
        },
        {
            name: "Google for Startups AI First",
            type: "Accelerator",
            description: "10-week equity-free program for AI/ML startups with $200K+ cloud credits",
            stage: "Validation-Efficiency",
            cost: "Free",
            location: "National",
            url: "https://startup.google.com"
        }
    ],
    "Finance": [
        {
            name: "A Real CFO",
            type: "CFO Services",
            description: "Outsourced CFO, financial modeling, grant applications",
            stage: "Efficiency-Scale",
            cost: "Variable",
            location: "National",
            url: "#"
        },
        {
            name: "Industry Growth Program",
            type: "Government Program",
            description: "National program offering grants ($10K-$50K) and business advisory",
            stage: "Efficiency-Scale",
            cost: "Free (grants available)",
            location: "National",
            url: "https://business.gov.au"
        }
    ],
    "People": [
        {
            name: "Employee Matters",
            type: "HR Services",
            description: "Recruitment + HR strategy (30% cheaper than agencies)",
            stage: "Efficiency-Scale",
            cost: "Variable",
            location: "National",
            url: "#"
        }
    ]
};

// Book recommendations by element (from TOP_BOOKS_BY_9_ELEMENTS.md)
var bookRecommendations = {
    "Governance": [
        {
            title: "Governance, Risk Management, and Compliance: It Can't Happen to Us",
            author: "Richard M. Steinberg",
            description: "How to ensure companies incorporate necessary processes, organization, and technology for strategic goals",
            bestFor: "Board members and executives who need to understand their role in overseeing risk",
            keyTakeaway: "Governance failures are preventable with the right processes and culture"
        },
        {
            title: "The Five Dysfunctions of a Team",
            author: "Patrick Lencioni",
            description: "Five key dysfunctions: absence of trust, fear of conflict, lack of commitment, avoidance of accountability, inattention to results",
            bestFor: "Teams struggling with accountability and trust issues",
            keyTakeaway: "Great teams have trust, engage in healthy conflict, commit to decisions, hold each other accountable, and focus on collective results"
        },
        {
            title: "Intentional Integrity: How Smart Companies Can Lead an Ethical Revolution",
            author: "Robert Chesnut",
            description: "Building enterprise-wide ethical culture and compliance",
            bestFor: "Founders who want to build ethical businesses from the start, not retrofit later",
            keyTakeaway: "Integrity is a competitive advantage, not just a compliance requirement"
        }
    ],
    "Purpose": [
        {
            title: "Start with Why",
            author: "Simon Sinek",
            description: "How great leaders inspire action by focusing on their purpose, or their 'why'",
            bestFor: "Founders struggling to articulate their business's core purpose",
            keyTakeaway: "People don't buy what you do, they buy why you do it"
        },
        {
            title: "Good to Great",
            author: "Jim Collins",
            description: "How companies transition from good performance to great performance",
            bestFor: "Businesses ready to move from surviving to thriving",
            keyTakeaway: "Disciplined people, disciplined thought, disciplined action"
        },
        {
            title: "Built to Last: Successful Habits of Visionary Companies",
            author: "James C. Collins & Jerry I. Porras",
            description: "What separates visionary companies from their peers",
            bestFor: "Founders building for long-term legacy, not quick exit",
            keyTakeaway: "Clock building, not time telling (build systems, not depend on single visionary)"
        }
    ],
    "Strategy": [
        {
            title: "The Lean Startup",
            author: "Eric Ries",
            description: "Build-Measure-Learn methodology for creating sustainable business models",
            bestFor: "Startups in early stages, before product-market fit",
            keyTakeaway: "Test assumptions with customers before building the whole product"
        },
        {
            title: "Zero to One",
            author: "Peter Thiel",
            description: "How to build companies that create new things vs copying existing ideas",
            bestFor: "Founders aiming for category creation, not competition",
            keyTakeaway: "Go from 0 to 1 (create something new) not 1 to n (copy what exists)"
        },
        {
            title: "Obviously Awesome",
            author: "April Dunford",
            description: "A 10-step positioning process for startups",
            bestFor: "Startups with a great product but struggling with market positioning",
            keyTakeaway: "Positioning is context that makes your value obvious to your best-fit customers"
        }
    ],
    "Marketing": [
        {
            title: "Building a StoryBrand",
            author: "Donald Miller",
            description: "7-step framework for clarifying your message so customers will listen",
            bestFor: "Businesses struggling to communicate their value clearly",
            keyTakeaway: "Customers don't buy the best products, they buy the ones they can understand the fastest"
        },
        {
            title: "Traction: How Any Startup Can Achieve Explosive Customer Growth",
            author: "Gabriel Weinberg & Justin Mares",
            description: "19 channels for customer acquisition with framework for testing which works best",
            bestFor: "Early-stage startups looking for their first customers",
            keyTakeaway: "Test multiple channels systematically, then focus on the one that works"
        },
        {
            title: "Contagious: Why Things Catch On",
            author: "Jonah Berger",
            description: "Six principles of word-of-mouth and viral marketing (STEPPS framework)",
            bestFor: "Startups wanting organic growth through referrals",
            keyTakeaway: "Social currency, triggers, emotion, public visibility, practical value, and stories drive sharing"
        }
    ]
};
