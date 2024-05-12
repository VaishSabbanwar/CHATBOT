const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const API_KEY = "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"; // Paste your API key here
const apiUrl = "https://api.openai.com/v1/answers";
const inputInitHeight = chatInput.scrollHeight;

const responses = {
    introduction: "Hello! I'm here to discuss the ideal educational system with you.",
    option: "Which one you want to know about from-curriculum, teaching, assessment, resources, support, community, challenges, overcome, conclusion ",
    curriculum: "In an ideal educational system, the curriculum should be comprehensive, flexible, and regularly updated to meet the needs of students and the demands of the modern world.",
    teaching: "Effective teaching involves engaging and inspiring educators who utilize diverse teaching methods to accommodate different learning styles and foster critical thinking and creativity.",
    assessment: "Assessment should be fair, varied, and focus on understanding rather than rote memorization. It should provide valuable feedback to students and support their growth.",
    resources: "Access to resources such as libraries, technology, and extracurricular activities is essential for a well-rounded education. These resources should be equitable and easily accessible to all students.",
    support: "Students should receive comprehensive support services, including academic advising, counseling, and accommodations for diverse needs, to ensure their success and well-being.",
    community: "A strong sense of community promotes collaboration, respect, and inclusivity among students, educators, parents, and the broader community. It fosters a supportive and enriching learning environment.",
    conclusion: "Thank you for discussing the ideal educational system with me. Remember, continuous improvement and collaboration are key to creating a system that meets the needs of all learners.",
    Challenges: "Lack of funding,Inequality in access to quality education,Outdated curriculum,Teacher shortages,High dropout rates.",
    overcome: "Implement personalized learning paths to cater to individual student needs.Integrate technology more effectively into the curriculum to enhance learning experiences.Promote project-based and experiential learning to foster critical thinking and problem-solving skills.Revise assessment methods to focus on mastery of skills and competencies rather than standardized testing.Provide professional development opportunities for educators to keep up with best practices and innovation in teaching.Increase access to mental health resources and support services for students.Enhance diversity, equity, and inclusion initiatives to create a more inclusive learning environment.Invest in infrastructure improvements to ensure safe and conducive learning spaces.Strengthen partnerships with industries and communities to offer real-world learning experiences and career pathways.Encourage interdisciplinary collaboration and integration of subjects to reflect the interconnected nature of knowledge and skills in the modern world.",
    default: "I'm sorry, I'm not sure how to respond to that. Let's focus on discussing the key aspects of an ideal educational system."

};

const respondToQuery = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const response = Object.keys(responses).find(key => {
        const keywords = key === 'introduction' ? ['hi', 'hello'] : [key];
        return keywords.some(keyword => lowerCaseQuery.includes(keyword));
    });
    return responses[response] || responses.default;
}

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (chatElement) => {
    const messageElement = chatElement.querySelector("p");
    const response = respondToQuery(userMessage);
    messageElement.textContent = response;
    chatbox.scrollTo(0, chatbox.scrollHeight);
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if (!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
