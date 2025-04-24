<template>
  <div class="text-center space-y-6">
    <h1 class="text-4xl font-bold text-gray-800">
      Welcome to the 28 Brigade Hub
    </h1>
    <p class="text-lg text-gray-600 max-w-xl mx-auto">
      This site is created to showcase the work completed for labs.
    </p>
    <div class="flex items-center justify-center space-x-4">
      <NuxtLink
        to="/members"
        class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
      >
        Meet the Members
      </NuxtLink>
      <NuxtLink
        to="/notes"
        class="ml-4 inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
      >
        View Notes
      </NuxtLink>
    </div>
  </div>
</template>
