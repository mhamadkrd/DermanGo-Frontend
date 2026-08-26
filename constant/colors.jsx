export const defaultTheme = {
  statusBarStyle: 'dark',
  primary: '#0F766E',        // Deep teal — Sign Up/Sign In buttons, links, active tab, primary actions
  primaryPressed: '#0C5D56', // Darker teal — button pressed state
  accent: '#F59E0B',         // Warm amber — "Request" button, pending badges, highlights

  background: '#FAFAF9',     // Off-white — all screen backgrounds
  surface: '#FFFFFF',        // White — cards, inputs, request/response rows
  border: '#E7E5E4',         // Light warm gray — input borders, dividers

  textPrimary: '#1F2937',    // Near-black — headings, medicine name, entered text
  textSecondary: '#78716C',  // Warm gray — subtext, timestamps, pharmacy address
  placeholder: '#A8A29E',    // Muted taupe — input placeholder text
  textOnPrimary: '#FFFFFF',  // White — text/icons on primary-colored buttons

  success: '#22C55E',        // Green — "Available" status, verified pharmacy badge
  error: '#EF4444',          // Red — "Unavailable" status, delete/remove actions
  disabled: '#D6D3D1',       // Muted beige-gray — disabled buttons/inputs

  statusTints: {
    pending: '#FEF3C7',      // Soft amber — request awaiting responses
    responded: '#DCFCE7',    // Soft green — request has at least one reply
    available: '#DCFCE7',    // Soft green — pharmacy has the medicine
    unavailable: '#FEE2E2',  // Soft red — pharmacy doesn't have the medicine
    closed: '#F1F5F9',       // Soft gray — request closed/expired
  },
};

export const darkTheme = {
  statusBarStyle: 'light',
  primary: '#2DD4BF',        // Brighter teal so it pops on dark background — main buttons/links
  primaryPressed: '#22A699', // Pressed state
  accent: '#FBBF24',         // Slightly lighter amber for visibility — "Request", highlights

  background: '#121212',     // Standard dark-mode background
  surface: '#1E1E1E',        // Cards, inputs, request/response rows (slightly lighter than bg)
  border: '#2E2E2E',         // Subtle dividers/borders on dark surfaces

  textPrimary: '#F2F2F2',    // Near-white — headings, medicine name, entered text
  textSecondary: '#A0A0A0',  // Light gray — subtext, timestamps, pharmacy address
  placeholder: '#6E6E6E',    // Dim gray — placeholder text
  textOnPrimary: '#0B0B0B',  // Near-black text on bright primary buttons for contrast

  success: '#34D399',        // Slightly brighter green for dark bg — "Available" status
  error: '#F87171',          // Slightly brighter red for dark bg — "Unavailable" status
  disabled: '#3A3A3A',       // Dark gray — disabled state

  statusTints: {
    pending: '#3A2E10',      // Dark amber tint
    responded: '#0F2B1C',    // Dark green tint
    available: '#0F2B1C',    // Dark green tint
    unavailable: '#3A1414',  // Dark red tint
    closed: '#1F2428',       // Dark gray tint
  },
};

export const themes = {
  default: defaultTheme,
  dark: darkTheme,
};

export let COLORS = defaultTheme;

export const setActiveTheme = (themeName) => {
  if (themes[themeName]) {
    COLORS = themes[themeName];
  }
};
