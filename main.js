document.addEventListener('DOMContentLoaded', function () {
  // Your code to fetch and update the statistics goes here

  // Sample data
  const totalDiscussions = 100
  const totalOpenDiscussions = 75
  const totalNotOpenDiscussions = totalDiscussions - totalOpenDiscussions

  document.getElementById('total-discussions').textContent = totalDiscussions
  document.getElementById('total-open-discussions').textContent =
    totalOpenDiscussions
  document.getElementById('total-not-open-discussions').textContent =
    totalNotOpenDiscussions

  // Export button click event
  document.getElementById('export-btn').addEventListener('click', exportToCSV)
})

function exportToCSV() {
  // Your code to export data to CSV goes here
  alert('Exporting to CSV...')
}
