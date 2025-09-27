// HerbiProof Design System Constants
export const COLORS = {
  // Primary Colors
  primary: '#588157',        // Main green
  primaryDark: '#4a6b49',   // Darker green for hovers
  secondary: '#8B9F7D',     // Lighter green
  accent: '#C8D1C4',        // Very light green
  
  // Background Colors
  background: '#F2EFEA',    // Light cream background
  backgroundAlt: '#FFFFFF', // Pure white
  
  // Text Colors
  textPrimary: '#343A40',   // Dark text
  textSecondary: '#8B9F7D', // Secondary text
  textLight: '#F2EFEA',     // Light text for dark backgrounds
  
  // Status Colors
  success: '#588157',
  warning: '#FFA500',
  error: '#DC3545',
  info: '#007BFF',
  
  // Border Colors
  border: '#D9D9D9',
  borderLight: '#C8D1C4'
};

export const GRADIENTS = {
  primary: 'linear-gradient(135deg, #588157, #8B9F7D)',
  background: 'linear-gradient(135deg, #F2EFEA, #FFFFFF)',
  card: 'linear-gradient(135deg, #F2EFEA, #FFFFFF)'
};

export const ANIMATIONS = {
  transition: 'transition-all duration-300',
  transitionSlow: 'transition-all duration-500',
  hover: 'hover:scale-105 hover:shadow-lg',
  hoverCard: 'hover:shadow-2xl hover:-translate-y-2'
};

export const SHADOWS = {
  sm: '0 2px 4px rgba(88, 129, 87, 0.1)',
  md: '0 4px 20px rgba(88, 129, 87, 0.1)',
  lg: '0 8px 30px rgba(88, 129, 87, 0.3)',
  xl: '0 10px 20px rgba(88, 129, 87, 0.3)'
};

export const SPACING = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '5rem'     // 80px
};

export const TYPOGRAPHY = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  
  // Font Sizes
  text: {
    xs: 'text-xs',      // 12px
    sm: 'text-sm',      // 14px
    base: 'text-base',  // 16px
    lg: 'text-lg',      // 18px
    xl: 'text-xl',      // 20px
    '2xl': 'text-2xl',  // 24px
    '3xl': 'text-3xl',  // 30px
    '4xl': 'text-4xl',  // 36px
    '5xl': 'text-5xl',  // 48px
    '6xl': 'text-6xl'   // 60px
  },
  
  // Font Weights
  weight: {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }
};

export const BUTTON_STYLES = {
  primary: {
    base: `bg-primary text-white px-6 py-3 rounded-full font-semibold ${ANIMATIONS.transition} shadow-lg hover:shadow-xl transform hover:-translate-y-1`,
    hover: 'hover:bg-primaryDark'
  },
  secondary: {
    base: `px-6 py-3 rounded-full font-semibold ${ANIMATIONS.transition} border-2`,
    style: `border-primary text-primary hover:bg-primary hover:text-white`
  },
  icon: {
    base: `p-2 rounded-full ${ANIMATIONS.transition} hover:bg-background`,
    primary: 'text-primary hover:text-primaryDark'
  }
};

export const CARD_STYLES = {
  base: `bg-white rounded-2xl shadow-lg ${ANIMATIONS.transitionSlow} overflow-hidden`,
  hover: 'hover:shadow-2xl hover:-translate-y-4 hover:scale-105',
  content: 'p-6 space-y-4'
};

export const INPUT_STYLES = {
  base: `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${ANIMATIONS.transition}`,
  error: 'border-error',
  normal: 'border-border',
  disabled: 'bg-gray-100'
};

export const BADGE_STYLES = {
  primary: `px-2 py-1 rounded-full text-xs font-medium bg-background text-primary`,
  success: `px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800`,
  warning: `px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800`,
  error: `px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800`,
  info: `px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800`
};

// Utility function to get dynamic styles
export const getButtonStyle = (variant = 'primary', size = 'md') => {
  const baseStyle = BUTTON_STYLES[variant]?.base || BUTTON_STYLES.primary.base;
  const sizeStyle = size === 'sm' ? 'px-4 py-2 text-sm' : size === 'lg' ? 'px-8 py-4 text-lg' : 'px-6 py-3';
  return `${baseStyle} ${sizeStyle}`;
};

export const getTextStyle = (variant = 'primary') => {
  switch (variant) {
    case 'primary':
      return { color: COLORS.primary };
    case 'secondary':
      return { color: COLORS.secondary };
    case 'textPrimary':
      return { color: COLORS.textPrimary };
    case 'textSecondary':
      return { color: COLORS.textSecondary };
    default:
      return { color: COLORS.textPrimary };
  }
};

export const getBackgroundStyle = (variant = 'white') => {
  switch (variant) {
    case 'primary':
      return { backgroundColor: COLORS.primary };
    case 'background':
      return { backgroundColor: COLORS.background };
    case 'gradient':
      return { background: GRADIENTS.primary };
    case 'cardGradient':
      return { background: GRADIENTS.card };
    default:
      return { backgroundColor: COLORS.backgroundAlt };
  }
};

// Component-specific styles
export const PRODUCT_CARD_STYLES = {
  container: `${CARD_STYLES.base} ${CARD_STYLES.hover} cursor-pointer transform`,
  image: `aspect-square flex items-center justify-center text-6xl ${ANIMATIONS.transition}`,
  imageBackground: GRADIENTS.card,
  title: { color: COLORS.primary },
  category: { color: COLORS.secondary },
  price: { color: COLORS.primary },
  benefit: `px-2 py-1 rounded-full text-xs ${ANIMATIONS.transition} hover:scale-105`,
  benefitStyle: { backgroundColor: COLORS.background, color: COLORS.primary },
  button: `w-full text-white py-3 rounded-full font-semibold ${ANIMATIONS.transition} transform hover:scale-105 hover:shadow-lg`,
  buttonStyle: { backgroundColor: COLORS.primary },
  verification: { color: COLORS.secondary }
};

export const DASHBOARD_STYLES = {
  sidebar: { backgroundColor: COLORS.backgroundAlt },
  header: { backgroundColor: COLORS.backgroundAlt, borderBottomColor: COLORS.border },
  main: { backgroundColor: COLORS.background },
  card: `${CARD_STYLES.base} ${CARD_STYLES.content}`,
  stat: {
    container: `${CARD_STYLES.base} p-6 ${ANIMATIONS.transition} ${ANIMATIONS.hover}`,
    title: { color: COLORS.textSecondary },
    value: { color: COLORS.primary },
    icon: { color: COLORS.secondary }
  }
};

export default {
  COLORS,
  GRADIENTS,
  ANIMATIONS,
  SHADOWS,
  SPACING,
  TYPOGRAPHY,
  BUTTON_STYLES,
  CARD_STYLES,
  INPUT_STYLES,
  BADGE_STYLES,
  PRODUCT_CARD_STYLES,
  DASHBOARD_STYLES,
  getButtonStyle,
  getTextStyle,
  getBackgroundStyle
};
