// Temporary file to simulate validation data for demonstration
// This modifies the analytics service responses to include simulated validation data

export function simulateMatchRateData() {
  return {
    overall: {
      matchRate: 75,
      mismatchRate: 20,
      partialRate: 5,
      totalValidations: 20306,
    },
    bySheet: [
      {
        sheet: 'VINYASA',
        matchRate: 82,
        mismatchRate: 15,
        partialRate: 3,
        totalValidations: 16176,
      },
      {
        sheet: 'JSB',
        matchRate: 68,
        mismatchRate: 25,
        partialRate: 7,
        totalValidations: 4130,
      },
      {
        sheet: 'REVIX',
        matchRate: 0,
        mismatchRate: 0,
        partialRate: 0,
        totalValidations: 0,
      },
    ],
  };
}

export function simulateMismatchPatterns() {
  return [
    { pattern: 'Price Difference', count: 2456 },
    { pattern: 'SKU Not Found', count: 1823 },
    { pattern: 'Title Mismatch', count: 987 },
    { pattern: 'Image Missing', count: 756 },
    { pattern: 'Description Variation', count: 543 },
    { pattern: 'Stock Status', count: 432 },
    { pattern: 'Brand Name Different', count: 321 },
    { pattern: 'Category Mismatch', count: 234 },
    { pattern: 'Shipping Info', count: 189 },
    { pattern: 'Product Dimensions', count: 156 },
  ];
}

export function simulateAgentEfficiency() {
  return [
    {
      agentId: 5,
      agentName: 'Agent 5',
      tasksPerHour: 45,
      avgHandleTimeSeconds: 20,
      totalTasks: 600,
      hoursWorked: 13,
    },
    {
      agentId: 6,
      agentName: 'Agent 6',
      tasksPerHour: 52,
      avgHandleTimeSeconds: 15,
      totalTasks: 9695,
      hoursWorked: 186,
    },
    {
      agentId: 7,
      agentName: 'Agent 7',
      tasksPerHour: 38,
      avgHandleTimeSeconds: 27,
      totalTasks: 10011,
      hoursWorked: 263,
    },
  ];
}

export function simulateAgentSheetMatrix() {
  return {
    'Agent 5': {
      'VINYASA': {
        totalTasks: 450,
        completedTasks: 445,
        completionRate: 99,
        avgCompletionTime: 18,
      },
      'JSB': {
        totalTasks: 150,
        completedTasks: 145,
        completionRate: 97,
        avgCompletionTime: 25,
      },
    },
    'Agent 6': {
      'VINYASA': {
        totalTasks: 7200,
        completedTasks: 7100,
        completionRate: 99,
        avgCompletionTime: 14,
      },
      'JSB': {
        totalTasks: 2495,
        completedTasks: 2395,
        completionRate: 96,
        avgCompletionTime: 17,
      },
    },
    'Agent 7': {
      'VINYASA': {
        totalTasks: 8526,
        completedTasks: 8350,
        completionRate: 98,
        avgCompletionTime: 25,
      },
      'JSB': {
        totalTasks: 1485,
        completedTasks: 1390,
        completionRate: 94,
        avgCompletionTime: 35,
      },
    },
  };
}