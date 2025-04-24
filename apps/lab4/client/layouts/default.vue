<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
      <NuxtLink
        to="/"
        class="text-xl font-bold hover:underline"
      >
        28 Brigade
      </NuxtLink>
      <nav>
        <ul class="flex space-x-4">
          <li>
            <NuxtLink
              to="/members"
              class="hover:underline"
            >Members</NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/notes"
              class="hover:underline"
            >Notes</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>

    <!-- Page content goes here -->
    <main class="flex-1 flex items-center justify-center">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white p-4 text-center">
      © 2025 Sokolov Oleksandr
    </footer>
  </div>
</template>
