const colors = require("tailwindcss/colors");

/*
Okay so what happens is here we export this file and then we import it 
into talwind config and we add this ot the default theme
we can also obviously set a bunch of other things in here

CSS goals are 
TODO:
1. Get rid of all custom classes I don't recognize 
2. Consolidate components
3. Figure out why css in litemode is not working --> sometimes you need a full restart
4. get rid of themes we don't use
5. those class names lowkey might be tailwind config stuff lol
*/

module.exports = {
  /**
   * Color Palette - Purple Heart
   */
  purpleheart: {
    colors: {
      primary: colors.purple[700],
      secondary: colors.purple[800],
      dark: {
        primary: colors.purple[300],
        secondary: colors.purple[500],
      },
      accent: {
        gray: {
          light: colors.gray[300],
          dark: colors.gray[500],
        },
        default: colors.blue[700],
      },
    },
  },
  /**
   * Color Palette - Pink Town
   */
  pinktown: {
    colors: {
      primary: colors.pink[700],
      secondary: colors.pink[800],
      dark: {
        primary: colors.pink[300],
        secondary: colors.pink[500],
      },
      accent: {
        gray: {
          light: colors.gray[300],
          dark: colors.gray[500],
        },
        default: colors.blue[700],
      },
    },
  },
  /**
   * Color Palette - Orange City
   */
  orangecity: {
    colors: {
      primary: colors.orange[700],
      secondary: colors.orange[800],
      dark: {
        primary: colors.orange[300],
        secondary: colors.orange[500],
      },
      accent: {
        gray: {
          light: colors.gray[300],
          dark: colors.gray[500],
        },
        default: colors.blue[700],
      },
    },
  },
  /**
   * Color Palette - Amber Sky
   */
  ambersky: {
    colors: {
      primary: colors.amber[700],
      secondary: colors.amber[800],
      dark: {
        primary: colors.amber[300],
        secondary: colors.amber[500],
      },
      accent: {
        gray: {
          light: colors.gray[300],
          dark: colors.gray[500],
        },
        default: colors.blue[700],
      },
    },
  },
  /**
   * Color Palette - Lime Route
   */
  limeroute: {
    colors: {
      primary: colors.lime[700],
      secondary: colors.lime[800],
      dark: {
        primary: colors.lime[300],
        secondary: colors.lime[500],
      },
      accent: {
        gray: {
          light: colors.gray[300],
          dark: colors.gray[500],
        },
        default: colors.blue[700],
      },
    },
  },
  /**
   * Color Palette - Indigone
   */
  indigone: {
    colors: {
      primary: colors.indigo[700],
      secondary: colors.indigo[800],
      dark: {
        primary: colors.indigo[300],
        secondary: colors.indigo[500],
      },
      accent: {
        gray: {
          light: colors.gray[300],
          dark: colors.gray[500],
        },
        default: colors.blue[700],
      },
    },
  },
  /**
   * Color Palette - Rose Garden
   */
  rosegarden: {
    colors: {
      primary: colors.rose[700],
      secondary: colors.rose[800],
      dark: {
        primary: colors.rose[300],
        secondary: colors.rose[500],
      },
      accent: {
        gray: {
          light: colors.gray[300],
          dark: colors.gray[500],
        },
        default: colors.blue[700],
      },
    },
  },
  /**
   * Color palette - Browns
   */
  coffees: {
    colors: {
      primary: colors.rose[700],
      secondary: colors.rose[800],
      dark: {
        primary: colors.rose[300],
        secondary: colors.rose[500],
      },
      accent: {
        gray: {
          light: colors.gray[300],
          dark: colors.gray[500],
        },
        default: colors.blue[700],
      },
    },
  },
  /**
   * Color Palette - Default/Duplicate of Purple Heart (Never remove this)
   */
  default: {
    colors: {
      primary: colors.purple[700],
      secondary: colors.purple[800],
      dark: {
        primary: colors.purple[300],
        secondary: colors.purple[500],
      },
      accent: {
        gray: {
          light: colors.gray[300],
          dark: colors.gray[500],
        },
        default: colors.blue[700],
      },
    },
  },
};
