import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import WidgetModal from './WidgetModal';
import CWPPExecutive from './CWPPExecutive';
import RegistryScan from './RegistryScan';
import CSPMHeader from './CSPMHeader';

const initialDashboard = {
  categories: [
    {
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 1,
          name: 'Cloud Accounts Connection',
          type: 'pieChart',
          data: [
            { name: 'Connected', value: 70 },
            { name: 'Not Connected', value: 30 }
          ],
          text: 'Cloud Account Connection Status'
        },
        {
          id: 2,
          name: 'Cloud Account Risk Management',
          type: 'pieChart',
          data: [
            { name: 'Failed', value: 10 },
            { name: 'Warning', value: 20 },
            { name: 'Not Available', value: 15 },
            { name: 'Passed', value: 55 }
          ],
          text: 'Cloud Account Risk Management Status'
        }
      ]
    }
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function CSPMExecutive() {
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

  const addWidget = (widgetName, widgetText) => {
    const newWidget = {
      id: Math.random(),
      name: widgetName,
      type: 'pieChart',
      data: [
        { name: 'Example 1', value: 40 },
        { name: 'Example 2', value: 60 }
      ],
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
      <h1 className='font-normal from-neutral-400'>CNAPP DASHBOARD</h1>
      {dashboard.categories.map((category, catIdx) => (
        <div key={catIdx} className="mt-6">
            <CSPMHeader onOpenModal={() => openModal(category.name)} />
            <h2 className='text-lg font-semibold'>{category.name}</h2>
          <div className="grid grid-cols-3 gap-4 mt-5">
            {category.widgets.map(widget => (
              <div key={widget.id} className="bg-white p-4 rounded-lg shadow-md relative">
                <h3 className='text-md font-semibold'>{widget.name}</h3>
                {widget.type === 'pieChart' && (
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
                )}
                <p>{widget.text}</p>
                <button 
                  className="absolute top-2 right-2 text-red-500"
                  onClick={() => removeWidget(category.name, widget.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <div className="flex justify-center items-center p-4 rounded-lg border border-dashed border-gray-400 cursor-pointer hover:bg-gray-100">
              <button onClick={() => openModal(category.name)} className="flex items-center">
                <FaPlus className="mr-2" /> Add Widget
              </button>
            </div>
          </div>
        </div>
      ))}
      <WidgetModal isOpen={isModalOpen} onClose={closeModal} onAdd={addWidget} />
      <div>
        <CWPPExecutive />
      </div>
      <div>
        <RegistryScan />
      </div>
    </div>
  );
}

export default CSPMExecutive;
