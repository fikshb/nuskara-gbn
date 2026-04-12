export type Locale = "en" | "id";

export interface Translations {
  nav: {
    links: { label: string; href: string }[];
    cta: string;
  };
  hero: {
    badge: string;
    headline: string[];
    headlineHighlight: string;
    subtitle: string;
    tags: string[];
    description: string;
    cta: string;
    kpis: { value: string; label: string }[];
  };
  overview: {
    overline: string;
    headline: string;
    headlineHighlight: string;
    description: string[];
    stats: { value: number; suffix: string; label: string }[];
    vision: {
      title: string;
      text: string;
    };
    mission: {
      title: string;
      items: string[];
    };
  };
  services: {
    overline: string;
    headline: string;
    headlineHighlight: string;
    description: string;
    cards: {
      title: string;
      description: string;
      bullets: string[];
    }[];
  };
  pgbn: {
    overline: string;
    headline: string;
    headlineHighlight: string;
    description: string;
    companyName: string;
    tagline: string;
    services: {
      title: string;
      description: string;
    }[];
    stats: { value: string; label: string }[];
    routes: string[];
  };
  fleet: {
    overline: string;
    headline: string;
    headlineHighlight: string;
    description: string;
    systems: {
      title: string;
      description: string;
      icon: string;
    }[];
    stats: { value: string; label: string }[];
  };
  coverage: {
    overline: string;
    headline: string;
    headlineHighlight: string;
    description: string;
    stats: { value: string; label: string }[];
    regions: string[];
  };
  clients: {
    overline: string;
    headline: string;
    headlineHighlight: string;
    description: string;
    names: string[];
  };
  contact: {
    overline: string;
    headline: string;
    headlineHighlight: string;
    info: {
      address: string[];
      email: string;
      phone: string;
      operationalLabel: string;
      operationalAddress: string[];
    };
    form: {
      name: string;
      email: string;
      company: string;
      message: string;
      submit: string;
    };
  };
  footer: {
    description: string;
    columns: {
      title: string;
      links: { label: string; href: string }[];
    }[];
    copyright: string;
    privacyPolicy: string;
    termsOfService: string;
  };
  map: {
    locations: string[];
    hqLabel: string;
  };
}

