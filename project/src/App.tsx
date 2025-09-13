import React, { useState } from 'react';
import { LoginPage } from './components/Auth/LoginPage';
import { Header } from './components/Layout/Header';
import { Navigation } from './components/Layout/Navigation';
import { StatsCards } from './components/Dashboard/StatsCards';
import { CertificateUpload } from './components/Verification/CertificateUpload';
import { VerificationResults } from './components/Verification/VerificationResults';
import { RecentActivity } from './components/Dashboard/RecentActivity';
import { VerificationChart } from './components/Analytics/VerificationChart';
import { InstitutionCard } from './components/Institutions/InstitutionCard';
import type { Institution, VerificationResult, Certificate } from './types';

const mockUser = {
  name: 'Dr. Sarah Johnson',
  role: 'Senior Verifier',
  organization: 'Jharkhand Education Department'
};

const mockStats = {
  totalVerifications: 15847,
  verifiedCertificates: 12976,
  flaggedDocuments: 284,
  pendingVerifications: 156
};

const mockInstitutions: Institution[] = [
  {
    id: '1',
    name: 'Ranchi University',
    code: 'RU2001',
    location: 'Ranchi, Jharkhand',
    type: 'university',
    accreditation: 'A+',
    establishedYear: 1960,
    totalCertificates: 45680,
    verifiedCertificates: 42150,
    status: 'active'
  },
  {
    id: '2',
    name: 'National Institute of Technology',
    code: 'NIT2002',
    location: 'Jamshedpur, Jharkhand',
    type: 'institute',
    accreditation: 'A++',
    establishedYear: 1960,
    totalCertificates: 28450,
    verifiedCertificates: 27890,
    status: 'active'
  },
  {
    id: '3',
    name: 'Jharkhand University',
    code: 'JU2003',
    location: 'Dhanbad, Jharkhand',
    type: 'university',
    accreditation: 'A',
    establishedYear: 1992,
    totalCertificates: 32150,
    verifiedCertificates: 30890,
    status: 'active'
  }
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [extractedData, setExtractedData] = useState<Partial<Certificate> | null>(null);

  const handleLogin = (credentials: { email: string; password: string }) => {
    // In a real app, you would validate credentials against a backend
    if (credentials.email === 'admin@gmail.com' && credentials.password === 'admin') {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('dashboard');
    setUploadedFile(null);
    setVerificationResult(null);
    setExtractedData(null);
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  const handleVerificationComplete = (result: VerificationResult, extractedData: Partial<Certificate>) => {
    setVerificationResult(result);
    setExtractedData(extractedData);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <StatsCards stats={mockStats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <VerificationChart />
              <RecentActivity />
            </div>
          </div>
        );
      
      case 'verify':
        return (
          <div className="space-y-8">
            <CertificateUpload 
              onFileUpload={handleFileUpload}
              onVerificationComplete={handleVerificationComplete}
            />
            {verificationResult && extractedData && (
              <VerificationResults
                result={verificationResult}
                certificate={extractedData}
                onViewDetails={() => console.log('View details')}
              />
            )}
          </div>
        );
      
      case 'institutions':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Registered Institutions</h2>
                <p className="text-gray-600 mt-1">Manage and monitor educational institutions</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add Institution
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockInstitutions.map((institution) => (
                <InstitutionCard
                  key={institution.id}
                  institution={institution}
                  onViewDetails={() => console.log('View institution details')}
                />
              ))}
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
              <p className="text-gray-600 mt-1">Comprehensive verification and fraud detection analytics</p>
            </div>
            <StatsCards stats={mockStats} />
            <VerificationChart />
          </div>
        );
      
      case 'database':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Certificate Database</h2>
              <p className="text-gray-600 mt-1">Browse and search verified certificates</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <p className="text-gray-500">Certificate database interface will be implemented here</p>
            </div>
          </div>
        );
      
      case 'alerts':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Security Alerts</h2>
              <p className="text-gray-600 mt-1">Monitor fraud attempts and suspicious activities</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <p className="text-gray-500">Security alerts interface will be implemented here</p>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
              <p className="text-gray-600 mt-1">Configure system parameters and user permissions</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <p className="text-gray-500">Settings interface will be implemented here</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={mockUser} onLogout={handleLogout} />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="ml-64 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;