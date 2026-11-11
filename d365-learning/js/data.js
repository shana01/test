/*
 * Learning content for the D365 Finance & Operations learning app.
 *
 * Each module has:
 *   id, name, area, summary, overview (paragraphs),
 *   concepts  : key terms with definitions
 *   tasks     : step-by-step "how to" walkthroughs with a navigation path
 *   tips      : practical advice
 *   quiz      : multiple-choice questions (answer = index of correct option)
 *
 * Navigation paths reflect the standard D365 F&O menu structure. Menu labels
 * can vary slightly by version and configuration.
 */

window.D365_AREAS = [
  { id: "foundation", name: "Foundations", color: "#5b6b7f" },
  { id: "finance", name: "Finance", color: "#2563eb" },
  { id: "scm", name: "Supply Chain", color: "#0d9488" },
  { id: "projects", name: "Projects & People", color: "#9333ea" },
];

window.D365_MODULES = [
  // ---------------------------------------------------------------- FOUNDATIONS
  {
    id: "basics",
    name: "Getting Started & Navigation",
    area: "foundation",
    summary: "Find your way around the D365 F&O web client: navigation pane, workspaces, legal entities, filters and personalization.",
    overview: [
      "Dynamics 365 Finance and Supply Chain Management (often still called \"F&O\" — Finance and Operations) is Microsoft's ERP for mid-size and large organizations. It runs in the browser and shares one database across all modules, so a purchase order, an inventory receipt and the resulting ledger posting are all linked.",
      "Almost everything you do follows the same pattern: open a list page, pick or create a record, fill in the details form, and post or confirm it. Once you learn the layout of one page, you can work in all of them.",
      "Data belongs to a legal entity (company). The company picker in the top-right navigation bar decides which company's data you are viewing and creating.",
    ],
    concepts: [
      { term: "Navigation pane", def: "The left-hand menu (open with the hamburger icon) that holds Favorites, Recent, Workspaces and Modules." },
      { term: "Workspace", def: "A role-focused page with tiles, lists and links that bring together the tasks for one activity, such as Vendor invoice entry or Financial period close." },
      { term: "List page", def: "A grid of records (for example All vendors). Use it to search, filter and open records." },
      { term: "Details page", def: "The form for a single record, organized into FastTabs (collapsible sections)." },
      { term: "Action Pane", def: "The ribbon of tabs and buttons at the top of a page used to run actions (New, Post, Confirm, etc.)." },
      { term: "Legal entity", def: "A company with its own ledger and financial statements. Most data is stored per legal entity." },
      { term: "Shared data", def: "Data available across all legal entities, such as global address book parties and products." },
      { term: "FastTab", def: "A collapsible section on a details form that groups related fields." },
      { term: "Fact box", def: "A side panel showing related information about the selected record." },
      { term: "Personalization", def: "User-level changes to a page — hiding, moving or renaming fields — saved as a view." },
    ],
    tasks: [
      {
        title: "Switch the company (legal entity)",
        path: "Navigation bar (top right) > Company picker",
        steps: [
          "Select the company code shown in the top-right navigation bar.",
          "Type or select the legal entity you want to work in.",
          "The page reloads with data for that company. Check the code before entering transactions.",
        ],
        tip: "You can set your default company under Settings (gear icon) > User options > Default company.",
      },
      {
        title: "Find any page with navigation search",
        path: "Navigation bar > Search for a page",
        steps: [
          "Select the search box (magnifying glass) in the navigation bar.",
          "Type part of the page name, for example \"all vendors\" or \"general journal\".",
          "Select the result. The breadcrumb under the result shows which module it belongs to.",
        ],
        tip: "Add pages you use every day to Favorites with the star icon in the navigation pane.",
      },
      {
        title: "Filter a list page",
        path: "Any list page > Filter pane / grid column headers",
        steps: [
          "Use the Filter field above the grid to search on the main fields quickly.",
          "Select a column header to filter on that column (for example \"begins with\" or \"is one of\").",
          "Open the Filter pane (funnel icon) to combine several conditions.",
          "Save the result as a personal view so you can reuse it.",
        ],
        tip: "Ctrl+G toggles grid filtering, which adds a filter row under the column headers.",
      },
      {
        title: "Export a list to Excel",
        path: "Any list page > Open in Microsoft Office (Office icon)",
        steps: [
          "Filter the list to the records you need.",
          "Select the Office icon in the Action Pane.",
          "Choose Export to Excel and download the file.",
        ],
        tip: "\"Open in Excel\" with the Excel Data Connector lets you edit and publish changes back to D365, if the entity supports it.",
      },
    ],
    tips: [
      "Keyboard shortcuts: Alt+N creates a new record, Alt+S saves, Alt+F9 deletes. Microsoft Learn has the full shortcut list.",
      "The page title and breadcrumb tell you which module you are in, which helps when searching documentation.",
      "Use Task recorder (Settings > Task recorder) to record a process as documentation or training material.",
      "Many dates default to the session date. You can change it under Settings > Session date and time when you test period-end scenarios.",
    ],
    quiz: [
      { q: "Which element decides which company's data you see?", options: ["The navigation pane", "The company picker in the navigation bar", "The Action Pane", "The Fact box"], answer: 1, explain: "The company (legal entity) picker in the top-right navigation bar sets your current legal entity." },
      { q: "What is a workspace?", options: ["A personal Excel file", "A role-focused page that groups tiles, lists and links for an activity", "A sandbox environment", "A type of journal"], answer: 1, explain: "Workspaces bring together everything a role needs for an activity." },
      { q: "Collapsible sections on a details form are called…", options: ["Fact boxes", "Tiles", "FastTabs", "Views"], answer: 2, explain: "FastTabs group related fields and can be expanded or collapsed." },
      { q: "Which shortcut creates a new record?", options: ["Alt+N", "Ctrl+N", "Alt+S", "F5"], answer: 0, explain: "Alt+N creates a new record in D365 F&O." },
    ],
  },
  {
    id: "orgadmin",
    name: "Organization & System Administration",
    area: "foundation",
    summary: "Legal entities, number sequences, users and security roles, batch jobs and the Data management framework.",
    overview: [
      "Before any module works, the organization must be set up: legal entities, operating units, number sequences and users with the right security roles.",
      "Security in D365 F&O is role-based. Roles are made of duties, and duties are made of privileges. Users are assigned roles, optionally limited to specific legal entities.",
      "The Data management framework (DMF) is the standard tool for importing and exporting data with data entities — used for migrations, integrations and copying configuration between environments.",
    ],
    concepts: [
      { term: "Number sequence", def: "Generates unique, readable IDs for records and documents (vendors, purchase orders, vouchers)." },
      { term: "Security role", def: "A set of duties that matches a job, such as Accounts payable clerk." },
      { term: "Duty / Privilege", def: "A duty is a set of privileges for a business task; a privilege grants access to menu items and tables." },
      { term: "Segregation of duties", def: "Rules that prevent one user from holding conflicting duties, such as creating and approving vendor payments." },
      { term: "Data entity", def: "An abstraction over one or more tables used to import/export data in a business-friendly format." },
      { term: "Data project", def: "A DMF definition of what entities and files to import or export." },
      { term: "Batch job", def: "A process that runs on the server in the background, on demand or on a schedule." },
      { term: "Workflow", def: "A configurable approval or review process (for example purchase requisition approval)." },
      { term: "Operating unit", def: "A unit such as a department, cost center or business unit used to organize and report." },
    ],
    tasks: [
      {
        title: "Create a legal entity",
        path: "Organization administration > Organizations > Legal entities",
        steps: [
          "Select New.",
          "Enter the Name, Company (a code of up to 4 characters) and Country/region.",
          "Select OK, then complete addresses, contact info and tax registration on the FastTabs.",
          "Set up the ledger (chart of accounts, currency, fiscal calendar) for the new company in General ledger.",
        ],
        tip: "Use the configuration copy feature or data packages to copy setup from an existing company.",
      },
      {
        title: "Set up number sequences",
        path: "Organization administration > Number sequences > Number sequences",
        steps: [
          "Select Generate to run the wizard that creates default sequences for all modules, or select New to create one manually.",
          "Set the Scope (Shared, Legal entity, Operating unit…) and the Segments (constants and alphanumeric part).",
          "Set Smallest/Largest and decide on Continuous (no gaps — slower) or not.",
          "Link the sequence to a reference in the module's parameters page (for example Accounts payable parameters > Number sequences).",
        ],
        tip: "Only use Continuous sequences where legally required (for example invoice numbers in some countries).",
      },
      {
        title: "Create a user and assign roles",
        path: "System administration > Users > Users",
        steps: [
          "Select New (or Import users from Microsoft Entra ID).",
          "Enter the User ID, name and email, then save.",
          "On the User's roles FastTab, select Assign roles and choose the roles.",
          "Optionally select Assign organizations to restrict a role to specific legal entities.",
        ],
        tip: "Security configuration (System administration > Security > Security configuration) lets you build custom roles and duties.",
      },
      {
        title: "Import data with Data management",
        path: "System administration > Workspaces > Data management",
        steps: [
          "Select the Import tile.",
          "Enter a group name, choose the Entity name and Source data format (for example Excel or CSV).",
          "Upload the file and check the mapping (View map).",
          "Select Import. Review the execution summary for errors and fix them in staging if needed.",
        ],
        tip: "Export a few records first to get a file template with the correct columns.",
      },
      {
        title: "Check batch jobs",
        path: "System administration > Inquiries > Batch jobs",
        steps: [
          "Filter on Status to find Executing, Waiting or Error jobs.",
          "Open a job and check Batch tasks and the Log for messages.",
          "Use Change status to put a job on hold or set it back to Waiting.",
        ],
      },
    ],
    tips: [
      "Keep a configuration plan: which settings are shared and which are per company.",
      "Run the number sequence wizard early in a project — many forms fail with errors if sequences are missing.",
      "Use data packages (exported DMF projects) to move configuration between test and production.",
    ],
    quiz: [
      { q: "Security roles are built from…", options: ["Users and groups", "Duties, which contain privileges", "Workflows", "Number sequences"], answer: 1, explain: "Role > Duty > Privilege is the security hierarchy." },
      { q: "What tool is used to import master data from Excel or CSV?", options: ["Task recorder", "Data management framework", "Batch jobs", "Workflow editor"], answer: 1, explain: "The Data management framework imports and exports via data entities." },
      { q: "What does a Continuous number sequence guarantee?", options: ["Faster performance", "No gaps in numbers", "Shared across companies", "Alphabetic IDs"], answer: 1, explain: "Continuous sequences avoid gaps but are slower; use only when required." },
    ],
  },

  // ---------------------------------------------------------------- FINANCE
  {
    id: "gl",
    name: "General Ledger",
    area: "finance",
    summary: "The heart of Finance: chart of accounts, financial dimensions, journals, fiscal calendars and period close.",
    overview: [
      "General ledger (GL) records every financial transaction in the legal entity. Subledgers — Accounts payable, Accounts receivable, Inventory, Fixed assets, Bank — post to GL automatically through posting profiles.",
      "D365 F&O separates the main account (what) from financial dimensions (who/where — department, cost center, business unit). Account structures decide which dimension combinations are allowed for which main accounts.",
      "The chart of accounts is shared and can be used by several legal entities. Each legal entity's Ledger page links it to a chart of accounts, currencies, a fiscal calendar and account structures.",
    ],
    concepts: [
      { term: "Main account", def: "An account in the chart of accounts, such as 110110 Bank or 601200 Office supplies." },
      { term: "Financial dimension", def: "An attribute such as Department or Cost center used to analyze transactions." },
      { term: "Account structure", def: "Rules that define which dimensions are used and allowed with which main accounts." },
      { term: "Ledger account", def: "The combination of a main account and dimension values, for example 601200-022-OU_3566." },
      { term: "Fiscal calendar", def: "Defines the fiscal years and periods. Periods can be Open, On hold or Permanently closed per module." },
      { term: "Journal", def: "A document for entering transactions. Lines are added and the journal is then validated and posted." },
      { term: "Voucher", def: "The number that groups debit and credit lines of one balanced transaction." },
      { term: "Posting profile / Posting definition", def: "Setup that decides which ledger accounts subledger transactions post to." },
      { term: "Accounting currency / Reporting currency", def: "Accounting currency is the company's main currency; a reporting currency can be added for group reporting." },
      { term: "Year-end close", def: "The process that transfers profit and loss balances to retained earnings and opens the new year." },
    ],
    tasks: [
      {
        title: "Create a main account",
        path: "General ledger > Chart of accounts > Accounts > Main accounts",
        steps: [
          "Select New.",
          "Enter the Main account number and Name.",
          "Set Main account type (for example Expense, Revenue, Balance sheet).",
          "On the Setup FastTab, decide whether the account can be used for manual entry (Do not allow manual entry) and add a default currency if needed.",
          "Save. Make sure the account is covered by an active account structure.",
        ],
      },
      {
        title: "Create and post a general journal",
        path: "General ledger > Journal entries > General journals",
        steps: [
          "Select New and choose a journal Name (for example GenJrn). Enter a Description.",
          "Select Lines.",
          "On each line enter Date, Account type (Ledger, Vendor, Customer, Bank…), Account, Description, and Debit or Credit amount.",
          "Enter an Offset account, or add more lines until the voucher balances.",
          "Select Validate to check for errors, then select Post.",
        ],
        tip: "Use Alt+N on the lines grid to add lines quickly, and \"Post and transfer\" to move lines with errors to a new journal so the rest can post.",
      },
      {
        title: "Define a financial dimension",
        path: "General ledger > Chart of accounts > Dimensions > Financial dimensions",
        steps: [
          "Select New.",
          "In Use values from, choose an existing entity (for example Departments) or <Custom dimension>.",
          "Enter a Dimension name and save.",
          "Select Dimension values to see or add values.",
          "Select Activate to make the dimension available (this runs in maintenance mode in production).",
        ],
      },
      {
        title: "Manage ledger periods",
        path: "General ledger > Calendars > Ledger calendars",
        steps: [
          "Select the fiscal calendar and the fiscal year.",
          "For each period, set Period status: Open, On hold, or Permanently closed.",
          "Use Module access level to allow posting only for some modules (for example close AP while GL stays open).",
        ],
        tip: "Permanently closed cannot be reversed — use On hold during the month-end close.",
      },
      {
        title: "View trial balance",
        path: "General ledger > Inquiries and reports > Trial balance",
        steps: [
          "Set From date and To date.",
          "Choose the Financial dimension set (for example Main account only, or Main account + Department).",
          "Select Calculate balances.",
          "Drill down on a balance to see the transactions behind it.",
        ],
      },
    ],
    tips: [
      "Keep the number of dimensions practical — every extra dimension adds data-entry effort.",
      "Use Financial period close workspace to plan, assign and track month-end tasks.",
      "Allocation rules and Periodic journals automate recurring entries such as rent.",
      "Financial reporting (previously Management Reporter) builds statements like P&L and balance sheet from GL data.",
    ],
    quiz: [
      { q: "What decides which financial dimensions can be combined with a main account?", options: ["Fiscal calendar", "Account structure", "Number sequence", "Journal name"], answer: 1, explain: "Account structures define allowed dimension combinations per main account range." },
      { q: "Which period status allows reopening later?", options: ["Permanently closed", "On hold", "Archived", "Locked"], answer: 1, explain: "On hold stops posting but can be reopened; Permanently closed cannot." },
      { q: "How do subledgers like AP post to the general ledger?", options: ["Manually by the accountant", "Through posting profiles/definitions", "Via Excel uploads", "They don't post to GL"], answer: 1, explain: "Posting profiles map subledger transactions to ledger accounts." },
      { q: "A voucher in a general journal must…", options: ["Contain only one line", "Balance (debits = credits)", "Use a vendor account", "Be in a reporting currency"], answer: 1, explain: "Each voucher must balance before it can be posted." },
    ],
  },
  {
    id: "ap",
    name: "Accounts Payable",
    area: "finance",
    summary: "Manage vendors, record vendor invoices, match them to purchase orders, and pay suppliers.",
    overview: [
      "Accounts payable (AP) handles what the organization owes its suppliers. It covers vendor master data, invoice entry, invoice matching and approval, and payments.",
      "Vendor invoices can be linked to a purchase order (PO invoice) or entered without one (non-PO invoice in an invoice journal). Matching policies compare invoice to PO and product receipt to catch differences.",
      "Payments are created in the vendor payment journal, often with Generate payments / payment proposals, and exported to the bank in a payment format.",
    ],
    concepts: [
      { term: "Vendor", def: "A supplier record holding address, payment terms, currency, posting group and bank accounts." },
      { term: "Vendor group", def: "Groups vendors and sets default posting profile and terms." },
      { term: "Pending vendor invoice", def: "An invoice that is entered but not yet posted, often waiting for matching or workflow approval." },
      { term: "Three-way matching", def: "Compares invoice, purchase order and product receipt quantities and prices." },
      { term: "Invoice journal / Invoice register", def: "Journals for invoices that are not linked to a purchase order." },
      { term: "Terms of payment", def: "Defines the due date (for example Net 30)." },
      { term: "Cash discount", def: "A discount offered for paying early (for example 2% in 10 days)." },
      { term: "Method of payment", def: "How a vendor is paid — check, electronic, etc. — and the export format." },
      { term: "Settlement", def: "Matching a payment against an invoice so both are closed." },
    ],
    tasks: [
      {
        title: "Create a vendor",
        path: "Accounts payable > Vendors > All vendors",
        steps: [
          "Select New.",
          "Enter the Vendor account (if not auto-numbered), Name and Group.",
          "Fill in Addresses and Contact information.",
          "On the Purchase and Payment FastTabs, set currency, Terms of payment and Method of payment.",
          "Add the vendor's bank account (Set up > Bank accounts in the Action Pane).",
        ],
        tip: "Enable Vendor collaboration or a vendor approval workflow if you want new vendors reviewed before use.",
      },
      {
        title: "Enter a vendor invoice for a purchase order",
        path: "Accounts payable > Invoices > Pending vendor invoices",
        steps: [
          "Select New.",
          "Enter the Invoice account (vendor), Number (the vendor's invoice number) and Invoice date.",
          "Select Default from: Product receipt quantity in the Action Pane, or add the PO with \"Add from purchase order\".",
          "Check the lines and totals against the paper/PDF invoice.",
          "Select Matching details to review price and quantity matching.",
          "Select Post (or Submit if a workflow is active).",
        ],
        tip: "The Vendor invoice entry workspace shows invoices on hold, with mismatches or waiting for approval.",
      },
      {
        title: "Enter an invoice without a purchase order",
        path: "Accounts payable > Invoices > Invoice journal",
        steps: [
          "Select New and pick a journal Name.",
          "Select Lines.",
          "Enter the Account (vendor), Invoice number, Description and Credit amount.",
          "Enter the Offset account (the expense ledger account with dimensions).",
          "Validate and Post.",
        ],
      },
      {
        title: "Pay vendors",
        path: "Accounts payable > Payments > Vendor payment journal",
        steps: [
          "Select New, choose a journal name and open Lines.",
          "Select Payment proposal > Create payment proposal, set the selection criteria (due date, method of payment) and select OK.",
          "Review the proposal, remove invoices you don't want to pay, and Transfer.",
          "Select Generate payments to create the bank file or checks.",
          "Post the journal. Invoices are settled automatically.",
        ],
        tip: "Use Settle transactions on a line to manually pick which invoices a payment pays.",
      },
    ],
    tips: [
      "Use vendor holds (Invoice, Payment, All) to stop transactions with a vendor temporarily.",
      "Invoice capture (Copilot) can read PDF invoices and create pending vendor invoices automatically.",
      "Run the Vendor aging report regularly to see what is due.",
    ],
    quiz: [
      { q: "Which journal do you use for an invoice without a purchase order?", options: ["Vendor payment journal", "Invoice journal", "Movement journal", "Fixed assets journal"], answer: 1, explain: "Invoice journals (and invoice registers) handle non-PO invoices." },
      { q: "Three-way matching compares…", options: ["Invoice, PO and product receipt", "Invoice, budget and GL", "PO, vendor and bank", "Payment, invoice and bank statement"], answer: 0, explain: "Three-way matching uses the invoice, the PO and the product receipt." },
      { q: "What does settlement do?", options: ["Deletes an invoice", "Matches a payment to an invoice so both close", "Creates a vendor", "Approves a PO"], answer: 1, explain: "Settlement closes open transactions against each other." },
      { q: "Where do you set a vendor's due date rules?", options: ["Method of payment", "Terms of payment", "Vendor group only", "Number sequence"], answer: 1, explain: "Terms of payment determines how the due date is calculated." },
    ],
  },
  {
    id: "ar",
    name: "Accounts Receivable & Credit",
    area: "finance",
    summary: "Customers, free text invoices, customer payments, collections and credit management.",
    overview: [
      "Accounts receivable (AR) tracks what customers owe. Invoices come from sales orders (Sales and marketing) or from free text invoices for services and non-stock charges.",
      "Customer payments are recorded in the customer payment journal and settled against open invoices. Collections tools help follow up on overdue balances.",
      "Credit management lets you set credit limits and place orders on credit hold when customers exceed them.",
    ],
    concepts: [
      { term: "Customer", def: "A party you sell to, with address, currency, terms of payment and customer group." },
      { term: "Customer group", def: "Groups customers and provides default posting profile and terms." },
      { term: "Free text invoice", def: "An invoice not linked to a sales order, with lines posting to ledger accounts." },
      { term: "Customer payment journal", def: "Journal used to record incoming payments." },
      { term: "Aging", def: "Breaks open balances into buckets (Current, 30, 60, 90+ days) based on due date." },
      { term: "Collections", def: "Tools to contact customers about overdue invoices, track activities and charge interest." },
      { term: "Credit limit", def: "The maximum balance allowed for a customer before orders are blocked." },
      { term: "Interest note / Collection letter", def: "Documents to charge interest or remind customers about overdue amounts." },
    ],
    tasks: [
      {
        title: "Create a customer",
        path: "Accounts receivable > Customers > All customers",
        steps: [
          "Select New.",
          "Enter Name, Customer group, Currency and Address.",
          "Select Save, then complete the Credit and collections, Invoice and delivery, and Payment defaults FastTabs.",
          "Set a Credit limit if credit management is used.",
        ],
      },
      {
        title: "Create a free text invoice",
        path: "Accounts receivable > Invoices > All free text invoices",
        steps: [
          "Select New.",
          "Select the Customer account.",
          "Add lines: Description, Main account (revenue account), Quantity and Unit price.",
          "Select Post. Optionally print or email the invoice.",
        ],
        tip: "Use Recurring invoices for subscriptions or monthly services.",
      },
      {
        title: "Record a customer payment",
        path: "Accounts receivable > Payments > Customer payment journal",
        steps: [
          "Select New, choose a journal name, and open Lines.",
          "Enter the Customer account, Credit amount and the Offset account (bank account).",
          "Select Settle transactions and mark the invoices this payment pays.",
          "Validate and Post.",
        ],
        tip: "The Enter customer payments page is a faster entry screen for many payments.",
      },
      {
        title: "Work with collections",
        path: "Credit and collections > Collections > Collections",
        steps: [
          "Open the customer's collections page.",
          "Review the aging and open transactions.",
          "Log an activity (call, email) and set a follow-up date.",
          "Send a collection letter or create an interest note if needed.",
        ],
      },
    ],
    tips: [
      "Run Customer aging snapshot as a batch job so collections pages show current aging.",
      "Use payment schedules for invoices paid in installments.",
      "Customer statements can be emailed in bulk via print management.",
    ],
    quiz: [
      { q: "Which invoice type is not linked to a sales order?", options: ["Pro forma invoice", "Free text invoice", "Packing slip", "Vendor invoice"], answer: 1, explain: "Free text invoices are created directly in AR without a sales order." },
      { q: "When recording a customer payment, what closes the invoice?", options: ["Printing it", "Settling the payment against it", "Changing the due date", "Deleting the line"], answer: 1, explain: "Settlement marks the invoice as paid." },
      { q: "What happens when a customer exceeds their credit limit (with credit management on)?", options: ["Nothing", "Orders can be placed on credit hold", "The customer is deleted", "Prices increase"], answer: 1, explain: "Credit management blocking rules can place orders on hold." },
    ],
  },
  {
    id: "cash",
    name: "Cash & Bank Management",
    area: "finance",
    summary: "Bank accounts, bank reconciliation, deposit slips, checks and cash flow forecasting.",
    overview: [
      "Cash and bank management keeps track of the organization's bank accounts. Every payment or receipt posted with a bank offset creates a bank transaction.",
      "Bank reconciliation compares bank transactions in D365 with the bank's statement. Advanced bank reconciliation imports electronic statements and matches them with rules.",
      "Cash flow forecasting uses open AR, AP, sales and purchase orders to predict future cash positions.",
    ],
    concepts: [
      { term: "Bank account", def: "A record for a company bank account linked to a ledger account." },
      { term: "Bank statement", def: "The bank's record of transactions, imported or entered manually." },
      { term: "Reconciliation matching rule", def: "Rules that match statement lines to bank transactions automatically." },
      { term: "Check layout", def: "Defines how checks are printed for a bank account." },
      { term: "Deposit slip", def: "Groups customer payments deposited together." },
      { term: "Cash flow forecast", def: "Projection of incoming and outgoing cash based on open documents." },
    ],
    tasks: [
      {
        title: "Create a bank account",
        path: "Cash and bank management > Bank accounts > Bank accounts",
        steps: [
          "Select New.",
          "Enter the Bank account ID, Name, Routing number/SWIFT and Bank account number or IBAN.",
          "Select the Main account (the GL bank account).",
          "Set Currency and save.",
        ],
      },
      {
        title: "Reconcile a bank statement (advanced)",
        path: "Cash and bank management > Bank statement reconciliation > Bank statements",
        steps: [
          "Import the electronic statement file (Import statement).",
          "Open Bank reconciliation and create a reconciliation for the account.",
          "Run matching rules to auto-match.",
          "Manually match remaining lines, or create new transactions for fees/interest.",
          "When the unreconciled difference is zero, select Mark as reconciled.",
        ],
        tip: "Start with simple matching rules (amount + date + document number) and add more over time.",
      },
      {
        title: "Transfer money between bank accounts",
        path: "General ledger > Journal entries > General journals",
        steps: [
          "Create a general journal and open Lines.",
          "Account type = Bank, account = the source bank account, Credit amount.",
          "Offset account type = Bank, offset = the destination bank account.",
          "Validate and Post.",
        ],
      },
    ],
    tips: [
      "Use the Cash overview workspace to see bank balances and forecasts.",
      "Positive pay files help prevent check fraud by sending issued checks to the bank.",
    ],
    quiz: [
      { q: "What does bank reconciliation compare?", options: ["Vendors and customers", "Bank transactions in D365 with the bank statement", "Budget and actuals", "POs and invoices"], answer: 1, explain: "Reconciliation compares system bank transactions to the statement." },
      { q: "What automates matching in advanced bank reconciliation?", options: ["Matching rules", "Number sequences", "Workflows", "Posting profiles"], answer: 0, explain: "Reconciliation matching rules auto-match statement lines." },
    ],
  },
  {
    id: "fa",
    name: "Fixed Assets",
    area: "finance",
    summary: "Track long-term assets from acquisition through depreciation to disposal.",
    overview: [
      "Fixed assets manages buildings, vehicles, machines and other long-lived items. Each asset has one or more books that calculate depreciation (for example one for financial reporting and one for tax).",
      "Assets can be acquired through a purchase order, a vendor invoice, or a fixed asset journal. Depreciation is calculated with Depreciation proposals and posted periodically.",
      "When an asset is sold or scrapped, a disposal transaction removes it and posts gain or loss.",
    ],
    concepts: [
      { term: "Fixed asset group", def: "Groups similar assets and provides defaults (books, service life, number sequence)." },
      { term: "Book", def: "Defines depreciation method and posting layer for an asset. An asset can have several books." },
      { term: "Depreciation profile", def: "The method (straight line, reducing balance, etc.) and period frequency." },
      { term: "Service life", def: "The number of years the asset will be depreciated." },
      { term: "Acquisition", def: "The transaction that records the asset's cost." },
      { term: "Disposal (sale / scrap)", def: "Removing the asset, posting proceeds and gain/loss." },
    ],
    tasks: [
      {
        title: "Create a fixed asset",
        path: "Fixed assets > Fixed assets > Fixed assets",
        steps: [
          "Select New.",
          "Select a Fixed asset group — books are added automatically from the group.",
          "Enter a Name and other details (location, serial number).",
          "Select Books to check service life and depreciation profile.",
        ],
      },
      {
        title: "Post depreciation",
        path: "Fixed assets > Journal entries > Fixed assets journal",
        steps: [
          "Create a new journal and open Lines.",
          "Select Proposals > Depreciation proposal.",
          "Choose the Book and the To date, select OK.",
          "Review the generated lines, then Validate and Post.",
        ],
        tip: "Schedule the depreciation proposal as a batch job for large asset registers.",
      },
      {
        title: "Dispose of an asset",
        path: "Fixed assets > Journal entries > Fixed assets journal",
        steps: [
          "Create a journal line for the asset with Transaction type = Disposal - sale or Disposal - scrap.",
          "For a sale, enter the sale amount; the system calculates gain/loss.",
          "Post the journal. Alternatively, sell the asset through a free text invoice.",
        ],
      },
    ],
    tips: [
      "Acquire assets directly from a PO line by setting \"New fixed asset\" on the line.",
      "Use the Fixed asset roll forward report at year-end.",
    ],
    quiz: [
      { q: "Why might an asset have more than one book?", options: ["To track different locations", "To calculate depreciation differently for different purposes (e.g. tax vs financial)", "To store pictures", "Books are not used"], answer: 1, explain: "Multiple books support different depreciation rules, such as tax and GAAP." },
      { q: "Which feature generates depreciation lines?", options: ["Depreciation proposal", "Payment proposal", "Master planning", "Cost rollup"], answer: 0, explain: "Depreciation proposal creates the depreciation journal lines." },
    ],
  },
  {
    id: "budget",
    name: "Budgeting",
    area: "finance",
    summary: "Basic budgeting, budget control and budget planning to compare plans with actuals.",
    overview: [
      "Budgeting lets you enter budget amounts by ledger account and dimensions and compare them with actual results.",
      "Budget control can check available budget when documents (purchase requisitions, POs, journals) are entered and warn or block when the budget is exceeded.",
      "Budget planning provides a workflow-driven process for preparing budgets with worksheets and Excel templates.",
    ],
    concepts: [
      { term: "Budget model", def: "A named version of a budget, e.g. FY27 Original or Forecast." },
      { term: "Budget code", def: "Classifies budget register entries (Original budget, Transfer, Revision)." },
      { term: "Budget register entry", def: "The document used to enter budget amounts." },
      { term: "Budget control", def: "Checks budget funds available when source documents are entered." },
      { term: "Budget cycle", def: "The time span used by budget control (usually a fiscal year)." },
    ],
    tasks: [
      {
        title: "Enter a budget",
        path: "Budgeting > Budget register entries",
        steps: [
          "Select New, choose the Budget model and Budget code.",
          "Add lines with Date, Ledger account (main account + dimensions) and Amount.",
          "Select Complete (or submit to workflow) to make the entry active.",
        ],
      },
      {
        title: "Compare budget with actuals",
        path: "Budgeting > Inquiries and reports > Budget control statistics",
        steps: [
          "Select the budget cycle and dimensions.",
          "Review revised budget, actual expenditure, encumbrances and available funds.",
        ],
      },
    ],
    tips: [
      "Start with basic budgeting for reporting; add budget control only when you need enforcement.",
      "Allocation terms can spread an annual amount evenly across periods.",
    ],
    quiz: [
      { q: "What does budget control do?", options: ["Posts depreciation", "Checks available budget when source documents are entered", "Prints budget reports only", "Creates vendors"], answer: 1, explain: "Budget control validates documents against available funds." },
    ],
  },

  // ---------------------------------------------------------------- SUPPLY CHAIN
  {
    id: "pim",
    name: "Product Information Management",
    area: "scm",
    summary: "Products, released products, variants, dimension groups and item model groups.",
    overview: [
      "Products are defined once as shared products and then released to each legal entity that uses them. The released product holds company-specific settings: prices, costing, warehouses.",
      "Dimension groups control which inventory dimensions (site, warehouse, location, batch, serial…) are tracked. Item model groups control the costing method and inventory policies.",
      "Product masters with variants (size, color, style, configuration) let you manage families of similar items.",
    ],
    concepts: [
      { term: "Product vs Released product", def: "A product is shared master data; a released product is the company-specific version." },
      { term: "Product type / subtype", def: "Item (stocked) or Service; Product (single) or Product master (with variants)." },
      { term: "Storage dimension group", def: "Defines which of Site, Warehouse, Location, Inventory status, License plate are used." },
      { term: "Tracking dimension group", def: "Defines whether Batch and/or Serial numbers are tracked." },
      { term: "Item model group", def: "Sets the inventory model (FIFO, Weighted average, Standard cost…) and policies like 'Stocked product'." },
      { term: "Item group", def: "Groups items for posting (inventory, COGS, revenue accounts)." },
      { term: "Unit of measure / conversion", def: "Units (ea, box, kg) and conversions between them." },
    ],
    tasks: [
      {
        title: "Create and release a product",
        path: "Product information management > Products > Released products",
        steps: [
          "Select New.",
          "Choose Product type (Item or Service) and Product subtype (Product or Product master).",
          "Enter Product number and Product name.",
          "Select Item model group, Item group, Storage dimension group and Tracking dimension group.",
          "Select OK. The product is created and released to the current company.",
          "Complete the Purchase, Sell, Manage inventory and Cost FastTabs.",
        ],
        tip: "To release to other companies, use Product information management > Products > Products > Release products.",
      },
      {
        title: "Set up variants",
        path: "Product information management > Products > Product masters",
        steps: [
          "Create a product master with a Product dimension group (e.g. Size and Color).",
          "Select Product dimensions and add the allowed sizes and colors.",
          "Select Product variants > Variant suggestions to generate the combinations.",
          "Release the variants to the legal entity.",
        ],
      },
    ],
    tips: [
      "Decide dimension groups carefully — they are hard to change once transactions exist.",
      "Use Engineering change management if you need product versions and approvals.",
    ],
    quiz: [
      { q: "Where do you set the costing method (FIFO, Standard cost)?", options: ["Item group", "Item model group", "Storage dimension group", "Unit of measure"], answer: 1, explain: "The inventory model is set on the item model group." },
      { q: "Which group controls whether batch and serial numbers are tracked?", options: ["Tracking dimension group", "Storage dimension group", "Item group", "Customer group"], answer: 0, explain: "Tracking dimension groups handle batch and serial numbers." },
      { q: "A released product is…", options: ["A product that has been sold", "The company-specific version of a shared product", "A discontinued product", "A product variant"], answer: 1, explain: "Releasing a product makes it available in a legal entity." },
    ],
  },
  {
    id: "procurement",
    name: "Procurement & Sourcing",
    area: "scm",
    summary: "Purchase requisitions, requests for quotation, purchase orders, receipts and vendor agreements.",
    overview: [
      "Procurement and sourcing manages how the organization buys goods and services — from an employee's request to the confirmed purchase order and the receipt of goods.",
      "Purchase requisitions capture internal demand and go through approval workflows. Approved requisitions can be released to purchase orders or to requests for quotation (RFQs) to get bids from vendors.",
      "A purchase order (PO) is confirmed, the goods are received (product receipt), and the vendor invoice is posted in Accounts payable. This end-to-end flow is called Procure-to-Pay.",
    ],
    concepts: [
      { term: "Purchase requisition", def: "An internal request to buy, which is reviewed and approved before purchasing." },
      { term: "Request for quotation (RFQ)", def: "A request sent to vendors to bid for supplying goods." },
      { term: "Purchase order (PO)", def: "The document sent to a vendor to order goods/services." },
      { term: "Confirmation", def: "Fixes the PO version sent to the vendor; changes after this create a new version." },
      { term: "Product receipt", def: "Records that goods were received, updating inventory physically." },
      { term: "Purchase agreement", def: "A contract committing to buy a quantity or value over a period at agreed prices." },
      { term: "Trade agreement", def: "Price and discount records for vendors and items." },
      { term: "Procurement category", def: "Hierarchical categories for classifying purchases, especially non-stock items." },
      { term: "Change management", def: "Requires approval workflows when POs are changed." },
    ],
    tasks: [
      {
        title: "Create a purchase order",
        path: "Procurement and sourcing > Purchase orders > All purchase orders",
        steps: [
          "Select New.",
          "Select the Vendor account and select OK.",
          "On the lines, add Item number, Quantity and check Unit price.",
          "Select Purchase > Confirm (or Submit if a workflow is active).",
          "Optionally send the PO to the vendor via print management (email/PDF).",
        ],
      },
      {
        title: "Receive goods (product receipt)",
        path: "Procurement and sourcing > Purchase orders > All purchase orders",
        steps: [
          "Open the confirmed PO.",
          "Select Receive > Product receipt.",
          "Enter the Product receipt number (e.g. the packing slip number).",
          "Set Quantity to Ordered quantity or Receive now, check lines and select OK.",
        ],
        tip: "With Warehouse management enabled, receipts are typically done on the mobile app instead.",
      },
      {
        title: "Create and approve a purchase requisition",
        path: "Procurement and sourcing > Purchase requisitions > All purchase requisitions",
        steps: [
          "Select New, enter a Name and the Requested date.",
          "Add lines from the procurement catalog or with a Procurement category and description.",
          "Select Submit to send it to the approval workflow.",
          "Approved lines are released to purchase orders (automatically or by Release approved purchase requisitions).",
        ],
      },
      {
        title: "Set up a purchase price (trade agreement)",
        path: "Procurement and sourcing > Prices and discounts > Trade agreement journals",
        steps: [
          "Create a new journal with a price/discount journal name.",
          "Add lines: Relation = Price (purch.), Account code = Table, Account = vendor, Item, Amount, From/To dates.",
          "Select Post. The price now defaults on PO lines.",
        ],
      },
    ],
    tips: [
      "The Purchase order preparation and Purchase order receipt and follow-up workspaces help manage open POs.",
      "Use Vendor collaboration so vendors can confirm POs in a portal.",
      "Use charges codes for freight and handling on POs.",
    ],
    quiz: [
      { q: "Which step updates inventory physically for a PO?", options: ["Confirmation", "Product receipt", "Invoice approval", "RFQ"], answer: 1, explain: "The product receipt updates the physical inventory." },
      { q: "What does an RFQ do?", options: ["Pays a vendor", "Requests bids from vendors", "Receives goods", "Creates an item"], answer: 1, explain: "Requests for quotation collect bids from vendors." },
      { q: "Where are vendor prices typically maintained?", options: ["Trade agreements", "Number sequences", "Fiscal calendars", "Item model groups"], answer: 0, explain: "Trade agreements store purchase prices and discounts." },
    ],
  },
  {
    id: "sales",
    name: "Sales & Marketing",
    area: "scm",
    summary: "Sales quotations, sales orders, pricing, packing slips and invoicing — the Order-to-Cash process.",
    overview: [
      "Sales and marketing covers quotations, sales orders, pricing and discounts, and the documents sent to customers.",
      "A typical sales order goes through: create order > confirm > reserve and pick > packing slip (ship) > invoice. Each step updates inventory and, at invoice, the general ledger and accounts receivable.",
      "Pricing comes from trade agreements, sales agreements, discounts and (optionally) Pricing management.",
    ],
    concepts: [
      { term: "Sales quotation", def: "An offer to a customer, which can be converted to a sales order." },
      { term: "Sales order", def: "The customer's order for goods or services." },
      { term: "Order confirmation", def: "Document confirming the order details to the customer." },
      { term: "Reservation", def: "Allocates on-hand inventory to the order line." },
      { term: "Packing slip", def: "Records that goods were shipped; reduces physical inventory." },
      { term: "Sales invoice", def: "Bills the customer; posts revenue, COGS and the customer balance." },
      { term: "Sales agreement", def: "A contract with committed quantities/values and prices." },
      { term: "Delivery terms / Mode of delivery", def: "Who pays freight and how goods are shipped." },
    ],
    tasks: [
      {
        title: "Create and confirm a sales order",
        path: "Sales and marketing > Sales orders > All sales orders",
        steps: [
          "Select New.",
          "Select the Customer account and select OK.",
          "Add lines: Item number, Quantity, check Unit price and Site/Warehouse.",
          "Select Sell > Confirm sales order.",
        ],
      },
      {
        title: "Ship and invoice a sales order",
        path: "Sales and marketing > Sales orders > All sales orders",
        steps: [
          "Open the order. Reserve inventory if needed (Inventory > Reservation on the line).",
          "Select Pick and pack > Post packing slip, set Quantity to All and select OK.",
          "Select Invoice > Generate > Invoice, then OK to post the invoice.",
          "Check the order status: Invoiced.",
        ],
        tip: "With warehouse management enabled, release the order to the warehouse and pick with the mobile app before the packing slip.",
      },
      {
        title: "Create a sales quotation",
        path: "Sales and marketing > Sales quotations > All quotations",
        steps: [
          "Select New and choose the customer (or a prospect).",
          "Add lines and prices.",
          "Send the quotation, then select Follow up > Confirm to convert it into a sales order when accepted.",
        ],
      },
    ],
    tips: [
      "The Sales order processing and inquiry workspace shows orders on hold, backorders and today's deliveries.",
      "Use delivery date control (ATP/CTP) to promise realistic delivery dates.",
      "Return orders (RMAs) handle customer returns and credit notes.",
    ],
    quiz: [
      { q: "Which document reduces physical inventory when goods leave?", options: ["Order confirmation", "Packing slip", "Quotation", "Sales agreement"], answer: 1, explain: "Posting the packing slip records shipment and reduces physical inventory." },
      { q: "When does a sales order post revenue to the general ledger?", options: ["At confirmation", "At reservation", "At invoice", "At quotation"], answer: 2, explain: "The invoice posts revenue, COGS and the customer balance." },
      { q: "What process does create order > ship > invoice > receive payment describe?", options: ["Procure-to-Pay", "Order-to-Cash", "Record-to-Report", "Plan-to-Produce"], answer: 1, explain: "This is the Order-to-Cash process." },
    ],
  },
  {
    id: "inventory",
    name: "Inventory Management",
    area: "scm",
    summary: "On-hand inventory, inventory journals, transfer orders, counting, quality and costing.",
    overview: [
      "Inventory management keeps track of how much of each item is in stock and where. All receipts and issues create inventory transactions with a status (e.g. Ordered, Received, Purchased, Sold, Deducted).",
      "Journals adjust inventory for movements, counting, transfers and BOMs. Transfer orders move stock between warehouses with shipping and receiving steps.",
      "Inventory closing (for FIFO, LIFO, weighted average) settles issues against receipts and adjusts cost.",
    ],
    concepts: [
      { term: "On-hand", def: "Physical and available quantities per item and inventory dimension." },
      { term: "Inventory dimensions", def: "Site, warehouse, location, batch, serial, inventory status, etc." },
      { term: "Movement journal", def: "Adjusts inventory with a user-selected offset ledger account." },
      { term: "Inventory adjustment journal", def: "Adjusts inventory with offset from posting profile setup." },
      { term: "Counting journal", def: "Records physical counts and posts differences." },
      { term: "Transfer order", def: "Moves inventory between warehouses with ship and receive steps." },
      { term: "Inventory closing", def: "Periodic process that settles issues against receipts and adjusts cost." },
      { term: "Quality order", def: "Inspection of items against test groups." },
    ],
    tasks: [
      {
        title: "View on-hand inventory",
        path: "Inventory management > Inquiries and reports > On-hand list",
        steps: [
          "Filter by Item number, Site or Warehouse.",
          "Select Dimensions display to show additional dimensions (location, batch).",
          "Review Physical inventory, Reserved and Available physical quantities.",
        ],
      },
      {
        title: "Adjust inventory with a movement journal",
        path: "Inventory management > Journal entries > Items > Movement",
        steps: [
          "Select New, choose the journal name.",
          "Add lines: Item number, Site, Warehouse, Quantity (positive to add, negative to remove), and Offset account.",
          "Validate and Post.",
        ],
      },
      {
        title: "Count inventory",
        path: "Inventory management > Journal entries > Item counting > Counting",
        steps: [
          "Create a new counting journal.",
          "Select Create lines > On-hand to load expected quantities.",
          "Enter Counted quantities; the system calculates differences.",
          "Post the journal to adjust on-hand.",
        ],
      },
      {
        title: "Move stock with a transfer order",
        path: "Inventory management > Outbound orders > Transfer order",
        steps: [
          "Select New. Choose From warehouse and To warehouse.",
          "Add item lines and quantities.",
          "Select Ship > Ship transfer order.",
          "When the goods arrive, select Receive > Receive.",
        ],
      },
    ],
    tips: [
      "Run inventory recalculation or closing monthly so costs are accurate.",
      "Inventory visibility add-in gives a near real-time, cross-system view of on-hand.",
      "Use Inventory blocking to stop items from being used, e.g. while waiting for quality inspection.",
    ],
    quiz: [
      { q: "Which journal is used to record a physical count?", options: ["Movement journal", "Counting journal", "Transfer journal", "General journal"], answer: 1, explain: "Counting journals record counted quantities and post differences." },
      { q: "What process settles issue transactions against receipts for FIFO/average costing?", options: ["Master planning", "Inventory closing", "Cost rollup", "Settlement"], answer: 1, explain: "Inventory closing adjusts issue cost based on receipts." },
      { q: "A transfer order moves inventory…", options: ["Between legal entities only", "Between warehouses, with ship and receive steps", "To a customer", "To a vendor"], answer: 1, explain: "Transfer orders move stock between warehouses." },
    ],
  },
  {
    id: "wms",
    name: "Warehouse Management",
    area: "scm",
    summary: "Advanced warehousing: locations, license plates, waves, work, location directives and the mobile app.",
    overview: [
      "Warehouse management (WMS) adds detailed, location-level control for warehouses that use it. Warehouse workers do their tasks on the Warehouse Management mobile app.",
      "Work is created for receiving, putaway, picking and moving. Location directives decide where items are put away or picked from. Waves group outbound shipments for picking.",
      "Items must use a storage dimension group with 'Use warehouse management processes' and warehouses must be enabled for WMS.",
    ],
    concepts: [
      { term: "Location", def: "A specific place in the warehouse (aisle-rack-shelf-bin)." },
      { term: "Location profile", def: "Defines properties of a location such as license plate tracking and mixed items." },
      { term: "License plate (LP)", def: "An ID for a pallet, box or container used to track goods." },
      { term: "Work", def: "Instructions for warehouse workers (pick, put) executed on the mobile app." },
      { term: "Work template", def: "Defines how work is created for a work order type." },
      { term: "Location directive", def: "Rules for where to pick and put items." },
      { term: "Wave", def: "Groups shipments for releasing and picking together." },
      { term: "Mobile device menu item", def: "Configures a task (e.g. Purchase receiving) on the mobile app." },
    ],
    tasks: [
      {
        title: "Enable a warehouse for WMS",
        path: "Warehouse management > Setup > Warehouse > Warehouses",
        steps: [
          "Open the warehouse.",
          "Set Use warehouse management processes = Yes.",
          "Set the default receipt and issue locations on the Warehouse FastTab.",
          "Create locations with the location setup wizard or Locations page.",
        ],
      },
      {
        title: "Release a sales order to the warehouse",
        path: "Warehouse management > Release to warehouse > Release to warehouse",
        steps: [
          "Select the orders to release (or open the sales order and select Warehouse > Release to warehouse).",
          "The system creates shipments, loads and waves and processes the wave to create picking work.",
          "Workers pick with the mobile app; then post the packing slip.",
        ],
      },
      {
        title: "Review warehouse work",
        path: "Warehouse management > Work > All work",
        steps: [
          "Filter by Work status (Open, In process, Closed).",
          "Open the work to see pick and put lines.",
          "Assign work to a worker, or cancel/unload work if needed.",
        ],
      },
    ],
    tips: [
      "Start with a simple layout and a few location directives, then add complexity.",
      "Use warehouse management workspaces (Outbound work monitoring, Inbound) to monitor progress.",
    ],
    quiz: [
      { q: "What decides where received goods are put away?", options: ["Work templates", "Location directives", "Waves", "Trade agreements"], answer: 1, explain: "Location directives determine pick and put locations." },
      { q: "What is a license plate?", options: ["A vehicle registration", "An ID for a pallet or container", "A user login", "A product variant"], answer: 1, explain: "License plates identify pallets/containers in WMS." },
    ],
  },
  {
    id: "production",
    name: "Production Control",
    area: "scm",
    summary: "BOMs, routes, resources and production orders — making products from components.",
    overview: [
      "Production control supports discrete, process and lean manufacturing. Discrete manufacturing uses bills of materials (BOMs) and routes; process manufacturing uses formulas.",
      "A production order goes through statuses: Created > Estimated > Scheduled > Released > Started > Reported as finished > Ended.",
      "Shop floor workers can report progress using the Production floor execution interface.",
    ],
    concepts: [
      { term: "Bill of materials (BOM)", def: "The list of components and quantities to make a product." },
      { term: "Route", def: "The sequence of operations and the resources needed." },
      { term: "Resource / Resource group", def: "Machines, people or tools that perform operations." },
      { term: "Production order", def: "An order to produce a quantity of a product." },
      { term: "Estimation", def: "Calculates material and resource consumption and costs." },
      { term: "Picking list", def: "Journal that consumes BOM components." },
      { term: "Report as finished", def: "Records finished goods into inventory." },
      { term: "Cost rollup", def: "Calculates a product's standard cost from BOM and route." },
    ],
    tasks: [
      {
        title: "Create a BOM",
        path: "Product information management > Bills of materials and formulas > Bills of materials",
        steps: [
          "Select New, enter a Name and save.",
          "Add lines: Item number of each component and Quantity.",
          "Select Approve, then link the BOM to the finished item via BOM versions and Activate it.",
        ],
      },
      {
        title: "Run a production order",
        path: "Production control > Production orders > All production orders",
        steps: [
          "Select New production order, pick the Item number and Quantity.",
          "Select Production order > Estimate.",
          "Schedule (Operations scheduling or Job scheduling).",
          "Select Release, then Start (this can post the picking list).",
          "Select Report as finished, then End to calculate final costs.",
        ],
      },
    ],
    tips: [
      "Use Master planning to create planned production orders from demand.",
      "Run cost rollup (Cost management > Predetermined cost policies) when using standard cost.",
    ],
    quiz: [
      { q: "Which production order step records finished goods into inventory?", options: ["Estimate", "Release", "Report as finished", "Schedule"], answer: 2, explain: "Report as finished adds the produced quantity to inventory." },
      { q: "A route defines…", options: ["Components needed", "Operations and resources", "Shipping routes to customers", "Approval workflows"], answer: 1, explain: "Routes describe operations, sequence and resources." },
    ],
  },
  {
    id: "mrp",
    name: "Master Planning",
    area: "scm",
    summary: "Calculate supply needs from demand: coverage settings, planned orders and Planning Optimization.",
    overview: [
      "Master planning (MRP) looks at demand — sales orders, forecasts, safety stock — and supply — on-hand, open POs, production — and suggests planned orders to fill the gaps.",
      "Item coverage settings tell the engine how to plan each item (minimum/maximum, period, requirement). Planned orders are then firmed into purchase, transfer or production orders.",
      "Planning Optimization is the modern, fast planning engine that runs as a service.",
    ],
    concepts: [
      { term: "Master plan", def: "A planning run definition (e.g. DynamicPlan, StaticPlan)." },
      { term: "Coverage group", def: "Defines the coverage code and time fences used for items." },
      { term: "Coverage code", def: "Period, Requirement, Min/Max or Manual — how planned orders are created." },
      { term: "Planned order", def: "A suggestion to purchase, transfer or produce." },
      { term: "Firming", def: "Converting a planned order to an actual order." },
      { term: "Demand forecast", def: "Expected future demand used in planning." },
      { term: "Safety stock", def: "Minimum inventory kept to protect against variability." },
    ],
    tasks: [
      {
        title: "Run master planning",
        path: "Master planning > Master planning > Run > Master planning",
        steps: [
          "Select the Master plan.",
          "Optionally filter items, then select OK (run in batch for large data).",
          "Open Master planning > Master planning > Planned orders to review the results.",
        ],
      },
      {
        title: "Firm planned orders",
        path: "Master planning > Master planning > Planned orders",
        steps: [
          "Select the planned orders you want to convert.",
          "Select Firm.",
          "The system creates purchase, transfer or production orders.",
        ],
      },
      {
        title: "Set item coverage",
        path: "Product information management > Products > Released products > Plan > Item coverage",
        steps: [
          "Select New and enter Site/Warehouse.",
          "Enter Minimum and Maximum quantities or rely on the coverage group.",
          "Optionally set Lead times and preferred vendor.",
        ],
      },
    ],
    tips: [
      "Use action and futures messages to see where orders should be moved or changed.",
      "Keep lead times accurate — they drive planned order dates.",
    ],
    quiz: [
      { q: "What does firming a planned order do?", options: ["Deletes it", "Converts it to a real purchase/production/transfer order", "Sends it to the bank", "Prints it"], answer: 1, explain: "Firming creates the actual order." },
      { q: "Which coverage code plans to keep stock between two levels?", options: ["Requirement", "Period", "Min/Max", "Manual"], answer: 2, explain: "Min/Max replenishes up to maximum when below minimum." },
    ],
  },

  // ---------------------------------------------------------------- PROJECTS & PEOPLE
  {
    id: "projects",
    name: "Project Management & Accounting",
    area: "projects",
    summary: "Projects, contracts, estimates, time and expense, and project invoicing.",
    overview: [
      "Project management and accounting tracks costs and revenue for projects — internal, time and material, or fixed price.",
      "Projects belong to project contracts that define funding sources and billing. Hours, expenses and items are recorded against projects and categories.",
      "Project invoice proposals bring billable transactions together into customer invoices.",
    ],
    concepts: [
      { term: "Project type", def: "Time and material, Fixed price, Investment, Cost project, Internal, or Time." },
      { term: "Project contract", def: "The agreement with the customer, with funding sources and billing rules." },
      { term: "Project category", def: "Classifies transactions (hour, expense, item, fee)." },
      { term: "Work breakdown structure (WBS)", def: "A hierarchy of tasks with effort and schedule." },
      { term: "Timesheet", def: "Workers record hours against projects." },
      { term: "Invoice proposal", def: "Collects billable transactions to create a project invoice." },
      { term: "Revenue recognition / WIP", def: "Recognizing revenue for fixed-price projects as work progresses." },
    ],
    tasks: [
      {
        title: "Create a project",
        path: "Project management and accounting > Projects > All projects",
        steps: [
          "Select New.",
          "Choose Project type, Project group, enter Name and Project contract ID (or create a new contract).",
          "Select Create project.",
          "Plan tasks in the Work breakdown structure if needed.",
        ],
      },
      {
        title: "Record hours on a timesheet",
        path: "Project management and accounting > Timesheets > My timesheets",
        steps: [
          "Select New, choose the week.",
          "Add a line with Project ID, Activity, Category and enter hours per day.",
          "Submit for approval. Approved timesheets post to the project.",
        ],
      },
      {
        title: "Invoice a project",
        path: "Project management and accounting > Project invoices > Project invoice proposals",
        steps: [
          "Select New > Invoice proposal and choose the contract/project.",
          "Select which transactions to include and select OK.",
          "Review the proposal and select Post.",
        ],
      },
    ],
    tips: [
      "Use Project Operations integration if you need advanced resourcing and sales capabilities.",
      "Use Expense management for employee expense reports linked to projects.",
    ],
    quiz: [
      { q: "Which project type bills the customer for actual hours and costs?", options: ["Fixed price", "Time and material", "Internal", "Investment"], answer: 1, explain: "Time and material projects bill actual consumption." },
      { q: "What collects billable project transactions into an invoice?", options: ["Payment proposal", "Invoice proposal", "Depreciation proposal", "Planned order"], answer: 1, explain: "Project invoice proposals group billable transactions." },
    ],
  },
  {
    id: "hr",
    name: "Human Resources",
    area: "projects",
    summary: "Workers, positions, jobs, departments, leave and benefits.",
    overview: [
      "Human resources stores information about workers (employees and contractors), the organization structure and positions.",
      "Workers are assigned to positions; positions belong to departments and jobs. This data is used across modules — for approvals, timesheets, expenses and security.",
      "Leave and absence, benefits management and compensation are managed in the same module.",
    ],
    concepts: [
      { term: "Worker", def: "An employee or contractor." },
      { term: "Job", def: "A generic role (e.g. Accountant) with tasks and skills." },
      { term: "Position", def: "A specific instance of a job in a department, filled by one worker." },
      { term: "Department", def: "An operating unit in the organization hierarchy." },
      { term: "Employment", def: "The worker's employment record with a legal entity and dates." },
      { term: "Leave plan", def: "Defines accrual rules for leave types like vacation." },
    ],
    tasks: [
      {
        title: "Hire a new worker",
        path: "Human resources > Workers > Workers",
        steps: [
          "Select New.",
          "Enter First name, Last name and Employment start date.",
          "Select the Position (or create one) and legal entity.",
          "Select Hire.",
        ],
      },
      {
        title: "Create a position",
        path: "Human resources > Positions > Positions",
        steps: [
          "Select New.",
          "Enter Position ID, Description, Department and Job.",
          "Set Reports to position to place it in the hierarchy.",
          "Save. Then assign a worker on the Worker assignment FastTab.",
        ],
      },
    ],
    tips: [
      "Position hierarchies drive approval workflows (e.g. 'manager of submitter').",
      "Employee self service lets workers update their own information and request leave.",
    ],
    quiz: [
      { q: "What is the difference between a job and a position?", options: ["No difference", "A job is generic; a position is a specific seat in a department filled by one worker", "A position is generic; a job is specific", "Jobs are only for contractors"], answer: 1, explain: "Positions are instances of jobs in the organization." },
    ],
  },
];

