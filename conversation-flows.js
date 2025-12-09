/**
 * Sova Conversation Flows v2.0
 * Structured diagnostic sequences for each intent
 */

const conversationFlows = {
    /**
     * Cash Flow Diagnosis Flow
     * NOTE: Partial support - Finance element not in MVP (Feb 2026), but can diagnose root causes in MVP elements
     * Root cause often in: Strategy (pricing), Marketing (wrong customers) - both MVP elements
     * Non-MVP root causes: Process (invoicing), Finance (burn rate) - limited support
     */
    cash_flow_diagnosis: {
        discovery: {
            phaseGoal: 'Understand the cash flow symptom and startup stage',
            questions: [
                "What's the main cash flow challenge you're facing - not enough revenue coming in, expenses too high, or timing mismatch between spending and receiving?"
            ],
            slotsToExtract: ['pain_point', 'symptom_element'],
            slotExtractionRules: {
                pain_point: 'User\'s description of the cash flow problem',
                symptom_element: 'Finance',
                startup_stage: 'Try to infer from context: Discovery (pre-revenue), Validation (early revenue), Efficiency (profitable but optimising), Scale (growing fast)'
            },
            nextPhase: 'diagnosis'
        },

        diagnosis: {
            phaseGoal: 'Identify root cause element (often NOT Finance)',
            questions: [
                "Have you mapped where your cash actually goes and how long until you get it back?",
                "Is this primarily a revenue problem (not enough sales), an efficiency problem (slow collections or high burn), or a pricing problem (wrong price point)?"
            ],
            rootCauseLogic: {
                revenue_mentioned: {element: 'Marketing', reason: 'Revenue generation (customer acquisition or pricing)'},
                pricing_mentioned: {element: 'Strategy', reason: 'Pricing model or positioning'},
                invoicing_mentioned: {element: 'Process', reason: 'Cash conversion cycle inefficiency'},
                collections_mentioned: {element: 'Process', reason: 'Collections and AR management'},
                burn_rate_mentioned: {element: 'Finance', reason: 'Direct expense management'},
                default: {element: 'Finance', reason: 'Cash flow management and planning'}
            },
            slotsToExtract: ['startup_stage', 'attempted_solutions', 'root_cause_element'],
            nextPhase: 'recommendation'
        },

        recommendation: {
            phaseGoal: 'Recommend specific tools based on root cause element',
            format: 'golden_circle',
            includeInterconnectionsExplanation: true,
            assessmentReferral: {
                condition: 'If root cause is systemic (multiple elements involved)',
                element: 'Finance',
                stage: 'Based on slotsFilled.startup_stage'
            }
        }
    },

    /**
     * Customer Acquisition Diagnosis Flow
     * Root cause often in: Purpose (no differentiation), Strategy (wrong target market), Marketing (wrong channels), Process (poor sales process)
     */
    customer_acquisition_diagnosis: {
        discovery: {
            phaseGoal: 'Understand the customer acquisition challenge',
            questions: [
                "What's the main challenge - people not finding you, finding you but not buying, or buying but then churning?"
            ],
            slotsToExtract: ['pain_point', 'symptom_element'],
            slotExtractionRules: {
                pain_point: 'User\'s customer acquisition challenge',
                symptom_element: 'Marketing'
            },
            nextPhase: 'diagnosis'
        },

        diagnosis: {
            phaseGoal: 'Identify root cause (often in Purpose or Strategy, not Marketing)',
            questions: [
                "Do you have a clear definition of your ideal customer - not just demographics, but what problem you solve uniquely for them?",
                "What makes you different from competitors in a way your customers actually care about?"
            ],
            rootCauseLogic: {
                unclear_differentiation: {element: 'Purpose', reason: 'No clear value proposition or positioning'},
                wrong_target_market: {element: 'Strategy', reason: 'Targeting wrong customer segment'},
                unclear_ideal_customer: {element: 'Strategy', reason: 'Customer targeting and segmentation'},
                channels_not_working: {element: 'Marketing', reason: 'Channel strategy and execution'},
                sales_process_broken: {element: 'Process', reason: 'Sales process and conversion'},
                default: {element: 'Marketing', reason: 'Customer acquisition and growth'}
            },
            slotsToExtract: ['startup_stage', 'attempted_solutions', 'root_cause_element'],
            nextPhase: 'recommendation'
        },

        recommendation: {
            phaseGoal: 'Recommend tools based on root cause',
            format: 'golden_circle',
            includeInterconnectionsExplanation: true,
            assessmentReferral: {
                condition: 'If Purpose or Strategy is root cause (foundational issues)',
                element: 'Marketing',
                stage: 'Based on slotsFilled.startup_stage'
            }
        }
    },

    /**
     * Strategic Clarity Diagnosis Flow
     * Root cause often in: Purpose (no clear mission), Governance (decision-making chaos), Strategy (no validated plan)
     */
    strategic_clarity_diagnosis: {
        discovery: {
            phaseGoal: 'Understand the strategic confusion',
            questions: [
                "What feels unclear - where you're headed (direction), how you're different from others (positioning), or what to focus on first (priorities)?"
            ],
            slotsToExtract: ['pain_point', 'symptom_element'],
            slotExtractionRules: {
                pain_point: 'Type of strategic confusion',
                symptom_element: 'Strategy'
            },
            nextPhase: 'diagnosis'
        },

        diagnosis: {
            phaseGoal: 'Identify if this is Purpose (why), Governance (who decides), or Strategy (what/how) issue',
            questions: [
                "If I asked three people in your business 'Why do we exist and who for?', would they give the same answer?",
                "Do you have a clear decision-making process, or does strategy change based on who you last spoke to?"
            ],
            rootCauseLogic: {
                unclear_why: {element: 'Purpose', reason: 'No clear mission, vision, or value proposition'},
                inconsistent_direction: {element: 'Governance', reason: 'No decision-making framework or strategic governance'},
                too_many_priorities: {element: 'Strategy', reason: 'Strategic focus and prioritisation'},
                no_validated_plan: {element: 'Strategy', reason: 'Strategy development and validation'},
                default: {element: 'Strategy', reason: 'Strategic planning and direction'}
            },
            slotsToExtract: ['startup_stage', 'team_size', 'root_cause_element'],
            nextPhase: 'recommendation'
        },

        recommendation: {
            phaseGoal: 'Recommend foundational tools (Lean Canvas, Golden Circle, SWOT)',
            format: 'golden_circle',
            includeInterconnectionsExplanation: true,
            assessmentReferral: {
                condition: 'Always offer assessment for strategic clarity (systemic issue)',
                element: 'Strategy',
                stage: 'Based on slotsFilled.startup_stage'
            }
        }
    },

    /**
     * Team Performance Diagnosis Flow
     * NOTE: Partial support - People element not in MVP (Feb 2026), but can diagnose root causes in MVP elements
     * Root cause often in: Governance (unclear roles/accountability), Strategy (no clarity) - both MVP elements
     * Non-MVP root causes: Process (burdensome workflows), People (wrong hires) - limited support
     */
    team_performance_diagnosis: {
        discovery: {
            phaseGoal: 'Understand the team performance issue',
            questions: [
                "What's the main issue - team members unclear on what to do, capable but not motivated, or don't have the right skills?"
            ],
            slotsToExtract: ['pain_point', 'symptom_element'],
            slotExtractionRules: {
                pain_point: 'Type of team performance issue',
                symptom_element: 'People',
                team_size: 'Team (by definition if asking about team performance)'
            },
            nextPhase: 'diagnosis'
        },

        diagnosis: {
            phaseGoal: 'Identify root cause (often in Governance or Strategy, not People)',
            questions: [
                "Does everyone have a clear role with defined responsibilities and decision rights?",
                "Does the team understand the business strategy and their role in delivering it?"
            ],
            rootCauseLogic: {
                unclear_roles: {element: 'Governance', reason: 'Role clarity and accountability structure'},
                unclear_strategy: {element: 'Strategy', reason: 'Strategic communication and alignment'},
                poor_processes: {element: 'Process', reason: 'Burdensome workflows reducing productivity'},
                skill_gaps: {element: 'People', reason: 'Hiring, training, and skill development'},
                culture_issues: {element: 'People', reason: 'Culture and engagement'},
                default: {element: 'People', reason: 'Team performance and development'}
            },
            slotsToExtract: ['startup_stage', 'root_cause_element'],
            nextPhase: 'recommendation'
        },

        recommendation: {
            phaseGoal: 'Recommend tools based on root cause (RACI, OKR, role clarity)',
            format: 'golden_circle',
            includeInterconnectionsExplanation: true,
            assessmentReferral: {
                condition: 'If Governance is root cause (systemic structural issue)',
                element: 'People',
                stage: 'Based on slotsFilled.startup_stage'
            }
        }
    },

    /**
     * Direct Tool Lookup Flow (simpler, no deep diagnosis)
     */
    direct_tool_recommendation: {
        discovery: {
            phaseGoal: 'Understand what tool/framework they\'re looking for',
            questions: [
                "What problem are you trying to solve with this tool, or what element of your business are you working on?"
            ],
            slotsToExtract: ['element_context'],
            nextPhase: 'recommendation'
        },

        recommendation: {
            phaseGoal: 'Provide direct tool recommendation',
            format: 'simple',  // Not full golden circle, just tool + context
            includeInterconnectionsExplanation: false
        }
    },

    /**
     * General Conversation Flow (fallback)
     */
    general_conversation: {
        discovery: {
            phaseGoal: 'Understand what they need help with',
            questions: [
                "I can provide insights on these four foundational elements: Governance (structure, roles, decision-making), Purpose (mission, differentiation), Strategy (direction, positioning), and Marketing (customer acquisition, growth). Which area is most pressing for you right now?"
            ],
            slotsToExtract: ['element_context', 'pain_point'],
            nextPhase: 'diagnosis'
        },

        diagnosis: {
            phaseGoal: 'Redirect to specific flow based on their answer',
            questions: [
                "Tell me a bit more about that challenge."
            ],
            nextPhase: 'recommendation'
        },

        recommendation: {
            phaseGoal: 'Provide contextual guidance',
            format: 'simple',
            includeInterconnectionsExplanation: false
        }
    },

    /**
     * Assessment Referral Flow
     */
    assessment_referral: {
        discovery: {
            phaseGoal: 'Understand what they want to assess',
            questions: [
                "Would you like to assess a specific area (like Governance, Purpose, Strategy, or Marketing) or get a comprehensive view across all four?"
            ],
            slotsToExtract: ['element_context', 'startup_stage'],
            nextPhase: 'recommendation'
        },

        recommendation: {
            phaseGoal: 'Provide assessment link with appropriate parameters',
            format: 'assessment_link',
            assessmentReferral: {
                condition: 'Always',
                element: 'Based on user answer or null for comprehensive',
                stage: 'Based on slotsFilled.startup_stage or ask'
            }
        }
    }
};

/**
 * Get conversation flow configuration
 */
function getConversationFlow(flowName) {
    return conversationFlows[flowName] || conversationFlows.general_conversation;
}

/**
 * Get phase configuration for current conversation state
 */
function getPhaseConfig(flowName, phase) {
    const flow = getConversationFlow(flowName);
    return flow[phase] || flow.discovery;
}

// Export for use in chatbot
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { conversationFlows, getConversationFlow, getPhaseConfig };
}
