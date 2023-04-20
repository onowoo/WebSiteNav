import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class',
  attributify: true,
  shortcuts: {
    'text-primary': 'text-[#00DC82]'
  },
  theme:{
    extend:{
      backgroundImage: {
        'darkBorder' : 'linear-gradient(90deg,#1D1E22 0%,#1D1E22 25%,#00dc82 50%,#36e4da 75%,#0047e1 100%)',
        'lightBorder' : 'linear-gradient(90deg,#ecf0f3 0%,#ecf0f3 25%,#00dc82 50%,#36e4da 75%,#0047e1 100%)',
      },
      boxShadow:{
        'lightBox' : '10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;',
        'darkBox' : '4px 4px 16px rgba(0, 0, 0, 0.5), -4px -4px 16px rgba(255, 255, 255, 0.05);'
      }
    }
  }
})
