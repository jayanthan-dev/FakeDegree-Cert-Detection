import axios from 'axios';
import type { VerificationResult } from '../types';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout for file uploads
});

export interface PythonVerificationResult {
  is_valid: boolean;
  confidence: number;
  flags: string[];
  matched_fields: string[];
  discrepancies: string[];
  institution_verified: boolean;
  extracted_data: {
    student_name?: string;
    roll_number?: string;
    course?: string;
    institution?: string;
    graduation_year?: number;
    certificate_number?: string;
    grade?: string;
    issue_date?: string;
  };
  timestamp: string;
}

export const certificateAPI = {
  async verifyWithPython(file: File): Promise<VerificationResult> {
    console.log('Starting Python verification for file:', file.name);
    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Sending request to Python backend...');
      const response = await api.post<PythonVerificationResult>('/verify-certificate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Transform Python response to match our TypeScript types
      console.log('Received response from Python backend:', response.data);
      const pythonResult = response.data;
      
      return {
        isValid: pythonResult.is_valid,
        confidence: pythonResult.confidence,
        flags: pythonResult.flags,
        matchedFields: pythonResult.matched_fields,
        discrepancies: pythonResult.discrepancies,
        institutionVerified: pythonResult.institution_verified,
        timestamp: pythonResult.timestamp,
      };
    } catch (error) {
      console.error('Python verification error:', error);
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED') {
          throw new Error('Python verification service is not running. Please start the backend server with: cd python_backend && python start_server.py');
        }
        if (error.response?.status === 500) {
          throw new Error(error.response?.data?.detail || 'Internal server error in Python backend');
        }
        throw new Error(error.response?.data?.detail || `Verification service error: ${error.message}`);
      }
      throw error;
    }
  },

  async checkHealth(): Promise<boolean> {
    try {
      console.log('Checking Python service health...');
      await api.get('/health');
      console.log('Python service is healthy');
      return true;
    } catch (error) {
      console.error('Python service health check failed:', error);
      return false;
    }
  },

  async getVerifiedInstitutions(): Promise<string[]> {
    try {
      console.log('Fetching verified institutions...');
      const response = await api.get('/institutions');
      console.log('Received institutions:', response.data);
      return response.data.institutions;
    } catch (error) {
      console.error('Failed to fetch institutions:', error);
      return [];
    }
  },
};