// ============================================================================
// Archer C24 v2 Original Admin UI + Hotspot Billing Shared State (app.js)
// Connected to Firebase Realtime Database (admin-pannel-61378) + Render Backend
// ============================================================================

const STORAGE_KEY = "archer_c24_full_original_state_v3";

// Firebase Configuration provided by User
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyA598ooDXbPvBx32o1P7wu6Z7vY7b9qQEI",
  authDomain: "admin-pannel-61378.firebaseapp.com",
  databaseURL: "https://admin-pannel-61378-default-rtdb.firebaseio.com",
  projectId: "admin-pannel-61378",
  storageBucket: "admin-pannel-61378.firebasestorage.app",
  messagingSenderId: "1020878155566",
  appId: "1:1020878155566:web:93db095a2b4600b0da14bf"
};

// Render Backend API URL (Updated automatically or falls back to relative/cloud)
window.RENDER_API_BASE =
  localStorage.getItem("archer_render_api_url") ||
  "https://archer-c24-hotspot-backend.onrender.com";

const DEFAULT_STATE = {
  routerInfo: {
    model: "Archer C24",
    hardwareVersion: "Archer C24 2.0",
    region: "US Ver:2.0",
    serialNumber: "224B561014151",
    firmwareVersion: "1.12.20 Build 230608 Rel.64891n(5553)",
    officialBinName: "c24v2-TPOS-up-boot-128B_2023-06-09_14.01.25.bin",
    officialBinSize: 2544708,
    officialSha256: "A58BFB57CC994B4C15CF9E005E7D20B2CB0E6D81F605ECB0BE4568F0DD91942D",
    officialMd5: "706B35CD68D5D05F087809B1D4E8D17A",
    antiBrickLock: true,
    macAddress: "8C-90-2D-AD-8B-60",
    bssid5G: "8C-90-2D-AD-8B-62",
    wanMacAddress: "8C-90-2D-AD-8B-61",
    lanIp: "192.168.0.101",
    upstreamGatewayIp: "192.168.0.1",
    upstreamGatewayMac: "CC-2D-21-37-BE-70",
    subnetMask: "255.255.255.0",
    ipv6LanIp: "::",
    wanStatus: "Connected",
    wanType: "PPPoE",
    pppoeUser: "gm-masud1",
    pppoePass: "12345678",
    wanIp: "192.168.0.101",
    wanSubnet: "255.255.255.0",
    wanGateway: "192.168.0.1",
    dns1: "8.8.8.8",
    dns2: "8.8.4.4",
    mtu: 1480,
    lanIpType: "Dynamic IP",
    operationMode: "Range Extender",
    smartConnect: false,
    ssid24: "4G",
    pass24: "12345678",
    enable24: true,
    channel24: "Auto (10)",
    channelWidth24: "Auto",
    txPower24: "High",
    ssid5: "5G",
    pass5: "12345678",
    enable5: true,
    channel5: "153",
    channelWidth5: "80MHz",
    txPower5: "High",
    guest24Enable: false,
    guest24Ssid: "TP-Link_Guest_8B60",
    guest5Enable: false,
    guest5Ssid: "TP-Link_Guest_8B60_5G",
    guestPass: "",
    guestAllowLan: false,
    guestIsolation: true,
    dhcpEnable: true,
    dhcpStart: "192.168.0.100",
    dhcpEnd: "192.168.0.199",
    dhcpLease: 120,
    natBoost: true,
    upnpEnable: true,
    dmzEnable: false,
    dmzIp: "",
    spiFirewall: true,
    accessControlEnable: true,
    accessControlMode: "Blacklist",
    qosEnable: false,
    qosUpMbps: 100,
    qosDownMbps: 100,
    ipv6Enable: false,
    ledEnabled: true,
    ledNightMode: false,
    timeZone: "(GMT+06:00) Dhaka, Astana",
    wpsPin: "11024798",
    wpsEnabled: true
  },
  portalSettings: {
    portalEnabled: true,
    hotspotName: "Archer C24 High-Speed Wi-Fi Hotspot (4G / 5G)",
    welcomeNotice:
      "স্বাগতম! ইন্টারনেট ব্যবহার করতে আপনার পছন্দের প্যাকেজটি সিলেক্ট করে bKash, Nagad বা Rocket দিয়ে পেমেন্ট করুন অথবা ভাউচার কোড ব্যবহার করুন।",
    helplineNumber: "01700-000000",
    paymentMode: "both", // 'both' | 'auto' | 'manual'
    autoApproveManual: false,
    freeTrialEnabled: true,
    freeTrialMinutes: 10,
    redirectUrl: "http://192.168.0.1/portal.html",
    bkashEnabled: true,
    bkashNumber: "01711-223344",
    nagadEnabled: true,
    nagadNumber: "01811-223344",
    rocketEnabled: true,
    rocketNumber: "01911-223344-5"
  },
  packages: [
    {
      id: "pkg_1h",
      name: "Quick Browse (1 Hour)",
      durationText: "1 Hour",
      durationMinutes: 60,
      price: 10,
      speedDownMbps: 10,
      speedUpMbps: 5,
      dataLimitMB: 1024,
      popular: false
    },
    {
      id: "pkg_1d",
      name: "Daily Unlimited (24 Hours)",
      durationText: "1 Day",
      durationMinutes: 1440,
      price: 25,
      speedDownMbps: 25,
      speedUpMbps: 15,
      dataLimitMB: 0,
      popular: true
    },
    {
      id: "pkg_7d",
      name: "Weekly Super Pack (7 Days)",
      durationText: "7 Days",
      durationMinutes: 10080,
      price: 100,
      speedDownMbps: 40,
      speedUpMbps: 20,
      dataLimitMB: 0,
      popular: false
    },
    {
      id: "pkg_30d",
      name: "Monthly Turbo (30 Days)",
      durationText: "30 Days",
      durationMinutes: 43200,
      price: 300,
      speedDownMbps: 60,
      speedUpMbps: 30,
      dataLimitMB: 0,
      popular: true
    }
  ],
  vouchers: [
    {
      code: "WIFI-2026-DAY1",
      packageId: "pkg_1d",
      packageName: "Daily Unlimited (24 Hours)",
      price: 25,
      status: "Unused",
      usedBy: "-",
      createdAt: "2026-11-06 20:15"
    },
    {
      code: "TURBO-7DAY-99",
      packageId: "pkg_7d",
      packageName: "Weekly Super Pack (7 Days)",
      price: 100,
      status: "Unused",
      usedBy: "-",
      createdAt: "2026-11-06 21:00"
    }
  ],
  transactions: [
    {
      id: "TXN-9081",
      timestamp: "2026-11-06 21:10",
      customerPhone: "01715-889900",
      clientIp: "192.168.0.103",
      clientMac: "7E-1C-CB-7C-B7-6E",
      method: "bKash",
      mode: "Auto Gateway",
      trxId: "BK982KL10P",
      packageId: "pkg_30d",
      packageName: "Monthly Turbo (30 Days)",
      amount: 300,
      status: "Approved"
    },
    {
      id: "TXN-9082",
      timestamp: "2026-11-06 22:30",
      customerPhone: "01944-556677",
      clientIp: "192.168.0.106",
      clientMac: "3A-D9-01-52-23-F5",
      method: "Nagad",
      mode: "Manual TrxID",
      trxId: "NG55019283",
      packageId: "pkg_1d",
      packageName: "Daily Unlimited (24 Hours)",
      amount: 25,
      status: "Pending"
    }
  ],
  connectedClients: [
    {
      id: "cli_1",
      hostname: "Laptop",
      ip: "192.168.0.104",
      mac: "4C-44-5B-F2-F3-50",
      band: "5G",
      online: true,
      txRxRate: "433 / 433",
      duration: "15 min",
      packageName: "Admin Host",
      downLimitMbps: 0,
      upLimitMbps: 0,
      dataUsedMB: 420,
      dataLimitMB: 0,
      status: "Active"
    },
    {
      id: "cli_2",
      hostname: "Noman",
      ip: "192.168.0.103",
      mac: "7E-1C-CB-7C-B7-6E",
      band: "5G",
      online: true,
      txRxRate: "433 / 433",
      duration: "42 min",
      packageName: "Monthly Turbo (30 Days)",
      downLimitMbps: 60,
      upLimitMbps: 30,
      dataUsedMB: 1250,
      dataLimitMB: 0,
      status: "Active"
    },
    {
      id: "cli_3",
      hostname: "Mamun Bhai",
      ip: "192.168.0.102",
      mac: "D2-31-12-B0-D5-BD",
      band: "2.4G",
      online: true,
      txRxRate: "144 / 144",
      duration: "1 hr 12 min",
      packageName: "Weekly Super Pack (7 Days)",
      downLimitMbps: 40,
      upLimitMbps: 20,
      dataUsedMB: 890,
      dataLimitMB: 0,
      status: "Active"
    },
    {
      id: "cli_4",
      hostname: "Apu",
      ip: "192.168.0.106",
      mac: "3A-D9-01-52-23-F5",
      band: "2.4G",
      online: true,
      txRxRate: "72 / 72",
      duration: "5 min",
      packageName: "Daily Unlimited (Pending)",
      downLimitMbps: 25,
      upLimitMbps: 15,
      dataUsedMB: 0,
      dataLimitMB: 0,
      status: "Pending Payment"
    },
    {
      id: "cli_5",
      hostname: "Me",
      ip: "0.0.0.0",
      mac: "DE-79-04-46-00-73",
      band: "Offline",
      online: false,
      txRxRate: "---",
      duration: "---",
      packageName: "---",
      downLimitMbps: 0,
      upLimitMbps: 0,
      dataUsedMB: 110,
      dataLimitMB: 0,
      status: "Offline"
    },
    {
      id: "cli_6",
      hostname: "Noman (Phone)",
      ip: "0.0.0.0",
      mac: "94-7B-AE-25-74-CC",
      band: "Offline",
      online: false,
      txRxRate: "---",
      duration: "---",
      packageName: "---",
      downLimitMbps: 0,
      upLimitMbps: 0,
      dataUsedMB: 340,
      dataLimitMB: 0,
      status: "Offline"
    },
    {
      id: "cli_7",
      hostname: "Mamun Bhai (2)",
      ip: "0.0.0.0",
      mac: "8E-79-44-38-21-E5",
      band: "Offline",
      online: false,
      txRxRate: "---",
      duration: "---",
      packageName: "---",
      downLimitMbps: 0,
      upLimitMbps: 0,
      dataUsedMB: 510,
      dataLimitMB: 0,
      status: "Offline"
    }
  ],
  systemLogs: [
    "1 0000:00:01 [INFO] System started: Archer C24 2.0 (Firmware 1.12.20 Build 230608 Rel.64891n(5553))",
    "2 0000:00:03 [INFO] LAN interface initialized: IP=192.168.0.1, Mask=255.255.255.0, MAC=8C-90-2D-AD-8B-60",
    "3 0000:00:05 [INFO] WLAN 2.4GHz (SSID: 4G) & 5GHz (SSID: 5G) started",
    "4 0000:02:10 [DHCP] DHCPS: Send ACK to 4C-44-5B-F2-F3-50 (Laptop), IP=192.168.0.104",
    "5 0000:04:22 [DHCP] DHCPS: Send ACK to 7E-1C-CB-7C-B7-6E (Noman), IP=192.168.0.103",
    "6 0000:08:15 [FIREBASE] Realtime Database (admin-pannel-61378) & Render Backend Sync Enabled",
    "7 0000:12:40 [PAYMENT] bKash Auto Gateway verified TrxID BK982KL10P (300 BDT) for MAC 7E-1C-CB-7C-B7-6E",
    "8 0000:18:05 [PAYMENT] Manual Nagad TrxID NG55019283 (25 BDT) submitted by 01944-556677 (Pending Approval)"
  ]
};

