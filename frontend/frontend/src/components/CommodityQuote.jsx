import { useState } from 'react'
import { commodityQuote } from '../api/commoditiesAPI'

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value ?? '—'}</span>
    </div>
  )
}

export default function CommodityQuote() {
  const [symbol, setSymbol]       = useState('')
  const [quote, setQuote]         = useState(null)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)

  async function handleFetch(e) {
    e.preventDefault()
    if (!symbol.trim()) return
    setLoading(true)
    setError(null)
    setQuote(null)
    try {
      const res = await commodityQuote(symbol.trim().toUpperCase())
      setQuote(res.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const isPositive = quote?.change >= 0

  return (
    <div>
      <h2>Commodity Quote Lookup</h2>
      <p className="subtitle">Search by symbol (e.g. GCUSD, SIUSD, CLUSD)</p>

      <form className="search-form" onSubmit={handleFetch}>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter commodity symbol…"
          className="search-input"
        />
        <button type="submit" className="search-btn" disabled={loading}>
          {loading ? 'Fetching…' : 'Get Quote'}
        </button>
      </form>

      {error && <div className="error">Error: {error}</div>}
      {loading && <div className="loading">Fetching quote…</div>}

      {quote && (
        <div className="quote-card">
          <div className="quote-header">
            <div>
              <h3 className="quote-symbol">{quote.symbol}</h3>
              <span className="quote-date">{quote.name} · {quote.exchange}</span>
            </div>
            <div className="quote-price-block">
              <span className="quote-price">${quote.price?.toFixed(2)}</span>
              <span
                className="quote-change"
                style={{ color: isPositive ? '#16a34a' : '#dc2626' }}
              >
                {isPositive ? '+' : ''}{quote.change?.toFixed(2)}{' '}
                ({isPositive ? '+' : ''}{quote.changePercentage?.toFixed(2)}%)
              </span>
            </div>
          </div>

          <div className="stats-grid">
            <StatCard label="Open"      value={`$${quote.open?.toFixed(2)}`} />
            <StatCard label="Prev Close" value={`$${quote.previousClose?.toFixed(2)}`} />
            <StatCard label="Day Low"   value={`$${quote.dayLow?.toFixed(2)}`} />
            <StatCard label="Day High"  value={`$${quote.dayHigh?.toFixed(2)}`} />
            <StatCard label="52W Low"   value={`$${quote.yearLow?.toFixed(2)}`} />
            <StatCard label="52W High"  value={`$${quote.yearHigh?.toFixed(2)}`} />
            <StatCard label="50D Avg"   value={`$${quote.priceAvg50?.toFixed(2)}`} />
            <StatCard label="200D Avg"  value={`$${quote.priceAvg200?.toFixed(2)}`} />
            <StatCard label="Volume"    value={quote.volume?.toLocaleString()} />
          </div>
          <p className="source-note">Source: Financial Modeling Prep · Data cached 60s</p>
        </div>
      )}
    </div>
  )
}