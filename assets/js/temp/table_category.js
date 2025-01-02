export let isiTabel = 
`
<tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
  <tr class="text-gray-700 dark:text-gray-400">
    <td class="px-4 py-3 text-sm text-justify">#CATEGORYNAME#</td>
    <td class="px-4 py-3 text-justify">
      <div class="flex items-center space-x-4 text-sm">
        <a
          class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
          aria-label="Edit"
          type="button"
          href="edit.html?categoryId=#IDEDIT#"
        > 
          <i class="fa-solid fa-pen-to-square"></i>   
        </a>
        <button
          class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
          aria-label="Delete"
          type="button"
          id="del_button"
          onclick="confirmDelete('#IDHAPUS#')"
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </td>
  </tr>
</tbody>
`
