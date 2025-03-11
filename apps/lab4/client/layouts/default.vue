<!-- layouts/default.vue -->
<template>
  <div>
    <header class="bg-gray-800 text-white p-4">
      <h1 class="text-xl font-bold">
        My App
      </h1>
    </header>

    <main>
      <slot />
    </main>

    <footer class="bg-gray-800 text-white p-4 text-center">
      © 2025 My Company
    </footer>
  </div>
</template>