/* End-to-end business processes that span modules. */
window.D365_PROCESSES = [
  {
    id: "p2p",
    name: "Procure-to-Pay",
    summary: "Buying goods and services and paying suppliers.",
    steps: [
      { module: "procurement", title: "Purchase requisition", detail: "An employee requests goods; the request is approved through workflow." },
      { module: "procurement", title: "Purchase order", detail: "Purchasing creates and confirms a PO with the vendor." },
      { module: "inventory", title: "Product receipt", detail: "Goods are received and inventory increases (physically)." },
      { module: "ap", title: "Vendor invoice", detail: "AP matches and posts the vendor invoice — inventory becomes financially updated and a vendor balance is created." },
      { module: "ap", title: "Vendor payment", detail: "The payment journal pays the vendor and settles the invoice." },
      { module: "cash", title: "Bank reconciliation", detail: "The payment is matched with the bank statement." },
    ],
  },
  {
    id: "o2c",
    name: "Order-to-Cash",
    summary: "Selling to customers and collecting payment.",
    steps: [
      { module: "sales", title: "Sales quotation", detail: "An offer is sent to the customer (optional)." },
      { module: "sales", title: "Sales order", detail: "The order is entered and confirmed; credit is checked." },
      { module: "wms", title: "Pick & pack", detail: "The warehouse picks the goods (with WMS work if enabled)." },
      { module: "sales", title: "Packing slip", detail: "Shipment is posted and physical inventory decreases." },
      { module: "sales", title: "Sales invoice", detail: "Invoice posts revenue, COGS and a customer balance." },
      { module: "ar", title: "Customer payment", detail: "Payment is recorded and settled against the invoice." },
    ],
  },
  {
    id: "r2r",
    name: "Record-to-Report",
    summary: "Closing the books and producing financial statements.",
    steps: [
      { module: "gl", title: "Subledger posting", detail: "AP, AR, inventory, fixed assets and bank post to the GL." },
      { module: "fa", title: "Depreciation", detail: "Monthly depreciation is posted." },
      { module: "inventory", title: "Inventory closing", detail: "Inventory costs are adjusted." },
      { module: "gl", title: "Accruals & allocations", detail: "Journals for accruals, allocations and adjustments." },
      { module: "gl", title: "Period close", detail: "Periods are put on hold/closed using the Financial period close workspace." },
      { module: "gl", title: "Financial reporting", detail: "Trial balance, P&L and balance sheet are produced." },
    ],
  },
  {
    id: "plan2produce",
    name: "Plan-to-Produce",
    summary: "Planning supply and manufacturing products.",
    steps: [
      { module: "mrp", title: "Demand forecast", detail: "Forecasts and sales orders create demand." },
      { module: "mrp", title: "Master planning", detail: "The planning run creates planned orders." },
      { module: "mrp", title: "Firm planned orders", detail: "Planned orders become production and purchase orders." },
      { module: "production", title: "Release & start", detail: "Production orders are released and components picked." },
      { module: "production", title: "Report as finished", detail: "Finished goods are added to inventory." },
      { module: "production", title: "End & cost", detail: "Ending the order calculates actual cost and variances." },
    ],
  },
];
