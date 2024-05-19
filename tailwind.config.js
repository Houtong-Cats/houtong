/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                cherry: ['"Cherry Bomb"', 'cursive'],
                poppins: ['"Poppins"', 'sans-serif']
            },
            backgroundImage: {
                'custom-gradient': 'linear-gradient(to bottom, #000000, #70675F)',
            },
        },
    },
    plugins: [],
}