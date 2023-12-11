import { onBeforeUnmount } from 'vue'

interface KeyboardAction {
  key: string
  action: () => void
}

export default function (dict: KeyboardAction[]) {
  function handleKeyup(event: KeyboardEvent) {
    const kc = dict.find(
      (item) => item.key.toLowerCase() === event.key.toLowerCase()
    )
    if (kc?.action) {
      kc.action()
    }
  }

  window.addEventListener('keydown', handleKeyup)
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyup)
  })
}