const en: Translations = {
  nav: {
    links: [
      { label: "Overview", href: "#overview" },
      { label: "Services", href: "#services" },
      { label: "Maritime", href: "#pgbn" },
      { label: "Fleet & Tech", href: "#fleet" },
      { label: "Coverage", href: "#coverage" },
    ],
    cta: "Contact Us",
  },
  hero: {
    badge: "PT GARUDA BAKTI NUSANTARA",
    headline: ["Integrated Mining", "Logistics Across"],
    headlineHighlight: "Indonesia",
    subtitle: "A Nuskara Group Company",
    tags: [
      "Freight Forwarding",
      "Explosives Transport",
      "Intermodal Logistics",
      "Licensed Operator",
    ],
    description:
      "Nationwide logistics provider specializing in mining supply chain, commercial explosives transport, and integrated freight solutions since 2013.",
    cta: "Explore Our Services",
    kpis: [
      { value: "10+", label: "Years Operating" },
      { value: "9", label: "Provinces Covered" },
      { value: "24/7", label: "Operations" },
    ],
  },
  overview: {
    overline: "COMPANY PROFILE",
    headline: "Foundation of the",
    headlineHighlight: "Nuskara Ecosystem",
    description: [
      "Established in 2013, PT Garuda Bakti Nusantara is the foundation company of the Nuskara group. Licensed by the Indonesian National Police (Polri), GBN maintains consistent practices in security and safety assurance for its logistics fleet operations.",
      "As a trusted logistics partner for companies in the general mining industry for commercial explosives logistics services, GBN offers integrated logistics solutions for oil and gas companies in Indonesia, particularly in production and exploration activities. Full permit management for logistics and transportation across Indonesia.",
    ],
    stats: [
      { value: 2013, suffix: "", label: "Established" },
      { value: 8, suffix: "+", label: "Mining Clients" },
      { value: 9, suffix: "", label: "Provinces" },
      { value: 100, suffix: "%", label: "Safety Record" },
    ],
    vision: {
      title: "Vision",
      text: "To become a logistics service provider with regional reach and international standards, recognized as a reliable business partner with integrity in supply chain operations.",
    },
    mission: {
      title: "Mission",
      items: [
        "Deliver quality customer service with consistency and reliability across all operations",
        "Develop innovative logistics solutions through information technology capabilities",
        "Maintain the highest safety standards in hazardous material transportation",
      ],
    },
  },
  services: {
    overline: "CORE SERVICES",
    headline: "Three Pillars of",
    headlineHighlight: "Logistics Excellence",
    description:
      "GBN operates across three specialized service verticals, each backed by proper licensing, trained personnel, and nationwide operational coverage.",
    cards: [
      {
        title: "Freight Forwarding",
        description:
          "Comprehensive freight solutions with agents and network coverage across Indonesia. Full range of shipping modes and warehouse integration.",
        bullets: [
          "Door to door and port to port shipping",
          "Intermodal transport systems",
          "Warehouse management and distribution",
          "Permit arrangements nationwide",
        ],
      },
      {
        title: "Commercial Explosives Transport",
        description:
          "Polri licensed carrier for commercial explosives materials. Specialized fleet and trained crew for safe, compliant transportation.",
        bullets: [
          "Licensed by Kepolisian Republik Indonesia",
          "Specialized safety compliant vehicles",
          "Trained hazmat transport personnel",
          "Real time tracking and monitoring",
        ],
      },
      {
        title: "Occupational Health & Safety",
        description:
          "Over 10 years of consistent implementation of OHS principles in commercial explosives transportation services.",
        bullets: [
          "Consistent K3 implementation in explosives transport for over a decade",
          "Logistics security quality control and regulatory compliance",
          "Internal audit implementation for K3 assurance",
        ],
      },
    ],
  },
  pgbn: {
    overline: "MARITIME LOGISTICS DIVISION",
    headline: "Connecting Islands Through",
    headlineHighlight: "Maritime Power",
    description:
      "PT PGBN operates as GBN's dedicated maritime logistics arm, providing sea freight and coastal shipping services that connect Indonesia's mining regions across the archipelago.",
    companyName: "PT PGBN",
    tagline: "Maritime Logistics Subsidiary of GBN",
    services: [
      {
        title: "Sea Freight & Cargo",
        description: "Bulk and container shipping services across major Indonesian sea routes, connecting mining sites to processing facilities and export ports.",
      },
      {
        title: "Barge & Tugboat Operations",
        description: "Specialized barge fleet for transporting mining commodities through inland waterways and coastal shipping lanes.",
      },
      {
        title: "Port Logistics & Handling",
        description: "Comprehensive port side operations including cargo handling, storage, and customs facilitation at key Indonesian ports.",
      },
    ],
    stats: [
      { value: "21", label: "Port Locations" },
      { value: "16", label: "Provinces" },
      { value: "3", label: "Shipping Lines" },
      { value: "1M+", label: "Tons Shipped" },
    ],
    routes: [
      "Line 1 — Sumatera",
      "Line 2 — Kalimantan & Papua",
      "Line 3 — Sulawesi",
      "Jakarta — Surabaya — NTB — Kupang",
    ],
  },
  fleet: {
    overline: "FLEET & TECHNOLOGY",
    headline: "Powered by",
    headlineHighlight: "Smart Logistics",
    description:
      "Our operations are driven by advanced management systems that ensure efficiency, accuracy, and real time visibility across the entire supply chain.",
    systems: [
      {
        title: "Intermodal Mining Logistics Network",
        description: "Strategic vendor network providing combined transportation fleet and handling services across Sumatra, Kalimantan, and Sulawesi.",
        icon: "network",
      },
      {
        title: "Integrated Commercial Explosives Logistics",
        description: "Providing door to door or port to port services tailored to client requirements for commercial explosives materials.",
        icon: "data",
      },
      {
        title: "Service Excellence Commitment",
        description: "High commitment to service quality that ensures security in every logistics activity across all operations.",
        icon: "warehouse",
      },
      {
        title: "Logistics Fleet Security System",
        description: "Implementation of occupational health and safety procedures that serve as the fundamental guideline for all logistics activities.",
        icon: "tracking",
      },
    ],
    stats: [
      { value: "50+", label: "Transport Units" },
      { value: "12+", label: "Warehouse Locations" },
      { value: "99.8%", label: "On Time Delivery" },
      { value: "0", label: "Safety Incidents" },
    ],
  },
  coverage: {
    overline: "OPERATIONAL COVERAGE",
    headline: "Nationwide",
    headlineHighlight: "Logistics Network",
    description:
      "With headquarters in Jakarta and operational presence across 9 provinces, GBN provides seamless logistics coverage throughout Indonesia's key mining corridors.",
    stats: [
      { value: "9", label: "Provinces" },
      { value: "15+", label: "Depot Locations" },
      { value: "Nationwide", label: "Coverage" },
    ],
    regions: [
      "DKI Jakarta (HQ)",
      "Jawa Barat",
      "Jawa Timur",
      "Kalimantan Timur",
      "Kalimantan Selatan",
      "Sulawesi Selatan",
      "Sumatera Utara",
      "Sumatera Selatan",
      "Papua",
    ],
  },
  clients: {
    overline: "TRUSTED BY",
    headline: "Industry",
    headlineHighlight: "Partners",
    description:
      "GBN serves as a trusted logistics partner for leading mining, energy, and explosives companies operating across Indonesia.",
    names: [
      "Berau Coal",
      "BME",
      "Dyno Nobel",
      "Dahana",
      "DAN",
      "DNX",
      "Orica",
      "Findal",
      "PT Kaltim Nitrate Indonesia",
      "MNK/BME",
      "Mexis",
    ],
  },
  contact: {
    overline: "GET IN TOUCH",
    headline: "Start a",
    headlineHighlight: "Conversation",
    info: {
      address: [
        "Talavera Office Park, 28th Floor",
        "Jl. TB Simatupang Kav. 22-26",
        "Cilandak Barat, Cilandak",
        "Jakarta Selatan 12430",
      ],
      email: "admin@grdbnusa.com",
      phone: "+62 21 7599 8000",
      operationalLabel: "Operational Office",
      operationalAddress: [
        "Gedung Wisma Kemang, Ground Floor",
        "Jl. Kemang Selatan Raya No.1",
        "Jakarta Selatan",
      ],
    },
    form: {
      name: "Full Name",
      email: "Email Address",
      company: "Company Name",
      message: "Your Message",
      submit: "Send Message",
    },
  },
  footer: {
    description:
      "PT Garuda Bakti Nusantara is an integrated mining logistics company and a subsidiary of PT Nuskara Karya Raya Indonesia. Licensed nationwide freight and explosives transport operator.",
    columns: [
      {
        title: "Services",
        links: [
          { label: "Freight Forwarding", href: "#services" },
          { label: "Explosives Transport", href: "#services" },
          { label: "Health & Safety", href: "#services" },
          { label: "Warehouse Solutions", href: "#fleet" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About GBN", href: "#overview" },
          { label: "Coverage Area", href: "#coverage" },
          { label: "Our Clients", href: "#clients" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        title: "Compliance",
        links: [
          { label: "Safety Standards", href: "#" },
          { label: "Polri License", href: "#" },
          { label: "Environmental Policy", href: "#" },
          { label: "Quality Assurance", href: "#" },
        ],
      },
    ],
    copyright: "PT Garuda Bakti Nusantara. All rights reserved.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
  },
  map: {
    locations: [
      "DKI Jakarta (HQ)",
      "Jawa Barat",
      "Jawa Timur",
      "Kalimantan Timur",
      "Kalimantan Selatan",
      "Sulawesi Selatan",
      "Sumatera Utara",
      "Sumatera Selatan",
      "Papua",
    ],
    hqLabel: "HQ",
  },
};

const id: Translations = {
  nav: {
    links: [
      { label: "Profil", href: "#overview" },
      { label: "Layanan", href: "#services" },
      { label: "Maritim", href: "#pgbn" },
      { label: "Armada & Teknologi", href: "#fleet" },
      { label: "Jangkauan", href: "#coverage" },
    ],
    cta: "Hubungi Kami",
  },
  hero: {
    badge: "PT GARUDA BAKTI NUSANTARA",
    headline: ["Logistik Pertambangan", "Terintegrasi di"],
    headlineHighlight: "Indonesia",
    subtitle: "Bagian dari Nuskara Group",
    tags: [
      "Freight Forwarding",
      "Transportasi Handak",
      "Logistik Intermodal",
      "Operator Berizin",
    ],
    description:
      "Penyedia jasa logistik nasional yang mengkhususkan diri dalam rantai pasok pertambangan, transportasi bahan peledak komersial, dan solusi freight terintegrasi sejak 2013.",
    cta: "Jelajahi Layanan Kami",
    kpis: [
      { value: "10+", label: "Tahun Beroperasi" },
      { value: "9", label: "Provinsi Terjangkau" },
      { value: "24/7", label: "Operasional" },
    ],
  },
  overview: {
    overline: "PROFIL PERUSAHAAN",
    headline: "Fondasi dari",
    headlineHighlight: "Ekosistem Nuskara",
    description: [
      "Didirikan pada tahun 2013, PT Garuda Bakti Nusantara merupakan perusahaan fondasi dari grup Nuskara. Berlisensi dari Kepolisian Republik Indonesia, GBN memiliki praktek yang konsisten dalam jaminan keamanan dan keselamatan untuk penggunaan armada logistik.",
      "Mitra logistik bagi perusahaan di industri pertambangan umum untuk jasa logistik bahan peledak komersial, GBN menawarkan solusi logistik terpadu bagi perusahaan migas di Indonesia terutama dalam kegiatan produksi dan eksplorasi. Pengurusan izin logistik dan transportasi di seluruh Indonesia.",
    ],
    stats: [
      { value: 2013, suffix: "", label: "Didirikan" },
      { value: 8, suffix: "+", label: "Klien Tambang" },
      { value: 9, suffix: "", label: "Provinsi" },
      { value: 100, suffix: "%", label: "Rekam Keselamatan" },
    ],
    vision: {
      title: "Visi",
      text: "Menjadi penyedia jasa logistik berskala regional dengan standar internasional, diakui sebagai mitra bisnis yang andal dan berintegritas dalam operasi rantai pasok.",
    },
    mission: {
      title: "Misi",
      items: [
        "Memberikan layanan pelanggan berkualitas dengan konsistensi dan keandalan di seluruh operasi",
        "Mengembangkan solusi logistik inovatif melalui kemampuan teknologi informasi",
        "Mempertahankan standar keselamatan tertinggi dalam transportasi bahan berbahaya",
      ],
    },
  },
  services: {
    overline: "LAYANAN INTI",
    headline: "Tiga Pilar",
    headlineHighlight: "Keunggulan Logistik",
    description:
      "GBN beroperasi di tiga vertikal layanan khusus, masing masing didukung oleh perizinan yang tepat, personel terlatih, dan cakupan operasional nasional.",
    cards: [
      {
        title: "Freight Forwarding",
        description:
          "Solusi freight komprehensif dengan agen dan jaringan cakupan di seluruh Indonesia. Berbagai moda pengiriman dan integrasi pergudangan.",
        bullets: [
          "Pengiriman door to door dan port to port",
          "Sistem transportasi intermodal",
          "Manajemen gudang dan distribusi",
          "Pengurusan izin se Indonesia",
        ],
      },
      {
        title: "Transportasi Bahan Peledak Komersial",
        description:
          "Pengangkut berlisensi Polri untuk bahan peledak komersial. Armada khusus dan kru terlatih untuk transportasi yang aman dan patuh regulasi.",
        bullets: [
          "Berlisensi Kepolisian Republik Indonesia",
          "Kendaraan khusus berstandar keselamatan",
          "Personel transportasi hazmat terlatih",
          "Pelacakan dan monitoring real time",
        ],
      },
      {
        title: "Keamanan dan Keselamatan Kerja",
        description:
          "Konsistensi selama lebih dari 10 tahun dalam implementasi prinsip K3 dalam jasa transportasi bahan peledak komersial.",
        bullets: [
          "Konsistensi implementasi K3 dalam transportasi bahan peledak selama lebih dari satu dekade",
          "Kontrol kualitas keamanan logistik dan kepatuhan regulasi",
          "Penerapan audit internal dalam pelaksanaan jaminan prinsip K3",
        ],
      },
    ],
  },
  pgbn: {
    overline: "DIVISI LOGISTIK MARITIM",
    headline: "Menghubungkan Pulau Melalui",
    headlineHighlight: "Kekuatan Maritim",
    description:
      "PT PGBN beroperasi sebagai divisi logistik maritim GBN, menyediakan layanan sea freight dan pelayaran pesisir yang menghubungkan wilayah pertambangan Indonesia di seluruh kepulauan.",
    companyName: "PT PGBN",
    tagline: "Anak Perusahaan Logistik Maritim GBN",
    services: [
      {
        title: "Sea Freight & Kargo",
        description: "Layanan pengiriman bulk dan kontainer melalui rute laut utama Indonesia, menghubungkan lokasi tambang ke fasilitas pengolahan dan pelabuhan ekspor.",
      },
      {
        title: "Operasi Tongkang & Tugboat",
        description: "Armada tongkang khusus untuk mengangkut komoditas pertambangan melalui jalur perairan darat dan pelayaran pesisir.",
      },
      {
        title: "Logistik & Penanganan Pelabuhan",
        description: "Operasi pelabuhan komprehensif termasuk penanganan kargo, penyimpanan, dan fasilitasi kepabeanan di pelabuhan utama Indonesia.",
      },
    ],
    stats: [
      { value: "21", label: "Lokasi Pelabuhan" },
      { value: "16", label: "Provinsi" },
      { value: "3", label: "Jalur Pelayaran" },
      { value: "1M+", label: "Ton Terkirim" },
    ],
    routes: [
      "Line 1 — Sumatera",
      "Line 2 — Kalimantan & Papua",
      "Line 3 — Sulawesi",
      "Jakarta — Surabaya — NTB — Kupang",
    ],
  },
  fleet: {
    overline: "ARMADA & TEKNOLOGI",
    headline: "Didukung oleh",
    headlineHighlight: "Logistik Cerdas",
    description:
      "Operasi kami digerakkan oleh sistem manajemen canggih yang memastikan efisiensi, akurasi, dan visibilitas real time di seluruh rantai pasok.",
    systems: [
      {
        title: "Jaringan Intermodal Logistik Pertambangan",
        description: "Memiliki jaringan vendor strategis untuk penyediaan kombinasi armada transportasi dan handling di area Sumatera, Kalimantan dan Sulawesi.",
        icon: "network",
      },
      {
        title: "Sistim Pelayanan Logistik Bahan Peledak Komersial Terpadu",
        description: "Menyediakan layanan door to door atau port to port yang disesuaikan dengan kebutuhan client.",
        icon: "data",
      },
      {
        title: "Komitmen Layanan Prima",
        description: "Komitmen yang tinggi terhadap kualitas layanan yang menjamin keamanan dalam setiap kegiatan logistik.",
        icon: "warehouse",
      },
      {
        title: "Sistim Keamanan Armada Logistik",
        description: "Penerapan prosedur keamanan dan keselamatan kerja yang telah menjadi pedoman dasar penyediaan seluruh kegiatan logistik.",
        icon: "tracking",
      },
    ],
    stats: [
      { value: "50+", label: "Unit Transportasi" },
      { value: "12+", label: "Lokasi Gudang" },
      { value: "99.8%", label: "Pengiriman Tepat Waktu" },
      { value: "0", label: "Insiden Keselamatan" },
    ],
  },
  coverage: {
    overline: "JANGKAUAN OPERASIONAL",
    headline: "Jaringan Logistik",
    headlineHighlight: "Nasional",
    description:
      "Dengan kantor pusat di Jakarta dan kehadiran operasional di 9 provinsi, GBN menyediakan cakupan logistik menyeluruh di seluruh koridor pertambangan utama Indonesia.",
    stats: [
      { value: "9", label: "Provinsi" },
      { value: "15+", label: "Lokasi Depot" },
      { value: "Nasional", label: "Cakupan" },
    ],
    regions: [
      "DKI Jakarta (HQ)",
      "Jawa Barat",
      "Jawa Timur",
      "Kalimantan Timur",
      "Kalimantan Selatan",
      "Sulawesi Selatan",
      "Sumatera Utara",
      "Sumatera Selatan",
      "Papua",
    ],
  },
  clients: {
    overline: "DIPERCAYA OLEH",
    headline: "Mitra",
    headlineHighlight: "Industri",
    description:
      "GBN berperan sebagai mitra logistik terpercaya bagi perusahaan pertambangan, energi, dan bahan peledak terkemuka yang beroperasi di seluruh Indonesia.",
    names: [
      "Berau Coal",
      "BME",
      "Dyno Nobel",
      "Dahana",
      "DAN",
      "DNX",
      "Orica",
      "Findal",
      "PT Kaltim Nitrate Indonesia",
      "MNK/BME",
      "Mexis",
    ],
  },
  contact: {
    overline: "HUBUNGI KAMI",
    headline: "Mulai",
    headlineHighlight: "Percakapan",
    info: {
      address: [
        "Talavera Office Park, Lantai 28",
        "Jl. TB Simatupang Kav. 22-26",
        "Cilandak Barat, Cilandak",
        "Jakarta Selatan 12430",
      ],
      email: "admin@grdbnusa.com",
      phone: "+62 21 7599 8000",
      operationalLabel: "Kantor Operasional",
      operationalAddress: [
        "Gedung Wisma Kemang, Lantai Dasar",
        "Jl. Kemang Selatan Raya No.1",
        "Jakarta Selatan",
      ],
    },
    form: {
      name: "Nama Lengkap",
      email: "Alamat Email",
      company: "Nama Perusahaan",
      message: "Pesan Anda",
      submit: "Kirim Pesan",
    },
  },
  footer: {
    description:
      "PT Garuda Bakti Nusantara adalah perusahaan logistik pertambangan terintegrasi dan anak perusahaan dari PT Nuskara Karya Raya Indonesia. Operator freight dan transportasi bahan peledak berlisensi nasional.",
    columns: [
      {
        title: "Layanan",
        links: [
          { label: "Freight Forwarding", href: "#services" },
          { label: "Transportasi Handak", href: "#services" },
          { label: "K3", href: "#services" },
          { label: "Solusi Pergudangan", href: "#fleet" },
        ],
      },
      {
        title: "Perusahaan",
        links: [
          { label: "Tentang GBN", href: "#overview" },
          { label: "Area Jangkauan", href: "#coverage" },
          { label: "Klien Kami", href: "#clients" },
          { label: "Kontak", href: "#contact" },
        ],
      },
      {
        title: "Kepatuhan",
        links: [
          { label: "Standar Keselamatan", href: "#" },
          { label: "Lisensi Polri", href: "#" },
          { label: "Kebijakan Lingkungan", href: "#" },
          { label: "Jaminan Kualitas", href: "#" },
        ],
      },
    ],
    copyright: "PT Garuda Bakti Nusantara. Hak cipta dilindungi.",
    privacyPolicy: "Kebijakan Privasi",
    termsOfService: "Syarat & Ketentuan",
  },
  map: {
    locations: [
      "DKI Jakarta (HQ)",
      "Jawa Barat",
      "Jawa Timur",
      "Kalimantan Timur",
      "Kalimantan Selatan",
      "Sulawesi Selatan",
      "Sumatera Utara",
      "Sumatera Selatan",
      "Papua",
    ],
    hqLabel: "HQ",
  },
};

export const translations = { en, id };