function loadHotspotState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
      return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
    return JSON.parse(raw);
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
}

function saveHotspotState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  // Push to Firebase Realtime Database & Render Backend
  if (window.__pushStateToFirebase) {
    window.__pushStateToFirebase(state);
  }
  syncStateToRenderBackend(state);
}

async function syncStateToRenderBackend(state) {
  try {
    await fetch(`${window.RENDER_API_BASE}/api/state`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state)
    });
  } catch (e) {
    // Offline or local mode fallback
  }
}

function appendSystemLog(state, tag, message) {
  const num = state.systemLogs.length + 1;
  const now = new Date();
  const timeStr =
    "0000:" +
    String(now.getHours()).padStart(2, "0") +
    ":" +
    String(now.getMinutes()).padStart(2, "0");
  state.systemLogs.unshift(`${num} ${timeStr} [${tag}] ${message}`);
}

function resetToDefaultState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
  saveHotspotState(DEFAULT_STATE);
  return loadHotspotState();
}

function showToast(msg) {
  const notice = document.getElementById("tpGlobalNotice");
  if (notice) {
    const textEl = notice.querySelector(".text");
    if (textEl) textEl.textContent = msg || "Operation succeeded.";
    notice.style.display = "block";
    clearTimeout(window.__tpNoticeTimer);
    window.__tpNoticeTimer = setTimeout(() => {
      notice.style.display = "none";
    }, 3000);
  }
  const el = document.getElementById("tpToast");
  if (el) {
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => {
      el.classList.remove("show");
    }, 3200);
  }
}

