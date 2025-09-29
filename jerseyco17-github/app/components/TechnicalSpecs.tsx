'use client';

import { useState } from 'react';
import { Download, FileText, Ruler, Weight, Thermometer, Zap } from 'lucide-react';

const technicalSpecs = [
  {
    category: 'Fasteners',
    icon: Ruler,
    specs: [
      { name: 'Thread Standards', value: 'ISO, ANSI, DIN, JIS' },
      { name: 'Materials', value: 'Stainless Steel, Carbon Steel, Aluminum, Brass' },
      { name: 'Finishes', value: 'Plain, Zinc Plated, Passivated, Anodized' },
      { name: 'Tolerances', value: '±0.1mm to ±0.5mm depending on size' }
    ]
  },
  {
    category: 'Tools',
    icon: Weight,
    specs: [
      { name: 'Torque Specifications', value: '5 N⋅m to 500 N⋅m' },
      { name: 'Accuracy', value: '±2% to ±5% depending on tool type' },
      { name: 'Materials', value: 'Chrome Vanadium, S2 Steel, Carbide' },
      { name: 'Standards', value: 'ISO 6789, ASME B107' }
    ]
  },
  {
    category: 'Electrical',
    icon: Zap,
    specs: [
      { name: 'Voltage Ratings', value: '12V to 600V AC/DC' },
      { name: 'Current Ratings', value: '1A to 100A' },
      { name: 'Temperature Range', value: '-40°C to +85°C' },
      { name: 'Standards', value: 'UL, CSA, CE, RoHS' }
    ]
  },
  {
    category: 'Materials',
    icon: Thermometer,
    specs: [
      { name: 'Temperature Range', value: '-200°C to +1000°C' },
      { name: 'Tensile Strength', value: '200 MPa to 2000 MPa' },
      { name: 'Hardness', value: 'HRB 60 to HRC 65' },
      { name: 'Standards', value: 'ASTM, ISO, DIN, JIS' }
    ]
  }
];

const certifications = [
  { name: 'ISO 9001:2015', description: 'Quality Management System' },
  { name: 'ISO 14001:2015', description: 'Environmental Management' },
  { name: 'AS9100D', description: 'Aerospace Quality Management' },
  { name: 'IATF 16949', description: 'Automotive Quality Management' },
  { name: 'UL Listed', description: 'Underwriters Laboratories' },
  { name: 'CSA Certified', description: 'Canadian Standards Association' }
];

export function TechnicalSpecs() {
  const [activeCategory, setActiveCategory] = useState('Fasteners');

  return (
    <div className="bg-gray-50 py-12">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Technical Specifications
          </h2>
          <p className="text-lg text-gray-600">
            Detailed specifications and certifications for all products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Specifications by Category */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Product Specifications
            </h3>
            
            <div className="space-y-6">
              {technicalSpecs.map((spec, index) => (
                <div key={index}>
                  <button
                    onClick={() => setActiveCategory(spec.category)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border transition-colors ${
                      activeCategory === spec.category
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <spec.icon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{spec.category}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {spec.specs.length} specifications
                    </div>
                  </button>
                  
                  {activeCategory === spec.category && (
                    <div className="mt-4 space-y-3">
                      {spec.specs.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <span className="text-sm text-gray-600">{item.name}</span>
                          <span className="text-sm font-medium text-gray-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Certifications & Standards
            </h3>
            
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{cert.name}</div>
                    <div className="text-sm text-gray-600">{cert.description}</div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">Quality Documentation</span>
              </div>
              <p className="text-sm text-blue-700">
                All products come with detailed specifications, material certificates, 
                and quality documentation upon request.
              </p>
            </div>
          </div>
        </div>

        {/* CAD Models and Downloads */}
        <div className="mt-12 bg-white rounded-lg border border-gray-200 p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              CAD Models & Technical Drawings
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Download 3D CAD models, technical drawings, and specifications for all products
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">3D CAD Models</h4>
                <p className="text-sm text-gray-600">
                  STEP, IGES, and native CAD formats available
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Technical Drawings</h4>
                <p className="text-sm text-gray-600">
                  Detailed engineering drawings with dimensions
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ruler className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Specifications</h4>
                <p className="text-sm text-gray-600">
                  Complete material and dimensional specifications
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
