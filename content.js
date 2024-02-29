function updateStatistics() {
  const totalDiscussionsElement = document.querySelector('[data-icon="chat"]')
  const totalOpenDiscussionsElement = document.querySelectorAll(
    '[data-icon="unread"]'
  )

  const totalDiscussions = totalDiscussionsElement
    ? totalDiscussionsElement.parentElement.childElementCount
    : 0
  const totalOpenDiscussions = totalOpenDiscussionsElement.length

  const totalNotOpenDiscussions = totalDiscussions - totalOpenDiscussions

  chrome.runtime.sendMessage({
    type: 'updateStatistics',
    data: {
      totalDiscussions,
      totalOpenDiscussions,
      totalNotOpenDiscussions,
    },
  })
}

const observer = new MutationObserver(updateStatistics)

observer.observe(document.body, {
  childList: true,
  subtree: true,
})

// Initial update
updateStatistics()
