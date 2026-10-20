
export const problems = [
  {
    id: "slow",
    title: "Computer is running slowly",
    description: "Slow startup, lagging, or delayed responses",
    icon: "Gauge",
    facts: ["computer_slow"],
  },
  {
    id: "dns",
    title: "Wi-Fi connected, websites not opening",
    description: "Connected to Wi-Fi but websites fail to load",
    icon: "Globe",
    facts: ["wifi_connected", "websites_not_opening"],
  },
  {
    id: "internet",
    title: "No internet connection",
    description: "The computer cannot access the internet",
    icon: "WifiOff",
    facts: ["no_internet"],
  },
  {
    id: "heat",
    title: "Computer is overheating",
    description: "Excessive heat or unusually loud fans",
    icon: "Thermometer",
    facts: ["computer_overheating"],
  },
  {
    id: "battery",
    title: "Battery drains quickly",
    description: "Laptop battery percentage drops rapidly",
    icon: "BatteryWarning",
    facts: ["battery_draining"],
  },
  {
    id: "app",
    title: "Application is not responding",
    description: "A program freezes or stops responding",
    icon: "AppWindow",
    facts: ["application_frozen"],
  },
  {
    id: "printer",
    title: "Printer is not printing",
    description: "Print jobs fail or remain in the queue",
    icon: "Printer",
    facts: ["printer_not_printing"],
  },
  {
    id: "wifi",
    title: "Cannot connect to Wi-Fi",
    description: "The computer cannot join a wireless network",
    icon: "Wifi",
    facts: ["wifi_connection_failed"],
  },
];

const rules = [
  {
    id: "R1",
    conditions: ["computer_slow"],
    conclusion: "possible_low_memory",
    cause: "High memory usage",
    explanation: "A slow computer may have insufficient available memory.",
    actions: [
      "Close unused applications and browser tabs.",
      "Open Task Manager and check memory usage.",
    ],
  },
  {
    id: "R2",
    conditions: ["computer_slow"],
    conclusion: "possible_many_startup_apps",
    cause: "Too many startup applications",
    explanation: "Applications launching at startup may slow the computer.",
    actions: [
      "Review startup applications in Task Manager.",
      "Disable unnecessary startup applications.",
    ],
  },
  {
    id: "R3",
    conditions: ["wifi_connected", "websites_not_opening"],
    conclusion: "possible_dns_problem",
    cause: "Possible DNS or network configuration issue",
    explanation: "Wi-Fi connectivity with failed websites can indicate a DNS issue.",
    actions: [
      "Try opening another website.",
      "Restart the browser and check the network connection.",
      "If the issue continues, ask support to check DNS settings.",
    ],
  },
  {
    id: "R4",
    conditions: ["no_internet"],
    conclusion: "possible_network_problem",
    cause: "Possible network or router problem",
    explanation: "A lack of internet access may indicate a router, service, or configuration issue.",
    actions: [
      "Check whether other devices have internet access.",
      "Reconnect to the network.",
      "Restart the router if you are authorized to do so.",
    ],
  },
  {
    id: "R5",
    conditions: ["computer_overheating"],
    conclusion: "possible_cooling_problem",
    cause: "Possible cooling or ventilation problem",
    explanation: "Excessive heat may occur when airflow is restricted or cooling is insufficient.",
    actions: [
      "Place the computer on a hard, well-ventilated surface.",
      "Keep air vents clear of dust and obstructions.",
      "Stop demanding tasks and let the computer cool.",
    ],
  },
  {
    id: "R6",
    conditions: ["battery_draining"],
    conclusion: "possible_high_power_usage",
    cause: "High power consumption",
    explanation: "Background applications or high screen brightness may increase power use.",
    actions: [
      "Check battery usage by application.",
      "Reduce screen brightness when practical.",
      "Enable the operating system's battery saver.",
    ],
  },
  {
    id: "R7",
    conditions: ["battery_draining"],
    conclusion: "possible_battery_wear",
    cause: "Possible battery wear",
    explanation: "An older battery may have reduced capacity.",
    actions: [
      "Check the battery health report if your operating system supports it.",
      "Seek technical support if battery health is poor.",
    ],
  },
  {
    id: "R8",
    conditions: ["application_frozen"],
    conclusion: "possible_application_freeze",
    cause: "Application freeze or resource conflict",
    explanation: "A program may stop responding because of a temporary error or resource shortage.",
    actions: [
      "Wait briefly to see whether the application recovers.",
      "Save work if possible, then close and reopen the application.",
      "If it persists, restart the computer after saving your work.",
    ],
  },
  {
    id: "R9",
    conditions: ["printer_not_printing"],
    conclusion: "possible_printer_connection_issue",
    cause: "Possible printer connection or print queue issue",
    explanation: "An unavailable printer or stuck print queue can prevent printing.",
    actions: [
      "Check printer power, paper, and error indicators.",
      "Verify the selected printer and its connection.",
      "Check for stuck jobs in the print queue.",
    ],
  },
  {
    id: "R10",
    conditions: ["wifi_connection_failed"],
    conclusion: "possible_wifi_adapter_or_network_issue",
    cause: "Possible Wi-Fi adapter or network issue",
    explanation: "Connection failure can result from disabled Wi-Fi, incorrect credentials, or network problems.",
    actions: [
      "Make sure Wi-Fi is enabled and airplane mode is off.",
      "Verify the network password and try reconnecting.",
      "If necessary, restart the router or seek technical support.",
    ],
  },
];

export function diagnose(problemId) {
  const problem = problems.find((item) => item.id === problemId);

  if (!problem) {
    return null;
  }

  const facts = new Set(problem.facts);
  const firedRules = [];
  const inferredCauses = [];
  const actions = [];
  const addedActions = new Set();
  let changed = true;

  // Forward chaining: keep checking rules until no new facts are inferred.
  while (changed) {
    changed = false;

    for (const rule of rules) {
      const alreadyFired = firedRules.some(
        (item) => item.id === rule.id
      );

      const matches = rule.conditions.every((fact) =>
        facts.has(fact)
      );

      if (matches && !alreadyFired) {
        firedRules.push(rule);

        if (!facts.has(rule.conclusion)) {
          facts.add(rule.conclusion);
          changed = true;
        }

        inferredCauses.push({
          name: rule.cause,
          explanation: rule.explanation,
          ruleId: rule.id,
        });

        for (const action of rule.actions) {
          if (!addedActions.has(action)) {
            addedActions.add(action);
            actions.push(action);
          }
        }
      }
    }
  }

  return {
    problem: problem.title,
    initialFacts: problem.facts,
    inferredFacts: [...facts].filter(
      (fact) => !problem.facts.includes(fact)
    ),
    causes: inferredCauses,
    actions,
    firedRules: firedRules.map((rule) => ({
      id: rule.id,
      conditions: rule.conditions,
      conclusion: rule.conclusion,
      explanation: rule.explanation,
    })),
  };
}
