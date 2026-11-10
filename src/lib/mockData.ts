export const mockClients = [
  {
    id: 1,
    companyName: "TechNova Solutions",
    clientCode: "CLI-1001",
    clientName: "Rahul Verma",
    email: "rahul@technova.io",
    phone: "+91 9876543210",
    source: "direct_signup",
    status: "active",
    createdAt: "2026-02-15T10:00:00Z",
  },
  {
    id: 2,
    companyName: "Codex Labs India",
    clientCode: "CLI-1002",
    clientName: "Arvind Codex",
    email: "arvindcodex@gmail.com",
    phone: "+91 6393680693",
    source: "admin",
    status: "active",
    createdAt: "2026-02-20T11:30:00Z",
  },
  {
    id: 3,
    companyName: "Skyline Cloud Services",
    clientCode: "CLI-1003",
    clientName: "Pooja Patel",
    email: "pooja@skylinecloud.in",
    phone: "+91 9919742844",
    source: "form_link",
    status: "active",
    createdAt: "2026-03-01T09:15:00Z",
  },
];

export const mockLeads = [
  {
    id: 1,
    name: "Vikram Malhotra",
    email: "vikram@enterprise.co",
    phone: "+91 9811223344",
    service: "Cloud Hosting Enterprise",
    status: "contacted",
    source: "Website Inquiry",
    created_at: "2026-03-05T14:20:00Z",
  },
  {
    id: 2,
    name: "Sneha Reddy",
    email: "sneha.reddy@fintech.io",
    phone: "+91 9845012345",
    service: "Full Stack Mobile Engineering",
    status: "new",
    source: "Referral",
    created_at: "2026-03-08T16:45:00Z",
  },
];

export const mockProjects = [
  {
    id: 1,
    title: "Healthcare Mobile App & CRM",
    clientName: "TechNova Solutions",
    status: "in_progress",
    progress: 75,
    deadline: "2026-04-30",
    budget: "₹1,50,000",
  },
  {
    id: 2,
    title: "High-Speed NVMe Cloud Migration",
    clientName: "Codex Labs India",
    status: "completed",
    progress: 100,
    deadline: "2026-03-10",
    budget: "₹85,000",
  },
];

export const mockAgreements = [
  {
    id: 1,
    title: "Enterprise Software License & SLA",
    clientName: "Codex Labs India",
    status: "signed",
    token: "agr_token_991823",
    created_at: "2026-02-22T10:00:00Z",
  },
  {
    id: 2,
    title: "Cloud Infrastructure Management Agreement",
    clientName: "TechNova Solutions",
    status: "pending",
    token: "agr_token_771234",
    created_at: "2026-03-02T12:00:00Z",
  },
];
