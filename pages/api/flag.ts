import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { flag, hintModeUsed } = req.body;
    
    const validFlags = [
      'FL4G{X55_F0UND}',           // XSS flag from search
      'FL4G{X55_L0G1N}',           // XSS flag from login
      'FL4G{5QL_1NJ3CT10N_5UCC355}', // SQL injection flag
      'FL4G{1D0R_4DM1N_4CC355}',  // IDOR admin access flag
      'FL4G{LF1_C0NF1G_4CC355}',  // LFI config access
      'FL4G{LF1_53CR3T_F1L3}',    // LFI secret file
      'FL4G{LF1_5Y5T3M_F1L3}',    // LFI system file
      'FL4G{1N53CUR3_UPL04D}',    // Insecure file upload
      'FL4G{F1L3_3X3CUT10N_R15K}', // File execution risk
      'FL4G{5CR1PT_UPL04D}',      // Script upload
      'FL4G{M45T3R_H4CK3R}'       // Master hacker flag
    ];
    
    if (validFlags.includes(flag)) {
      // Base points calculation
      let basePoints = 100;
      
      // Adjust points based on vulnerability type
      if (flag === 'FL4G{1D0R_4DM1N_4CC355}') {
        basePoints = 150;
      } else if (flag === 'FL4G{5QL_1NJ3CT10N_5UCC355}' || flag.includes('LF1')) {
        basePoints = 125;
      } else if (flag.includes('UPL04D') || flag.includes('3X3CUT10N') || flag.includes('5CR1PT')) {
        basePoints = 110;
      }
      
      // Subtle adjustment for hint mode usage
      const finalPoints = hintModeUsed ? Math.round(basePoints * 0.5) : basePoints;
      
      let message = `Flag accepted! Score +${finalPoints}`;
      
      // Special messages for specific flags
      if (flag === 'FL4G{1D0R_4DM1N_4CC355}') {
        message = `IDOR Vulnerability Exploited! You accessed the admin vault! Score +${finalPoints}`;
      } else if (flag === 'FL4G{X55_F0UND}' || flag === 'FL4G{X55_L0G1N}') {
        message = `XSS Vulnerability Exploited! You executed JavaScript! Score +${finalPoints}`;
      } else if (flag === 'FL4G{5QL_1NJ3CT10N_5UCC355}') {
        message = `SQL Injection Vulnerability Exploited! Score +${finalPoints}`;
      } else if (flag.includes('LF1')) {
        message = `LFI Vulnerability Exploited! You accessed restricted files! Score +${finalPoints}`;
      } else if (flag.includes('UPL04D') || flag.includes('3X3CUT10N') || flag.includes('5CR1PT')) {
        message = `File Upload Vulnerability Exploited! You bypassed file restrictions! Score +${finalPoints}`;
      }
      
      res.status(200).json({ message });
    } else {
      res.status(400).json({ message: 'Invalid flag. Make sure you have the correct format: FL4G{...}' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}