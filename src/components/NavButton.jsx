import React from 'react'
import { useVisualizerStore } from '../store/visualizer.store'

const NavButton = ({text}) => {
    const {currentView, setCurrentView} = useVisualizerStore()

  return (
    <button
        onClick={() => setCurrentView(text.toLowerCase())}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        currentView === text.toLowerCase()
            ? 'bg-blue-600 text-white' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
    >{text}</button>
  )
}

export default NavButton