import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import WidgetModal from './WidgetModal'; 
import { GoGraph } from "react-icons/go";

const initialDashboard = {
  categories: [
    {
      name: 'CWPP Executive Dashboard',
      widgets: [
        {
          id: 1,
          name: 'Workload Protection Status',
          type: 'pieChart',
          data: [
            { name: 'Protected', value: 60 },
            { name: 'Unprotected', value: 40 }
          ],
          text: 'Workload Protection Coverage'
        },
        {
          id: 2,
          name: 'Vulnerability Management',
          type: 'pieChart',
          data: [], // Example of an empty data scenario
          text: 'Vulnerability Severity Distribution'
        }
      ]
    }
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function CWPPExecutive() {
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
      type: 'pieChart',
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

  return (
    <div className='bg-slate-500 p-5'>
      <h1 className='font-normal from-neutral-400'></h1>
      {dashboard.categories.map((category, catIdx) => (
        <div key={catIdx} className="mt-6">
          <h2 className='text-lg font-semibold '>{category.name}</h2>
          <div className="grid grid-cols-3 gap-4 mt-5">
            {category.widgets.length > 0 ? (
              category.widgets.map(widget => (
                <div key={widget.id} className="bg-white p-4 rounded-lg shadow-md relative flex items-center justify-center">
                  <div className="text-center">
                    <h3 className='text-md font-semibold'>{widget.name}</h3>
                    {widget.data.length > 0 ? (
                      widget.type === 'pieChart' && (
                        <PieChart width={200} height={200}>
                          <Pie
                            data={widget.data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {widget.data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      )
                    ) : (
                      <div className='flex flex-col justify-center items-center'>
                        <GoGraph className='text-gray-500 text-4xl' />
                        <p className="text-gray-500">No data available</p>
                      </div>
                    )}
                    <p>{widget.text}</p>
                  </div>
                  <button 
                    className="absolute top-2 right-2 text-red-500"
                    onClick={() => removeWidget(category.name, widget.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-3 text-center">No widgets available</p>
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

export default CWPPExecutive;
