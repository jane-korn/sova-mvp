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
    mvpElements: ['Governance', 'Purpose', 'Strategy', 'Marketing'],

    // Element order for web chart (clockwise from 12 o'clock)
    elementOrder: ['Governance', 'Purpose', 'Strategy', 'Marketing'],

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
    validationQuestions: {
        'Validation': {
            heading: "Let's check you've completed Discovery foundations",
            questions: [
                {
                    q: "Do you understand the basic legal requirements to start testing your idea?",
                    hint: "Things like ABN, basic insurance"
                },
                {
                    q: "Have you documented a simple business plan?",
                    hint: "Who you serve, what problem you solve, how you'll make money"
                },
                {
                    q: "Do you have a plan to test your idea in the next 3-6 months?",
                    hint: "Your core hypothesis and how you'll validate it"
                }
            ]
        },
        'Efficiency': {
            heading: "Let's check you've completed Validation foundations",
            questions: [
                {
                    q: "Have you documented who does what in your team?",
                    hint: "Clear roles and responsibilities"
                },
                {
                    q: "Do customers actually pay for your solution?",
                    hint: "Mainstream customers, not just early supporters"
                },
                {
                    q: "Have you researched your market?",
                    hint: "Talked to customers, analysed competitors"
                }
            ]
        },
        'Scale': {
            heading: "Let's check you've completed Efficiency foundations",
            questions: [
                {
                    q: "Have you set up the legal requirements for your business?",
                    hint: "Business registration, ABN, insurance, GST"
                },
                {
                    q: "Do you have written policies in place?",
                    hint: "Guidelines for daily decisions and governance"
                },
                {
                    q: "Do you adapt when the market shifts?",
                    hint: "You're flexible, not stubborn"
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
            description: 'Answer questions across all 4 elements to get a bird\'s-eye view of your business health. Best for seeing the full picture and identifying priorities.',
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
