const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

// Mock GST registration data — schema matches GSTDataResult from OpenAPI spec
const GST_DATA_DB = {
  '32CMEPP9754L1ZG': {
    gstin: '32CMEPP9754L1ZG',
    tradeNam: 'THREE STAR MARINE SERVICES',
    lgnm: 'EMMANUEL  PANDARAPARAMBIL',
    sts: 'Active',
    dty: 'Regular',
    ctb: 'Proprietorship',
    rgdt: '01/07/2017',
    cxdt: '',
    cmpRt: 'NA',
    stj: 'State - Kerala,District - Ernakulam,Circle - Taxpayer Services Circle, Vypin',
    ctj: 'Central - Kerala,Division - Ernakulam',
    stjCd: null,
    ctjCd: null,
    lstupdt: null,
    ppr: null,
    canFlag: null,
    aggreTurnOver: 'Slab: Rs. 40 lakhs to 1.5 Cr.',
    aggreTurnOverFY: '2024-2025',
    gti: 'Up to Rs. 2.5 lakhs',
    gtiFY: '2019-2020',
    mandatedeInvoice: 'No',
    einvoiceStatus: 'No',
    ekycVFlag: 'No',
    adhrVFlag: 'No',
    ntcrbs: 'TRD:TRR',
    percentTaxInCash: 'NA',
    percentTaxInCashFY: '',
    compDetl: true,
    contacted: {
      name: 'EMMANUEL PANDARAPARAMBIL',
      email: 'threestar.m.services@gmail.com',
      mobNum: 9895646099,
    },
    pradr: {
      adr: '4/106A NEW NO 11/268 , 106A,, OCHANTHURUTH, PUTHUVYPU, Ernakulam, Kerala, 682508',
      ntr: 'Retail Business',
      em: '',
      mb: '',
      addr: null,
      lastUpdatedDate: null,
    },
    adadr: [],
    nba: ['Retail Business'],
    mbr: [],
    bzgddtls: [
      {
        gdes: 'INDUSTRIAL GLOVES',
        hsncd: '40159030',
        subIndustry: 'Industrial Goods',
        industry: 'Manufacturing',
      },
    ],
    bzsdtls: [],
  },
  '27ABACS7251D1ZH': {
    gstin: '27ABACS7251D1ZH',
    tradeNam: 'SUNTECH ELECTRONICS',
    lgnm: 'SUNTECH ELECTRONICS PVT LTD',
    sts: 'Active',
    dty: 'Regular',
    ctb: 'Private Limited Company',
    rgdt: '15/03/2018',
    cxdt: '',
    cmpRt: 'NA',
    stj: 'State - Maharashtra,District - Mumbai,Circle - Ward 32',
    ctj: 'Central - Mumbai,Division - Mumbai West',
    stjCd: null,
    ctjCd: null,
    lstupdt: null,
    ppr: null,
    canFlag: null,
    aggreTurnOver: 'Slab: Rs. 1.5 Cr. to 5 Cr.',
    aggreTurnOverFY: '2024-2025',
    gti: 'Rs. 1 Cr. to 2 Cr.',
    gtiFY: '2023-2024',
    mandatedeInvoice: 'Yes',
    einvoiceStatus: 'Yes',
    ekycVFlag: 'Yes',
    adhrVFlag: 'No',
    ntcrbs: 'MFR:WHS',
    percentTaxInCash: '12%',
    percentTaxInCashFY: '2024-2025',
    compDetl: true,
    contacted: {
      name: 'RAHUL SHARMA',
      email: 'rahul@suntechelectronics.in',
      mobNum: 9821034567,
    },
    pradr: {
      adr: 'Plot 14, Industrial Estate, Andheri East, Mumbai, Maharashtra, 400093',
      ntr: 'Wholesale Business',
      em: '',
      mb: '',
      addr: null,
      lastUpdatedDate: null,
    },
    adadr: [],
    nba: ['Wholesale Business', 'Manufacturing'],
    mbr: ['RAHUL SHARMA', 'PRIYA SHARMA'],
    bzgddtls: [
      {
        gdes: 'LED LIGHTS AND FIXTURES',
        hsncd: '94054090',
        subIndustry: 'Electrical',
        industry: 'Electronics',
      },
      {
        gdes: 'ELECTRONIC COMPONENTS',
        hsncd: '85340000',
        subIndustry: 'Components',
        industry: 'Electronics',
      },
    ],
    bzsdtls: [],
  },
  '07AABCU9603R1ZP': {
    gstin: '07AABCU9603R1ZP',
    tradeNam: 'DELHI TEXTILES HUB',
    lgnm: 'DELHI TEXTILES HUB LLP',
    sts: 'Active',
    dty: 'Regular',
    ctb: 'Limited Liability Partnership',
    rgdt: '10/09/2019',
    cxdt: '',
    cmpRt: 'NA',
    stj: 'State - Delhi,District - New Delhi,Circle - Ward 5A',
    ctj: 'Central - Delhi,Division - Delhi North',
    stjCd: null,
    ctjCd: null,
    lstupdt: null,
    ppr: null,
    canFlag: null,
    aggreTurnOver: 'Slab: Rs. 5 Cr. to 25 Cr.',
    aggreTurnOverFY: '2024-2025',
    gti: 'Rs. 2.5 Cr. to 5 Cr.',
    gtiFY: '2023-2024',
    mandatedeInvoice: 'Yes',
    einvoiceStatus: 'Yes',
    ekycVFlag: 'Yes',
    adhrVFlag: 'No',
    ntcrbs: 'TRD:RTL',
    percentTaxInCash: '8%',
    percentTaxInCashFY: '2024-2025',
    compDetl: true,
    contacted: {
      name: 'AMIT GUPTA',
      email: 'amit.gupta@delhitextiles.com',
      mobNum: 9910234567,
    },
    pradr: {
      adr: 'Shop 45, Lajpat Nagar Market, New Delhi, Delhi, 110024',
      ntr: 'Retail Business',
      em: '',
      mb: '',
      addr: null,
      lastUpdatedDate: null,
    },
    adadr: [],
    nba: ['Retail Business', 'Wholesale Business'],
    mbr: ['AMIT GUPTA', 'SUNITA GUPTA'],
    bzgddtls: [
      {
        gdes: 'COTTON FABRICS',
        hsncd: '52081100',
        subIndustry: 'Textiles',
        industry: 'Textile & Apparel',
      },
      {
        gdes: 'READYMADE GARMENTS',
        hsncd: '62034200',
        subIndustry: 'Apparel',
        industry: 'Textile & Apparel',
      },
    ],
    bzsdtls: [],
  },
};

