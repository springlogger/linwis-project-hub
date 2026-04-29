export function useDropdown() {
  const isOpen = ref(false)
  const buttonRef = ref<HTMLElement | null>(null)
  const menuRef = ref<HTMLElement | null>(null)

  useEventListener('click', (event) => {
    if (
      buttonRef.value &&
      menuRef.value &&
      !buttonRef.value.contains(event.target as Node) &&
      !menuRef.value.contains(event.target as Node)
    ) {
      isOpen.value = false
    }
  })

  return { isOpen, buttonRef, menuRef }
}
