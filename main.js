document.addEventListener('DOMContentLoaded', function () {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.type === 'updateStatistics') {
      const {
        totalDiscussions,
        totalOpenDiscussions,
        totalNotOpenDiscussions,
      } = request.data

      document.getElementById('total-discussions').textContent =
        totalDiscussions
      document.getElementById('total-open-discussions').textContent =
        totalOpenDiscussions
      document.getElementById('total-not-open-discussions').textContent =
        totalNotOpenDiscussions
    }
  })

  // Export button click event
  document.getElementById('export-btn').addEventListener('click', exportToCSV)
})

function exportToCSV() {
  // Logic to export data to CSV

  // Fetch discussions data from WhatsApp Web DOM
  const discussionsData = []
  const discussionElements = document.querySelectorAll(
    '[data-list-scroll-container] [data-icon="chat"]'
  )

  discussionElements.forEach((discussionElement) => {
    // Extract discussion information from the DOM
    const dateElement = discussionElement.querySelector(
      '.copyable-text[data-pre-plain-text]'
    )
    const correspondentElement =
      discussionElement.querySelector('.matched-text')

    if (dateElement && correspondentElement) {
      const date = dateElement.getAttribute('data-pre-plain-text')
      const correspondent = correspondentElement.textContent

      discussionsData.push({ date, correspondent })
    }
  })

  // Convert data to CSV format
  const csvContent = discussionsData
    .map((entry) => Object.values(entry).join(','))
    .join('\n')

  // Create a Blob with the CSV data
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })

  // Create a temporary download link and trigger a click event to download the file
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', 'whatsapp_discussions.csv')
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
}
