/**
 * Calculates the total points based on user input for each task,
 * respecting daily limits and updating the 'Points Acquired' for each task.
 */
function calculatePoints() {
    let total = 0;
    // Select all task rows in the table body
    const rows = document.querySelectorAll('#taskTable tbody tr');

    rows.forEach(row => {
        // Get the base points for the task (from the 3rd cell, index 2)
        const pointsPerTask = parseInt(row.cells[2].textContent);
        // Get the daily limit for the task (from the 4th cell, index 3)
        const dailyLimit = parseInt(row.cells[3].textContent);
        // Get the input element for the task count
        const inputElement = row.querySelector('input[type="number"]');

        // Validate input: ensure it's a non-negative number
        let count = parseInt(inputElement.value);
        if (isNaN(count) || count < 0) {
            count = 0; // Default to 0 if invalid
            inputElement.value = 0; // Reset input field to 0
        }

        // Ensure the count does not exceed the daily limit
        const effectiveCount = Math.min(count, dailyLimit);

        // Calculate points acquired for this specific task
        const pointsAcquired = effectiveCount * pointsPerTask;

        // Update the 'Points Acquired' cell for the current task
        row.querySelector('.points-acquired').textContent = pointsAcquired;

        // Add to the overall total points
        total += pointsAcquired;
    });

    // Update the displayed total points
    const totalPointsElement = document.getElementById('totalPoints');
    totalPointsElement.textContent = total;

    // Trigger animation on the total points display
    const totalPointsDisplayElement = document.getElementById('totalPointsDisplay');
    totalPointsDisplayElement.classList.add('points-updated-animation');
    // Remove the class after the animation completes to allow re-triggering
    setTimeout(() => {
        totalPointsDisplayElement.classList.remove('points-updated-animation');
    }, 500); // Duration of the animation
}

/**
 * Resets all task count input fields to 0 and recalculates points.
 * Also ensures all task rows are visible.
 */
function resetTasks() {
    // Select all number input fields within the task table
    const inputs = document.querySelectorAll('#taskTable input[type="number"]');
    inputs.forEach(input => {
        input.value = 0; // Set input value to 0
    });
    // Recalculate points after resetting inputs
    calculatePoints();
    // Ensure all tasks are visible after reset
    showAllTasks();
}

/**
 * Filters the task table to only display tasks that are incomplete
 * (i.e., where the 'Points Acquired' is less than the maximum possible points for that task).
 * This function now recalculates points based on current input to ensure accuracy.
 */
function filterIncomplete() {
    // Select all task rows in the table body
    const rows = document.querySelectorAll('#taskTable tbody tr');

    rows.forEach(row => {
        // Get the base points for the task
        const pointsPerTask = parseInt(row.cells[2].textContent);
        // Get the daily limit for the task
        const dailyLimit = parseInt(row.cells[3].textContent);
        // Get the input element for the task count
        const inputElement = row.querySelector('input[type="number"]');

        // Recalculate the count and points acquired based on the current input value
        let count = parseInt(inputElement.value);
        if (isNaN(count) || count < 0) {
            count = 0;
        }
        const effectiveCount = Math.min(count, dailyLimit);
        const pointsAcquiredForFilter = effectiveCount * pointsPerTask; // Recalculate for filtering

        // Calculate the maximum possible points for this task
        const maxPossiblePoints = pointsPerTask * dailyLimit;

        // If points acquired are less than max possible, the task is incomplete
        if (pointsAcquiredForFilter < maxPossiblePoints) {
            row.style.display = ""; // Show the row
        } else {
            row.style.display = "none"; // Hide the row
        }
    });
}

/**
 * Shows all task rows in the table, effectively clearing any filters.
 */
function showAllTasks() {
    // Select all task rows in the table body
    const rows = document.querySelectorAll('#taskTable tbody tr');
    rows.forEach(row => {
        row.style.display = ""; // Set display to default (empty string) to show the row
    });
}

// Initial calculation when the page loads
document.addEventListener('DOMContentLoaded', calculatePoints);
