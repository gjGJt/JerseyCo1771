'use client';

import { useState } from 'react';
import { ChevronRight, Package, Wrench, Zap, Droplets, Cpu } from 'lucide-react';

const categories = [
  {
    id: 'fasteners',
    name: 'Fasteners',
    icon: Package,
    description: 'Bolts, screws, nuts, washers, and rivets',
    subcategories: [
      'Hex Head Screws',
      'Socket Head Screws', 
      'Machine Screws',
      'Self-Tapping Screws',
      'Wood Screws',
      'Nuts & Washers',
      'Rivets & Rivet Nuts',
      'Threaded Rods'
    ],
    itemCount: '50,000+',
    color: 'blue'
  },
  {
    id: 'tools',
    name: 'Tools',
    icon: Wrench,
    description: 'Hand tools, power tools, and measuring instruments',
    subcategories: [
      'Wrenches & Sockets',
      'Screwdrivers',
      'Pliers & Cutters',
      'Hammers & Mallets',
      'Measuring Tools',
      'Power Tools',
      'Cutting Tools',
      'Safety Equipment'
    ],
    itemCount: '25,000+',
    color: 'green'
  },
  {
    id: 'hardware',
    name: 'Hardware',
    icon: Package,
    description: 'Hinges, latches, handles, and mounting hardware',
    subcategories: [
      'Hinges & Pivots',
      'Latches & Locks',
      'Handles & Knobs',
      'Mounting Hardware',
      'Brackets & Supports',
      'Casters & Wheels',
      'Springs & Retainers',
      'Clamps & Vises'
    ],
    itemCount: '30,000+',
    color: 'orange'
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: Zap,
    description: 'Electrical components, wiring, and controls',
    subcategories: [
      'Wire & Cable',
      'Connectors & Terminals',
      'Switches & Relays',
      'Motors & Actuators',
      'Sensors & Detectors',
      'Control Panels',
      'Power Supplies',
      'Lighting & LEDs'
    ],
    itemCount: '20,000+',
    color: 'yellow'
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: Droplets,
    description: 'Pipes, fittings, valves, and fluid handling',
    subcategories: [
      'Pipes & Tubing',
      'Fittings & Adapters',
      'Valves & Controls',
      'Pumps & Motors',
      'Filters & Strainers',
      'Seals & Gaskets',
      'Hoses & Couplings',
      'Fluid Handling'
    ],
    itemCount: '10,000+',
    color: 'cyan'
  },
  {
    id: 'automation',
    name: 'Automation',
    icon: Cpu,
    description: 'Robotics, sensors, and control systems',
    subcategories: [
      'Linear Actuators',
      'Pneumatic Components',
      'Sensors & Switches',
      'Control Systems',
      'Robotic Components',
      'Motion Control',
      'Safety Systems',
      'Data Acquisition'
    ],
    itemCount: '15,000+',
    color: 'purple'
  }
];

export function ProductCategories() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Product Categories
          </h2>
          <p className="text-lg text-gray-600">
            Browse our comprehensive catalog of industrial products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`bg-${category.color}-100 w-12 h-12 rounded-lg flex items-center justify-center`}>
                      <category.icon className={`w-6 h-6 text-${category.color}-600`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {category.itemCount} items
                      </p>
                    </div>
                  </div>
                  <ChevronRight 
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedCategory === category.id ? 'rotate-90' : ''
                    }`} 
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {category.description}
                </p>
              </button>

              {expandedCategory === category.id && (
                <div className="border-t border-gray-200 bg-gray-50">
                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {category.subcategories.map((subcategory, index) => (
                        <a
                          key={index}
                          href={`/category/${category.id}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-sm text-gray-700 hover:text-blue-600 hover:bg-white px-3 py-2 rounded transition-colors"
                        >
                          {subcategory}
                        </a>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <a
                        href={`/category/${category.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        View all {category.name} products →
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
