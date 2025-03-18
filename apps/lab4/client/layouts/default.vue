<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-gray-800 text-white p-4">
      <h1 class="text-xl font-bold">
        28 Brigade
      </h1>
    </header>

    <main class="flex-1 flex items-center justify-center">
      <slot />
    </main>

    <footer class="bg-gray-800 text-white p-4 text-center">
      © 2025 Sokolov Oleksandr
    </footer>
  </div>
</template>
