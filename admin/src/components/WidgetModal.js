import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";

function WidgetModal({ isOpen, onClose, onAdd }) {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');

  const handleConfirm = () => {
    onAdd(widgetName, widgetText);
    onClose();
  };

  return (
    <div className={`fixed inset-y-0 right-0 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
      
      {isOpen && <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>}
      
      <div className="relative w-80 h-full bg-white shadow-lg p-6">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <IoClose size={24} />
        </button>
        
        <h2 className="text-xl font-semibold mb-4">Add Widget</h2>
        <p>Personalize your dashboard by adding the following widget</p>
        <hr/>
        <input 
          type="text" 
          placeholder="Widget Name" 
          className="w-full p-2 mb-4 border rounded" 
          value={widgetName}
          onChange={(e) => setWidgetName(e.target.value)}
        />
        <textarea 
          placeholder="Widget Text" 
          className="w-full p-2 mb-4 border rounded" 
          value={widgetText}
          onChange={(e) => setWidgetText(e.target.value)}
        />
        <div className="flex justify-between mt-4">
          <button 
            onClick={onClose} 
            className="w-full bg-gray-300 text-gray-700 p-2 rounded mr-2">
            Cancel
          </button>
          <button 
            onClick={handleConfirm} 
            className="w-full bg-black text-white p-2 rounded ml-2">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default WidgetModal;
