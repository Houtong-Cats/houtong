/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'abhaya': ['Abhaya Libre', 'sans-serif'],
                poppins: ['"Poppins"', 'sans-serif'],
            },
            backgroundImage: {
                'custom-gradient': 'linear-gradient(to bottom, #000000, #70675F)',
            },
        },
    },
    plugins: [],
}