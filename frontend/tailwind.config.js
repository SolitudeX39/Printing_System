/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                custom: [
                    "IBM Plex Sans Thai", "sans-serif"
                ],
                custom2: ["Kodchasan", "sans-serif"]
            }
        }
    },
    plugins: []
}