// Mock GST filing data — schema matches GSTFilingDocument from OpenAPI spec
const GST_FILING_DB = {
  '27ABACS7251D1ZH': {
    gstin: '27ABACS7251D1ZH',
    compliance_status: { is_any_delay: false, is_defaulter: false },
    result: [
      {
        financial_year: '2025-26',
        filing_frequency: [
          { startPeriod: '042025', endPeriod: '062025', frequency: 'Monthly', quarter: 'Q1' },
        ],
        EFiledlist: [
          {
            valid: 'Y',
            mof: 'ONLINE',
            dof: '20-05-2025',
            rtntype: 'GSTR3B',
            ret_prd: '042025',
            arn: 'AB270425974226V',
            status: 'Filed',
            is_delay: false,
          },
        ],
      },
      {
        financial_year: '2024-25',
        filing_frequency: [
          { startPeriod: '042024', endPeriod: '062024', frequency: 'Monthly', quarter: 'Q1' },
          { startPeriod: '072024', endPeriod: '092024', frequency: 'Monthly', quarter: 'Q2' },
          { startPeriod: '102024', endPeriod: '122024', frequency: 'Monthly', quarter: 'Q3' },
          { startPeriod: '012025', endPeriod: '032025', frequency: 'Monthly', quarter: 'Q4' },
        ],
        EFiledlist: [
          { valid: 'Y', mof: 'ONLINE', dof: '18-04-2024', rtntype: 'GSTR1', ret_prd: '032024', arn: 'AA270324811302Z', status: 'Filed', is_delay: false },
          { valid: 'Y', mof: 'ONLINE', dof: '20-04-2024', rtntype: 'GSTR3B', ret_prd: '032024', arn: 'AB270324903112V', status: 'Filed', is_delay: false },
          { valid: 'Y', mof: 'ONLINE', dof: '11-05-2024', rtntype: 'GSTR1', ret_prd: '042024', arn: 'AA270424822441Z', status: 'Filed', is_delay: false },
          { valid: 'Y', mof: 'ONLINE', dof: '20-05-2024', rtntype: 'GSTR3B', ret_prd: '042024', arn: 'AB270424914223V', status: 'Filed', is_delay: false },
          { valid: 'Y', mof: 'ONLINE', dof: '14-06-2024', rtntype: 'GSTR1', ret_prd: '052024', arn: 'AA270524833552Z', status: 'Filed', is_delay: false },
          { valid: 'Y', mof: 'ONLINE', dof: '22-06-2024', rtntype: 'GSTR3B', ret_prd: '052024', arn: 'AB270524925334V', status: 'Filed', is_delay: false },
        ],
      },
    ],
  },
  '32CMEPP9754L1ZG': {
    gstin: '32CMEPP9754L1ZG',
    compliance_status: { is_any_delay: true, is_defaulter: false },
    result: [
      {
        financial_year: '2024-25',
        filing_frequency: [
          { startPeriod: '042024', endPeriod: '062024', frequency: 'Quarterly', quarter: 'Q1' },
          { startPeriod: '072024', endPeriod: '092024', frequency: 'Quarterly', quarter: 'Q2' },
        ],
        EFiledlist: [
          { valid: 'Y', mof: 'ONLINE', dof: '28-04-2024', rtntype: 'GSTR1', ret_prd: '032024', arn: 'AA320324701114Z', status: 'Filed', is_delay: true },
          { valid: 'Y', mof: 'ONLINE', dof: '25-04-2024', rtntype: 'GSTR3B', ret_prd: '032024', arn: 'AB320324803001V', status: 'Filed', is_delay: true },
          { valid: 'Y', mof: 'ONLINE', dof: '11-07-2024', rtntype: 'GSTR1', ret_prd: '062024', arn: 'AA320624712225Z', status: 'Filed', is_delay: false },
          { valid: 'Y', mof: 'ONLINE', dof: '22-07-2024', rtntype: 'GSTR3B', ret_prd: '062024', arn: 'AB320624814112V', status: 'Filed', is_delay: false },
        ],
      },
    ],
  },
  '07AABCU9603R1ZP': {
    gstin: '07AABCU9603R1ZP',
    compliance_status: { is_any_delay: false, is_defaulter: false },
    result: [
      {
        financial_year: '2025-26',
        filing_frequency: [
          { startPeriod: '042025', endPeriod: '062025', frequency: 'Monthly', quarter: 'Q1' },
        ],
        EFiledlist: [
          { valid: 'Y', mof: 'ONLINE', dof: '11-05-2025', rtntype: 'GSTR1', ret_prd: '042025', arn: 'AA070425622331Z', status: 'Filed', is_delay: false },
          { valid: 'Y', mof: 'ONLINE', dof: '20-05-2025', rtntype: 'GSTR3B', ret_prd: '042025', arn: 'AB070425714002V', status: 'Filed', is_delay: false },
        ],
      },
      {
        financial_year: '2024-25',
        filing_frequency: [
          { startPeriod: '042024', endPeriod: '062024', frequency: 'Monthly', quarter: 'Q1' },
          { startPeriod: '072024', endPeriod: '092024', frequency: 'Monthly', quarter: 'Q2' },
          { startPeriod: '102024', endPeriod: '122024', frequency: 'Monthly', quarter: 'Q3' },
          { startPeriod: '012025', endPeriod: '032025', frequency: 'Monthly', quarter: 'Q4' },
        ],
        EFiledlist: [
          { valid: 'Y', mof: 'ONLINE', dof: '10-04-2024', rtntype: 'GSTR1', ret_prd: '032024', arn: 'AA070324611001Z', status: 'Filed', is_delay: false },
          { valid: 'Y', mof: 'ONLINE', dof: '20-04-2024', rtntype: 'GSTR3B', ret_prd: '032024', arn: 'AB070324702991V', status: 'Filed', is_delay: false },
          { valid: 'Y', mof: 'ONLINE', dof: '11-05-2024', rtntype: 'GSTR1', ret_prd: '042024', arn: 'AA070424622112Z', status: 'Filed', is_delay: false },
          { valid: 'Y', mof: 'ONLINE', dof: '20-05-2024', rtntype: 'GSTR3B', ret_prd: '042024', arn: 'AB070424714003V', status: 'Filed', is_delay: false },
        ],
      },
    ],
  },
};

export const getGSTData = (req, res) => {
  const gst = req.params.gst.toUpperCase();

  if (!GSTIN_REGEX.test(gst)) {
    return res.status(400).json({ message: 'Invalid GSTIN format. Must be 15 characters (e.g. 32CMEPP9754L1ZG).' });
  }

  const data = GST_DATA_DB[gst];
  if (!data) {
    return res.status(404).json({ message: `No GST data found for: ${gst}` });
  }

  res.json(data);
};

export const getGSTFiling = (req, res) => {
  const gst = req.params.gst.toUpperCase();

  if (!GSTIN_REGEX.test(gst)) {
    return res.status(400).json({ message: 'Invalid GSTIN format. Must be 15 characters (e.g. 32CMEPP9754L1ZG).' });
  }

  const data = GST_FILING_DB[gst];
  if (!data) {
    return res.status(404).json({ message: `No GST filing found for: ${gst}` });
  }

  res.json(data);
};
