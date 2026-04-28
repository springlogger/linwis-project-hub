<script lang="ts" setup>
import WorkspaceHeader from '~/features/workspace/WorkspaceHeader.vue';
import WorkspaceSidebar from '~/features/workspace/WorkspaceSidebar.vue';

const isSidebarOpen = ref(false);

</script>

<template>
  <div class="min-h-screen">
    <main class="flex flex-row h-screen">
      <aside class="shrink-0 border-r border-white/10 bg-[var(--color-bg-third)]">
        <WorkspaceSidebar @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />
      </aside >

      <div class="flex flex-col min-w-0 flex-1">
        <header class="h-14 shrink-0 border-b border-white/10 bg-[var(--color-bg-third)]">
          <WorkspaceHeader />
        </header>


        <main class="min-w-0 flex-1 overflow-auto">
          <slot />
        </main>

      </div>

    </main>
  </div>
</template>