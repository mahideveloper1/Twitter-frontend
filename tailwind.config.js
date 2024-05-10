/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  theme: {
    extend: {
      screens: {
        'vs': '156px',
      
       
  
        'laptop': '1024px',
        
  
       
        
      },
      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'twitter-blue': 'rgb(29,155,240)',
        'twitter-gray':'#e7e7e8',
        'twitter-border':'#EFF3F4',
        'twitter-green':'#7BD9BA'
      },
    },
  },
  plugins: [],
}
