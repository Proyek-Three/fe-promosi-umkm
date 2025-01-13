export let isiTabel =
`
   <tbody
                    class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                  >
                    <tr class="text-gray-700 dark:text-gray-400">
                      <td class="px-4 py-3 text-sm">#PRODUCTNAME#</td>
                      <td class="px-4 py-3 text-sm">#CATEGORYNAME#</td>
                      <td class="px-4 py-3 text-sm">#DESCRIPTION#</td>
                      <td class="px-4 py-3 text-sm">#PRICE#</td>
                      <td class="px-4 py-3">
                        <img
                          src="#IMAGE#"
                          class="w-20 h-20 object-cover rounded-lg"
                        />
                      </td>
                      <td class="px-4 py-3 text-sm">#STATUS#</td>
                      <td class="px-4 py-3 text-center">
                        <div class="flex items-center justify-center space-x-4">
                          <!-- Tombol Edit-->
                          <a
                            class="flex items-center justify-between px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
                            aria-label="Edit"
                            id="button"
                            href="edit.html?productId=#IDEDIT#"
                          >
                            <i class="fa-solid fa-pen-to-square mr-2"></i> Edit
                          </a>
                          <!-- Tombol Delete -->
                          <button
                            class="flex items-center justify-between px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
                            aria-label="Delete"
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