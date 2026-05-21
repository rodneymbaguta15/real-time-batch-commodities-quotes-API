import { useState, useEffect } from 'react'
import { commodityQuotes } from '../api/commoditiesAPI'

export default function CommodityList() {
  const [commodities, setCommodities] = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)
  const [search, setSearch]           = useState('')

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await commodityQuotes()
        setCommodities(res.map((entry) => entry.data))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchList()
  }, [])

  const filtered = commodities.filter(
    (c) =>
      c.symbol?.toLowerCase().includes(search.toLowerCase()) ||
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.exchange?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="table-header">
        <h2>Tracked Commodities</h2>
        {!loading && (
          <span className="results-label">{filtered.length} instruments</span>
        )}
      </div>

      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by name, symbol or exchange…"
          className="search-input"
        />
      </form>

      {loading && <div className="loading">Fetching commodities list…</div>}
      {error   && <div className="error">Error: {error}</div>}

      {!loading && !error && (
        <>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Name</th>
                  <th>Exchange</th>
                  <th>Trade Month</th>
                  <th>Currency</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '32px 0' }}>
                      No results found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((c, i) => (
                    <tr key={c.symbol ?? i}>
                      <td className="price">{c.symbol}</td>
                      <td>{c.name}</td>
                      <td>{c.exchange  ?? '—'}</td>
                      <td>{c.tradeMonth ?? '—'}</td>
                      <td>{c.currency  ?? '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <p className="source-note">Source: Financial Modeling Prep · Data cached 60s</p>
        </>
      )}
    </div>
  )
}