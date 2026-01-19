document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('complaint-form');
    const imageInput = document.getElementById('attachment');
    const previewContainer = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');

    /**
     * IMAGE PREVIEW LOGIC
     * This runs only on frontend and does NOT affect backend upload
     */
    imageInput.addEventListener('change', () => {
        const file = imageInput.files[0];

        if (!file) {
            previewContainer.classList.add('hidden');
            return;
        }

        // Basic client-side validation
        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file.');
            imageInput.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            previewImg.src = reader.result;
            previewContainer.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    });

    /**
     * FORM SUBMISSION (BACKEND READY)
     * Replace console logs with API call later
     */
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Prepare form data for backend
        const formData = new FormData(form);

        // DEBUG ONLY (remove later)
        console.log('--- Complaint Submission ---');
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        /**
         * FUTURE BACKEND INTEGRATION
         * 
         * fetch('/api/complaints', {
         *   method: 'POST',
         *   headers: {
         *     'Authorization': 'Bearer <JWT_TOKEN>'
         *   },
         *   body: formData
         * })
         */

        alert('Complaint submitted successfully (simulated).');
        form.reset();
        previewContainer.classList.add('hidden');
    });

});
