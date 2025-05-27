import React from 'react';
import { Move, LayoutGrid, ListOrdered, Calendar, Users, BarChart } from 'lucide-react';
import { FEATURES } from '../constants';

const iconMap = {
  Move: Move,
  LayoutGrid: LayoutGrid,
  ListOrdered: ListOrdered,
  Calendar: Calendar,
  Users: Users,
  BarChart: BarChart,
};

const Features: React.FC = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Powerful Features for Productive Teams
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-200">
            TaskCraft provides all the tools you need to manage projects efficiently, 
            collaborate effectively, and deliver results on time.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
            
            return (
              <div 
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 animate-scale-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r from-[#2B3089] to-[#1D9EE2] transform hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">{feature.title}</h3>
                <p className="text-gray-600 dark:text-white">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;