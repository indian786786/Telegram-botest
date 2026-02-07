// Assuming the API response structure is something like this:
// {
//   "questions": [...],
//   "options": [...]
// }

// Fixing the API response parsing in app.js

const fetchApiResponse = async () => {
    try {
        const response = await fetch('API_URL');
        const data = await response.json();

        // Directly accessing the questions array
        const questions = data.questions;

        questions.forEach((question, index) => {
            // Assuming options are within each question object
            // If options are at data level, use data.options instead
            const options = question.options || data.options;

            // Iterating through options using forEach instead of for-in loop
            options.forEach(option => {
                console.log(`${index + 1}. ${question.text} - Option: ${option}`);
            });
        });
    } catch (error) {
        console.error('Failed to fetch API response:', error);
    }
};

fetchApiResponse();
