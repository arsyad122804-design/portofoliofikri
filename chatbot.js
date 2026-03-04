// AI Assistant Chatbot
// API Key disimpan dengan encoding sederhana
const API_KEY_PART1 = 'gsk_Nzh8tzNX4Fhyumzs';
const API_KEY_PART2 = 'Bs8OWGdyb3FYsFoVUScMbMC3Xf8wKo0nefSL';
const GROQ_API_KEY = API_KEY_PART1 + API_KEY_PART2;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Portfolio data for AI context
const portfolioData = `
Nama: Muhammad Fikri Arsyad
Usia: 21 tahun
Profesi: Calon Investor

Visi: Menjadi seorang triliuner bukan sebagai pewaris, melainkan sebagai perintis yang membangun semuanya dari nol. Saya percaya kesuksesan lahir dari proses, kerja keras, disiplin, dan keberanian mengambil risiko dalam setiap peluang yang ada.

Minat: Saham, Teknologi Informasi, Artificial Intelligence (AI), Trading Saham, Olahraga

Filosofi: Kesuksesan tidak dilihat berapa uang mu, berapa aset mu, tapi kesuksesan itu dilihat ketika dia bermanfaat bagi orang lain.

Software Skills: Figma, Kiro, Canva, CapCut, After Effects, ChatGPT

Buku yang Dibaca: Warren Buffett Mindset

Projects:
1. Project Design (Figma)
2. Trading App (https://treding-eta.vercel.app/)
3. Jual Buah dan Sayur (https://jual-buhan-dan-sayur.vercel.app/)
4. Cryptocurrency App
5. Tugas App (https://tugaso.vercel.app/)

Kontak:
- Instagram: fikri_arsyad2004
- TikTok: arsyadchannel6
- WhatsApp: 0882005479994
- Facebook: Muhammad Fikri Arsyad
`;

// Chat state
let chatHistory = [];
let isChatOpen = false;

// Initialize chatbot
function initChatbot() {
    const chatToggle = document.getElementById('chatToggle');
    const chatContainer = document.getElementById('chatContainer');
    const chatClose = document.getElementById('chatClose');
    const chatSend = document.getElementById('chatSend');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    // Toggle chat
    chatToggle.addEventListener('click', () => {
        isChatOpen = !isChatOpen;
        chatContainer.style.display = isChatOpen ? 'flex' : 'none';
        if (isChatOpen && chatHistory.length === 0) {
            addMessage('assistant', 'Halo! Saya AI Assistant untuk portfolio Muhammad Fikri Arsyad. Ada yang bisa saya bantu?');
        }
    });

    // Close chat
    chatClose.addEventListener('click', () => {
        isChatOpen = false;
        chatContainer.style.display = 'none';
    });

    // Send message
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

// Add message to chat
function addMessage(role, content) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${role}`;
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = content;
    
    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message to AI
async function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage('user', message);
    chatInput.value = '';
    
    // Add to history
    chatHistory.push({ role: 'user', content: message });
    
    // Show typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message assistant typing-indicator';
    typingDiv.innerHTML = '<div class="message-bubble">Mengetik...</div>';
    typingDiv.id = 'typing';
    document.getElementById('chatMessages').appendChild(typingDiv);
    
    try {
        // Call Groq API
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    {
                        role: 'system',
                        content: `Kamu adalah AI Assistant untuk portfolio Muhammad Fikri Arsyad. Jawab semua pertanyaan tentang dia dengan ramah dan informatif dalam Bahasa Indonesia. Berikut data portfolio:\n\n${portfolioData}`
                    },
                    ...chatHistory
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });
        
        // Remove typing indicator
        document.getElementById('typing')?.remove();
        
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        const data = await response.json();
        const aiMessage = data.choices[0].message.content;
        
        // Add AI response
        addMessage('assistant', aiMessage);
        chatHistory.push({ role: 'assistant', content: aiMessage });
        
    } catch (error) {
        console.error('Chat error:', error);
        document.getElementById('typing')?.remove();
        addMessage('assistant', 'Maaf, terjadi kesalahan. Silakan coba lagi.');
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', initChatbot);
