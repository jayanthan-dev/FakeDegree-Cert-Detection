import React from 'react';
import { Building, MapPin, Calendar, Users, CheckCircle, AlertTriangle } from 'lucide-react';
import type { Institution } from '../../types';

interface InstitutionCardProps {
  institution: Institution;
  onViewDetails: () => void;
}

export function InstitutionCard({ institution, onViewDetails }: InstitutionCardProps) {
  const verificationRate = (institution.verifiedCertificates / institution.totalCertificates * 100).toFixed(1);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{institution.name}</h3>
              <p className="text-sm text-gray-600">{institution.code}</p>
            </div>
          </div>
          <div className="flex items-center">
            {institution.status === 'active' ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            )}
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{institution.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Established {institution.establishedYear}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span>{institution.type.charAt(0).toUpperCase() + institution.type.slice(1)}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Total Certificates</span>
            <span className="text-sm font-semibold text-gray-900">
              {institution.totalCertificates.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Verified</span>
            <span className="text-sm font-semibold text-green-600">
              {institution.verifiedCertificates.toLocaleString()} ({verificationRate}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${verificationRate}%` }}
            />
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={onViewDetails}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}