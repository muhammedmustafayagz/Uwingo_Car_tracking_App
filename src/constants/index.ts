/**
 * UI Theme Configuration
 * Primary Brand: #E77803 (Burnt Orange)
 */

export const COLORS = {
  // --- Brand Colors ---
  primary: '#E77803',           // Your main orange
  primaryLight: '#FFF4E6',      // Background for active items (Drawer/Tabs)
  primaryDark: '#B96002',     // Darker shade for pressed states

  // Status of Car 
  active: '#00E676',
  violations: '#FF1744',
  inactive: '#999',       // Grayed out buttons or icons

  routeViolation: '#af52dec9',
  speedViolation: '#ff3b30e6',


  // Background variants (15% opacity)
  activeBg: 'rgba(0, 230, 118, 0.1)',
  violationsBg: 'rgba(255, 23, 68, 0.15)',
  inactiveBg: 'rgba(153, 153, 153, 0.15)',


  // --- Functional Action Colors ---
  danger: '#C62828',            // Wrong, Error, Delete (Deep Red)
  dangerLight: '#FFEBEE',       // Background for error alerts/delete buttons

  info: '#0277BD',              // Edit, Details, Blue links (Complementary to Orange)
  infoLight: '#E1F5FE',         // Background for edit buttons

  success: '#2E7D32',           // Save, Complete, Valid (Forest Green)
  successLight: '#E8F5E9',      // Background for success messages

  warning: '#FBC02D',           // Pending, Low Battery, Speed Warning (Amber)
  warningLight: '#FFFDE7',      // Background for warning banners

  // --- Neutrals (Text & Surfaces) ---
  background: '#F8F9FA',        // Screen background color
  surface: '#FFFFFF',           // Card and Modal backgrounds
  textPrimary: '#2D2D2D',       // Main headers and body text
  textSecondary: '#757575',     // Subtitles and labels
  border: '#E0E0E0',            // Subtle dividers and input borders
  disabled: '#BDBDBD'
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  full: 999,
};




































// export const COLORS = {
//   primary: '#E77803',
//   primaryDark: '#0369a1',
//   secondary: '#8b5cf6',
//   accent: '#10b981',
//   warning: '#f59e0b',
//   danger: '#ef4444',
//   info: '#3b82f6',

//   darkBg: '#0a0a0f',
//   darkerBg: '#050508',
//   darkCard: '#12121f',
//   darkerCard: '#0d0d16',
//   darkBorder: '#2a2a3d',

//   lightText: '#f8fafc',
//   grayText: '#a0aec0',

//   successLight: 'rgba(16, 185, 129, 0.2)',
//   warningLight: 'rgba(245, 158, 11, 0.2)',
//   dangerLight: 'rgba(239, 68, 68, 0.2)',
// };




// export const STATUS_COLORS = {
//   active: { bg: 'rgba(16, 185, 129, 0.2)', text: '#10b981' },
//   approved: { bg: 'rgba(16, 185, 129, 0.2)', text: '#10b981' },
//   pending: { bg: 'rgba(245, 158, 11, 0.2)', text: '#f59e0b' },
//   inactive: { bg: 'rgba(239, 68, 68, 0.2)', text: '#ef4444' },
//   moving: { bg: 'rgba(16, 185, 129, 0.2)', text: '#10b981' },
//   stopped: { bg: 'rgba(245, 158, 11, 0.2)', text: '#f59e0b' },
//   offline: { bg: 'rgba(239, 68, 68, 0.2)', text: '#ef4444' },
//   scheduled: { bg: 'rgba(59, 130, 246, 0.2)', text: '#3b82f6' },
//   in_progress: { bg: 'rgba(245, 158, 11, 0.2)', text: '#f59e0b' },
//   completed: { bg: 'rgba(16, 185, 129, 0.2)', text: '#10b981' },
//   cancelled: { bg: 'rgba(239, 68, 68, 0.2)', text: '#ef4444' },
//   rejected: { bg: 'rgba(239, 68, 68, 0.2)', text: '#ef4444' },
//   on_leave: { bg: 'rgba(168, 85, 247, 0.2)', text: '#a855f7' },
// };

