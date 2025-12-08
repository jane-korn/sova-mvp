// Interconnections framework showing how weak elements undermine other areas
// Based on SOVA_INTERCONNECTIONS_FRAMEWORK.docx

const interconnectionsData = {
    "Governance": {
        "description": "When Governance is weak, it creates cascading problems across all other elements.",
        "impacts": [
            {
                "element": "Purpose",
                "problem": "No decision-making framework",
                "result": "Mission drift - vision changes weekly based on last conversation",
                "example": "You say your purpose is sustainability, but governance allows quick decisions that contradict this"
            },
            {
                "element": "Strategy",
                "problem": "Slow or unclear decision authority",
                "result": "Priorities shift constantly - team can't execute",
                "example": "You pivot strategy every month because there's no process for evaluating strategic decisions"
            },
            {
                "element": "Marketing",
                "problem": "No brand guidelines or approval process",
                "result": "Inconsistent branding - every team member creates different versions",
                "example": "Your marketing looks unprofessional because there's no governance around brand standards"
            }
        ],
        "checkFirst": "If you're struggling with inconsistent messaging, unclear priorities, or mission drift - check your Governance first. The symptom appears in other areas, but the root cause is governance."
    },
    "Purpose": {
        "description": "When Purpose is weak, it undermines direction and decision-making across the business.",
        "impacts": [
            {
                "element": "Governance",
                "problem": "No clear values framework",
                "result": "Can't make values-based decisions - everything becomes subjective",
                "example": "You can't decide what opportunities to pursue because you don't have a clear purpose guiding you"
            },
            {
                "element": "Strategy",
                "problem": "Unclear vision or mission",
                "result": "Can't set long-term direction - strategy becomes reactive",
                "example": "You chase every opportunity because you don't have a clear purpose to guide strategic choices"
            },
            {
                "element": "Marketing",
                "problem": "Generic or unclear mission",
                "result": "Messaging doesn't resonate - sounds like everyone else",
                "example": "Your marketing is bland because you haven't articulated WHY you exist beyond making money"
            }
        ],
        "checkFirst": "If your messaging feels generic, you're chasing too many opportunities, or you can't make values-based decisions - check your Purpose. You might think it's a marketing or strategy problem, but it's actually purpose."
    },
    "Strategy": {
        "description": "When Strategy is weak, it creates confusion about priorities and target markets.",
        "impacts": [
            {
                "element": "Governance",
                "problem": "No prioritisation framework",
                "result": "Everything is urgent - team burns out on wrong priorities",
                "example": "You can't say no to requests because you don't have strategic priorities to guide decisions"
            },
            {
                "element": "Purpose",
                "problem": "Strategy contradicts stated purpose",
                "result": "Team sees disconnect between what you say and what you do",
                "example": "You say you're customer-focused but your strategy prioritises investor metrics only"
            },
            {
                "element": "Marketing",
                "problem": "Unclear target market or positioning",
                "result": "Marketing tries to reach everyone - reaches no one",
                "example": "Your marketing is weak because strategy hasn't defined who you're actually targeting"
            }
        ],
        "checkFirst": "If you're marketing to everyone, can't prioritise work, or your team sees contradictions - check your Strategy. The marketing symptom is actually a strategy gap."
    },
    "Marketing": {
        "description": "Marketing problems are RARELY just marketing problems - they're usually symptoms of upstream issues.",
        "symptoms": [
            {
                "symptom": "Inconsistent branding across touchpoints",
                "actualProblem": "Governance",
                "reason": "No brand guidelines or approval process",
                "fix": "Create governance framework for brand decisions"
            },
            {
                "symptom": "Messaging feels generic and doesn't resonate",
                "actualProblem": "Purpose",
                "reason": "Unclear mission or value proposition",
                "fix": "Define your WHY and unique purpose first"
            },
            {
                "symptom": "Trying to market to everyone",
                "actualProblem": "Strategy",
                "reason": "No clear target market or positioning",
                "fix": "Define strategic priorities and ideal customer"
            }
        ],
        "checkFirst": "Before you 'fix' marketing, ask: Do we have clear brand governance? Do we have a compelling purpose? Do we have a defined strategy? Marketing can't compensate for weak foundations."
    }
};

// Helper function to get interconnections for a specific element
function getInterconnections(elementName) {
    return interconnectionsData[elementName] || null;
}

// Helper function to check what might be causing problems in an element
function getDiagnosticQuestions(elementName) {
    const data = interconnectionsData[elementName];
    if (!data) return [];

    if (data.impacts) {
        return data.impacts.map(impact => ({
            question: `Is your ${impact.element} weak?`,
            explanation: `${impact.problem} can cause: ${impact.result}`
        }));
    }

    if (data.symptoms) {
        return data.symptoms.map(symptom => ({
            question: `Are you experiencing: ${symptom.symptom}?`,
            explanation: `This is likely a ${symptom.actualProblem} problem: ${symptom.reason}`
        }));
    }

    return [];
}
