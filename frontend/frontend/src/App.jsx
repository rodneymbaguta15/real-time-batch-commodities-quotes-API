import { useState } from 'react'
import CommodityQuote from './components/CommodityQuote'
import CommodityList from './components/CommodityList'
import './App.css'

const TABS = [
  { id: 'quote', label: '◈  Quote Lookup' },
  { id: 'list',  label: '⬡  Commodities List' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('quote')

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Commodities Dashboard</h1>
          <div className="header-sub">Powered by Financial Modeling Prep</div>
        </div>
        <div className="live-badge">
          <span className="live-dot" />
          LIVE DATA
        </div>
      </header>

      <nav className="tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn${activeTab === tab.id ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="card">
        {activeTab === 'quote' && <CommodityQuote />}
        {activeTab === 'list'  && <CommodityList />}
      </div>
    </div>
  )
}