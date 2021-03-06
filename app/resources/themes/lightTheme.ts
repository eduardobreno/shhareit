export const base = {
  FONT_SIZE_TINY: 8,
  FONT_SIZE_SMALL: 10,
  FONT_SIZE_NORMAL: 12,
  FONT_SIZE_MEDIUM: 14,
  FONT_SIZE_LARGE: 16,
  FONT_SIZE_EXTRA_LARGE: 18,
  FONT_SIZE_MASSIVE: 24,

  FONT_WEIGHT_LIGHT: 200,
  FONT_WEIGHT_MEDIUM: 500,
  FONT_WEIGHT_BOLD: 700,

  PRIMARY_FONT_FAMILY: "OpenSans-Regular",
  PRIMARY_FONT_FAMILY_BOLD: "OpenSans-ExtraBoldItalic",

  SECONDARY_FONT_FAMILY: "OpenSans-Regular",
  SECONDARY_FONT_FAMILY_ITALIC: "OpenSans-Italic"
};

export const colors = {
  PRIMARY_BACKGROUND_COLOR: "#ffffff",
  PRIMARY_BACKGROUND_COLOR_LIGHT: "#f7f7f7",

  SECONDARY_BACKGROUND_COLOR: "#3d3d3d",
  SECONDARY_BACKGROUND_COLOR_LIGHT: "#797979",

  PRIMARY_TEXT_COLOR: "#3d3d3d",
  PRIMARY_TEXT_COLOR_LIGHT: "#797979",
  SECONDARY_TEXT_COLOR: "#ffffff",
  PRIMARY_TEXT_BACKGROUND_COLOR: "#ffffff",
  SECONDARY_TEXT_BACKGROUND_COLOR: "#3d3d3d",

  PRIMARY_ERROR_TEXT_COLOR: "#cc0000"
};

export const colorOptions = {
  orange: {
    PRIMARY_COLOR_FAINT: "#FFF3E0",
    PRIMARY_COLOR_LIGHT: "#FFB74D",
    PRIMARY_COLOR: "#FF9800",
    PRIMARY_COLOR_BOLD: "#EF6C00",
    PRIMARY_FOREGROUND_COLOR: "#ffffff"
  },
  red: {
    PRIMARY_COLOR_FAINT: "#FFEBEE",
    PRIMARY_COLOR_LIGHT: "#E57373",
    PRIMARY_COLOR: "#F44336",
    PRIMARY_COLOR_BOLD: "#C62828",
    PRIMARY_FOREGROUND_COLOR: "#ffffff"
  },
  blue: {
    PRIMARY_COLOR_FAINT: "#E3F2FD",
    PRIMARY_COLOR_LIGHT: "#64B5F6",
    PRIMARY_COLOR: "#2196F3",
    PRIMARY_COLOR_BOLD: "#1565C0",
    PRIMARY_FOREGROUND_COLOR: "#ffffff"
  },
  cyan: {
    PRIMARY_COLOR_FAINT: "#E0F7FA",
    PRIMARY_COLOR_LIGHT: "#4DD0E1",
    PRIMARY_COLOR: "#00BCD4",
    PRIMARY_COLOR_BOLD: "#00838F",
    PRIMARY_FOREGROUND_COLOR: "#ffffff"
  },
  teal: {
    PRIMARY_COLOR_FAINT: "#E0F2F1",
    PRIMARY_COLOR_LIGHT: "#4DB6AC",
    PRIMARY_COLOR: "#009688",
    PRIMARY_COLOR_BOLD: "#00695C",
    PRIMARY_FOREGROUND_COLOR: "#ffffff"
  },
  gray: {
    PRIMARY_COLOR_FAINT: "#FAFAFA",
    PRIMARY_COLOR_LIGHT: "#E0E0E0",
    PRIMARY_COLOR: "#9E9E9E",
    PRIMARY_COLOR_BOLD: "#424242",
    PRIMARY_FOREGROUND_COLOR: "#ffffff"
  },
  purlple: {
    PRIMARY_COLOR_FAINT: "#EDE7F6",
    PRIMARY_COLOR_LIGHT: "#9575CD",
    PRIMARY_COLOR: "#673AB7",
    PRIMARY_COLOR_BOLD: "#4527A0",
    PRIMARY_FOREGROUND_COLOR: "#ffffff"
  },
  green: {
    PRIMARY_COLOR_FAINT: "#E8F5E9",
    PRIMARY_COLOR_LIGHT: "#81C784",
    PRIMARY_COLOR: "#4CAF50",
    PRIMARY_COLOR_BOLD: "#2E7D32",
    PRIMARY_FOREGROUND_COLOR: "#ffffff"
  }
};

export const stl = {
  H1: {
    fontFamily: base.PRIMARY_FONT_FAMILY,
    fontSize: base.FONT_SIZE_MASSIVE,
    color: colors.PRIMARY_TEXT_COLOR
  },
  H2: {
    fontFamily: base.PRIMARY_FONT_FAMILY,
    fontSize: base.FONT_SIZE_LARGE,
    color: colors.PRIMARY_TEXT_COLOR
  },
  TXT_NORMAL: {
    fontFamily: base.PRIMARY_FONT_FAMILY,
    fontSize: base.FONT_SIZE_MEDIUM,
    color: colors.PRIMARY_TEXT_COLOR
  },
  TXT_ERROR: {
    fontFamily: base.PRIMARY_FONT_FAMILY,
    fontSize: base.FONT_SIZE_MEDIUM,
    color: colors.PRIMARY_ERROR_TEXT_COLOR
  },
  TXT_DIVIDER: {
    backgroundColor: "#ccc",
    paddingTop: 1,
    paddingBottom: 1,
    marginTop: 10,
    marginBottom: 10
  },
  BTN_PADDING: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20
  },
  BTN_TXT_NORMAL: {
    fontFamily: base.PRIMARY_FONT_FAMILY,
    fontSize: base.FONT_SIZE_LARGE
  },
  divider: {
    flex: 1,
    backgroundColor: "#ccc",
    marginTop: 5,
    marginBottom: 5,
    height: 1
  },
  tab: {
    activeTintColor: colors.PRIMARY_TEXT_COLOR,
    activeBackgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
    inactiveTintColor: colors.PRIMARY_TEXT_COLOR_LIGHT,
    inactiveBackgroundColor: colors.PRIMARY_BACKGROUND_COLOR_LIGHT
  }
};
