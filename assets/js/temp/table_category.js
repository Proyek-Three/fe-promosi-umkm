export let isiTabel = 
`
<tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
  <tr class="text-gray-700 dark:text-gray-400">
    <td class="px-4 py-3 text-sm text-justify">#CATEGORYNAME#</td>
    <td class="px-4 py-3 text-justify">
      <div class="flex items-center space-x-4 text-sm">
        <a
          class="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Edit"
          type="button"
          href="edit.html?categoryId=#IDEDIT#"
        > 
          <i class="fa-solid fa-pen-to-square mr-2"></i> Edit 
        </a>
        <button
          class="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Delete"
          type="button"
          id="del_button"
          onclick="confirmDelete('#IDHAPUS#')"
        >
          <i class="fa-solid fa-trash mr-2"></i> Delete
        </button>
      </div>
    </td>
  </tr>
</tbody>
`
