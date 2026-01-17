import { Defect } from '@/types';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

// Mock AI responses for board analysis
const defectExplanations: Record<string, string> = {
  'Open Circuit': 'An open circuit occurs when there is a break in the electrical connection on the PCB. This prevents current flow through that circuit path, typically caused by broken traces, missing components, or poor solder connections.',
  'Short Circuit': 'A short circuit happens when two points at different potentials are connected with minimal resistance. This can cause excessive current flow, component damage, or board malfunction.',
  'Solder Bridge': 'A solder bridge is an unintended connection between two or more solder pads or traces. This creates an unwanted conductive path that can cause signal interference or circuit malfunction.',
  'Missing Component': 'A component is absent from its designated location on the PCB. This breaks the circuit design and can cause partial or complete board malfunction.',
  'Misaligned Component': 'A component is positioned incorrectly on its pads, which can result in poor electrical connections, signal integrity issues, or component damage.',
  'Cold Solder Joint': 'A cold solder joint is a poorly executed solder connection that may appear shiny but lacks proper metal bonding. This results in unreliable electrical connections that can cause intermittent failures.',
  'Insufficient Solder': 'There is not enough solder on a joint, leaving incomplete coverage of the connection pads. This can cause weak connections and potential circuit failure under stress or vibration.',
  'Excess Solder': 'Too much solder has been applied to a joint, which can create unwanted connections between adjacent components or traces.',
};

// Mock search results database
const searchDatabase: Record<string, SearchResult[]> = {
  'Open Circuit': [
    {
      title: 'How to Diagnose and Fix Open Circuits in PCBs',
      url: 'https://www.electronics-tutorials.ws/circuit/open-circuits.html',
      snippet: 'Open circuits are breaks in the electrical path. Learn how to test for and repair them using continuity testing...',
    },
    {
      title: 'PCB Trace Repair Guide - Open Circuits',
      url: 'https://www.pcbway.com/blog/Business/PCB_Repair_Guide.html',
      snippet: 'Methods to identify and repair broken traces and open circuits on PCBs. Including tools needed and step-by-step instructions...',
    },
  ],
  'Short Circuit': [
    {
      title: 'Understanding and Preventing Short Circuits',
      url: 'https://www.electronics-notes.com/articles/electronic_components/short-circuit.php',
      snippet: 'Short circuits occur when two different potential points are connected with near-zero resistance. Learn prevention methods...',
    },
    {
      title: 'Short Circuit Detection and Repair',
      url: 'https://www.sparkfun.com/tutorials/short-circuit',
      snippet: 'How to safely detect and repair short circuits on PCBs without causing further damage to components...',
    },
  ],
  'Solder Bridge': [
    {
      title: 'Removing Solder Bridges - Best Practices',
      url: 'https://www.ifixit.com/Guide/Remove+Solder+Bridges/1234',
      snippet: 'Solder bridges create unwanted connections between traces. Techniques for safely removing them including desoldering...',
    },
    {
      title: 'Preventing Solder Bridges in PCB Assembly',
      url: 'https://www.pcbassembly.com/solder-bridges.html',
      snippet: 'Prevention techniques during manufacturing and assembly to avoid solder bridges. Design and process recommendations...',
    },
  ],
  'Missing Component': [
    {
      title: 'Identifying Missing Components on PCBs',
      url: 'https://www.electronics-repair.com/missing-components',
      snippet: 'How to identify missing components using schematics and board documentation. Replacement procedures...',
    },
    {
      title: 'Component Sourcing and Replacement Guide',
      url: 'https://www.sparkfun.com/component-replacement',
      snippet: 'Finding replacement components and understanding their specifications for proper PCB repair...',
    },
  ],
  'Cold Solder Joint': [
    {
      title: 'Identifying and Fixing Cold Solder Joints',
      url: 'https://www.soldertips.com/cold-joints',
      snippet: 'Cold solder joints are weak connections. Learn how to identify them visually and through testing, and how to reflow them...',
    },
    {
      title: 'Soldering Best Practices - Avoiding Cold Joints',
      url: 'https://www.ifixit.com/Guide/Soldering+Basics/25523',
      snippet: 'Proper soldering techniques to avoid cold joints. Temperature, iron technique, and material selection...',
    },
  ],
  'default': [
    {
      title: 'PCB Assembly and Repair Fundamentals',
      url: 'https://www.electronics-tutorials.ws/pcb/pcb-basics.html',
      snippet: 'Complete guide to PCB assembly, testing, and common defects. Troubleshooting techniques and repair procedures...',
    },
    {
      title: 'Electronic Defect Analysis Guide',
      url: 'https://www.eevblog.com/forum/projects/pcb-defect-analysis/',
      snippet: 'Community-driven resource for identifying and fixing PCB defects. Real-world examples and expert advice...',
    },
  ],
};

