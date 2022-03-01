module.exports = {
  content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
      colors: {
        lemon: {
          '50':  '#fbfaf6',
          '100': '#f7f0d2',
          '200': '#eedda3',
          '300': '#d5b96d',
          '400': '#b48f41',
          '500': '#946e24',
          '600': '#775417',
          '700': '#5b3f14',
          '800': '#3e2b10',
          '900': '#281a0c',
        },
        viridian: {
          '50':  '#f4f7f6',
          '100': '#e1f0ef',
          '200': '#bbe4dc',
          '300': '#85c7b5',
          '400': '#44a589',
          '500': '#308761',
          '600': '#286f48',
          '700': '#235439',
          '800': '#19392a',
          '900': '#11231e',
        },
        navy: {
          '50':  '#f5f8f9',
          '100': '#e1f1f8',
          '200': '#bde0f0',
          '300': '#8cc1db',
          '400': '#549cc0',
          '500': '#3f7ba5',
          '600': '#346189',
          '700': '#2a496a',
          '800': '#1e314b',
          '900': '#121e31',
        },
        red: {
          "100": "#E13203",
        }, 
        green: {
          "100": "#08ff4a",
        }, 


        'th-primary': 'var(--primary)',
        'th-secondary': 'var(--secondary)',
        "th-card-bg": "var(--card-bg)",
        "th-light-text": "var(--light-text)",
        "th-button": "var(--button)",
        "th-title-text": "var(--title-text)",
        "th-table-header-bg": "var(--table-header-bg)",
        "th-warning": "var(--warning)",
        "th-correct": "var(--correct)"
        

      }
    },
  plugins: [
    require('tw-elements/dist/plugin')
  ]
}

