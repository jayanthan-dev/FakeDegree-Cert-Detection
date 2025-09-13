export interface Certificate {
  id: string;
  studentName: string;
  rollNumber: string;
  course: string;
  institution: string;
  graduationYear: number;
  certificateNumber: string;
  grade: string;
  issueDate: string;
  verified: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected' | 'flagged';
  uploadedBy: string;
  uploadDate: string;
  digitalSignature?: string;
  blockchainHash?: string;
}

export interface Institution {
  id: string;
  name: string;
  code: string;
  location: string;
  type: 'university' | 'college' | 'institute';
  accreditation: string;
  establishedYear: number;
  totalCertificates: number;
  verifiedCertificates: number;
  status: 'active' | 'inactive';
}

export interface VerificationResult {
  isValid: boolean;
  confidence: number;
  flags: string[];
  matchedFields: string[];
  discrepancies: string[];
  institutionVerified: boolean;
  timestamp: string;
  extractedData?: {
    student_name?: string;
    roll_number?: string;
    course?: string;
    institution?: string;
    graduation_year?: number;
    certificate_number?: string;
    grade?: string;
    issue_date?: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'verifier' | 'institution' | 'employer';
  organization: string;
  permissions: string[];
}

export interface Alert {
  id: string;
  type: 'fraud_detected' | 'suspicious_activity' | 'system_alert';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
  relatedCertificate?: string;
}