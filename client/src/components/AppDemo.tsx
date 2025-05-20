import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, User, Calendar, Clock } from 'lucide-react';
import { BOARD_COLUMNS, SAMPLE_TASKS } from '../constants';

const AppDemo: React.FC = () => {
  const [tasks, setTasks] = useState(SAMPLE_TASKS);
  
  // Group tasks by column
  const tasksByColumn = BOARD_COLUMNS.reduce((acc, column) => {
    acc[column.id] = tasks.filter(task => task.column === column.id);
    return acc;
  }, {} as Record<string, typeof SAMPLE_TASKS>);

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See TaskCraft in Action
          </h2>
          <p className="text-lg text-gray-600 dark:text-white">
            Experience the intuitive drag and drop interface that makes task management a breeze.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-4 md:p-6 mb-8 overflow-hidden">
          {/* App Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Development Sprint</h3>
              <p className="text-sm text-gray-500 dark:text-white">Sprint #24 • May 1 - May 14</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-900 flex items-center justify-center text-white text-xs">JD</div>
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">AK</div>
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">MR</div>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium">+2</div>
              </div>
              <button className="ml-2 bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Board */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto">
            {BOARD_COLUMNS.map(column => (
              <div key={column.id} className="min-w-[280px]">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: column.color }}></div>
                    <h4 className="font-medium text-gray-800 dark:text-white">{column.title}</h4>
                  </div>
                  <span className="bg-gray-100 dark:bg-gray-300 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                    {tasksByColumn[column.id]?.length || 0}
                  </span>
                </div>
                
                {/* Tasks */}
                <div className="space-y-3">
                  {tasksByColumn[column.id]?.map(task => (
                    <div 
                      key={task.id}
                      className="bg-white dark:bg-gray-500 border border-gray-200 dark:border-gray-500 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h5 className="font-medium text-sm text-gray-800 dark:text-white">{task.title}</h5>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.priority === 'High' ? 'bg-red-100 text-red-800' :
                          task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-500 dark:text-white space-x-4 mt-4">
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          <span>JD</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>May 12</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>2h</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add task button */}
                  <button className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-gray-500 dark:text-white text-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    + Add task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto text-center pt-30">
          <h3 className="text-2xl font-bold mb-4">Customizable to Fit Your Workflow</h3>
          <p className="text-gray-600 mb-8 dark:text-white">
            Whether you're managing software development, marketing campaigns, or HR processes, 
            TaskCraft adapts to your team's unique workflow and requirements.
          </p>
          
          <div className="flex justify-center">
            <Link to="dashboard"  
              className="bg-[#2B3089] dark:bg-[#1D9EE2] hover:bg-[#1D9EE2] dark:hover:bg-[#2B3089] text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Try TaskCraft Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDemo;