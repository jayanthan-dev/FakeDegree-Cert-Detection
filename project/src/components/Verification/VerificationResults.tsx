import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Eye, Download, Flag, Cpu, Brain } from 'lucide-react';
import type { VerificationResult, Certificate } from '../../types';

interface VerificationResultsProps {
  result: VerificationResult;
  certificate: Partial<Certificate>;
  onViewDetails: () => void;
}

export function VerificationResults({ result, certificate, onViewDetails }: VerificationResultsProps) {
  const getStatusIcon = () => {
    if (result.isValid && result.confidence > 80) {
      return <CheckCircle className="h-8 w-8 text-green-500" />;
    } else if (result.isValid && result.confidence > 60) {
      return <AlertTriangle className="h-8 w-8 text-yellow-500" />;
    } else {
      return <XCircle className="h-8 w-8 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    if (result.isValid && result.confidence > 80) return 'green';
    if (result.isValid && result.confidence > 60) return 'yellow';
    return 'red';
  };

  const statusColor = getStatusColor();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {getStatusIcon()}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-600" />
                AI Verification {result.isValid ? 'Complete' : 'Failed'}
              </h3>
              <p className="text-sm text-gray-600">
                AI Confidence Score: {result.confidence}% • Processed with OCR + ML
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onViewDetails}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Eye className="h-4 w-4" />
              <span>View Details</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
              <Download className="h-4 w-4" />
              <span>Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Certificate Details */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Extracted Information (OCR)
            </h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Student Name
                </label>
                <p className="text-sm text-gray-900 mt-1">{certificate.studentName || 'N/A'}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Institution
                </label>
                <p className="text-sm text-gray-900 mt-1">{certificate.institution || 'N/A'}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Course
                </label>
                <p className="text-sm text-gray-900 mt-1">{certificate.course || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              AI Verification Status
            </h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Institution Verified
                </label>
                <div className="flex items-center mt-1">
                  {result.institutionVerified ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <span className="text-sm text-gray-900">
                    {result.institutionVerified ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  AI Matched Fields
                </label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {result.matchedFields.map((field, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded"
                    >
                      <Cpu className="h-3 w-3 mr-1" />
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Flags and Discrepancies */}
        {(result.flags.length > 0 || result.discrepancies.length > 0) && (
          <div className={`p-4 border rounded-lg ${
            statusColor === 'red' ? 'bg-red-50 border-red-200' : 
            statusColor === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
            'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex items-start space-x-2">
              <Flag className={`h-5 w-5 mt-0.5 ${
                statusColor === 'red' ? 'text-red-500' : 
                statusColor === 'yellow' ? 'text-yellow-500' :
                'text-blue-500'
              }`} />
              <div className="space-y-2">
                {result.flags.length > 0 && (
                  <div>
                    <h5 className={`text-sm font-medium ${
                      statusColor === 'red' ? 'text-red-800' : 
                      statusColor === 'yellow' ? 'text-yellow-800' :
                      'text-blue-800'
                    }`}>
                      AI Flags Detected
                    </h5>
                    <ul className={`text-sm space-y-1 ${
                      statusColor === 'red' ? 'text-red-700' : 
                      statusColor === 'yellow' ? 'text-yellow-700' :
                      'text-blue-700'
                    }`}>
                      {result.flags.map((flag, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-current rounded-full mr-2" />
                          {flag}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {result.discrepancies.length > 0 && (
                  <div>
                    <h5 className={`text-sm font-medium ${
                      statusColor === 'red' ? 'text-red-800' : 
                      statusColor === 'yellow' ? 'text-yellow-800' :
                      'text-blue-800'
                    }`}>
                      AI Discrepancies Found
                    </h5>
                    <ul className={`text-sm space-y-1 ${
                      statusColor === 'red' ? 'text-red-700' : 
                      statusColor === 'yellow' ? 'text-yellow-700' :
                      'text-blue-700'
                    }`}>
                      {result.discrepancies.map((discrepancy, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-current rounded-full mr-2" />
                          {discrepancy}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Processing Info */}
      <div className="px-6 pb-6">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <h5 className="text-sm font-medium text-purple-800">AI Processing Details</h5>
          </div>
          <div className="text-sm text-purple-700 space-y-1">
            <p>• OCR text extraction with image preprocessing</p>
            <p>• Machine learning pattern recognition</p>
            <p>• Database cross-verification and similarity matching</p>
            <p>• Institutional format validation</p>
            <p>• Processed at: {new Date(result.timestamp).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}