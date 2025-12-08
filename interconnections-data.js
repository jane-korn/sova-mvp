// Interconnections framework showing how weak elements undermine other areas
// Based on SOVA_INTERCONNECTIONS_FRAMEWORK.docx

const interconnectionsData = {
    "Governance": {
        "description": "When Governance is weak, it creates problems across all other elements.",
        "impacts": [
            {
                "element": "Purpose",
                "problem": "No decision framework",
                "result": "Vision changes weekly",
                "exampleSolo": "You say your purpose is sustainability, but you make quick decisions that contradict this",
                "exampleTeam": "Your team says the purpose is sustainability, but quick decisions contradict this"
            },
            {
                "element": "Strategy",
                "problem": "Unclear decision authority",
                "result": "Priorities keep shifting",
                "exampleSolo": "You pivot strategy every month because you have no process for evaluating decisions",
                "exampleTeam": "The team pivots strategy every month because there's no process for evaluating decisions"
            },
            {
                "element": "Marketing",
                "problem": "No brand guidelines",
                "result": "Inconsistent branding",
                "exampleSolo": "Your marketing looks unprofessional because you have no brand standards",
                "exampleTeam": "Your marketing looks unprofessional because everyone creates different versions"
            }
        ],
        "checkFirst": "If you're struggling with inconsistent messaging, unclear priorities, or vision changes, check your Governance first. The symptom appears in other areas, but the root cause is governance."
    },
    "Purpose": {
        "description": "When Purpose is weak, it undermines direction and decision making.",
        "impacts": [
            {
                "element": "Governance",
                "problem": "No clear values",
                "result": "Every decision feels subjective",
                "exampleSolo": "You can't decide what opportunities to pursue because you don't have a clear purpose",
                "exampleTeam": "The team can't decide what opportunities to pursue because you don't have a clear purpose"
            },
            {
                "element": "Strategy",
                "problem": "Unclear vision",
                "result": "Strategy becomes reactive",
                "exampleSolo": "You chase every opportunity because you don't have a clear purpose to guide choices",
                "exampleTeam": "The team chases every opportunity because there's no clear purpose to guide choices"
            },
            {
                "element": "Marketing",
                "problem": "Generic mission",
                "result": "Messaging sounds like everyone else",
                "exampleSolo": "Your marketing is bland because you haven't articulated WHY you exist",
                "exampleTeam": "Your marketing is bland because the WHY you exist isn't clear"
            }
        ],
        "checkFirst": "If your messaging feels generic, you're chasing too many opportunities, or you can't make values based decisions, check your Purpose. You might think it's a marketing or strategy problem, but it's actually purpose."
    },
    "Strategy": {
        "description": "When Strategy is weak, it creates confusion about priorities and target markets.",
        "impacts": [
            {
                "element": "Governance",
                "problem": "No prioritisation framework",
                "result": "Everything feels urgent",
                "exampleSolo": "You can't say no to requests because you don't have strategic priorities",
                "exampleTeam": "The team burns out on wrong priorities because there's no prioritisation framework"
            },
            {
                "element": "Purpose",
                "problem": "Strategy contradicts purpose",
                "result": "Disconnect between what you say and do",
                "exampleSolo": "You say you're customer focused but your strategy prioritises investor metrics only",
                "exampleTeam": "The team sees a disconnect between stated purpose and actual strategy"
            },
            {
                "element": "Marketing",
                "problem": "Unclear target market",
                "result": "Marketing reaches no one",
                "exampleSolo": "Your marketing is weak because you haven't defined who you're targeting",
                "exampleTeam": "Your marketing is weak because strategy hasn't defined who you're targeting"
            }
        ],
        "checkFirst": "If you're marketing to everyone, can't prioritise work, or see contradictions between what you say and do, check your Strategy. The marketing symptom is actually a strategy gap."
    },
    "Marketing": {
        "description": "Marketing problems are rarely just marketing problems. They're usually symptoms of other issues.",
        "symptoms": [
            {
                "symptom": "Inconsistent branding",
                "actualProblem": "Governance",
                "reason": "No brand guidelines",
                "fix": "Create brand standards first"
            },
            {
                "symptom": "Generic messaging",
                "actualProblem": "Purpose",
                "reason": "Unclear WHY you exist",
                "fix": "Define your purpose first"
            },
            {
                "symptom": "Marketing to everyone",
                "actualProblem": "Strategy",
                "reason": "No clear target market",
                "fix": "Define who you're targeting first"
            }
        ],
        "checkFirst": "Before you fix marketing, ask: Do you have clear brand standards? Do you have a compelling purpose? Do you have a defined strategy? Marketing cannot compensate for weak foundations."
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
