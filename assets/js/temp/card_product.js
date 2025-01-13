export let isiCard =
`
<div
  class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700"
>
  <a href="#">
    <img
      class="w-full h-48 object-cover"
      src="#IMAGE#"
      alt="Product Image"
    />
  </a>
  <div class="p-4 space-y-2">
    <h3
      class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white"
    >
      #PRODUCTNAME#
    </h3>
    <h6 class="text-sm text-gray-600 dark:text-gray-400">#CATEGORYNAME#</h6>
    <p class="text-sm text-gray-800 dark:text-gray-300">
      #DESCRIPTION#
    </p>
    <!-- Status Badge -->
    <div class="flex items-center gap-2">
      <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Status:</span>
      <div class="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full dark:bg-dark-900 dark:text-dark-300">
        #STATUS#
      </div>
    </div>
    <div class="flex items-center justify-between">
      <span
        class="text-xl font-bold text-gray-900 dark:text-white"
      >Rp. #PRICE#</span>
    </div>
    <div class="flex gap-2">
      <a
        href="edit.html?categoryId=#IDEDIT#"
        class="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-4 py-2 dark:bg-yellow-600 dark:hover:bg-yellow-500 dark:focus:ring-yellow-500 flex items-center"
      >
        <i class="fa-solid fa-pen-to-square mr-2"></i> Edit
      </a>
      <button
        id="del_button"
        onclick="confirmDelete('#IDHAPUS#')"
        class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 flex items-center"
      >
        <i class="fa-solid fa-trash mr-2"></i> Delete
      </button>
    </div>
  </div>
</div>
`
