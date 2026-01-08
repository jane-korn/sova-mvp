// Sova Configuration - Shared across assessment-tool.html and chatbot.html
// Last updated: 2025-11-27
//
// This file contains all shared configuration so updates propagate to both pages.
// When you update stages, elements, or prelim questions here, both pages get the update.

var sovaConfig = {

    // ===================
    // STAGES
    // ===================
    stages: ['Discovery', 'Validation', 'Efficiency', 'Scale'],

    stageOrder: {
        'Discovery': 0,
        'Validation': 1,
        'Efficiency': 2,
        'Scale': 3
    },

    stageDescriptions: {
        'Discovery': 'Exploring problems and testing solution ideas',
        'Validation': 'Got early customers, proving the model works',
        'Efficiency': 'It works! Streamlining to scale sustainably',
        'Scale': 'Growing fast, need systems for expansion'
    },

    // ===================
    // ELEMENTS
    // ===================
    allElements: [
        'Governance', 'Purpose', 'Strategy', 'Marketing',
        'Finance', 'Performance', 'People', 'Process', 'Technology'
    ],

    // MVP elements (active in current version)
    mvpElements: ['Governance', 'Purpose', 'Strategy', 'Performance', 'Finance', 'Marketing'],

    // Element order for web chart (clockwise from 12 o'clock)
    elementOrder: ['Governance', 'Purpose', 'Strategy', 'Performance', 'Finance', 'Marketing'],

    // ===================
    // PRELIMINARY QUESTIONS
    // ===================
    prelimQuestions: {
        teamSize: {
            question: "Are you flying solo or with a team?",
            subtitle: "This helps us tailor questions to your situation.",
            options: [
                { value: 'Solo', label: 'Solo', description: 'Just me for now' },
                { value: 'Team', label: 'Team', description: '2 or more people' }
            ]
        },
        stage: {
            question: "Where are you in your startup journey?",
            subtitle: "No wrong answer. We'll meet you where you are.",
            options: [
                { value: 'Discovery', label: 'Discovery', description: 'Exploring problems and testing solution ideas' },
                { value: 'Validation', label: 'Validation', description: 'Got early customers, proving the model works' },
                { value: 'Efficiency', label: 'Efficiency', description: 'It works! Streamlining to scale sustainably' },
                { value: 'Scale', label: 'Scale', description: 'Growing fast, need systems for expansion' },
                { value: 'Unsure', label: 'Unsure', description: 'Help me figure this out' }
            ]
        }
    },

    // ===================
    // VALIDATION QUESTIONS
    // ===================
    // These are asked when user selects a stage beyond Discovery
    // to verify they've completed the foundations of prior stages
    // Each question has: q (question), hint, definition, whyMatters, vcPerspective
    validationQuestions: {
        'Validation': {
            heading: "Let's check you've completed Discovery foundations",
            questions: [
                {
                    q: "Do you understand the basic legal requirements to start testing your idea?",
                    hint: "Things like ABN, basic insurance",
                    definition: "Legal requirements include obtaining an Australian Business Number (ABN), understanding your tax obligations, and having appropriate insurance to protect yourself while testing your idea.",
                    whyMatters: "Getting the basics right from day one protects you personally and professionally. Many founders skip this and face costly problems later when they try to formalise or raise investment.",
                    vcPerspective: "Investors expect founders to have their legal house in order. Messy or missing foundations create due diligence red flags and can delay or derail funding rounds."
                },
                {
                    q: "Have you documented a simple business plan?",
                    hint: "Who you serve, what problem you solve, how you'll make money",
                    definition: "A simple business plan captures your target customer, the problem you solve, your proposed solution, and how you intend to generate revenue. It doesn't need to be lengthy.",
                    whyMatters: "Writing it down forces clarity. Founders who can't articulate their business simply often struggle to make focused decisions or communicate effectively with stakeholders.",
                    vcPerspective: "VCs look for founders with clear thinking. A simple, well-articulated plan demonstrates you understand your market and have thought through the fundamentals."
                },
                {
                    q: "Do you have a plan to test your idea in the next 3-6 months?",
                    hint: "Your core hypothesis and how you'll validate it",
                    definition: "A validation plan outlines the key assumptions you need to test, how you'll test them, and what success looks like. It focuses on learning, not building.",
                    whyMatters: "Without a testing plan, founders often build too much before validating demand. This wastes time and money on features or products nobody wants.",
                    vcPerspective: "Investors want to see evidence of customer discovery and validation. A clear testing plan shows you're methodical and focused on reducing risk."
                }
            ]
        },
        'Efficiency': {
            heading: "Let's check you've completed Validation foundations",
            questions: [
                {
                    q: "Have you documented who does what in your team?",
                    hint: "Clear roles and responsibilities",
                    definition: "Documented roles means having written clarity on who is responsible for what areas of the business, including decision-making authority and accountability.",
                    whyMatters: "Unclear roles lead to dropped balls, duplicated effort, and conflict. As you grow, this ambiguity becomes increasingly costly and frustrating for everyone.",
                    vcPerspective: "Investors assess team dynamics closely. Clear roles signal maturity and reduce the risk of founder conflict, which is a leading cause of startup failure."
                },
                {
                    q: "Do customers actually pay for your solution?",
                    hint: "Mainstream customers, not just early supporters",
                    definition: "Paying customers means people who weren't friends, family, or early supporters have exchanged money for your product or service based on its value to them.",
                    whyMatters: "Revenue from real customers is the strongest validation that your solution solves a problem worth paying for. Everything else is just theory.",
                    vcPerspective: "Traction with paying customers is often the single most important metric for investors. It proves product-market fit better than any pitch deck."
                },
                {
                    q: "Have you researched your market?",
                    hint: "Talked to customers, analysed competitors",
                    definition: "Market research includes understanding your target customers through direct conversations, analysing competitors, and sizing the opportunity you're pursuing.",
                    whyMatters: "Founders who skip research often build for imaginary customers or miss obvious competitive threats. Good research saves you from expensive mistakes.",
                    vcPerspective: "VCs expect founders to know their market deeply. Weak market knowledge suggests you haven't done the work and increases perceived investment risk."
                }
            ]
        },
        'Scale': {
            heading: "Let's check you've completed Efficiency foundations",
            questions: [
                {
                    q: "Have you set up the legal requirements for your business?",
                    hint: "Business registration, ABN, insurance, GST",
                    definition: "Full legal setup includes company registration (if applicable), ABN, GST registration, appropriate insurance policies, and any industry-specific licences or permits.",
                    whyMatters: "Scaling with incomplete legal foundations exposes you to significant risk. Issues that were minor when small become major problems at scale.",
                    vcPerspective: "Institutional investors require clean legal structures. Gaps here can delay funding while you scramble to fix issues that should have been sorted earlier."
                },
                {
                    q: "Do you have written policies in place?",
                    hint: "Guidelines for daily decisions and governance",
                    definition: "Written policies are documented guidelines that help your team make consistent decisions without needing to escalate everything. They cover areas like spending, hiring, and operations.",
                    whyMatters: "Without policies, you become the bottleneck for every decision. Good policies let your team move fast while maintaining standards you care about.",
                    vcPerspective: "Scalable businesses need systems, not just heroics. Investors look for evidence that the business can grow beyond the founders' direct involvement."
                },
                {
                    q: "Do you adapt when the market shifts?",
                    hint: "You're flexible, not stubborn",
                    definition: "Adaptability means you actively monitor market signals and adjust your strategy, product, or operations when evidence suggests change is needed.",
                    whyMatters: "Markets change constantly. Startups that can't adapt get overtaken by competitors or disrupted by new entrants who better serve evolving customer needs.",
                    vcPerspective: "VCs value founders who are conviction-driven but evidence-responsive. Stubbornness in the face of market feedback is a major red flag."
                }
            ]
        }
    },

    // ===================
    // PATH OPTIONS
    // ===================
    pathOptions: {
        complete: {
            number: 1,
            title: 'Complete Assessment',
            description: 'Answer questions across all 6 elements to get a bird\'s-eye view of your business health. Best for seeing the full picture and identifying priorities.',
            time: '15-20 minutes',
            output: 'Full report with action plan'
        },
        zoomin: {
            number: 2,
            title: 'Zoom In on One Element',
            description: 'Not ready for the full assessment? Hone in on one element to work on first. You can always come back and complete the others later.',
            time: '5-7 minutes',
            output: 'Targeted insights'
        },
        chatbot: {
            number: 3,
            title: 'Work with Your Guide',
            description: 'Not sure where to start? Chat with Sova to explore your challenges and get personalised recommendations.',
            time: '5-10 minutes',
            output: 'Guided exploration',
            comingSoon: false // Set to false when chatbot is ready
        }
    },

    // ===================
    // UI LABELS
    // ===================
    labels: {
        soloPrefix: 'I',
        teamPrefix: 'We',
        startFreshButton: 'Start Fresh',
        continueButton: 'Continue',
        backButton: 'Back'
    },

    // ===================
    // CHATBOT REFERRAL PARAMS
    // ===================
    // URL parameters for chatbot <-> assessment handoff
    referralParams: {
        mode: 'mode',           // 'complete' or 'zoomin'
        element: 'element',     // Element name for zoomin
        stage: 'stage',         // Pre-set stage
        from: 'from',           // 'chatbot' or 'assessment'
        skipPrelim: 'skip_prelim' // 'true' to skip preliminary questions
    }
};

// Make available globally
if (typeof window !== 'undefined') {
    window.sovaConfig = sovaConfig;
}
