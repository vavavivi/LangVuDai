async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (!userInput) return;

    displayMessage(userInput, "user-msg");
    document.getElementById("userInput").value = ""; // Clear the input box

    try {
		var key = "ANamMoi2025IzaSyDuHymmvWK89HW8nNamMoi2025FoCBXyBX1sOgXb3bNamMoi2025Ns";
		
		key = key.replace(/NamMoi2025/g, '');

		var url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + key;
		
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
               contents: [
					{
						role: "user",
						parts: [{ text: "Bạn hãy trả lời dưới vai Chí Phèo trong tác phẩm cùng tên của Nam Cao. Trả lời cho học sinh trung học cơ sở, dưới 6 câu" }]
					},
					{
						role: "user",
						parts: [{ text: userInput }]
					}
                ]
            })
        });

        const data = await response.json();
        const botMessage = data.candidates[0].content.parts[0].text;
		console.log(data);
        displayMessage(botMessage, "bot-msg");
		try {
			// Step 1: Send the text to FPT TTS API and get the MP3 file
			const ttsAudioUrl = await fetchFptTts(botMessage);

			// Step 2: Play the audio response from FPT
			playAudio(ttsAudioUrl);
		} catch (error) {
			console.error("Error:", error);
			const errorMessage = "Sorry, something went wrong.";
			displayMessage(errorMessage, "bot-msg");
		}
    } catch (error) {
        console.error("Error:", error);
        displayMessage("Sorry, something went wrong.", "bot-msg");
    }
}

function displayMessage(text, className) {
    const chatBox = document.getElementById("chatBox");
    const messageDiv = document.createElement("div");
    messageDiv.className = className;
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto scroll to the bottom
}

// Function to call FPT TTS API and retrieve MP3 URL
async function fetchFptTts(text) {
    const response = await fetch("https://api.fpt.ai/hmi/tts/v5", {
        method: "POST",
        headers: {
            "api-key": "Ej3GUuXgnQrDaQMhrRvPoEjBne04SoqO",          // Replace with your FPT API key
            "speed": "0",                        // Adjust speed if needed
            "voice": "leminh"                    // Select the desired voice (e.g., "leminh")
        },
        body: text
    });

    if (!response.ok) {
        throw new Error("Failed to fetch TTS audio");
    }

    const data = await response.json();
    return data.async; // Return the URL of the MP3 file from the response
}

// Function to play audio from URL
function playAudio(audioUrl) {
	setTimeout(function() {
		
    const audio = new Audio(audioUrl);
    audio.play();
}, 5000);

} 