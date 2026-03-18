document.addEventListener("DOMContentLoaded", () => {

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {
            const answer = item.querySelector(".faq-answer");

            const isOpen = answer.style.display === "block";

            // close all
            document.querySelectorAll(".faq-answer").forEach(a => a.style.display = "none");

            // toggle current
            answer.style.display = isOpen ? "none" : "block";
        });
    });

});