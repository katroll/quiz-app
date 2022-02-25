module.exports = {
  content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    colors: {
      "light-blue": "#b3d8f1", 
      "mid-blue": "#5fc5f5",
      "dark-blue": "#1a4fed",
      "text-blue": "#0f3aba",
      "green": "#4bb34f",
      "hover-blue": "#0231bf",
      "hover-green": "#1e8222",
      'white': '#ffffff',
      "black": "#000000",
      "gray": "#6b7280",
      "light-gray": "#e5e7eb",
      "dark-gray": "#1f2937",
      "slate-200": "#e2e8f0",
      "slate-300": "#cbd5e1",
      "slate-400": "#94a3b8",
      "slate-500": "#64748b",
      "slate-600": "#475569",
      "slate-700": "#334155",
      "slate-800": "#1e293b",
      "error-red": "#ef4444",
      "yellow": "#f7ee81"

    },
    extend: {},
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ]
}