// ============================================================================
// Initialize Firebase Modular SDK (v10) for Realtime Database Sync
// ============================================================================
(async function initFirebaseRealtimeSync() {
  try {
    const [{ initializeApp }, { getDatabase, ref, onValue, set }] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js")
    ]);

    const app = initializeApp(FIREBASE_CONFIG);
    const db = getDatabase(app);
    const stateRef = ref(db, "archer_c24_state");

    window.__pushStateToFirebase = function (newState) {
      try {
        set(stateRef, newState);
      } catch (err) {
        console.warn("Firebase write warning:", err);
      }
    };

    onValue(stateRef, snapshot => {
      const cloudData = snapshot.val();
      if (cloudData && cloudData.routerInfo) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
        if (typeof state !== "undefined") {
          state = cloudData;
        }
        if (typeof refreshAllViews === "function") {
          refreshAllViews();
        }
        if (typeof renderPortal === "function") {
          renderPortal();
        }
        if (typeof checkPendingApprovalStatus === "function") {
          checkPendingApprovalStatus();
        }
      } else {
        // Seed initial state to Firebase if empty
        set(stateRef, loadHotspotState());
      }
    });
    console.log("✅ Firebase Realtime Database connected (admin-pannel-61378)");
  } catch (err) {
    console.warn("Firebase Realtime SDK fallback to REST/localStorage:", err);
  }
})();
