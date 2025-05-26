import React from 'react';
import { ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-[#2B3089] to-[#1D9EE2]">
      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-5 rounded-full -translate-y-1/3 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#AB4A9C] opacity-10 rounded-full translate-y-1/3 -translate-x-1/3"></div>
        
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Task Management?
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of teams that use TaskCraft to organize projects, 
            streamline workflows, and deliver results on time.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="#signup" 
              className="flex items-center justify-center bg-white text-[#2B3089] font-medium py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors duration-300"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a 
              href="#contact" 
              className="flex items-center justify-center border-2 border-white text-white font-medium py-3 px-8 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-300"
            >
              Contact Sales
            </a>
          </div>
          
          <p className="mt-8 text-sm opacity-80">
            No credit card required. Free plan available for small teams.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;