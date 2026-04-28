import { useState } from 'react';
import { fetchGSTData, fetchGSTFiling } from '../api/gst.js';

const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

export default function GSTSearch() {
  const [gstin, setGstin] = useState('');
  const [gstError, setGstError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [gstData, setGstData] = useState(null);
  const [filingData, setFilingData] = useState(null);
  const [activeTab, setActiveTab] = useState('registration');

  const handleSearch = async (e) => {
    e.preventDefault();
    const val = gstin.trim().toUpperCase();

    if (!val) return setGstError('Please enter a GSTIN');
    if (!GSTIN_REGEX.test(val)) return setGstError('Invalid GSTIN. Format: 15 characters (e.g. 32CMEPP9754L1ZG)');

    setGstError('');
    setError('');
    setGstData(null);
    setFilingData(null);
    setLoading(true);

    try {
      const [dataRes, filingRes] = await Promise.all([
        fetchGSTData(val),
        fetchGSTFiling(val),
      ]);
      setGstData(dataRes.data);
      setFilingData(filingRes.data);
      setActiveTab('registration');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch GST data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (sts) => {
    if (!sts) return '';
    return sts.toLowerCase() === 'active' ? 'badge-green' : 'badge-red';
  };

  return (
    <div className="gst-page">
      <div className="gst-hero">
        <h1>GST Search</h1>
        <p>Enter a valid 15-character GSTIN to fetch registration details and filing history</p>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <div className="search-bar">
          <input
            type="text"
            value={gstin}
            onChange={(e) => { setGstin(e.target.value.toUpperCase()); setGstError(''); }}
            placeholder="e.g. 32CMEPP9754L1ZG"
            maxLength={15}
            className={`search-input ${gstError ? 'input-error' : ''}`}
            spellCheck={false}
          />
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {gstError && <span className="field-error">{gstError}</span>}
      </form>

      {error && <div className="alert alert-error result-error">{error}</div>}

      {(gstData || filingData) && (
        <div className="results-container">
          <div className="result-tabs">
            <button
              className={`tab-btn ${activeTab === 'registration' ? 'active' : ''}`}
              onClick={() => setActiveTab('registration')}
            >
              Registration Details
            </button>
            <button
              className={`tab-btn ${activeTab === 'filing' ? 'active' : ''}`}
              onClick={() => setActiveTab('filing')}
            >
              Filing History
            </button>
          </div>

          {activeTab === 'registration' && gstData && (
            <div className="tab-panel">
              <div className="info-header">
                <div>
                  <h2>{gstData.tradeNam || gstData.lgnm}</h2>
                  <span className="gstin-label">{gstData.gstin}</span>
                </div>
                <span className={`badge ${statusColor(gstData.sts)}`}>{gstData.sts}</span>
              </div>

              <div className="info-grid">
                <InfoCard label="Legal Name" value={gstData.lgnm} />
                <InfoCard label="Trade Name" value={gstData.tradeNam} />
                <InfoCard label="Registration Date" value={gstData.rgdt} />
                <InfoCard label="Constitution" value={gstData.ctb} />
                <InfoCard label="Dealer Type" value={gstData.dty} />
                <InfoCard label="Compliance Rating" value={gstData.cmpRt} />
                <InfoCard label="E-Invoice Status" value={gstData.einvoiceStatus} />
                <InfoCard label="Aggregate Turnover" value={gstData.aggreTurnOver} />
                <InfoCard label="Turnover FY" value={gstData.aggreTurnOverFY} />
                <InfoCard label="Gross Turnover" value={gstData.gti} />
                <InfoCard label="eKYC Verified" value={gstData.ekycVFlag} />
                <InfoCard label="Under Audit" value={gstData.adhrVFlag} />
                {gstData.cxdt && <InfoCard label="Cancellation Date" value={gstData.cxdt} />}
              </div>

              {gstData.pradr && (
                <div className="section-block">
                  <h3>Principal Place of Business</h3>
                  <p className="address-text">{gstData.pradr.adr}</p>
                  {gstData.pradr.ntr && <p className="sub-text">Nature: {gstData.pradr.ntr}</p>}
                </div>
              )}

              {gstData.contacted && (
                <div className="section-block">
                  <h3>Contact Details</h3>
                  <div className="info-grid">
                    <InfoCard label="Name" value={gstData.contacted.name} />
                    <InfoCard label="Email" value={gstData.contacted.email} />
                    <InfoCard label="Mobile" value={gstData.contacted.mobNum} />
                  </div>
                </div>
              )}

              {gstData.stj && (
                <div className="section-block">
                  <h3>Jurisdiction</h3>
                  <InfoCard label="State Jurisdiction" value={gstData.stj} />
                  {gstData.ctj && <InfoCard label="Central Jurisdiction" value={gstData.ctj} />}
                </div>
              )}

              {gstData.bzgddtls?.length > 0 && (
                <div className="section-block">
                  <h3>Goods Dealt In</h3>
                  <div className="goods-list">
                    {gstData.bzgddtls.map((g, i) => (
                      <div key={i} className="goods-item">
                        <span className="goods-desc">{g.gdes}</span>
                        <span className="goods-hsn">HSN: {g.hsncd}</span>
                        {g.industry && <span className="goods-industry">{g.industry}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {gstData.nba?.length > 0 && (
                <div className="section-block">
                  <h3>Business Activities</h3>
                  <div className="tag-list">
                    {gstData.nba.map((a, i) => <span key={i} className="tag">{a}</span>)}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'filing' && filingData && (
            <div className="tab-panel">
              <div className="filing-header">
                <h2>Filing History — {filingData.gstin}</h2>
                <div className="compliance-badges">
                  <span className={`badge ${filingData.compliance_status?.is_defaulter ? 'badge-red' : 'badge-green'}`}>
                    {filingData.compliance_status?.is_defaulter ? 'Defaulter' : 'Compliant'}
                  </span>
                  {filingData.compliance_status?.is_any_delay && (
                    <span className="badge badge-yellow">Has Delays</span>
                  )}
                </div>
              </div>

              {filingData.result?.map((yearData, yi) => (
                <div key={yi} className="year-block">
                  <h3 className="year-heading">FY {yearData.financial_year}</h3>

                  {yearData.filing_frequency?.length > 0 && (
                    <div className="frequency-list">
                      {yearData.filing_frequency.map((ff, fi) => (
                        <span key={fi} className="freq-badge">
                          {ff.frequency} ({ff.quarter || `${ff.startPeriod}–${ff.endPeriod}`})
                        </span>
                      ))}
                    </div>
                  )}

                  {yearData.EFiledlist?.length > 0 ? (
                    <div className="filing-table-wrap">
                      <table className="filing-table">
                        <thead>
                          <tr>
                            <th>Return Type</th>
                            <th>Period</th>
                            <th>Date Filed</th>
                            <th>Mode</th>
                            <th>ARN</th>
                            <th>Status</th>
                            <th>Delay</th>
                          </tr>
                        </thead>
                        <tbody>
                          {yearData.EFiledlist.map((entry, ei) => (
                            <tr key={ei}>
                              <td><span className="return-type">{entry.rtntype}</span></td>
                              <td>{entry.ret_prd}</td>
                              <td>{entry.dof}</td>
                              <td>{entry.mof}</td>
                              <td className="arn-cell">{entry.arn}</td>
                              <td>
                                <span className={`badge-sm ${entry.status === 'Filed' ? 'badge-green' : 'badge-yellow'}`}>
                                  {entry.status}
                                </span>
                              </td>
                              <td>
                                {entry.is_delay
                                  ? <span className="badge-sm badge-red">Late</span>
                                  : <span className="badge-sm badge-green">On Time</span>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="no-data">No filing records for this period.</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function InfoCard({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div className="info-card">
      <span className="info-label">{label}</span>
      <span className="info-value">{value}</span>
    </div>
  );
}
