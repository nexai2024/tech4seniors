"use client"
import Script from "next/script";

const bookingPage = () => {
    return (
        <div>
             <Script
            src="https://admin.nexai.network/js/embed.js"
            strategy="beforeInteractive"
            onLoad={() => console.log('Script loaded successfully!')}
          />
    <div id="agiled-embed" data-path="event-embed/996009f2374006606f4c0b0fda878af1"></div>

    </div>
    )
}
export default bookingPage