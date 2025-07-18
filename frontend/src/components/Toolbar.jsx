import React from 'react';
import { Grid3X3 } from 'lucide-react';

const Toolbar = ()=> {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <div className="bg-white rounded-lg shadow-lg p-2 flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
          <Grid3X3 className="w-4 h-4 text-gray-600" />
        </div>
        {[false, true, false].map((active, index) => (
          <div key={index} className={`w-8 h-8 rounded flex items-center justify-center ${active ? 'bg-blue-500' : 'bg-gray-200'}`}>
            <div className={`w-4 h-4 rounded ${active ? 'bg-white' : 'bg-gray-600'}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Toolbar;