export async function analyzeDefectsWithAI(
  defects: Defect[],
  userQuestion: string
): Promise<string> {
  // Simulate API call to AI backend
  return new Promise((resolve) => {
    setTimeout(() => {
      let response = '';

      if (defects.length === 0) {
        response =
          'No defects detected in the current image. The PCB appears to be in good condition based on the analysis.';
      } else {
        // Build a response based on the detected defects
        const defectSummary = defects
          .map((d) => `- ${d.defectType} (Severity: ${d.severity}, Confidence: ${(d.confidence * 100).toFixed(1)}%)`)
          .join('\n');

        const explanation = defects
          .map((d) => {
            const desc = defectExplanations[d.defectType] || `${d.defectType} detected.`;
            return `**${d.defectType}**: ${desc}`;
          })
          .join('\n\n');

        if (userQuestion.toLowerCase().includes('fix') || userQuestion.toLowerCase().includes('repair')) {
          response = `Found ${defects.length} defect(s) in your board:\n\n${defectSummary}\n\n**Repair Recommendations:**\n\n${explanation}\n\n**Next Steps:**\n1. Locate the identified defects using the coordinates provided\n2. Use appropriate tools to fix each defect\n3. Re-analyze the board to verify repairs\n4. Test the board under operational conditions`;
        } else if (
          userQuestion.toLowerCase().includes('severity') ||
          userQuestion.toLowerCase().includes('serious')
        ) {
          const criticalDefects = defects.filter((d) => d.severity === 'Critical' || d.severity === 'High');
          response = `Your board has ${defects.length} total defect(s).\n\n**Critical/High Severity Issues (${criticalDefects.length}):**\n${criticalDefects.map((d) => `- ${d.defectType}`).join('\n') || 'None'}\n\nThese defects require immediate attention to prevent board failure.`;
        } else {
          response = `I've detected ${defects.length} defect(s) in your PCB:\n\n${defectSummary}\n\n**Detailed Analysis:**\n${explanation}`;
        }
      }

      resolve(response);
    }, 800);
  });
}

export async function searchOnlineForDefect(defects: Defect[]): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (defects.length === 0) {
        resolve('No defects to search for.');
        return;
      }

      // Get the most severe or first defect for search
      const primaryDefect = defects[0];
      const results = searchDatabase[primaryDefect.defectType] || searchDatabase['default'];

      let response = `**Search Results for: ${primaryDefect.defectType}**\n\n`;
      response += `Found ${results.length} relevant resources:\n\n`;

      results.forEach((result, index) => {
        response += `${index + 1}. **${result.title}**\n`;
        response += `   📎 ${result.url}\n`;
        response += `   ${result.snippet}\n\n`;
      });

      response += `💡 Click the links above to view full articles and detailed repair guides.`;

      resolve(response);
    }, 1000);
  });
}

export async function generateBoardHealthReport(defects: Defect[]): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const totalDefects = defects.length;
      const criticalCount = defects.filter((d) => d.severity === 'Critical').length;
      const highCount = defects.filter((d) => d.severity === 'High').length;
      const avgConfidence = (
        defects.reduce((sum, d) => sum + d.confidence, 0) / (defects.length || 1)
      ).toFixed(2);

      const healthScore = Math.max(0, 100 - totalDefects * 10 - criticalCount * 20 - highCount * 10);

      const report = `
**PCB Health Report**

**Overall Health Score:** ${healthScore}/100 ${healthScore > 80 ? '✓ Good' : healthScore > 60 ? '⚠ Fair' : '✗ Poor'}

**Defect Summary:**
- Total Defects: ${totalDefects}
- Critical Issues: ${criticalCount}
- High Severity: ${highCount}
- Detection Confidence: ${(Number(avgConfidence) * 100).toFixed(1)}%

**Recommendation:**
${
  healthScore > 80
    ? 'Your board is in good condition. Continue with standard maintenance.'
    : healthScore > 60
      ? 'Address identified issues to improve board reliability.'
      : 'Immediate action required. Multiple defects detected that could cause failure.'
}`;

      resolve(report.trim());
    }, 600);
  });
}
