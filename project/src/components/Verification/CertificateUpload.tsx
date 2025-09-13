import React, { useState, useCallback } from 'react';
import { Upload, FileText, Image, Scan, AlertCircle, Cpu, Wifi, WifiOff } from 'lucide-react';
import { certificateAPI } from '../../services/api';

interface CertificateUploadProps {
  onFileUpload: (file: File) => void;
  onVerificationComplete: (result: any, extractedData: any) => void;
}

export function CertificateUpload({ onFileUpload, onVerificationComplete }: CertificateUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [pythonServiceStatus, setPythonServiceStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [error, setError] = useState<string | null>(null);

  // Check Python service status on component mount
  React.useEffect(() => {
    checkPythonService();
  }, []);

  const checkPythonService = async () => {
    setPythonServiceStatus('checking');
    const isOnline = await certificateAPI.checkHealth();
    setPythonServiceStatus(isOnline ? 'online' : 'offline');
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && (file.type.includes('pdf') || file.type.includes('image'))) {
      processFile(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setSelectedFile(file);
    setIsProcessing(true);
    setError(null);
    setProcessingStage('Uploading file...');
    
    // Start verification process
    verifyWithPython(file);
  };

  const verifyWithPython = async (file: File) => {
    try {
      // Simulate upload progress
      setProcessingStage('Uploading file...');
      setUploadProgress(20);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProcessingStage('Processing with OCR...');
      setUploadProgress(40);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProcessingStage('Extracting certificate data...');
      setUploadProgress(60);
      
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setProcessingStage('Verifying against database...');
      setUploadProgress(80);
      
      // Call Python verification service
      const result = await certificateAPI.verifyWithPython(file);
      
      setProcessingStage('Verification complete!');
      setUploadProgress(100);
      
      // Extract the certificate data from the result
      const extractedData = {
        studentName: result.extractedData?.student_name,
        rollNumber: result.extractedData?.roll_number,
        course: result.extractedData?.course,
        institution: result.extractedData?.institution,
        graduationYear: result.extractedData?.graduation_year,
        certificateNumber: result.extractedData?.certificate_number,
        grade: result.extractedData?.grade,
        issueDate: result.extractedData?.issue_date,
      };
      
      setTimeout(() => {
        setIsProcessing(false);
        onFileUpload(file);
        onVerificationComplete(result, extractedData);
      }, 1000);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Verification failed');
      setIsProcessing(false);
      setUploadProgress(0);
      setProcessingStage('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <div className="flex items-center">
            <Scan className="h-5 w-5 mr-2 text-blue-600" />
            <Cpu className="h-4 w-4 mr-2 text-purple-600" />
          </div>
          Certificate Verification
        </h3>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-gray-600">
            Upload a certificate (PDF or image) to verify its authenticity using AI
          </p>
          <div className="flex items-center space-x-2">
            {pythonServiceStatus === 'checking' && (
              <div className="flex items-center text-xs text-gray-500">
                <div className="animate-spin h-3 w-3 border border-gray-300 border-t-blue-600 rounded-full mr-1"></div>
                Checking AI service...
              </div>
            )}
            {pythonServiceStatus === 'online' && (
              <div className="flex items-center text-xs text-green-600">
                <Wifi className="h-3 w-3 mr-1" />
                AI Service Online
              </div>
            )}
            {pythonServiceStatus === 'offline' && (
              <div className="flex items-center text-xs text-red-600">
                <WifiOff className="h-3 w-3 mr-1" />
                AI Service Offline
              </div>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-red-800">Verification Error</p>
              <p className="text-red-700 mt-1">{error}</p>
              {pythonServiceStatus === 'offline' && (
                <p className="text-red-600 mt-2 text-xs">
                  Please ensure the Python backend is running: <code>cd python_backend && python start_server.py</code>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver
            ? 'border-blue-400 bg-blue-50'
            : selectedFile
            ? 'border-green-400 bg-green-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isProcessing ? (
          <div className="space-y-4">
            <div className="h-12 w-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mx-auto">
              <div className="flex items-center">
                <Cpu className="h-6 w-6 text-purple-600 animate-pulse mr-1" />
                <Upload className="h-4 w-4 text-blue-600 animate-bounce" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900">{processingStage}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">{uploadProgress}% complete</p>
              <p className="text-xs text-purple-600">🤖 AI-powered verification in progress</p>
            </div>
          </div>
        ) : selectedFile ? (
          <div className="space-y-4">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
              {selectedFile.type.includes('pdf') ? (
                <FileText className="h-6 w-6 text-green-600" />
              ) : (
                <Image className="h-6 w-6 text-green-600" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready for verification
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
              <Upload className="h-6 w-6 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Drag and drop your certificate here
              </p>
              <p className="text-xs text-gray-500 mt-1">
                or click to browse files
              </p>
            </div>
            <div className="flex items-center justify-center">
              <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Choose File
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,image/*"
                  onChange={handleFileSelect}
                />
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-amber-800">Supported Formats</p>
            <p className="text-amber-700 mt-1">
              PNG, JPG, or JPEG images up to 10MB. Uses advanced OCR and ML for verification.
            </p>
          </div>
        </div>
      </div>

      {pythonServiceStatus === 'offline' && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <WifiOff className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-red-800">Python AI Service Required</p>
              <p className="text-red-700 mt-1">
                To use AI-powered verification, start the Python backend:
              </p>
              <code className="block mt-2 p-2 bg-red-100 rounded text-xs">
                cd python_backend && python start_server.py
              </code>
              <button
                onClick={checkPythonService}
                className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
              >
                Retry connection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}