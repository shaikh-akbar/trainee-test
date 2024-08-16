import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';
import WidgetModal from './WidgetModal';


const initialDashboard = {
  categories: [
    {
      name: 'Registry Scan',
      widgets: [
        {
          id: 1,
          name: 'Registry Scan Critical Levels',
          type: 'rangeChart',
          data: [
            { name: 'Critical', value: 40 },
            { name: 'High', value: 30 }
          ],
          text: 'Critical Levels Distribution'
        },
        {
          id: 2,
          name: 'Registry Scan High Levels',
          type: 'rangeChart',
          data: [
            { name: 'Critical', value: 25 },
            { name: 'High', value: 50 }
          ],
          text: 'High Levels Distribution'
        }
      ]
    }
  ]
};

// COLORS object for range slider
const COLORS = {
  Critical: '#FF0000',
  High: '#FFA500'
};

function RegistryScan() {
  const [dashboard, setDashboard] = useState(initialDashboard);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const openModal = (categoryName) => {
    setCurrentCategory(categoryName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addWidget = (widgetName, widgetText, widgetData = []) => {
    const newWidget = {
      id: Math.random(),
      name: widgetName,
      type: 'rangeChart',
      data: widgetData,
      text: widgetText
    };

    setDashboard(prevState => ({
      categories: prevState.categories.map(category =>
        category.name === currentCategory
          ? { ...category, widgets: [...category.widgets, newWidget] }
          : category
      )
    }));
  };

  const removeWidget = (categoryName, widgetId) => {
    setDashboard(prevState => ({
      categories: prevState.categories.map(category =>
        category.name === categoryName
          ? { ...category, widgets: category.widgets.filter(widget => widget.id !== widgetId) }
          : category
      )
    }));
  };

  const renderRangeSlider = (data = []) => {
    if (data.length === 0) return (
      <div className='flex flex-col justify-center items-center'>
        <GoGraph />
        <p className="text-gray-500">No data available</p>
      </div>
    );
  
    const total = data.reduce((acc, entry) => acc + entry.value, 0);
    let left = 0;
  
    return (
      <div className="relative w-full h-8 bg-gray-200 rounded overflow-hidden">
        {data.map((entry, index) => {
          const width = `${(entry.value / total) * 100}%`;
          const backgroundColor = COLORS[entry.name] || '#ccc';
          const segmentStyle = {
            width,
            backgroundColor,
            position: 'absolute',
            height: '100%',
            left: `${left}%`
          };
          left += (entry.value / total) * 100; 
  
          return (
            <div
              key={index}
              style={segmentStyle}
            />
          );
        })}
        <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
          {data.map((entry, index) => (
            <span
              key={index}
              className="absolute top-0 pl-3"
              style={{ left: `${data.slice(0, index).reduce((acc, e) => acc + (e.value / total) * 100, 0)}%` }}
            >
              {entry.name}
            </span>
          ))}
        </div>
      </div>
    );
  };
  

  return (
    <div className='bg-slate-500 p-5'>
      <h1 className='font-normal from-neutral-400'></h1>
      {dashboard.categories.map((category, catIdx) => (
        <div key={catIdx} className="mt-6">
          <h2 className='text-lg font-semibold'>{category.name}</h2>
          <div className="grid grid-cols-2 gap-4 mt-5">
            {category.widgets.length > 0 ? (
              category.widgets.map(widget => (
                <div key={widget.id} className="bg-white p-4 rounded-lg shadow-md relative flex flex-col items-center">
                  <h3 className='text-md font-semibold'>{widget.name}</h3>
                  {widget.type === 'rangeChart' ? (
                    <div className="w-full flex flex-col justify-center items-center">
                      {renderRangeSlider(widget.data)}
                      <p className="mt-2">{widget.text}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500">Widget type not supported</p>
                  )}
                  <button 
                    className="absolute top-2 right-2 text-red-500"
                    onClick={() => removeWidget(category.name, widget.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-2 text-center">No widgets available</p>
            )}
            <div className="flex justify-center items-center p-4 rounded-lg border border-dashed border-gray-400 cursor-pointer hover:bg-gray-100">
              <button onClick={() => openModal(category.name)} className="flex items-center">
                <FaPlus className="mr-2" /> Add Widget
              </button>
            </div>
          </div>
        </div>
      ))}
      <WidgetModal isOpen={isModalOpen} onClose={closeModal} onAdd={addWidget} />
    </div>
  );
}

export default RegistryScan;
