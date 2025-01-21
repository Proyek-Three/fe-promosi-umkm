export let isiTabel =
`
  <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
  <tr class="text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
    <td class="px-4 py-3">
      <div class="flex items-center">
        <img
          src="#IMAGE#"
          alt="Product Image"
          class="w-16 h-16 object-cover rounded-lg shadow-md"
        />
      </div>
    </td>
    <td class="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-gray-200">
      #STORENAME#
    </td>
    <td class="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-gray-200">
      #PRODUCTNAME#
    </td>
    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
      #CATEGORYNAME#
    </td>
    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">
      #DESCRIPTION#
    </td>
    <td class="px-4 py-3 text-sm font-bold text-green-600 dark:text-green-400">
      #PRICE#
    </td>
    <td class="px-4 py-3">
      <span
        class="px-3 py-1 text-xs text-gray-600 dark:text-gray-400"
      >
        #STATUS#
      </span>
    </td>
    <td class="px-4 py-3 text-center">
      <div class="flex items-center justify-center space-x-3">
        <!-- Tombol Edit -->
        <a
          class="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Edit"
          id="button"
          href="edit.html?productId=#IDEDIT#"
        >
          <i class="fa-solid fa-pen-to-square mr-2"></i>Edit Status
        </a>
        <!-- Tombol Delete -->
        <button
          class="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Delete"
          id="del_button"
          onclick="confirmDelete('#IDHAPUS#')"
        >
          <i class="fa-solid fa-trash mr-2"></i>Delete
        </button>
      </div>
    </td>
  </tr>
</tbody>

`